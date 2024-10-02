import { Filter, Search } from 'lucide-react';
import { useState } from 'react';
import StarRating from './StarRating';

export default function Filters({ search, handleSearchChange }) {
   const [isDropdownOpen, setDropdownOpen] = useState(false);
   const [price, setPrice] = useState(1000);

   const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
   };

   return (
      <div className='relative flex flex-col w-full gap-2'>
         <div className='flex'>
            <button
               id="dropdownDefault"
               onClick={toggleDropdown}
               className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg">
               <Filter size={16} className="mr-2" />
               <span className="text-xs sm:text-sm">Filter</span>
            </button>
            <div className="flex-grow relative">
               <input
                  type="text"
                  placeholder="Kurta Sets"
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-r-lg text-xs sm:text-sm"
               />
               <Search size={20} className="absolute right-2.5 sm:right-3 top-2.5 text-gray-400" />
            </div>
         </div>

         <div
            id="dropdown"
            className={`z-10 overflow-hidden transition-height duration-300 pop ${isDropdownOpen ? 'max-h-[100vh] opacity-1  p-4' : 'max-h-[1px] opacity-0'} w-full bg-[#e9ded0] rounded-lg shadow`}
         >
            <div className='flex gap-4 flex-col sm:flex-row'>
               <div className='sm:w-1/4'>
                  <h6 className="mb-3 text-sm font-medium text-gray-900">Category</h6>
                  <ul className=" text-sm" aria-labelledby="dropdownDefault">
                     {Array(8).fill().map((x, index) =>
                        <li className="flex items-center mt-2">
                           <input
                              id={`checkbox${index}`}
                              type="checkbox"
                              name="category"
                              className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                           />
                           <label htmlFor={`checkbox${index}`} className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900">
                              category {index}
                           </label>
                        </li>)}
                  </ul>
               </div>
               <div className='sm:w-2/4'>
                  <div className='w-full mb-8'>
                     <h6 className="mb-2 text-sm font-medium text-gray-900">Price</h6>
                     <ul className=" text-sm" aria-labelledby="dropdownDefault">
                        <div className="relative">
                           <label htmlFor="price-range-input" className="sr-only">Default range</label>
                           <input
                              id="price-range-input"
                              type="range"
                              value={price}
                              min="10"
                              max="1500"
                              onChange={(e) => setPrice(e.target.value)}
                              className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                           />
                           <span className="text-sm text-gray-500 absolute start-0 -bottom-6">Min (AED 10)</span>
                           <span className="text-sm text-gray-500 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">{`AED ${price}`}</span>
                           <span className="text-sm text-gray-500 absolute end-0 -bottom-6">Max (AED 1500)</span>
                        </div>
                     </ul>
                  </div>
                  <div className='w-full'>
                     <h6 className="mb-2 text-sm font-medium text-gray-900">Discount</h6>
                     <ul className=" text-sm" aria-labelledby="dropdownDefault">
                        {[0, 10, 25, 50, 70].map(item => <li className="flex items-center mb-1">
                           <input
                              id={`disc${item}`}
                              type="radio"
                              defaultChecked={!item}
                              name="discount"
                              className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                           />
                           <label htmlFor={`disc${item}`} className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900">
                              {item ? `${item}% and more` : 'All'}
                           </label>
                        </li>)}
                     </ul>
                  </div>
               </div>
               <div className='sm:w-1/4'>
                  <h6 className="mb-3 text-sm font-medium text-gray-900">Customer Reviews</h6>
                  <ul className=" text-sm" aria-labelledby="dropdownDefault">
                     {Array(5).fill().map((x, index) =>
                        <li className="flex items-center mt-2">
                           <input
                              id={`radio${index}`}
                              type="radio"
                              name="rating"
                              className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                           />
                           <label htmlFor={`radio${index}`} className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900">
                              {index ? <><StarRating rating={5 - index} /> & up</> : 'All ratings'}
                           </label>
                        </li>
                     )}
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
