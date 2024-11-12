import React, { useState } from 'react';
import '../admin_product_card/style.css';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import displayCurrency from '../../../../helpers/DisplayCurrency';
import AdminEditProduct from '../admin_edit_product';
 
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