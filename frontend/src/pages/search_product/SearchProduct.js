import React, { useEffect, useState } from 'react'
import '../search_product/SearchProduct.css'
import {useLocation} from 'react-router-dom'
import SummaryApi from '../../common';
import VerticalCart from '../vertical_cart/VerticalCart';

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
            loading && (
               <div className='loadingBox animate-pulse'>
                  <h2>Loading...</h2>
               </div>
            )
         }
        <div className='searchResultBox'>
           <h2>Search Results: {data?.length}</h2>
        </div>
         {
               data.length === 0 && !loading && (
                  <div className='emptyDataBox'>
                     <h2>No Data Found...</h2>
                  </div>
                  )
         }
       {
        data.length !== 0 && !loading && (
            <div>
               {
                      
                        <VerticalCart loading={loading} data={data}/>
                      
               }
         </div>
         )}
         </div>)}

export default SearchProduct