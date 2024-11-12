import React, { useContext, useEffect, useState } from 'react';
import '../favorite/style.css'; 
import Context from '../../../context';
import SummaryApi from '../../../common';
import { FaHeart } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import displayCurrency from '../../../helpers/DisplayCurrency';

const Favorite = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const context = useContext(Context);
  const loadingCart = new Array().fill(null);

  const fetchData = async() => {
     const response = await fetch(SummaryApi.addToFavoriteProductView.url, {
        method: SummaryApi.addToFavoriteProductView.method,
        credentials: 'include',
        headers: {
           "Content-Type": "application/json"
        }
     });
     const responseData = await response.json();

     if(responseData.success){
      setData(responseData.data)
     }
  }
  const handleLoading = async() => {
     setLoading(true);
     await fetchData();
     setLoading(false);
  }

  useEffect(() => {
     handleLoading();
  },[]);

  const favoriteDeleteProduct = async(id) => {
    const response = await fetch(SummaryApi.deleteFavoriteProduct.url, {
       method: SummaryApi.deleteBasketProduct.method,
       credentials: 'include',
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         _id: id
       })
    })
     const responseData = await response.json();
     if(responseData.success){
       fetchData()
     }
  }

  const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber)
  }

  const updateProductsPerPage = () => {
     const width = window.innerWidth;
     if(width >= 1290){
        setItemsPerPage(4)
     }

     if(width >= 1160 && width < 1290){
        setItemsPerPage(3)
     }

     if(width < 1159 && width >= 850){
        setItemsPerPage(2)
     }

     if(width < 850){
         setItemsPerPage(1)
     }
  }

  useEffect(() => {
    updateProductsPerPage();
    window.addEventListener('resize', updateProductsPerPage);

    return () => {
      window.removeEventListener('resize', updateProductsPerPage);
    }
  },[])

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='favoriteWrapper'>
        <div className='container'>
           {
            data.length === 0 && !loading && (
              <div className='favoriteEmptyBox'>
                  <h2>There are no products in your favorites section</h2>
              </div>
            )
           }
           {
            data.length === 0 && loading && (
              <div className='favoriteLoadBox'>
              </div>
            )
           }
           <div className='favoriteContent'>
              {
                loading
                ?
                (
                  <div className='loadingCards'>
                     {
                       currentItems.map((element, index) => {
                          return (
                            <div
                              key={index + "loadingBox"}
                              className='loadingBox'
                            >
                            </div>
                          )
                       })
                     }
                  </div>
                )
                : 
                (
                   data.length !== 0 && !loading && (
                    <div className='favoriteBox'>
                       <div className='aboutProducts'>
                          <h2>
                             Your chosen collection is here to make you smile-
                             it's like it was made just for you !
                          </h2>
                       </div>
                       <div className='favoriteCards'>
                    {
                      currentItems.map((product) => (
                        <div
                          className='favoriteCard' 
                          key={product?._id + "favorite cart"}
                        >
                            <div className='favoriteImageBox'>
                              <img
                                src={product?.productId?.productImage[0]}
                                className='favoriteProductImage'
                              />
                              <div 
                               className='closeIcon'
                               onClick={() => favoriteDeleteProduct(product?._id)}
                               >
                                 <IoMdClose/>
                              </div>
                            </div>
                            <div className='aboutFavoriteProduct'>
                                <div className='row row-1'>
                                  <h2 className='productTitle'>
                                      {product?.productId?.category}
                                  </h2>
                                  <FaHeart/>
                                </div>
                                <div className='row row-2'>
                                    <p className='productBrandName'>
                                      {product?.productId?.brandName}
                                    </p>
                                    <p className='productPrice'>
                                        {displayCurrency(product?.productId?.sellingPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className='paginationWrapper'>
                     {
                       Array.from({length: totalPages}, (_, index) => (
                         <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage == index + 1 ? 'active' : ''}
                         >
                             {index + 1}
                         </button>
                       ))
                     }
                  </div>
                    </div>
                   )
                )
              }
           </div>
        </div>
    </div>
  )
}

export default Favorite