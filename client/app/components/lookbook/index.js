import React from 'react';
import Head from 'next/head';

const JewelryShop = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      <Head>
        <title>Shop Elegant Jewellery</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <header className="text-left my-8"> {/* Changed text-center to text-left */}
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Shop Elegant Jewellery</h1>
        <p className="text-base md:text-lg text-gray-600">OUR LATEST LOOKBOOK</p>
      </header>

      <main className="grid grid-cols-2 gap-4">
        {/* First Row */}
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <img src="/api/placeholder/800/400" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-xs md:text-sm mb-2">STYLISH</p>
            <h2 className="text-white text-2xl md:text-3xl font-serif">COMBO SETS</h2>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <img src="/api/placeholder/800/400" alt="Hand Made Jewelry" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-xs md:text-sm mb-2">THE PERFECT</p>
            <h2 className="text-white text-2xl md:text-3xl font-serif">HAND MADE</h2>
          </div>
        </div>

        {/* Second Row */}
        <div className="relative overflow-hidden rounded-lg aspect-video bg-black">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-6">
            <p className="text-white text-xs md:text-sm mb-2">CLASSIC</p>
            <h2 className="text-white text-2xl md:text-3xl font-serif">IMITATION</h2>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <img src="/api/placeholder/800/400" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-xs md:text-sm mb-2">STYLISH</p>
            <h2 className="text-white text-2xl md:text-3xl font-serif">COMBO SETS</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JewelryShop;
