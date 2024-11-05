'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExclusiveDrops from '../common/ExclusiveDrops';
import ModalLayout from '../common/ModalLayout';
import { useParams, useRouter } from 'next/navigation';

const MobileNavbar = () => {
  const router = useRouter()
  const param = useParams()
  const slug = decodeURIComponent(param?.slug || '');
  const [open, setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }; return (
    <div className="w-full fixed top-0 left-0 z-40">
      <nav className="flex items-center bg-white justify-between px-2 pb-1 pt-3 relative">
        <div className="flex items-center z-50" onClick={toggleMenu}>
          <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
          </svg>
        </div>

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
          <button onClick={() => setOpen(true)} className="bg-gradient-to-r from-white to-[#f0e6d2] text-[#97895f] font-semibold py-1 px-2 xs:py-1.5 xs:px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 lg:py-3 lg:px-6 rounded-full shadow-lg text-xs xs:text-sm sm:text-sm md:text-base lg:text-lg whitespace-nowrap">
            Exclusive Drops
          </button>
        </div>
      </nav>
      <div className="flex justify-around gap-2 p-2 pb-1 md:mb-0 bg-[#faf9f3]">
        <button onClick={() => router.push('/allproducts/Trends')} className="w-1/3 px-3 bg-[#c2b280] text-white text-xs py-1 rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Trends</button>
        <button onClick={() => router.push('/allproducts/Accessories')} className="w-1/3 px-3 bg-[#f2f2f2] text-white text-xs py-1 rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Accessories</button>
        <button onClick={() => router.push('/allproducts/Exclusives')} className="w-1/3 px-3 bg-[#f2f2f2] text-white text-xs py-1 rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Exclusives</button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out">
          <div
            className={`fixed top-0 left-0 w-64 xs:w-72 sm:w-80 md:w-96 lg:w-104 bg-[#faf9f3] opacity-90 rounded-lg p-2 shadow-md transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-full -translate-y-full opacity-0'
              }`}
          >
            <div className="flex justify-between p-4">
            <h1 className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold italic text-black whitespace-nowrap">
            <Link href={'/'}>
              <Image src={'/logo.png'} width={150} height={10} />
            </Link>
          </h1>
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
            <div className={`flex flex-col justify-center pb-32 space-y-3 text-sm font-bold overflow-x-auto ${isMenuOpen && "p-4"}`}>
          <Link href="/allproducts/Ethnic Fashion" className={`${slug === "Ethnic Fashion" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Ethnic Fashion</Link>
          <Link href="/allproducts/Festive Collection" className={`${slug === "Festive Collection" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Festive Collection</Link>
          <Link href="/allproducts/Daily & Office wear" className={`${slug === "Daily & Office wear" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Daily / Office wear</Link>
          <Link href="/allproducts/Home & Night wear" className={`${slug === "Home & Night wear" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Home / Night wear</Link>
          <Link href="/allproducts/Travel Wear" className={`${slug === "Travel Wear" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Travel Wear</Link>
          <Link href="/allproducts/Jewellery" className={`${slug === "Jewellery" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Jewellery</Link>
          <Link href="/allproducts/Hair Acessories" className={`${slug === "Hair Acessories" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Hair Acessories</Link>
          <Link href="/allproducts/Nilaa&apos;s Designer Collection" className={`${slug === "Nilaa's Designer Collection" ? "text-yellow-600" : "text-gray-700"} hover:text-gray-900`}>Nilaa&apos;s Designer Collection</Link>
        </div>
          </div>
        </div>
      )}

      <ModalLayout open={open} setOpen={setOpen} width='500px' height='500px' padding={false}><ExclusiveDrops /></ModalLayout>
    </div>
  );
};

export default MobileNavbar;