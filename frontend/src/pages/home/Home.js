import React from 'react';
import CategoryList from '../category_product/CategoryList';
import BannerProduct from '../banner_product/BannerProduct';
import HorizontalCardProduct from '../horizontal_card_product/HorizontalCardProduct';
import VerticalCardProduct from '../vertical_card_product/VerticalCardProduct';

const Home = () => {
   return(
      <div>
         <CategoryList/>
         <BannerProduct/>
         <HorizontalCardProduct category={"bag"} heading={"Handbag"}/>
         <HorizontalCardProduct category={"wallet"} heading={"Wallet"}/>
         <HorizontalCardProduct category={"bracelet"} heading={"Bracelet"}/>
         <HorizontalCardProduct category={"necklace"} heading={"Necklaces"}/>
         <VerticalCardProduct category={"bracelet watch"} heading={"Bracelet Watch"}/>
         <VerticalCardProduct category={"ring"} heading={"Engagement Ring"}/>
         <VerticalCardProduct category={"earrings"} heading={"Earrings"}/>

      </div>
   )
}

export default Home