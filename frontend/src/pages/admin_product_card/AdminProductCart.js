import React, { useState } from 'react'
import '../admin_product_card/AdminProductCart.css'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import AdminEditProduct from '../admin_edit_product/AdminEditProduct';
import displayCurrency from '../../helpers/DisplayCurrency';

const AdminProductCart = ({
  data,
  fetchData,
  handleDeleteProduct
}) => {
  const [editProduct, setEditProduct] = useState(false);
  
  return (
    <div className='adminProductCart'>
        <img src={data?.productImage[0]}/>
        <p className='productName'>{data?.productName}</p>
        <div className='productPrice'>
              {
                displayCurrency(data?.sellingPrice)
              }
             
        </div>
        <div className='icons_box'>
             <MdModeEdit 
                className='edit_'
                onClick={() => setEditProduct(true)}
             />
             <MdDelete 
                 className='delete_'
                 onClick={() => handleDeleteProduct(data._id)}
             />
        </div>
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchData={fetchData}/>
          )
        }
      
    </div>
  )
}

export default AdminProductCart