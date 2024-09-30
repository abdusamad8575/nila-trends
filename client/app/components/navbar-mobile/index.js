'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileNavbar = () => {
  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-40">
      <nav className="flex items-center justify-between px-4 py-4 relative">
        <div className="flex items-center z-10"></div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <h1 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold italic text-black whitespace-nowrap">
            <Link href={'/'}>
              <Image src={'/logo.png'} width={150} height={10} />
            </Link>
          </h1>
        </div>

        {/* Right - Button */}
        <div className="flex items-center z-10">
          <button className="bg-gradient-to-r from-white to-[#f0e6d2] text-[#97895f] font-semibold py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-6 rounded-full shadow-lg text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
            Exclusive Drops
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;