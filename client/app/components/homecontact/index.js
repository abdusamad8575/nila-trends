import { Roboto } from 'next/font/google';
import React from 'react';
const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const WardrobeSection = () => {
  return (
    <div className={roboto.className}>
      <div className="md:max-w-7xl mx-auto p-4 mb-14">
        <div className="bg-[#C2B4A3] rounded-lg p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-stone-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-3/4'>
              <h2 className="text-3xl font-bold mb-4">ELEVATE YOUR WARDROBE</h2>
              <p className="mb-4">
                Discover the magic of Nilaad&apos;s exclusive collections, where each piece is crafted with
                unparalleled attention to detail.
              </p>
              <p className="mb-4">
                Experience the ultimate wardrobe companion, designed to elevate your style effortlessly.
              </p>
              <p className="mb-4">
                Here, timeless tradition harmoniously meets modern elegance, creating a seamless fusion of
                classic charm and contemporary sophistication.
              </p>
            </div>
            <div className='w-full md:w-1/4 flex items-center md:justify-center'>
              <button className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700 transition-colors">
                Shop Now →
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="inline-block">
            <svg className="w-6 h-6 text-stone-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <p className="text-stone-500 mb-2">Founders Words</p>
            <h3 className="text-2xl font-semibold mb-2">Thanks to the Artisans</h3>
            <p className="text-stone-600">Share us valuable thoughts & suggestions</p>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default WardrobeSection;
