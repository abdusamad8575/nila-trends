import React from 'react';
import Image from 'next/image';

const lookbookItems = [
  { id: 1, title: 'CLASSIC KURTIS', image: '/assets/home1.png' },
  { id: 2, title: 'CLASSIC KURTI SETS', image: '/assets/home2.png' },
  { id: 3, title: 'STELLAR SAREES', image: '/assets/home3.png' },
  { id: 4, title: 'MODERN SKIRTS', image: '/assets/home4.png' },
];



const LookbookItem = ({ title, image }) => (
  <div className="relative overflow-hidden rounded-lg shadow-md">
    <Image
      src={image}
      alt={title}
      width={300}
      height={200}
      layout="responsive"
      className="object-cover"
    />
    {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <h3 className="text-white text-xl font-semibold text-center">{title}</h3>
    </div> */}
  </div>
);

const Lookbook = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 ">
      <h2 className="text-3xl font-bold mb-2">Find Your Perfect Dress</h2>
      <p className="text-gray-600 mb-6">OUR LATEST LOOKBOOK</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {lookbookItems.map((item) => (
          <LookbookItem key={item.id} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default Lookbook;