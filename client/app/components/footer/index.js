'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { setUserDetails, clearUserDetails } from '../../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../axios'
const MobileFooter = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const userData = useSelector(state => state.userDetails);
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
  }, [dispatch, pathname]);

  useEffect(() => {
    if (pathname === '/') setActive(0);
    else if (pathname === '/allproducts') setActive(1);
    else if (pathname === '/wishlist') setActive(2);
    else if (pathname === '/cart') setActive(3);
    else if (pathname === '/profile') setActive(4);
  }, [pathname]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg z-40">
      <nav className="flex justify-between items-center px-4 py-2">
        <Link href="/" passHref>
          <button
            className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${active === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`text-base md:text-lg ${active === 0 ? 'text-[#BFA285]' : 'text-gray-600'} transition-colors duration-300 ease-in-out`}
            />
            {active === 0 && (
              <span className={`ml-2 text-xs md:text-sm ${active === 0 ? 'text-[#BFA285]' : 'text-gray-600'} transition-opacity duration-300 ease-in-out`}>
                Home
              </span>
            )}
          </button>
        </Link>
        <Link href="/allproducts" passHref> {/* Corrected the link here */}
          <button
            className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${active === 1 ? 'bg-gray-100' : 'bg-white'
              }`}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={`text-base md:text-lg ${active === 1 ? 'text-[#BFA285]' : 'text-gray-400'} transition-colors duration-300 ease-in-out`}
            />
            {active === 1 && (
              <span className={`ml-2 text-xs md:text-sm ${active === 1 ? 'text-[#BFA285]' : 'text-gray-400'} transition-opacity duration-300 ease-in-out`}>
                Search
              </span>
            )}
          </button>
        </Link>
        <Link href={userData ? '/wishlist' : '/register'} passHref>
          <button
            className={`relative inline-flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${active === 2 ? 'bg-gray-100' : 'bg-white'
              }`}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-base md:text-lg ${active === 2 ? 'text-[#BFA285]' : 'text-gray-400'} transition-colors duration-300 ease-in-out`}
            />
            {active === 2 && (
              <span className={`ml-2 text-xs md:text-sm ${active === 2 ? 'text-[#BFA285]' : 'text-gray-400'} transition-opacity duration-300 ease-in-out`}>
                Wishlist
              </span>
            )}
            {wishlistData > 0 && <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -end-1 dark:border-gray-900">{wishlistData}</div>}
          </button>
        </Link>
        <Link href={userData ? '/cart' : '/register'} passHref>
          <button
            className={`relative inline-flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${active === 3 ? 'bg-gray-100' : 'bg-white'
              }`}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={`text-base md:text-lg ${active === 3 ? 'text-[#BFA285]' : 'text-gray-400'} transition-colors duration-300 ease-in-out`}
            />
            {active === 3 && (
              <span className={`ml-2 text-xs md:text-sm ${active === 3 ? 'text-[#BFA285]' : 'text-gray-400'} transition-opacity duration-300 ease-in-out`}>
                Cart
              </span>
            )}
            {cartData > 0 && <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -end-1 dark:border-gray-900">{cartData}</div>}
          </button>
        </Link>
        <Link href={userData ? '/profile' : '/register'} passHref>
          <button
            className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${active === 4 ? 'bg-gray-100' : 'bg-white'
              }`}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`text-base md:text-lg ${active === 4 ? 'text-[#BFA285]' : 'text-gray-400'} transition-colors duration-300 ease-in-out`}
            />
            {active === 4 && (
              <span className={`ml-2 text-xs md:text-sm ${active === 4 ? 'text-[#BFA285]' : 'text-gray-400'} transition-opacity duration-300 ease-in-out`}>
                Profile
              </span>
            )}
          </button>
        </Link>
      </nav>
    </footer>
  );
};

export default MobileFooter;
