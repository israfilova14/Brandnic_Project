import React, { useEffect, useState } from 'react';
import './style.css';
import SummaryApi from '../../../common/index';
import moment from 'moment';
import displayCurrency from '../../../helpers/DisplayCurrency';

const AdminAllOrders = () => {
  const [data, setData] = useState([]);

  const fetchAllOrders = async() => {
     const response = await fetch(SummaryApi.allOrders.url, {
       method: SummaryApi.allOrders.method,
       credentials: 'include',
     });

     const responseData = await response.json();
     console.log("admin all orders", responseData);
     setData(responseData.data || []);
  };

  useEffect(() => {
     fetchAllOrders();
  }, []);

  return (
    <div className='adminOrderWrapper'>
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
  )
}

export default AdminAllOrders