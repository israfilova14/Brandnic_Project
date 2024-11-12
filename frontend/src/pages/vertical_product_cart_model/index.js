import React, { useContext } from 'react';
import '../vertical_product_cart_model/style.css';
import Context from '../../context';
import displayCurrency from '../../helpers/DisplayCurrency';
import '../display_product_by_category/style.css';
import addToBasket from '../../helpers/addToBasket';
import addToFavorite from '../../helpers/addToFavorite';
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";

const VerticalProductCartModel = ({loading, data}) => {

    const loadingList = new Array(12).fill(null);
    const context = useContext(Context);
    
    const handleAddToBasket = async (e, id) => {
        await addToBasket(e, id);
        context.fetchUserBasketProductCount();
      }
    
      const handleAddToFavorite = async (e, id) => {
        await addToFavorite(e, id);
        context.fetchUserFavoriteProductCount();
      }
  return (
    <div className='displayProductWrapper'>
    <div className='container'>
      <div className='wrapper scrollbar-none'>
        {loading && data.length !== 0 ? (
          loadingList.map((_, index) => (
            <div className='loadingCart' key={index}>
              <div className='loadingCartLeft'></div>
              <div className='loadingCartRight'>
                <div className='titleBox'></div>
                <div className='pricesBox'>
                  <p className='sellingPrice'></p>
                  <p className='prevPrice'></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          data.map((element) => (
            <div className='productCart' key={element._id}>
              <div className='imageBox'>
                <img src={element?.productImage[0]} alt={element?.productName} />
              </div>
              <div className='aboutProductCart'>
                <p className='productName'>{element?.productName}</p>
                <p className='brandName'>Brand name: {element?.brandName}</p>
                <p className='productCategory'>Category: {element?.category}</p>
                <div className='priceBox'>
                  <p className='productPrice'>{displayCurrency(element?.price)}</p>
                  <p className='prevPrice'>{displayCurrency(element?.sellingPrice)}</p>
                </div>
                <div className='iconsBox'>
                  <FaShoppingCart className='basket_' onClick={(e) => handleAddToBasket(e, element._id)} />
                  <MdOutlineFavorite className='favorite_' onClick={(e) => handleAddToFavorite(e, element._id)} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

export default VerticalProductCartModel