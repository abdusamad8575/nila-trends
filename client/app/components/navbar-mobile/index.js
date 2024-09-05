'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-40">
      <nav className="flex items-center justify-between px-4 py-2 relative">
        {/* Left - Hamburger Menu */}
        <div className="flex items-center z-10">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <h1 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold italic text-black whitespace-nowrap">
            <Link href={'/'}> NilaaTrends</Link>
          </h1>
        </div>

        {/* Right - Button */}
        <div className="flex items-center z-10">
          <button className="bg-gradient-to-r from-white to-[#f0e6d2] text-[#97895f] font-semibold py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-6 rounded-full shadow-lg text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
            Exclusive Drops
          </button>
        </div>
      </nav>

      {/* Off-Canvas Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 left-0 h-full w-64 xs:w-72 sm:w-80 md:w-96 lg:w-104 bg-white shadow-md transition-transform transform translate-x-0">
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="text-gray-600">
                <svg
                  className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center bg-gray-100 rounded-md p-2">
                  <Search size={20} className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>
              <nav>
                <ul className="space-y-4">
                  <li><Link href="/orders" className="text-gray-700 text-sm">Orders</Link></li>
                  <li><Link href="/cart" className="text-gray-700 text-sm">Cart</Link></li>
                  <li><Link href="/wishlist" className="text-gray-700 text-sm">Wishlist</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;