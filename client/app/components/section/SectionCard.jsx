import Link from 'next/link';
import React from 'react'

const SectionCard = ({ image, category, ProId, title, fit, price, sale_rate, onWishlistClick, isInWishlist }) => {
   const [loading, setLoading] = React.useState(true)
   return (
      <div
         key={ProId}
         className="w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] xl:w-[15vw] bg-white rounded-lg shadow-md flex-shrink-0"
      >
         <div className=" cursor-pointer rounded-lg flex flex-col relative">
            <button
               onClick={onWishlistClick}
               className={`absolute top-0 right-0 m-1 bg-slate-50 rounded-2xl p-1 focus:outline-none ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </button>
            <Link href={`/products/${ProId}`}>
               <img src={image} onLoad={() => setLoading(false)} alt={title} className={`${loading && "hidden"} w-full h-48 sm:h-64 object-cover`} />
               {(!image || loading) && <div
                  role="status"
                  className="flex items-center justify-center w-full h-48 sm:h-64 bg-gray-300 animate-pulse"
               >
                  <svg
                     className="w-10 h-10 text-gray-200"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 20 18"
                  >
                     <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
               </div>}
            </Link>
            <div className="py-4 px-2">
               <Link href={`/products/${ProId}`}>
                  <div className="flex justify-between items-center mb-2 space-x-2">
                     <span className={`${!category && "h-3 md:h-4 w-2/5 animate-pulse"} bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0`}>
                        {category}
                     </span>
                     <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
                        Shop Now
                     </button>
                  </div>
                  <h3 className={`${!title && "h-3 md:h-4 animate-pulse bg-slate-200"} mt-2 text-sm sm:text-lg font-semibold truncate`}>{title}</h3>
               </Link>
               <div className='flex justify-between'>
                  <Link href={`/products/${ProId}`} className='w-full'>
                     <p className={`${!fit && "animate-pulse h-2 md:h-3 w-full bg-slate-200 mt-1"} text-xs sm:text-sm text-gray-600 truncate`}>{fit}</p>
                     <p className={`${!fit && "animate-pulse h-3 md:h-4 w-4/5 bg-slate-200 mt-1 text-slate-200"} text-xs sm:text-sm text-gray-600`}>Price • <span className='line-through'>AED {price}</span> &bull; <strong>AED {sale_rate}</strong></p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
export default SectionCard