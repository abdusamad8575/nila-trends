import React from 'react';
import Head from 'next/head';
import { Questrial, Scheherazade_New } from 'next/font/google'


const questrial = Questrial({
  subsets: ['latin'],
  weight: '400',  // Specify the available weight
  display: 'swap',
})
const scheherazade_New = Scheherazade_New({
  subsets: ['latin'],
  weight: '400',  // Specify the available weight
  display: 'swap',
})

const
  JewelryShop = () => {
    return (
      <div className="max-w-7xl mx-auto p-4 md:mt-16">
        <Head>
          <title>Shop Elegant Jewellery</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        </Head>

        <header className="text-left my-8">
          <h1 className={`${scheherazade_New.className} text-3xl font-bold md:mb-2`}>Shop Elegant Jewellery</h1>
          <p className="text-base md:text-md text-gray-600">OUR LATEST LOOKBOOK</p>
        </header>

        <main className="flex gap-1">
          {/* First Row */}

          <div className='w-full h-full grid grid-flow-col gap-3  grid-rows-2'>
            {Array(4).fill().map((x,index) => (
              <div key={index} className=' border-gray-200 rounded-2xl border border-inherit border-opacity-95 shadow-sm h-[30vh] relative flex overflow-hidden justify-center'>
                <video className="top-0 left-0 w-auto h-full min-w-full min-h-full object-cover " autoPlay loop muted playsInline >
                  <source src="/assets/jewlery.mp4" type="video/mp4" /> Your browser does not support the video tag. </video>
                <div className='absolute w-full h-full flex flex-col items-center justify-end z-10 pb-5 md:pb-10 bg-gradient-to-b  from-transparent to-[#000000a1]'>
                  <div className={questrial.className}> <p className='text-white text-sm md:text-lg text-center'>STYLISH</p></div>
                  <div className={scheherazade_New.className}> <p className='text-white text-xl md:text-3xl text-center'> COMBO SETS</p></div>
                </div>
              </div>
            ))}
          </div>

          {/* <div >
          <div className="relative overflow-hidden rounded-lg ">
            <img src="/assets/comboset.png" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img src="/assets/comboset.png" alt="Hand Made Jewelry" className="object-cover w-full h-full" />
          </div>
        </div> */}

          {/* Second Row */}
          {/* <div>
          <div className="relative overflow-hidden rounded-lg">
            <img src="/assets/comboset.png" alt="Imitation Jewelry" className="object-cover w-full h-full" />
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img src="/assets/comboset.png" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
          </div>
        </div> */}
        </main>
      </div>
    );
  };

export default JewelryShop;
