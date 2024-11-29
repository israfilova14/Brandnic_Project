import React, { useEffect, useState } from 'react';
import '../order/style.css';
import SummaryApi from '../../common/index';
import moment from 'moment';
import displayCurrency from '../../helpers/DisplayCurrency';

const Order = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include',
    });

    const responseData = await response.json();
    console.log('order list', responseData);
    setData(responseData.data || []); // Ensure data is an array
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className='orderWrapper'>
      {data.length === 0 && 
        <div className='emptyBox'>
          <h2>No Order Available</h2>
        </div>}
      <div className='order'>
        {data.map((order, index) => (
          <div key={order.userId + index}>
            <p className='createdDate'>{moment(order.createdAt).format('LL')}</p>
            <div className='box'>
            <div>
              {order.productDetails.map((product, idx) => (
                <div key={product.productId + idx} className='card'>
                  <img src={product.image[0]} alt={product.name} className='orderImage'/>
                  <div>
                    <p className='productTitle'>{product.name}</p>
                    <div className='amount_box'>
                        <p className='productPrice'>Price: {displayCurrency(product.price)}</p>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='aboutOrder'>
              <div className='paymentDetails'>
                <p>Payment Details</p>
                <p>Payment method: cart</p>
                <p>Payment status: {order.paymentDetails.payment_status}</p>
              </div>
              <div className='shippingDetails'>
              <p>Shipping Details</p>
                {
                  order.shipping_options.map((shipping, index) => {
                    return (
                      <p key={shipping.shipping_rate}>
                        Shipping amount: {shipping?.shipping_amount}
                      </p>
                    )
                  })
                }
              </div>
              <div className='totalAmount'>
                Total Amount: {order.totalAmount}
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
