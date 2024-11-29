const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log('cartItems', cartItems);
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart items are empty',
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        success: false,
      });
    }

    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],  
      billing_address_collection: 'auto',
      shipping_options: [
        {
          shipping_rate: 'shr_1QPykKCdO118jhnwfEPA6iKR',
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: req.userId,
      },
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.productId.productName,
            images: item.productId.productImage,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount: Math.round(item.productId.sellingPrice * 100),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(303).json(session);
  } catch (error) {
    console.error('Payment Controller Error:', error);
    res.status(500).json({
      message: error?.message || 'Something went wrong',
      error: true,
      success: false,
    });
  }
};


module.exports = paymentController;
