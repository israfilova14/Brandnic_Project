import React, { useContext } from 'react'
import displayCurrency from '../../helpers/DisplayCurrency'
import Context from '../../context';
import addToCart from '../../helpers/addToCart';
import { Link } from 'react-router-dom';
import scrollTop from '../../helpers/scrollTop';
import '../category_wise_product_display/CategoryWiseProductDisplay.css';

const VerticalCart = ({loading, data}) => {
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context);
    
      const handleAddToCart = async(e, id) => {
          await addToCart(e, id);
          fetchUserAddToCart()
      }
  return (
    <div className='productDisplayWrapper'>
        <div className='container'>
            <div className='productCardWrapper'>
                   {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div className='loadingCard' key={index}>
                                    <div className='loadingCardLeft'></div>
                                    <div className='loadingCardRight'>
                                    <div className='titlesBox'>
                                    </div>
                                    <div className='priceBox'>
                                        <p className='sellingPrice'></p>
                                        <p className='prevPrice'></p>
                                    </div>
                                    <div className='btnBox'>
                                        <button className='btn'></button>
                                        <button className='btn'></button>
                                    </div>
                                    <div className='titlesBox'>
                                    </div>
                            </div>
                        </div>
                        ))
                       ) 
                       : 
                       (
                        data.map((product, index) => (
                        <Link to={"/product/" + product?._id}>
                            <div 
                                className='productCard' 
                                key={product?.productName + index}
                                onClick={scrollTop}
                            >
                                <div className='imageBox'>
                                <img
                                    src={product?.productImage[0]}
                                    className='productImage mix-blend-multiply'
                                    alt={product?.productName}
                                />
                                </div>
                                <div className='aboutProduct'>
                                <h2>{product?.productName}</h2>
                                <p className='productCategory'>
                                    Category: {product?.category}
                                </p>
                                <div className='priceBox'>
                                    <p className='sellingPrice'>
                                    {displayCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className='prevPrice'>
                                    {displayCurrency(product?.price)}
                                    </p>
                                </div>
                                <div className='btnBox'>
                                    <button 
                                    className='basketBtn'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                    Add To Basket
                                    </button>
                                    <button className='wishlistBtn'>Add To Favorite</button>
                                </div>
                                </div>
                            </div>
                        </Link>
                        ))
                    )}
    </div>
             </div>
    </div>
 
  )
}

export default VerticalCart