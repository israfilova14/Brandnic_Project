import React, { useEffect, useState } from 'react';
import '../product_category/style.css';
import SummaryApi from '../../common';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async() => {
      setLoading(true)
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setLoading(false)
      setCategoryProduct(dataResponse.data)
  }
  useEffect(() => {
     fetchCategoryProduct()
  },[])
  return (
    <div className='productCategoryWrapper'>
        
            { 
              loading 
                ?
              ( 
                  categoryLoading.map((el, index) => {
                    return (
                      <div key={index + el} className='loadingBox'>
                      </div>
                    )
                  })
              )
              :
              (
                categoryProduct.map((product, index) => {
                  return(
                      <Link to={'/product-category?category=' + product?.category}>
                        <div className='productCategoryBox' key={product?.category}>
                            <img src={product?.productImage[0]} alt={product?.category} className='productCategory'/>
                            <p>{product?.category}</p>
                        </div>
                      </Link>
                  )
                }
              ))
          }
        
    </div>
  )
}

export default ProductCategory