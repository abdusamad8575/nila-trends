'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input if value is entered
    if (value !== '' && index < 4) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xs">NilaaTrends</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to NilaaTrends</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone No</label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">We'll send a verification code to your Inbox</p>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-10 h-10 text-center border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              className="px-4 py-2 bg-[#b5a183] text-white rounded hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183]"
            >
              GET OTP
            </button>
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-500">
              Don't receive OTP? <span className="text-green-500">Resend</span>
            </a>
          </div>
        </form>
        <div className="text-center my-4">OR</div>
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded hover:bg-gray-50">
          <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
          Continue with Google
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">I have a account </span>
          <a href="#" className="text-[#b5a183] hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;