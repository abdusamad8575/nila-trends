
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../ProductDetail.module.css';
import SimilarStores from '../../components/similar-products';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel } from 'antd';
import { Roboto, Roboto_Mono, Rochester } from 'next/font/google'
import ModalLayout from '../../components/common/ModalLayout';
import Link from 'next/link';
import axiosInstance from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../redux/actions/userActions';
import { setCheckoutProduct } from '../../../redux/actions/storeActions';
import toast from 'react-hot-toast';
import Review from '@/app/components/products/Review';
import Modal from '@/app/components/model';

const rochester = Rochester({
   subsets: ['latin'],
   weight: ['400',],
   display: 'swap',
})

const roboto_mono = Roboto_Mono({
   subsets: ['latin'],
   weight: '400',
   display: 'swap',
})

const roboto = Roboto({
   subsets: ['latin'],
   weight: '400',
   display: 'swap',
})

const ProductPage = () => {
   const userDetails = useSelector(state => state?.userDetails);
   const params = useParams();
   const router = useRouter();
   const { id } = params;
   const [open, setOpen] = useState(false)
   const [selected, setSelected] = useState(0)
   const [selectedSize, setSelectedSize] = useState()
   const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
   const [product, setProduct] = useState(null);
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(true)

   const [selectedCoupon, setSelectedCoupon] = useState(null);
   const [selectedCouponDetails, setSelectedCouponDetails] = useState(null);
   const [appliedMessage, setAppliedMessage] = useState('');
   const [availableCoupon, setAvailableCoupon] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleCheckout = () => {
      if (!userDetails) {
         router.push('/register');
      }
      if (selectedSize || product?.stock) {
         selectedSize ? dispatch(setCheckoutProduct({ product, selectedSize: selectedSize, coupon: selectedCouponDetails || null })) : dispatch(setCheckoutProduct({ product }))
         router.push('/checkout')
      } else {
         toast.error('please select size')
      }

   };
   const fetchProduct = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/client/${id}`)
         .then((response) => {
            setProduct(response.data);

            response?.data?.coupons && setAvailableCoupon(response?.data?.coupons)
            if (response?.data?.category?.coupons.length) {

               const newCoupons = response?.data?.category?.coupons || [];

               setAvailableCoupon((prevCoupons) => {
                  const combinedCoupons = [...prevCoupons, ...newCoupons];
                  const uniqueCoupons = Array.from(new Map(combinedCoupons.map(coupon => [coupon._id, coupon])).values());

                  return uniqueCoupons;
               });
            }
         })
         .catch((error) => {
            console.error('Error fetching product:', error);
         });
   }

   useEffect(() => {
      if (id) {
         fetchProduct()
      }
   }, [id]);

   if (!product) {
      return <div>Loading...</div>;
   }
   function generateWhatsAppLink() {
      const message = `Hi, I'm intrested in this product, ${product?.name}`
      const whatsappUrl = `https://wa.me/${971521193364}?text=${encodeURIComponent(message)}`;
      return whatsappUrl;
   }
   const handleSizeSelect = (size, index) => {
      setSelectedSize(size);
      setSelectedSizeIndex(index);

   };

   const addCartData = async (proId1) => {

      if (!userDetails) {
         router.push('/register');
      } else {
         try {
            const urlQuery = `/user/addToCart/${proId1}`;
            const payload = {
               size: selectedSize,
               coupon: selectedCoupon
            };
            const response = await axiosInstance.patch(urlQuery, payload);
            dispatch(setUserDetails(response?.data?.userData));

         } catch (error) {
            console.error('Error adding to cart:', error);
         }
      }
   };

   const handleAddToCartClick = (product) => {
      if (selectedSize || product?.stock) {
         addCartData(product?._id);
      } else {
         toast.error('please select size')
      }
   };
   const handleCouponSelect = (couponId) => {
      setSelectedCoupon(couponId);
      const coupon = availableCoupon.find(c => c._id === couponId);
      setSelectedCouponDetails(coupon)
      setAppliedMessage(`Coupon of ${coupon.discount}% applied successfully!`);
      setIsModalOpen(false);
   };

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button className={styles.backButton} onClick={() => router.back()}>← Back</button>
         </div>

         <div className={styles.mainContent} >
            <div className='lg:hidden'>
               <Carousel autoplay>
                  {product?.image?.map((img, index) => (
                     <div key={index} className='bg-red-100 border-rose-50 border-opacity-50 w-full h-[60vh] relative flex overflow-hidden justify-center' onClick={() => setSelected(index)}>
                        <img key={index} onLoad={() => setLoading(false)} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${img}`} alt={`${product?.name} ${index}`} className='absolute top-0 left-0 w-auto h-full min-w-full min-h-full object-cover' />
                        {loading && <div
                           role="status"
                           className="flex items-center justify-center absolute top-0 left-0 w-auto h-full min-w-full min-h-full bg-gray-300 animate-pulse"
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
                     </div>
                  ))}
               </Carousel>
            </div>
            {/* Text content */}
            <div className={styles.textSection}>
               <h2 className='text-xl md:text-3xl py-4 font-bold'>{product?.name}</h2>
               {/* <h3 className={styles.sectionTitle}>{product.brand}</h3> */}
               <p className='text-sm md:text-md'>{product?.subheading}</p>
               <ul className='text-sm md:text-md py-1 mb-3 md:mb-6'>
                  {product?.feature?.map((feature, index) => (
                     <li key={index}>{feature}</li>
                  ))}
               </ul>
               {product?.sizes?.length > 0 &&
                  <div className={`lg:hidden mb-2`}>
                     <h3>Select Size</h3>
                     <div className='flex gap-2'>
                        {product?.sizes.map((sizeObj, index) => (
                           sizeObj?.quantity > 0 && <button key={index} onClick={() => handleSizeSelect(sizeObj.sizes, index)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm  ${selectedSizeIndex === index
                              ? 'border-[#B17E3E]'
                              : 'hover:bg-gray-100'
                              }`}>{sizeObj.sizes?.toUpperCase()} </button>
                        ))}
                     </div>
                  </div>}
               <div>
                  <p className='text-green-600 text-xs md:text-sm'>&quot;Enjoy free delivery on your first order and on all purchases over AED 200! Don’t miss out—shop now and save big!&quot;</p>
               </div>
               {!!product?.variantProduct?.length && <h3 className={styles.sectionTitle}>Available Color & Texture</h3>}
               <div className='flex gap-2 pb-6'>
                  {product?.variantProduct?.map(item => (
                     <div key={item?._id} className='overflow-hidden w-14 h-14 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' onClick={() => router.push(`/products/${item?._id}`)}>
                        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.image?.[0]}`} height={50} width={100} alt={item?.name} />
                     </div>
                  ))}
               </div>
               <div >
                  <div className='flex relative h-12 justify-center md:justify-start'>
                     <h3 className={`${rochester.className} absolute text-2xl md:text-4xl`}>Nilaa Chronicles</h3>
                     <svg className='absolute' width="213" height="66" viewBox="0 0 213 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M212.5 0.5C212.5 0.5 191.5 25 156.75 25C137.094 25 102.84 19.5 65.5 19.5C36.8275 19.5 1 25 1 25" stroke="url(#paint0_linear_500_621)" />
                        <defs>
                           <linearGradient id="paint0_linear_500_621" x1="1" y1="12.75" x2="212.5" y2="12.75" gradientUnits="userSpaceOnUse">
                              <stop offset="0.697973" stop-color="#B7977E" />
                              <stop offset="1" stop-color="#E6E7EB" />
                           </linearGradient>
                        </defs>
                     </svg>
                  </div>
                  <p className={`${roboto_mono.className} text-xs md:text-base`}>{product?.description}</p>
               </div>
               <div className={styles.section}>
                  {!!product?.fitAndCare?.length && <h3 className={styles.sectionTitle}>Fit & Care</h3>}
                  {product?.fitAndCare?.map((fit, index) => (
                     <p key={index} className={styles.fitInfo}>{fit}</p>
                  ))}
               </div>
               <div className={styles.section}>
                  {!!product?.spec?.length && <h3 className={styles.sectionTitle}>Specifications</h3>}
                  {product?.spec?.map((spec, index) => (
                     <p key={index} className={styles.specInfo}>{spec}</p>
                  ))}
               </div>


               {availableCoupon?.length > 0 &&

                  <div className="flex flex-col">
                     <div className="flex items-center mb-2">
                        <span className="bg-yellow-400 text-black font-bold text-sm py-1 px-2 rounded mx-2">Coupon:</span>

                        {availableCoupon.length > 0 && !selectedCoupon && (
                           <div className="flex items-center mb-2">
                              <button onClick={() => setIsModalOpen(true)} className="text-green-600">
                                 Open Coupons
                              </button>
                           </div>
                        )}
                        {selectedCoupon && (
                           <div className="flex items-center">
                              <div className="w-5 h-5 flex items-center justify-center bg-green-500 rounded-full">
                                 <img
                                    src='https://static.vecteezy.com/system/resources/previews/011/858/556/original/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png'
                                    alt="Checkmark"
                                    width={16}
                                    height={16}
                                 />
                              </div>
                              <span className="ml-2 text-green-600">{appliedMessage}</span>
                           </div>
                        )}
                     </div>
                     <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        availableCoupons={availableCoupon}
                        onCouponSelect={handleCouponSelect}
                        selectedCoupon={selectedCoupon}
                     />
                  </div>
               }


            </div>






            {/* Desktop view images */}
            <div className='hidden bg-red-50 lg:flex flex-row gap-4 w-[100vh] h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh] relative'>
               <div className='bg-red-100 border-rose-50 border-opacity-50 w-4/6 h-full relative flex overflow-hidden justify-center'>
                  <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[selected]}`} className='absolute top-0 left-0 w-auto h-full min-w-full min-h-full object-cover' alt='...' />
               </div>
               <div className='h-full w-2/6 overflow-y-scroll overflow-x-hidden'>
                  <div className=' flex flex-col gap-3 w-full pr-2 '>

                     {product?.image?.map((img, index) => {
                        if (index === selected) return null
                        return (
                           <div key={index} className='bg-red-100 border-rose-50 border-opacity-50 w-full h-80 relative flex overflow-hidden justify-center' onClick={() => setSelected(index)}>
                              <img key={index} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${img}`} alt={`${product?.name} ${index}`} className='absolute top-0 left-0 w-auto h-full min-w-full min-h-full object-cover' />
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>
         </div>

         <div className="mb-36">
            {!!product?.similarProduct?.length && <SimilarStores similarProducts={product?.similarProduct} />}
            <Review data={product} />
         </div>

         <div className={`${styles.footer} flex justify-between bg-opacity-90 bg-white`}>
            {product?.sizes?.length > 0 ?
               (<div className={`hidden lg:block text-center`}>
                  <h3>Select Size</h3>
                  {/* <div className={styles.buttonGroup}>
                  {product?.sizes.map((sizeObj, index) => (
                     sizeObj?.quantity > 0 && <button key={index} onClick={() => handleSizeSelect(sizeObj.sizes, index)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm  ${selectedSizeIndex === index
                        ? 'border-[#B17E3E]'
                        : 'hover:bg-gray-100'
                        }`}>{sizeObj.sizes?.toUpperCase()} </button>
                  ))}
               </div> */}
                  <div className={styles.buttonGroup}>
                     {product.sizes.map((sizeObj, index) => {
                        let badge = null;

                        if (sizeObj.quantity < 5) {
                           badge = (
                              <span className="inline-block bg-red-500 text-white text-xs font-bold px-1 py-1 rounded mt-1">
                                 Only {sizeObj.quantity} left!
                              </span>
                           );
                        } else if (sizeObj.quantity < 10) {
                           badge = (
                              <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-1 py-1 rounded mt-1">
                                 Low Stock
                              </span>
                           );
                        }

                        return (
                           sizeObj?.quantity > 0 && <div key={index} className="flex flex-col items-center">
                              <button key={index} onClick={() => handleSizeSelect(sizeObj.sizes, index)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm  ${selectedSizeIndex === index
                                 ? 'border-[#B17E3E]'
                                 : 'hover:bg-gray-100'
                                 }`}>{sizeObj.sizes?.toUpperCase()} </button>
                              {badge}
                           </div>
                        );
                     })}
                  </div>
               </div>)
               :
               (
                  <div className={`hidden md:flex text-center`}>
                    {product?.stock && (
                      <>
                        <h3>Stock</h3>
                        {product.stock < 5 ? (
                          <span className="inline-block bg-red-500 text-white text-xs font-bold px-1 py-2 rounded mt-1">
                            Only {product.stock} left!
                          </span>
                        ) : product.stock < 10 ? (
                          <span className="inline-block bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded mt-1">
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mt-1">
                            In Stock
                          </span>
                        )}
                      </>
                    )}
                  </div>
                )}
            <div className={`hidden lg:block text-center`}>
               <h3>Delivery</h3>
               <p className="mt-2 text-sm">Delivery in 1 - 2 days &bull; All over UAE</p>
            </div>
            <div className={`hidden lg:block w-1/5 text-center`}>
               <h3>Fit & Care</h3>
               <p className="mt-2 text-sm truncate line-clamp-4">{product?.fitAndCare?.[0]} &bull; {product?.fitAndCare?.[1]}</p>
            </div>
            <div className={`hidden lg:block text-center`}>
               <h3>Flat {Math.round(((product?.price - product?.sale_rate) / product?.price) * 100)}% Off</h3>
               <p className="mt-2 text-sm"><span className='line-through'>AED {product?.price}</span> &bull; AED:{product?.sale_rate}</p>
            </div>

            {/* Price displayed only on mobile */}
            <div className={`block lg:hidden ${styles.mobilePrice}`}>
               <p className={`${roboto_mono.className} pb-2 text-xs sm:text-sm text-gray-600`}>Price • <span className='line-through'>AED {product?.price}</span> &bull; <strong>AED {product?.sale_rate}</strong></p>
            </div>

            <div className={`${roboto.className} flex items-center gap-2 text-sm md:text-md w-full lg:w-1/5`}>
               <button
                  // onClick={() => setOpen(true)}
                  onClick={() => handleAddToCartClick(product)}
                  className='flex w-1/2 justify-center items-center bg-[#333] text-white rounded-md p-2 md:p-3'>Add to Cart&nbsp;&nbsp;
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M3.875 0.125L13.25 0.125C13.4158 0.125 13.5747 0.190848 13.6919 0.308058C13.8092 0.425269 13.875 0.58424 13.875 0.75V10.125C13.875 10.4702 13.5952 10.75 13.25 10.75C12.9048 10.75 12.625 10.4702 12.625 10.125V2.25888L1.19194 13.6919C0.947864 13.936 0.552136 13.936 0.308058 13.6919C0.0639806 13.4479 0.0639806 13.0521 0.308058 12.8081L11.7411 1.375L3.875 1.375C3.52982 1.375 3.25 1.09518 3.25 0.75C3.25 0.404822 3.52982 0.125 3.875 0.125Z" fill="white" />
                  </svg>
               </button>
               <button onClick={handleCheckout} className='w-1/2 bg-[#AE9B84] text-white rounded-md p-2 md:p-3'>Shop Now</button>
            </div>
         </div>
         <ModalLayout open={open} setOpen={setOpen} bgcolor={'#fff'}>
            <div className='flex flex-col justify-center min-h-[30vh] gap-1'>
               <p className='pt-4 md:p-4 md:text-base font-semibold'>
                  Dear customer,<br />
                  We&apos;re almost ready! Our full eCommerce site will be live soon.
                  In the meantime, we&apos;re accepting orders via WhatsApp.
                  Click the button below to place your order directly with us on WhatsApp.
                  Thank you for your patience and support!
               </p>
               <Link className='w-full flex justify-center' target='_blank' href={generateWhatsAppLink()}>
                  <Image width={200} height={100} src={'/assets/whatsapp.png'} />
               </Link>
            </div>
         </ModalLayout>
      </div>

   );

};

export default ProductPage;

