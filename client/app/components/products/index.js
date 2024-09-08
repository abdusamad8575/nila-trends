import React from 'react';
import Image from 'next/image';
import { Questrial, Scheherazade_New } from 'next/font/google'

const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400',],  // Specify the available weight
  display: 'swap',
})
const scheherazade_New = Scheherazade_New({
  subsets: ['latin'],
  weight: '400',  // Specify the available weight
  display: 'swap',
})

const lookbookItems = [
  { id: 1, title: 'CLASSIC KURTIS', image: '/assets/home1.png' },
  { id: 2, title: 'CLASSIC KURTI SETS', image: '/assets/home2.png' },
  { id: 3, title: 'STELLAR SAREES', image: '/assets/home3.png' },
  { id: 4, title: 'MODERN SKIRTS', image: '/assets/home4.png' },
];

const Lookbook = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <h2 className={`${scheherazade_New.className} text-3xl font-bold md:mb-2`} >Find Your Perfect Dress</h2>
      <p className="text-gray-600 mb-6">OUR LATEST LOOKBOOK</p>

      <div className='w-full h-full grid grid-flow-col grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-4 gap-3'>
        {Array(4).fill().map((x,index) => (
          <div key={index} className=' border-gray-200 rounded-2xl border border-inherit border-opacity-95 shadow-sm h-[15vh] md:h-[23vh] relative flex overflow-hidden justify-center'>
            <video className="top-0 left-0 w-auto h-full min-w-full min-h-full object-cover " autoPlay loop muted playsInline >
              <source src="/assets/jewlery.mp4" type="video/mp4" /> Your browser does not support the video tag. </video>
            <div className='absolute w-full h-full flex flex-col items-center justify-end z-10 pb-5 md:pb-10 bg-gradient-to-b  from-transparent to-[#000000a1]'>
              <div className={questrial.className}> <p className='text-white text-xs md:text-lg text-center'>STYLISH</p></div>
              <div className={scheherazade_New.className}> <p className='text-white text-xl md:text-3xl text-center'> COMBO SETS</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lookbook;