
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
import { setCheckout } from '../../../redux/actions/storeActions';
import { setCheckoutProduct } from '../../../redux/actions/storeActions';
import toast from 'react-hot-toast';
import Review from '@/app/components/products/Review';

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
   const [selectedColor, setSelectedColor] = useState(0)
   const [product, setProduct] = useState(null);
   const dispatch = useDispatch()
   // const handleCheckout = () => dispatch(setCheckout(true))
   const handleCheckout = () => {
      if (!userDetails) {
         router.push('/register');
      }
      if (selectedSize || product?.stock) {
         selectedSize ? dispatch(setCheckoutProduct({ product, selectedSize: selectedSize })) : dispatch(setCheckoutProduct({ product }))
         dispatch(setCheckout(true))
      } else {
         toast.error('please select size')
      }

   };
   const fetchProduct = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/client/${id}`)
         .then((response) => {
            setProduct(response.data);
            console.log(response.data);

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
            const response = await axiosInstance.patch(urlQuery, { size: selectedSize });
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
   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <button className={styles.backButton} onClick={() => router.back()}>← Back</button>
         </div>

         <div className={styles.mainContent} >
            <div className='md:hidden'>
               <Carousel autoplay>
                  {product?.image?.map((img, index) => (
                     <div key={index} className='bg-red-100 border-rose-50 border-opacity-50 w-full h-[60vh] relative flex overflow-hidden justify-center' onClick={() => setSelected(index)}>
                        <img key={index} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${img}`} alt={`${product?.name} ${index}`} className='absolute top-0 left-0 w-auto h-full min-w-full min-h-full object-cover' />
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
                  <div className={`md:hidden ${styles.footerSection}`}>
                     <h3>Select Size</h3>
                     <div className=''>
                        {product?.sizes.map((sizeObj, index) => (
                           sizeObj?.quantity > 0 && <button key={index} onClick={() => handleSizeSelect(sizeObj.sizes, index)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm  ${selectedSizeIndex === index
                              ? 'border-[#B17E3E]'
                              : 'hover:bg-gray-100'
                              }`}>{sizeObj.sizes?.toUpperCase()} </button>
                        ))}
                     </div>
                  </div>}
               <div>
                  <p className='text-green-600 text-sm'>Free delivery on your first order</p>
               </div>
               {!!product?.variantProduct?.length && <h3 className={styles.sectionTitle}>Available Color & Texture</h3>}
               <div className='flex gap-2 pb-6'>
                  {product?.variantProduct?.map(item => (
                     <div className='overflow-hidden w-14 h-14 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' onClick={() => router.push(`/products/${item?._id}`)}>
                        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.image?.[0]}`} height={50} width={100} alt={item?.name}/>
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
            </div>

            {/* Desktop view images */}
            <div className='hidden bg-red-50 md:flex flex-row gap-4 w-[100vh] h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[60vh] relative'>
               <div className='bg-red-100 border-rose-50 border-opacity-50 w-4/6 h-full relative flex overflow-hidden justify-center'>
                  <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[selected]}`} className='absolute top-0 left-0 w-auto h-full min-w-full min-h-full object-cover' alt='...' />
               </div>
               <div className='h-full w-2/6 overflow-y-scroll overflow-x-hidden custom-scrollbar'>
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

         <div className={`${styles.footer} bg-opacity-80 bg-white`}>
            {product?.sizes?.length > 0 && <div className={`hidden md:block ${styles.footerSection}`}>
               <h3>Select Size</h3>
               <div className={styles.buttonGroup}>
                  {product?.sizes.map((sizeObj, index) => (
                     sizeObj?.quantity > 0 && <button key={index} onClick={() => handleSizeSelect(sizeObj.sizes, index)} className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm  ${selectedSizeIndex === index
                        ? 'border-[#B17E3E]'
                        : 'hover:bg-gray-100'
                        }`}>{sizeObj.sizes?.toUpperCase()} </button>
                  ))}
               </div>
            </div>}
            {/* <div className={`hidden md:block ${styles.footerSection}`}>
                    <h3>Select Color & Texture</h3>
                    <div className={styles.colorOptions}>
                        <button className={`${styles.colorButton} ${styles.selectedColor}`} />
                        <button className={styles.colorButton} />
                        <button className={styles.colorButton} />
                    </div>
                </div> */}
            <div className={`hidden md:block ${styles.footerSection}`}>
               <h3>Delivery</h3>
               <p className={styles.deliveryInfo}>Delivery in 3 - 7 days &bull; All over UAE</p>
            </div>
            <div className={`hidden md:block ${styles.footerSection}`}>
               <h3>Fit & Care</h3>
               <p className={styles.fitInfoFooter}>{product?.fitAndCare?.[0]} &bull; {product?.fitAndCare?.[1]}</p>
            </div>
            <div className={`hidden md:block ${styles.footerSection}`}>
               <h3>Flat {Math.round(((product?.price - product?.sale_rate) / product?.price) * 100)}% Off</h3>
               <p className={styles.fitInfoFooter}><span className='line-through'>AED {product?.price}</span> &bull; AED:{product?.sale_rate}</p>
            </div>

            {/* Price displayed only on mobile */}
            <div className={`block md:hidden ${styles.mobilePrice}`}>
               <p className={`${roboto_mono.className} pb-2 text-xs sm:text-sm text-gray-600`}>Price • <span className='line-through'>AED {product?.price}</span> &bull; <strong>AED {product?.sale_rate}</strong></p>
            </div>

            <div className={`${roboto.className} flex items-center gap-2 text-sm md:text-md w-full md:w-1/5`}>
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

