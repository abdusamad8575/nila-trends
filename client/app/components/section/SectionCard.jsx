import Link from 'next/link';
import React from 'react'

const SectionCard = ({ image, category, ProId, title, fit, price}) => {

   return (
      <div
      key={ProId}
      className="w-[50vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] xl:w-[15vw] bg-white rounded-lg shadow-md flex-shrink-0"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer">
         <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" />
         <div className="p-4">
            <div className="flex justify-between items-center mb-2 space-x-2">
               <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
                  {category}
               </span>
               <Link href={`/products/${ProId}`}>
                  <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
                     Shop Now
                  </button>
               </Link>
            </div>
            <h3 className="mt-2 text-sm sm:text-lg font-semibold">{title}</h3>
            {/* <p className="text-xs sm:text-sm text-gray-600">Fit • {fit}</p> */}
            <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
            <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
         </div>
         </div>
      </div>
   );
}
export default SectionCard