import FashionHero from "./components/banner";
import WardrobeSection from "./components/homecontact";
import JewelryShop from "./components/lookbook";
import Lookbook from "./components/products";
import SimilarStores from "./components/similar-products";


export default function Home() {
  const heading = [
    { title: 'CLASSIC KURTIS',subtitle:'kjfdlk' },
    { title: 'CLASSIC KURTI SETS', subtitle:'kdjslkf'},
    { title: 'STELLAR SAREES',subtitle:'fkdlskjl' },
  ];
  return (
    <div>
    <FashionHero/>
    <JewelryShop/>
   
      <Lookbook/>
  
    <SimilarStores/>
    <WardrobeSection/>
    </div>
   
  );
}
