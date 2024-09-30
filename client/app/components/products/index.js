import React from 'react';
import Image from 'next/image';
import { Questrial, Scheherazade_New } from 'next/font/google'
import { useRouter } from 'next/navigation';

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
  { id: 1, title: 'CLASSIC', title2: 'KURTIS', video: '/assets/kurith.mp4', path: '/classickurtis' },
  { id: 2, title: 'CLASSIC', title2: 'KURTI SETS', video: '/assets/cloth.mp4', path: '/classickurtisets' },
  { id: 3, title: 'STELLAR', title2: 'SAREES', video: '/assets/sarre.mp4', path: '/stellarsarees' },
  { id: 4, title: 'MODERN', title2: 'SKIRTS', video: '/assets/skrit.mp4', path: '/modernskirts' },
];

const Lookbook = () => {
  const router = useRouter()
  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <h2 className={`${scheherazade_New.className} text-2xl md:text-3xl font-bold md:mb-2`} >Find Your Perfect Dress</h2>
      <p className="text-xs md:text-sm text-gray-600 mb-6">OUR LATEST LOOKBOOK</p>

      <div className='w-full h-full grid grid-flow-col grid-rows-2 md:grid-rows-1 grid-cols-2 md:grid-cols-4 gap-3'>
        {lookbookItems.map((x, index) => (
          <div key={index} onClick={() => router.push(`/allproducts${x.path}`)} className='cursor-pointer border-gray-200 rounded-2xl border border-inherit border-opacity-95 shadow-sm h-[15vh] md:h-[23vh] relative flex overflow-hidden justify-center'>
            <video className="top-0 left-0 w-auto h-full min-w-full min-h-full object-cover " autoPlay loop muted playsInline >
              <source src={x.video} type="video/mp4" /> Your browser does not support the video tag. </video>
            <div className='absolute w-full h-full flex flex-col items-center justify-end z-10 pb-5 md:pb-10 bg-gradient-to-b  from-transparent to-[#000000a1]'>
              <div className={questrial.className}> <p className='text-white text-xs md:text-lg text-center'>{x.title}</p></div>
              <div className={scheherazade_New.className}> <p className='text-white text-xl md:text-3xl text-center'>{x.title2}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lookbook;