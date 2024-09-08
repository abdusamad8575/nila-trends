'use client';
import FashionHero from "./components/banner";
import WardrobeSection from "./components/homecontact";
import JewelryShop from "./components/lookbook";
import Lookbook from "./components/products";

export default function Home() {

  return (
    <div>
      <FashionHero />
      <Lookbook />
      <JewelryShop />
      <WardrobeSection />
    </div>

  );
}
