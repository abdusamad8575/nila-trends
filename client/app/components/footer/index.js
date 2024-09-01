'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const MobileFooter = () => {
  const [active, setActive] = useState(null);

  const handleClick = (index) => {
    setActive(index === active ? null : index);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <nav className="flex justify-between items-center px-4 py-2">
        <button
          className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${
            active === 0 ? 'bg-gray-100' : 'bg-white'
          }`}
          onClick={() => handleClick(0)}
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
        <button
          className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${
            active === 1 ? 'bg-gray-100' : 'bg-white'
          }`}
          onClick={() => handleClick(1)}
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
        <button
          className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${
            active === 2 ? 'bg-gray-100' : 'bg-white'
          }`}
          onClick={() => handleClick(2)}
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
        </button>
        <button
          className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${
            active === 3 ? 'bg-gray-100' : 'bg-white'
          }`}
          onClick={() => handleClick(3)}
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
        </button>
        <button
          className={`flex items-center px-3 py-2 rounded-full transition-colors duration-300 ease-in-out ${
            active === 4 ? 'bg-gray-100' : 'bg-white'
          }`}
          onClick={() => handleClick(4)}
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
      </nav>
    </footer>
  );
};

export default MobileFooter;
