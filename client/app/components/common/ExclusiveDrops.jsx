import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import goldenPop from '../../../public/assets/goldenPoper.png'
import ExclusiveDropsTittle from '../../../public/assets/ExclusiveDropsTittle.png'
import { motion } from 'framer-motion'
import CountDown from './CountDown'
import axiosInstance from '../../../axios'
import { Carousel } from 'antd'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
   weight: '400',
   subsets: ['latin'],
   display: 'swap',
})

const ExclusiveDrops = () => {
   const [data, setData] = useState([])
   const [copied, setCopied] = useState(null);

   const colors = ['bg-violet-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-red-400'];

   const fetchData = async () => {
      try {
         const { data } = await axiosInstance.get(`/coupons/client`);
         setData(data?.data);
      } catch (error) {
         console.error('Error:', error.message);
      }
   };

   useEffect(() => {
      fetchData()
   }, []);

   const handleCopy = (code) => {
      navigator.clipboard.writeText(code)
         .then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 3000);
         })
         .catch(err => console.error('Failed to copy: ', err));
   };

   return (
      <div className='relative overflow-hidden w-full rounded-2xl min-h-96 h-[55vh] md:h-[40vh] lg:h-[50vh]'>
         <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1.5 }} transition={{ duration: 5, delay: 1 }} className="absolute rounded-md border-lg bg-gradient-to-b from-transparent to-white">
            <Image src={goldenPop} className="h-full" alt='...' width={800} height={800} />
         </motion.div>
         <div className='absolute flex flex-col justify-center align-center w-full'>
            <Image src={ExclusiveDropsTittle} className="z-20 pt-14 mx-auto" alt='...' width={300} height={100} />
            <Carousel autoplay autoplaySpeed={5000} className='custom-carousel pb-5 '>
               {data?.map((coupon, index) => {
                  const color = colors[index % colors.length];
                  return (
                     <div key={coupon?._id} className={`p-5 md:p-6 lg:p-8 ${outfit.className}`}>
                        <div className={`${color} p-3 flex flex-col text-center items-center justify-center min-h-16 rounded-md border-b-2 border-dashed rounded-b-lg`}>
                           <p className='font-extralight text-[17px] w-full text-start'>{coupon?.name}</p>
                           <p className='font-medium text-[17px] w-full text-start flex'>
                              Use Code : <span className='font-black'>{coupon?.code}</span>&nbsp;&nbsp;
                              <span
                                 className='text-xs text-gray-500 px-2 m-0 cursor-pointer bg-transparent bg-opacity-45 rounded-md bg-white border flex items-center'
                                 onClick={() => handleCopy(coupon?.code)}
                              >
                                 <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd" />
                                    <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd" />
                                 </svg>
                                 {copied === coupon?.code ? 'copied!' : 'copy'}
                              </span>
                           </p>
                        </div>
                        <div className={`${color} p-2 pt-3 rounded-t-lg rounded-md`}>
                           <CountDown expiry={coupon?.validity} />
                           <p className='px-2 pt-1.5 font-light'>{`${coupon?.discount}% Off upto AED ${coupon?.maxValue} on orders above ${coupon?.minValue}`}</p>
                        </div>
                     </div>
                  );
               })}
            </Carousel>
         </div>
      </div>
   )
}

export default ExclusiveDrops;
