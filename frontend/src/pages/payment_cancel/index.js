import React from 'react';
import '../payment_cancel/style.css';
import cacnelPng from '../../assets/images/cancel.gif';
import {Link} from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className='paymentCancel'>
       <img src={cacnelPng} className='mix-blend-multiply'/>
       <h2>Payment Canceled!</h2>
       <Link to={'/basket'}>Go To Basket</Link>
    </div>
  )
}

export default PaymentCancel