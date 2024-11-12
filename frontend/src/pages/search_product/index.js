import React, { useEffect, useState } from 'react';
import '../search_product/style.css';
import {useLocation} from 'react-router-dom';
import SummaryApi from '../../common';
import VerticalProductCartModel from '../vertical_product_cart_model';

const SearchProduct = () => {
    const query = useLocation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log("query", query);
    
    const fetchProduct = async() => {
       setLoading(true)
       const response = await fetch(SummaryApi.searchProduct.url + query.search);
       const dataResponse = await response.json();
       setLoading(false);
       setData(dataResponse.data)
       console.log("dataResponse", dataResponse);
    }
    useEffect(() => {
       fetchProduct()
    },[query])

  return (
    <div className='searchProductWrapper'>
               {
                  loading && data.length === 0  && (
                     <div className='loadingBox'>
                           <h2>Loading...</h2>
                     </div>
                  )
               }
               {
                  !loading && data.length === 0 && (
                     <div className='searchResultBox'>
                     <h2>Category not found</h2>
                     </div>
                  )
               }
               {
                  data.length !== 0 && !loading && (
                     <div className='searchResultBox'>
                        <h2>Search Results: {data?.length}</h2>
                  </div>
                  )
               }
               {
                  data.length !== 0  && loading && (
                     <div className='loadSearchResultBox'>
                     </div>
                  )
               }
               {
                  data.length !== 0 && (
                     <div>
                        {
                        <VerticalProductCartModel loading={loading} data={data}/>
                        }
                     </div>
                  )
               }
         </div>
         )
      }

export default SearchProduct