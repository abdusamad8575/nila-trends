import React, { useEffect, useState } from 'react'
import SectionCard from './SectionCard';
import axios from 'axios';
import { Scheherazade_New } from 'next/font/google';

const scheherazade_New = Scheherazade_New({
   subsets: ['latin'],
   weight: '400',  // Specify the available weight
   display: 'swap',
})

const Index = () => {
   const [products, setProducts] = useState([]);
   const fetchProducts = async () => {
      try {
         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
         console.log('products-', data.docs);

         setProducts(data.products);
         setTotalPages(data.totalPages);
      } catch (error) {
         console.error('Error fetching products:', error.message);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   return (
      <>
         <div className="max-w-7xl mx-auto p-4 pt-6 md:mt-10">
            <h1 className={`${scheherazade_New.className} text-2xl md:text-3xl font-bold md:mb-2`}>Our Trending Products</h1>
            <p className="text-xs md:text-sm text-gray-600">OUR LATEST LOOKBOOK</p>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-4">
               {products?.map((product) => (
                  <SectionCard
                     key={product._id}
                     ProId={product._id}
                     image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
                     category={product?.category?.name}
                     title={product.name}
                     fit={product.fitAndCare[0] || 'Regular'}
                     price={product.sale_rate}
                  />
               ))}
            </div>
         </div>
         <div className="max-w-7xl mx-auto p-4 md:mt-10">
            <h1 className={`${scheherazade_New.className} text-2xl md:text-3xl font-bold md:mb-2`}>Nilaa&apos;s Exclusive Festive Wearings</h1>
            <p className="text-xs md:text-sm text-gray-600">OUR LATEST LOOKBOOK</p>

            <div className="flex overflow-x-auto space-x-4 scrollbar-hide py-4">
               {[...products].reverse().map((product) => (
                  <SectionCard
                     key={product._id}
                     ProId={product._id}
                     image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
                     category={product?.category?.name}
                     title={product.name}
                     fit={product.fitAndCare[0] || 'Regular'}
                     price={product.sale_rate}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default Index