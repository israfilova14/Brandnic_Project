import React, { useContext, useEffect, useRef, useState } from 'react';
import '../horizontal_card_product/style.css';
import fetchCategoryWiseProduct from '../../../helpers/fetchCategoryWiseProduct';
import displayCurrency from '../../../helpers/DisplayCurrency';
import { GrFormPrevious } from 'react-icons/gr';
import { GrFormNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Context from '../../../context';
import addToBasket from '../../../helpers/addToBasket';
import addToFavorite from '../../../helpers/addToFavorite';
 

const HorizontalCardProduct = ({ category, heading }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef(null);
  const context = useContext(Context);

  const handleAddToBasket = async(e, id) => {
    await addToBasket(e, id);
    context.fetchUserBasketProductCount();
  }

  const handleAddToFavorite = async(e, id) => {
    await addToFavorite(e, id);
    context.fetchUserFavoriteProductCount();
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setData(categoryProduct?.data);
    setLoading(false); // Set loading to false after data is fetched
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 320;
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 320;
    }
  };

  return (
    <div className='horizontalCardWrapper'>
      <div className='container'>
        <h2>{heading}</h2>
        <div className='iconsBox'>
          <button className='nextIcon' onClick={scrollRight}>
            <GrFormNext />
          </button>
          <button className='prevIcon' onClick={scrollLeft}>
            <GrFormPrevious />
          </button>
        </div>
        <div className='productCardWrapper scrollbar-none' ref={scrollElement}>
          {loading ? (
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
          ) : (
            data.map((product, index) => (
              <Link to={'product/' + product?._id}>
              <div className='productCard' key={product?.productName + index}>
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
                      onClick={(e) => handleAddToBasket(e, product._id)}
                    >
                      Add To Basket
                    </button>
                    <button
                     className='wishlistBtn'
                     onClick={(e) => handleAddToFavorite(e, product._id)}
                    >
                      Add To Favorite
                    </button>
                  </div>
                </div>
              </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
