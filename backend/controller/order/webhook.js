const stripe = require('../../config/stripe');
const basketProductCartModel = require('../../models/basketProductCartModel');
const orderModel = require('../../models/orderProductModel');
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  let productItems = [];
  if (lineItems.data?.length) {
    for (const item of lineItems.data) {
      try {
        const product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId;
        console.log('productId:', productId);
        console.log('Line Items Data:', lineItems.data);  // Konsol ilə yoxlayın

        const productData = {
          productId: productId,
          name: product?.name,
          price: item.price.unit_amount / 100,
          quantity: item.quantity,
          image: product.images,
        };

        productItems.push(productData);
      } catch (err) {
        console.error('Error retrieving product:', err.message);
      }
    }
  }

  return productItems;
}

const webhooks = async (req, res) => {

  const signature = req.headers['stripe-signature'];
  console.log('Stripe Signature:', signature);

  const payloadString = JSON.stringify(req.body);
  console.log('Payload String:', payloadString);  // Konsol ilə yoxlayın

  let event;

  try {
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    // Webhooku düzgün şəkildə doğrulama
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    console.log('Stripe Event:', event);   
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      console.log('Session:', session);  // Konsol ilə bu məlumatı yoxlayın

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      console.log('Line Items:', lineItems);  // Konsola baxın

      const productDetails = await getLineItems(lineItems);
      console.log('Product Details:', productDetails);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method: session.payment_method,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options
          ? session.shipping_options.map((s) => ({
              ...s,
              shipping_amount: s.shipping_amount / 100,
            }))
          : [],
        totalAmount: session.amount_total / 100,
      };

      try {
        const order = new orderModel(orderDetails);
        const saveOrder = await order.save();
        if(saveOrder?._id){
          const deleteBasketItems = await basketProductCartModel.deleteMany({userId: session.metadata.userId});
        }
        console.log('Order successfully saved:', saveOrder);
      } catch (err) {
        console.error('Error saving order:', err.message);
        return res.status(500).send(`Error saving order: ${err.message}`);
      }

      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
};

module.exports = webhooks;
