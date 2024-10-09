"use client";
import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axios';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/actions/userActions';
import toast from 'react-hot-toast';
import Image from 'next/image';

function RightBox({ product }) {
   const dispatch = useDispatch();
   const userDetails = useSelector(state => state?.userDetails);
   const router = useRouter()
   const [selectedSize, setSelectedSize] = useState(null);
   const [loading, setLoading] = useState(true)
   const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
   const [isInStock, setIsInStock] = useState(true);
   const [isAdded, setIsAdded] = useState(false);

   const addCartData = async (proId1) => {
      if (!userDetails) {
         router.push('/register');
      } else {
         try {
            const urlQuery = `/user/addToCart/${proId1}`;
            const response = await axiosInstance.patch(urlQuery, { size: selectedSize });
            dispatch(setUserDetails(response?.data?.userData));
         } catch (error) {
            console.error('Error adding to cart:', error);
         }
      }
   };

   const handleSizeSelect = (e, size, index) => {
      e.stopPropagation()
      setSelectedSize(size);
      setSelectedSizeIndex(index);
      const selectedSizeData = product?.sizes?.find((s) => s.sizes === size);
      setIsInStock(selectedSizeData?.quantity > 0);
   };
   const handleAddToCartClick = (e, product) => {
      e.stopPropagation()
      if (selectedSize || product?.stock) {
         addCartData(product?._id);
         setIsAdded(true)
      } else {
         toast.error('please select size')
      }
   };

   useEffect(() => {
      setIsAdded(false);
   }, [product]);

   return (
      <div className="lg:col-span-4 side-item hidden md:block cursor-pointer" onClick={() => router.push(`/products/${product?._id}`)}>
         <div className="sticky top-24 bg-white rounded-lg overflow-y-scroll h-[85vh] shadow-md px-4 pb-4">
            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image?.[0]}`} alt={product?.name} style={{ display: loading ? 'none' : 'block' }}
               onLoad={() => setLoading(false)} className="w-full h-[50vh] object-cover mb-4" />
            {(!product?.image?.[0] || loading) && <div
               role="status"
               className="flex items-center justify-center w-full h-[50vh] mb-4 bg-gray-300 animate-pulse"
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
            <h2 className={`${!product?.name && "animate-pulse w-4/5 h-5 bg-gray-200"} mb-2 text-sm sm:text-lg font-semibold`} >{product?.name}</h2>

            {product?.feature?.map((fea, index) => (
               < p key={index} className="text-xs sm:text-sm text-gray-600 mb-1">{fea}</p>
            ))}
            <p className={`${!product?.price && "animate-pulse w-full h-2 bg-gray-200 text-white"} mt-4 mb-2 font-semibold `}></p>
            <p className={`${!product?.price && "animate-pulse w-full h-5 bg-gray-200 text-gray-200"} mt-4 mb-2 font-semibold `}>Price • <span className='line-through'>AED {product?.price}</span> &bull; <>AED {product?.sale_rate}</></p>

            <div className="flex justify-between mb-4">
               <button
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center text-xs sm:text-sm 
            ${isAdded ? 'bg-green-500 text-white' : 'bg-black text-white'}`
                  }
                  onClick={(e) => handleAddToCartClick(e, product)}
               >
                  <ShoppingCart size={16} className="mr-2 z-10" />
                  {isAdded ? 'Added to Cart' : 'Add to Cart'}
               </button>
               <button className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">Shop Now</button>
            </div>
            {product?.sizes?.length > 0 && <div className="mb-4">
               <h3 className="text-sm sm:text-lg font-semibold mb-2">Available Size</h3>
               <div className="flex space-x-2">
                  {product?.sizes?.map((sizeObj, index) => (
                     sizeObj?.quantity > 0 && <button className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm ${selectedSizeIndex === index
                        ? 'border-[#B17E3E]'
                        : 'hover:bg-gray-100'
                        }`} key={index}
                        onClick={(e) => handleSizeSelect(e, sizeObj?.sizes, index)}
                     >
                        {console.log('sizeObj?.quantity', sizeObj?.quantity)}
                        {sizeObj?.sizes}
                     </button>
                  ))}
               </div>
            </div>}
            <div className="mb-4">
               {!!product?.variantProduct?.length && <h3 className="text-sm sm:text-lg font-semibold mb-2">Available Color & Texture</h3>}
               <div className="flex space-x-2">
                  {product?.variantProduct?.map(item => (
                     <div key={item?._id} className='overflow-hidden w-14 h-14 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' onClick={() => router.push(`/products/${item?._id}`)}>
                        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.image?.[0]}`} height={50} width={100} alt={item?.name} />
                     </div>
                  ))}
               </div>
            </div>
            <div>
               {!!product?.fitAndCare?.length && <h3 className="text-sm sm:text-lg font-semibold mb-2">Fit & Care</h3>}
               {product?.fitAndCare?.map((fit, index) => (
                  <p key={index} className="text-xs sm:text-sm text-gray-600">{fit}</p>
               ))}
            </div>
         </div>
      </div >
   );
}

export default RightBox;