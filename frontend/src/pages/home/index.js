import React from 'react';
import ProductCategory from '../product_category';
import BannerProduct from '../banner_product';
import HorizontalCardProduct from '../product_carousel/horizontal_card_product';
import VerticalCardProduct from '../product_carousel/vertical_card_product';
 

const Home = () => {
   return(
      <div>
         <ProductCategory/>
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