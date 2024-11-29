import React from 'react';
import '../payment_success/style.css';
import successPng from '../../assets/images/success.gif';
import {Link} from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className='paymentSuccess'>
       <img src={successPng} className='mix-blend-multiply'/>
       <h2>Payment Was Successfully!</h2>
       <Link to={'/order'}>See Order</Link>
    </div>
  )
}

export default PaymentSuccess