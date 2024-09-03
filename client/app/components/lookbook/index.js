import React from 'react';
import Head from 'next/head';

const JewelryShop = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      <Head>
        <title>Shop Elegant Jewellery</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <header className="text-left my-8">
        <h1 className="text-3xl md:text-4xl font-serif mb-2">Shop Elegant Jewellery</h1>
        <p className="text-base md:text-lg text-gray-600">OUR LATEST LOOKBOOK</p>
      </header>

      <main className="grid grid-cols-2 gap-4">
        {/* First Row */}
        <div className="relative overflow-hidden rounded-lg">
          <img src="/assets/comboset.png" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img src="/assets/handmade.png" alt="Hand Made Jewelry" className="object-cover w-full h-full" />
        </div>

        {/* Second Row */}
        <div className="relative overflow-hidden rounded-lg">
          <img src="/assets/imitation.png" alt="Imitation Jewelry" className="object-cover w-full h-full" />
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img src="/assets/comboset.png" alt="Stylish Combo Sets" className="object-cover w-full h-full" />
        </div>
      </main>
    </div>
  );
};

export default JewelryShop;
