'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cart from '../cart';
import ModalLayout from '../common/ModalLayout';
import { useTheme } from 'next-themes';



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open , setOpen]= useState(false);
  const { theme, setTheme } = useTheme()
  
  useEffect(()=>{
    console.log(theme) 
  },[theme])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white font-sans fixed top-0 left-0 w-full transition-opacity duration-300 ${isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-opacity-100 backdrop-blur-none'} z-50`}
      style={{ backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-around items-center py-3">
          {/* Left section */}
          <div className="flex space-x-1 mb-2 md:mb-0">
            <button className="px-3 py-1 bg-[#c2b280] text-white text-sm rounded ">
              Trends
            </button>
            <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded"
                style={{
                  border: '2px dashed #cccccc',
                  borderRadius: '8px'
                }}>
              Accessories
            </button>
            <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded"
                style={{
                  border: '2px dashed #cccccc',
                  borderRadius: '8px'
                }}>
              Exclusive
            </button>
          </div>

          {/* Logo */}
          <div className="text-2xl font-serif italic mb-2 md:mb-0">
           <Link href={'/'}> NilaaTrends</Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-8 text-[#BFA285] mb-2 md:mb-0">
           <Link href='/allproducts'>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
           </Link>
           <Link href="">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
           </Link>

           {/* <button onClick={() => setTheme(theme==="dark"?"light":"dark")}>Dark Mode</button> */}
           
                <button onClick={()=>setOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
         
         
            <Link href="/profile">
              <button >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom menu */}
        <div className="flex flex-wrap justify-center py-2 space-x-10 text-sm font-bold bg-[#faf9f3] overflow-x-auto">
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Kerala traditional</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Kurta</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Kurti set</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Ethnic wear</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Feminine</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Festive wear</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Dual flare ears</Link>
          <Link href="/allproducts" className="text-gray-700 hover:text-gray-900">Beach wear</Link>
        </div>
      </div>
      <ModalLayout open={open} setOpen={setOpen} children={<Cart/>} bgcolor={'#fff'}/>
    </nav>
  );
};

export default Navbar;



