'use client';
import { useState } from "react";
import FashionHero from "./components/banner";
import ModalLayout from "./components/common/ModalLayout";
import WardrobeSection from "./components/homecontact";
import JewelryShop from "./components/lookbook";
import Lookbook from "./components/products";
import SimilarStores from "./components/similar-products";
import Cart from "./cart/page";


export default function Home() {

  // const [open , setOpen]= useState(true);

  return (
    <div>
    <FashionHero/>
    <JewelryShop/>
   
      <Lookbook/>
  
    <SimilarStores/>
    <WardrobeSection/>
    {/* <ModalLayout open={open} setOpen={setOpen} children={<Cart/>}/> */}
    </div>
   
  );
}
