"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {clearUserDetails } from '../../../redux/actions/userActions';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const logoutUser = () => {
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    router.push('/')
  };
  return (
    <div className="w-full flex justify-center items-center md:mt-1 p-4 bg-gray-50">
      {/* Mobile View - Updated to match the provided image */}
      <div className="w-full max-w-xl h-full bg-white rounded-2xl shadow-lg p-4 md:hidden">
        <h1 className="text-2xl font-bold mb-4">Hey! Matilda Pallu</h1>
        
        {/* Profile Section */}
        <div className="flex items-center mb-6">
          <Image
            src="/assets/profile.png"
            alt="Profile Picture"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="text-gray-600">matildapallu@gmail.com</p>
            <p className="font-bold">Matilda Pallu</p>
            <p>Ph : 9876123450</p>
          </div>
        </div>

        {/* Action Buttons - Coupons and Support */}
        <div className="flex justify-between mb-6">
          <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
            <span className="mr-2">🎟️</span>
            <span>Coupons</span>
          </button>
          <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
            <span className="mr-2">🎧</span>
            <span>Support</span>
          </button>
        </div>

        {/* My Orders */}
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <div className="flex justify-around mb-6">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl mb-1">↩️</span>
            <span className="text-sm">Return</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl mb-1">⚙️</span>
            <span className="text-sm">Processing</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl mb-1">🚚</span>
            <span className="text-sm">Shipping</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl mb-1">💳</span>
            <span className="text-sm">Unpaid</span>
          </button>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <Link href="#" className="flex justify-between items-center text-gray-700 text-lg">
            Shipping addresses
            <span className="text-gray-400">&gt;</span>
          </Link>
          <Link href="#" className="flex justify-between items-center text-gray-700 text-lg">
            Settings
            <span className="text-gray-400">&gt;</span>
          </Link>
          <button className="text-red-500 text-lg font-semibold">Sign Out</button>
        </div>
      </div>

      {/* Desktop View - Updated to match the reference image */}
      <div className="w-full h-full bg-white hidden md:block">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="flex gap-8">
          {/* Left Section */}
          <div className="w-2/3">
            <div className="flex items-center mb-6">
              <Image
                src="/assets/profile.png"
                alt="Profile Picture"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="text-gray-600">matildapallu@gmail.com</p>
                <p className="font-bold">Matilda Pallu</p>
                <p>Ph : 9876123450</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Shipping addresses</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Matilda Pallu</p>
                      <p>98937778492</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">Edit</button>
                      <div className={`w-4 h-4 rounded-full ${item % 2 === 1 ? 'bg-blue-500' : 'border border-gray-300'}`}></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Manzil, Neettani,, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Settings</h2>
            <button className="text-red-500 font-bold" onClick={logoutUser}>Sign Out</button>
          </div>

          {/* Right Section */}
          <div className="w-1/3">
            <h2 className="text-xl font-bold mb-4">My Orders</h2>
            <div className="flex space-x-2 mb-4">
              {['Delivered', 'Processing', 'Cancelled', 'returned'].map((status, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    status === 'Delivered' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold">Order No : 1947034</p>
                      <p className="text-xs text-gray-600">Shipping addresses</p>
                      <p className="text-xs text-gray-600 max-w-xs">Manzil, Neettani,, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                    </div>
                    <p className="text-sm text-gray-600">22-07-2024</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Quantity : 4</p>
                    <div className="text-right">
                      <p className="text-sm">Total Amount $109.99</p>
                      <Link href={'/orderdetails'}><button className="text-sm bg-gray-200 px-3 py-1 rounded-full mt-1">Details</button></Link>
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-2">Delivered</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;







