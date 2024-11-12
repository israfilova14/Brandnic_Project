import React, { useCallback, useContext, useEffect, useState } from 'react'
import '../product_detail/style.css'; 
import {useNavigate, useParams} from 'react-router-dom';
import SummaryApi from '../../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from '../../helpers/DisplayCurrency';
import Context from '../../context';
import addToBasket from '../../helpers/addToBasket';
import DisplayProductByCategory from '../display_product_by_category';

const ProductDetail = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const length = data?.productImage?.length;
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(length).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  });
  const context = useContext(Context);
  const [zoomImage, setZoomImage] = useState(false);

   const fetchProductDetails = async() => {
    setLoading(true)
    const response  = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
     setLoading(false)
    const dataResponse = await response.json()
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  const navigate = useNavigate()
  
  useEffect(() => {
     fetchProductDetails()
  },[params])

  const handleMouseEnterProduct = (image) => {
       setActiveImage(image)
  }
 
  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();
    let x = (e.clientX - left) / width;
    let y = (e.clientY - top) / height;
  
    // Clamp x and y between 0 and 1 for smoother effect
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
  
    setZoomImageCoordinate({
      x,
      y
    });
  }, []);
  
 const handleLeaveImageZoom = () => {
  setZoomImage(false)
 }

 const handleAddToBasket = async(e, id) => {
    await addToBasket(e, id);
    context.fetchUserBasketProductCount();
 }
 const handleBuyProduct = async(e, id) => {
     await addToBasket(e, id);
     context.fetchUserBasketProductCount();
     navigate("/cart")
 }
  return (
    <div className='productDetailWrapper'>
         <div className='container'>
            {/*Product Image*/}
           
             <div className='top'>

             <div className='productImageSide'>
                <div>
                  {
                    loading 
                    ? 
                    (
                    <div className='loadingImgWrapper'>
                        {
                          productImageListLoading.map((element, index) => {
                              return (
                                <div 
                                  key={index + "imageLoading"} 
                                  className='slideLoadingBox animate-pulse'
                                >
                                   <div className='loadBox'>
                                   </div>
                                </div>
                              )
                          })
                        }
                    </div>
                    )
                    :
                    (
                       <div className='slideImgWrapper'>
                           {
                            data?.productImage.map((image, index) => {
                                return (
                                      <div key={index + image} className='slideImgBox'>
                                          <img 
                                             src={image} 
                                             className='slideImg'
                                             onClick={() => handleMouseEnterProduct(image)}
                                             onMouseEnter={() => handleMouseEnterProduct(image)}
                                          />
                                      </div>
                                )
                            })
                           }
                       </div>
                    )
                  }
                </div>
                <div>
                   {
                    loading 
                    ? 
                    (
                    <div>
                       <div className='loadMainImg animate-pulse'></div>
                    </div>
                    ) 
                    :
                    (
                    <div>
                       <div className='mainImgBox'>
                          <img  
                            src={activeImage}
                            onMouseMove={handleZoomImage}
                            onMouseLeave={handleLeaveImageZoom}
                          />

                       </div>
                  
                       {/* Product Zoom Image */}
                       {
                        zoomImage && (
                          <div
                              className="productZoomImage w-full h-full  hidden lg:block"
                              style={{
                                backgroundImage: `url(${activeImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`,
                                backgroundSize: '200%',   
                                transition: 'background-position 0.1s ease'   
                              }}
                              onMouseMove={handleZoomImage}
                              onMouseLeave={() => setZoomImageCoordinate({ x: 0.5, y: 0.5 })}   
                        >
                        </div>
                        )
                       }
                    </div>
                    )
                   }
                </div>
            </div>
            {/*Product Details*/}
              {
                loading
                ? 
                (
                <div className='loadDetailsBox'>
                   <div className='loadBrandName animate-pulse'></div>
                   <div className='loadProductName animate-pulse'></div>
                   <div className='loadStarsBox animate-pulse'>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                   </div>
                   <div className='loadPriceBox animate-pulse'>
                    <div></div>
                    <div></div>
                   </div>
                   <div className='loadBtnBox animate-pulse'>
                     <button></button>
                     <button></button>
                   </div>
                   <div className='loadDescriptionBox animate-pulse'></div>
                </div>
                )
                :
                (
                 <div className='productDetailsSide'>
                        <p className='brandName'>Brand: {data?.brandName}</p>
                        <h2 className='productName'>{data?.productName}</h2>
                        <p className='productCategory'>Category: {data?.category}</p>
                        <div className='starsBox'>
                          <FaStar/>
                          <FaStar/>
                          <FaStar/>
                          <FaStar/>
                          <FaStarHalf/>
                        </div>
                        <div className='priceBox'>
                          <p className='selPrice'>{displayCurrency(data?.sellingPrice)}</p>
                          <p className='prevPrice'>{displayCurrency(data?.price)}</p>
                        </div>
                        <div className='btnBox'>
                          <button 
                            className='btn1'
                            onClick={(e) => handleBuyProduct(e, data?._id)}
                          >
                            Buy Now
                          </button>
                          <button 
                             className='btn2'
                             onClick={(e) => handleAddToBasket(e, data?._id)}
                          > 
                            Add To Basket
                          </button>
                        </div>
                        <div className='descriptionBox'>
                          <p>Description:</p>
                          <p className='prodDescription'>{data?.description}</p>
                        </div>
                  </div>
                )
              }
       
             </div>
              <div className='wise'>
              {
                data?.category && (
                  <DisplayProductByCategory category={data?.category} heading={"Recomended Product's"}/>
                )
              }
              </div>
         </div>
    </div>
  )
}

export default ProductDetail