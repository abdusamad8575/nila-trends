// import React from 'react';

// const SimilarStores = () => {
//   const products = [
//     {
//       id: 1,
//       image: '/assets/product1.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 2,
//       image: '/assets/product2.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 1,
//       image: '/assets/product1.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 2,
//       image: '/assets/product2.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 1,
//       image: '/assets/product1.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 2,
//       image: '/assets/product2.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 1,
//       image: '/assets/product1.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//     {
//       id: 2,
//       image: '/assets/product2.png',
//       title: 'Timeless A-line Evening Dress',
//       category: 'Womenswear',
//       price: '$109.99',
//     },
//   ];

//   return (
//     <div className="flex justify-center">
//       <div className="py-8 w-full md:w-auto">
//         <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Similar Stores</h2>
//         <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="min-w-[60%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[20%] bg-white rounded-lg shadow-md flex-shrink-0"
//             >
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-48 object-cover rounded-t-lg"
//               />
//               <div className="p-4">
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
//                   {product.category}
//                 </span>
//                 <h3 className="text-lg font-semibold">{product.title}</h3>
//                 <p className="text-gray-500">Fit•Ankle-length</p>
//                 <p className="text-gray-800 font-bold">{product.price}</p>
//                 <button className="mt-4 bg-transparent hover:bg-gray-200 text-black font-semibold py-2 px-4 border border-gray-300 rounded-full">
//                   Shop Now &rarr;
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimilarStores;



import React from 'react';
import { useRouter } from 'next/navigation';
import { Roboto, Roboto_Mono } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',  // Specify the available weight
  display: 'swap',
})
const SimilarStores = ({ similarProducts }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="py-8 w-full md:w-auto">
        <h2 className={`${roboto.className} text-2xl font-semibold mb-4`}>Similar Stories</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-4">
          {similarProducts?.map((product) => (
            <div
              key={product.id}
              className="min-w-[60%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[20%] bg-white rounded-lg shadow-md flex-shrink-0"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[0]}`}
                alt={product.image[0]}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                  {product.name}
                  {/* {product.category} */}
                </span>
                <h3 className="text-sm md:text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500 text-sm">{product.fitAndCare[0]}</p>
                <p className="text-gray-800 font-bold text-sm">Price &bull; AED {product.price}</p>
                <button
                  className="flex items-center bg-[#AE9B84] text-white rounded-md p-2 mt-4 hover:bg-gray-200 py-2 px-4 text-xs"
                  onClick={() => router.push(`/products/${product?._id}`)}
                >
                  Shop Now&nbsp;&nbsp;
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.875 0.125L13.25 0.125C13.4158 0.125 13.5747 0.190848 13.6919 0.308058C13.8092 0.425269 13.875 0.58424 13.875 0.75V10.125C13.875 10.4702 13.5952 10.75 13.25 10.75C12.9048 10.75 12.625 10.4702 12.625 10.125V2.25888L1.19194 13.6919C0.947864 13.936 0.552136 13.936 0.308058 13.6919C0.0639806 13.4479 0.0639806 13.0521 0.308058 12.8081L11.7411 1.375L3.875 1.375C3.52982 1.375 3.25 1.09518 3.25 0.75C3.25 0.404822 3.52982 0.125 3.875 0.125Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarStores;

