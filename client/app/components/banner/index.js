'use client';
import React, { useState } from 'react';
import Image from 'next/image';

// CarouselItem Component
const CarouselItem = ({ src, alt, title, subtitle, discount }) => (
  <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end p-6 text-white">
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p className="text-xl mb-4">{subtitle}</p>
      {/* {discount && (
        <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full inline-block">
          {discount}
        </div>
      )} */}
    </div>
  </div>
);

// Carousel Component
const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <CarouselItem key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// StatBox Component
const StatBox = ({ number, text }) => (
  <div className="text-center border border-dashed border-gray-300 p-4">
    <div className="text-2xl font-bold">{number}</div>
    <div className="text-sm text-gray-600">{text}</div>
  </div>
);

const FashionLanding = () => {
  // Define carousel items
  const carouselItems = [
    {
      src: '/assets/home.png',
      alt: 'Onam celebration',
      title: 'Happy Onam',
      subtitle: 'Traditional Elegance Meets Modern Flair',
      discount: 'DISCOUNT Up to 50% Off'
    },
    // Add more items here if needed
  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4 mt-32">
      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <Carousel items={carouselItems} />
      </div>
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="border-2 border-dashed border-gray-300 p-4">
            <div className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="/assets/home.png"
                alt="Fashion model"
                layout="fill"
                objectFit="cover"
                className="object-center"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <button className="bg-black text-white px-4 py-2 rounded-full flex items-center">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <h1 className="text-4xl font-bold mb-4">
                  ELEVATE YOUR STYLE WITH NILAA TRENDS
                </h1>
                <p className="text-gray-600 mb-4">
                  Explore a world of fashion at NiaaTrends, where trends meet affordability. Immerse yourself in the latest styles and seize exclusive promotions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox number="1,500 +" text="Fashion Products" />
                <StatBox number="50 +" text="New arrivals every month." />
                <StatBox number="30%" text="UPTO OFF on select items." />
                <StatBox number="95%" text="Customer Satisfaction Rate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionLanding;