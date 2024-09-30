import Link from 'next/link';
import React from 'react'

const SectionCard = ({ image, category, ProId, title, fit, price, sale_rate, onWishlistClick, isInWishlist }) => {

   return (
      <div
         key={ProId}
         className="w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] xl:w-[15vw] bg-white rounded-lg shadow-md flex-shrink-0"
      >
         <div className="overflow-hidden cursor-pointer rounded-lg flex flex-col relative">
            <button
               onClick={onWishlistClick}
               className={`absolute top-0 right-0 m-1 bg-slate-50 rounded-2xl p-1 focus:outline-none ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </button>
            <Link href={`/products/${ProId}`}>
               <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" />
            </Link>
            <div className="p-4">
               <Link href={`/products/${ProId}`}>
                  <div className="flex justify-between items-center mb-2 space-x-2">
                     <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
                        {category}
                     </span>
                     <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
                        Shop Now
                     </button>
                  </div>
                  <h3 className="mt-2 text-sm sm:text-lg font-semibold">{title}</h3>
               </Link>
               <div className='flex justify-between'>
                  <Link href={`/products/${ProId}`}>
                     <div>
                        <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Price • <span className='line-through'>AED {price}</span> &bull; <strong>AED {sale_rate}</strong></p>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
export default SectionCard