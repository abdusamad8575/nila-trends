'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cart from '../cart';
import ModalLayout from '../common/ModalLayout';
import { useTheme } from 'next-themes';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../axios'
import { setUserDetails, clearUserDetails } from '../../../redux/actions/userActions';
import { setCart, setProfile } from '../../../redux/actions/storeActions';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Profile from '../profile';
import Image from 'next/image';

const Navbar = () => {
  const dispatch = useDispatch();
  const param = useParams()
  const slug = decodeURIComponent(param?.slug || '');
  const path = usePathname();
  const userData = useSelector(state => state.userDetails);
  const storeData = useSelector(state => state.storeDetails);
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    if (userData) {
      setCartData(userData?.cart?.item?.length || 0);
      setWishlistData(userData?.wishlist?.length || 0);
    }
  }, [userData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        dispatch(setUserDetails(response.data.data));
      } catch (error) {
        console.log('errr', error);
        dispatch(clearUserDetails());
      }
    };

    if (!userData) {
      fetchData();
    }
  }, [dispatch, path]);

  // const fetchCartData = async () => {
  //   try {
  //     const response = await axiosInstance.get('/user/getcarts');
  //     setCartData(response?.data?.data?.item?.length || 0);
  //   } catch (error) {
  //     console.log('errr', error);
  //   }
  // };
  // const fetchWishlistData = async () => {
  //   try {
  //     const response = await axiosInstance.get('/user/getwishlist');

  //     setWishlistData(response?.data?.data?.length || 0);
  //   } catch (error) {
  //     console.log('errr', error);
  //   }
  // };


  // useEffect(() => {
  //   if (!userData) {
  //     fetchCartData();
  //     fetchWishlistData();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  const handleCart = (state) => dispatch(setCart(state))
  const handleProfile = (state) => dispatch(setProfile(state))

  return (
    <nav
      className={`bg-white font-sans fixed top-0 left-0 w-full transition-opacity duration-300 ${isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-opacity-100 backdrop-blur-none'} z-40`}
      style={{ backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-around items-center py-3">
          {/* Left section */}
          <div className="flex space-x-1 mb-2 md:mb-0">
            <button onClick={() => router.push('/allproducts/Trends')} className="px-3 py-1 bg-[#c2b280] text-white text-sm rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Trends</button>
            <button onClick={() => router.push('/allproducts/Accessories')} className="px-3 py-1 bg-[#f2f2f2] text-white text-sm rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Accessories</button>
            <button onClick={() => router.push('/allproducts/Exclusives')} className="px-3 py-1 bg-[#f2f2f2] text-white text-sm rounded animate-shimmer items-center border border-[#F5DCB5] bg-[linear-gradient(110deg,#c2b280,45%,#FEE5C0,55%,#c2b280)] bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:ring-offset-2">Exclusives</button>
          </div>

          {/* Logo */}
          <div className="text-xl font-serif italic mb-2 md:mb-0">
            <Link href="/">
              <Image src={'/logo.png'} width={200} height={10} />
            </Link>
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

            <Link href={userData ? "/wishlist" : "/register"}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistData > 0 && <span className="absolute top-3 bg-[#FF5722] text-white text-xs py-[0.1em] px-[0.5em] rounded-full">{wishlistData}</span>}
              </button>
            </Link>

            <Link href={userData ? "#" : "/register"}>
              <button onClick={handleCart}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartData > 0 && <span className="absolute top-3 bg-[#FF5722] text-white text-xs py-[0.1em] px-[0.5em] rounded-full">{cartData}</span>}
              </button>
            </Link>

            <Link className='' href={userData ? '#' : '/register'}>
              <button onClick={userData ? () => handleProfile(true) : () => router.push('/register')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom menu */}
        <div className="flex flex-wrap justify-center py-2 space-x-10 text-sm font-bold bg-[#faf9f3] overflow-x-auto">
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
      <ModalLayout open={storeData?.cart} setOpen={handleCart} bgcolor={'#fff'}><Cart /></ModalLayout>
      <ModalLayout open={storeData?.profile} setOpen={handleProfile} bgcolor={'#fff'}><Profile /></ModalLayout>
    </nav>
  );
};

export default Navbar;
