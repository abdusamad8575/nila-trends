import Link from 'next/link';
import React, { useState } from 'react'
import { Carousel } from 'antd';

const ProductCard = ({ images, category, ProId, title, fit, price, sale_rate, onClick, onWishlistClick, isInWishlist }) => {
   const [autoplay, setAutoplay] = useState(false);
   const [loading, setLoading] = useState(images?.map(() => true));

   const handleImageLoad = (index) => {
      setLoading((prevLoading) =>
         prevLoading.map((status, i) => (i === index ? false : status))
      );
   };
   return (
      <>
         <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-md cursor-pointer flex-col relative" onMouseEnter={() => setAutoplay(true)} onMouseLeave={() => setAutoplay(false)}>
            <button
               onClick={onWishlistClick}
               className={`absolute top-0 right-0 m-1 bg-slate-50 rounded-2xl p-1 z-10 focus:outline-none ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </button>
            {images?.length ? (
               <Carousel
                  autoplay={autoplay}
                  autoplaySpeed={1000}
                  onMouseEnter={() => setAutoplay(true)}
                  onMouseLeave={() => setAutoplay(false)}
               >
                  {images?.map((image, index) => (
                     <div key={image} className="w-full h-48 sm:h-64">
                        {loading[index] && (
                           <div
                              role="status"
                              className="flex items-center justify-center w-full h-full bg-gray-300 animate-pulse"
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
                           </div>
                        )}
                        <img
                           src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`}
                           alt={title}
                           className="w-full h-full object-cover"
                           style={{ display: loading[index] ? 'none' : 'block' }}
                           onLoad={() => handleImageLoad(index)}
                           onClick={onClick}
                           onMouseEnter={() => setAutoplay(true)} 
                           onMouseLeave={() => setAutoplay(false)}
                        />
                     </div>
                  ))}
               </Carousel>
            ) : (
               <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
               >
                  <div className="flex items-center justify-center w-full h-48 sm:h-64 bg-gray-300 rounded sm:w-96">
                     <svg
                        className="w-10 h-10 text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                     >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                     </svg>
                  </div>
               </div>
            )}
            <div className="p-4">
               <div className="flex justify-between items-center mb-2 space-x-2" onClick={onClick}>
                  <span className={`${!category && "animate-pulse w-1/3"} h-5 bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0`}>
                     {category}
                  </span>
                  <Link href={`/products/${ProId}`}>
                     <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
                        Shop Now
                     </button>
                  </Link>
               </div>
               <h3 className={`${!title && "animate-pulse w-4/5 h-5 bg-gray-200"} mt-2 text-sm sm:text-lg font-semibold truncate`} onClick={onClick}>{title}</h3>
               <div onClick={onClick} className='flex flex-col gap-1'>
                  <p className={`${!fit && "animate-pulse w-full h-3 mt-2 bg-gray-200"} text-xs sm:text-sm text-gray-600 truncate`}>{fit}</p>
                  <p className={`${!price && "animate-pulse w-full h-3 pt-2 bg-gray-200 text-white"} text-xs sm:text-sm`}>Price • <span className='line-through'>AED {price}</span> &bull; <strong>AED {sale_rate}</strong></p>
               </div>
            </div>
         </div>
         <div className="md:hidden bg-white rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col relative" onClick={onClick}>
            <button
               onClick={onWishlistClick}
               className={`absolute top-0 right-0 m-1 bg-slate-50 rounded-2xl p-1 z-10 focus:outline-none ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </button>
            <Link href={`/products/${ProId}`}>
               {images?.length ? (
                  <Carousel
                     autoplay={autoplay}
                     autoplaySpeed={1000}
                     onMouseEnter={() => setAutoplay(true)}
                     onMouseLeave={() => setAutoplay(false)}
                  >
                     {images?.map((image, index) => (
                        <div key={image} className="w-full h-48 sm:h-64">
                           {loading[index] && (
                              <div
                                 role="status"
                                 className="flex items-center justify-center w-full h-full bg-gray-300 animate-pulse"
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
                              </div>
                           )}
                           <img
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`}
                              alt={title}
                              className="w-full h-full object-cover"
                              style={{ display: loading[index] ? 'none' : 'block' }}
                              onLoad={() => handleImageLoad(index)}
                              onClick={onClick}
                           />
                        </div>
                     ))}
                  </Carousel>
               ) : (
                  <div
                     role="status"
                     className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                  >
                     <div className="flex items-center justify-center w-full h-48 sm:h-64 bg-gray-300 rounded sm:w-96">
                        <svg
                           className="w-10 h-10 text-gray-200"
                           aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg"
                           fill="currentColor"
                           viewBox="0 0 20 18"
                        >
                           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                     </div>
                  </div>
               )}
               <div className="py-3 px-1">
                  <div className="flex justify-between items-center mb-2 space-x-2">
                     <span className={`${!category && "animate-pulse w-1/2"} h-4 bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0`}>
                        {category}
                     </span>
                     <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
                        Shop Now
                     </button>
                  </div>
                  <h3 className={`${!title && "animate-pulse w-4/5 h-4 bg-gray-200"} mt-2 text-sm sm:text-lg font-semibold truncate`} >{title}</h3>
                  <p className={`${!fit && "animate-pulse w-full h-3 mt-2 bg-gray-200"} text-xs sm:text-sm text-gray-600 truncate`}>{fit}</p>
                  <p className={`${!price && "animate-pulse w-full h-3 mt-2 bg-gray-200 text-white"} text-xs sm:text-sm`}>Price • <span className='line-through'>AED {price}</span> &bull; <strong>AED {sale_rate}</strong></p>
               </div>
            </Link>
         </div>
      </>
   )
};

export default ProductCard
