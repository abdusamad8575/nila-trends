'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleLoginComponent from '../components/google';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CodeInput from './CodeInput';
import Image from 'next/image';

const countries = [
  {
    name: "UAE", code: "+971", flag: <svg className='h-6 w-6' viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0H0V20H30V0Z" fill="#F0F0F0" />
      <path d="M30 0H0V6.66643H30V0Z" fill="#6DA544" />
      <path d="M30 13.3329H0V19.9994H30V13.3329Z" fill="black" />
      <path d="M9.99978 0H0V20H9.99978V0Z" fill="#A2001D" />
    </svg>
  },
  {
    name: "India", code: "+91", flag: <svg className='h-6 w-6' viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 0H0V20H30V0Z" fill="#F0F0F0" />
      <path d="M30 0H0V6.66665H30V0Z" fill="#FF9811" />
      <path d="M30 13.3334H0V20H30V13.3334Z" fill="#6DA544" />
      <path d="M15.0017 12.572C16.4222 12.572 17.5737 11.4205 17.5737 9.99994C17.5737 8.57942 16.4222 7.42786 15.0017 7.42786C13.5812 7.42786 12.4297 8.57942 12.4297 9.99994C12.4297 11.4205 13.5812 12.572 15.0017 12.572Z" fill="#0052B4" />
      <path d="M14.9981 11.6074C15.8859 11.6074 16.6055 10.8877 16.6055 9.99995C16.6055 9.11216 15.8859 8.39246 14.9981 8.39246C14.1103 8.39246 13.3906 9.11216 13.3906 9.99995C13.3906 10.8877 14.1103 11.6074 14.9981 11.6074Z" fill="#F0F0F0" />
      <path d="M14.9992 8.01636L15.4951 9.14109L16.7171 9.0082L15.991 10L16.7171 10.9919L15.4951 10.859L14.9992 11.9837L14.5032 10.859L13.2812 10.9919L14.0073 10L13.2812 9.0082L14.5032 9.14109L14.9992 8.01636Z" fill="#0052B4" />
    </svg>
  },
];

const OTPPage = () => {
  const router = useRouter()
  const [otp, setOtp] = useState();
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [timer, setTimer] = useState(5);
  const [showResend, setShowResend] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  const handleSendOtp = async () => {
    try {
      if (phone) {
        setShowResend(false)
        setTimer(60)
        const fullPhoneNumber = `${selectedCountry?.code}${phone}`;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
          number: fullPhoneNumber,
        });
        setIsOtpSent(true);
        setIsPhoneDisabled(true);
      } else {
        toast.error('please fill the phone number')
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };


  const handleVerifyOtp = async () => {
    try {
      const fullPhoneNumber = `${selectedCountry?.code}${phone}`;
      const enteredOtp = otp.join('');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        number: fullPhoneNumber,
        otp: enteredOtp,
      });
      localStorage.setItem(
        "Tokens",
        JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
      );

      if (response.data) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(error?.response?.data?.message ?? 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src={'/logo.png'} width={250} height={15} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to NilaaTrends</h2>
        <form>
          <div className="max-w-sm mx-auto">
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone No
              </label>
              <div className="flex items-center">
                <button
                  id="dropdown-phone-button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  disabled={isPhoneDisabled}
                  className="flex-shrink-0 z-10 inline-flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                  type="button"
                >
                  {selectedCountry.flag}
                  {selectedCountry.code}
                </button>

                {dropdownOpen && (
                  <div id="dropdown-phone" className="absolute mt-36 border z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
                    <ul className="py-2 text-sm text-gray-700">
                      {countries?.map(country =>
                        <li>
                          <button
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className={`${selectedCountry?.name === country?.name && "bg-slate-200"} inline-flex w-full items-center gap-2 px-4 py-1 text-sm hover:bg-gray-100`}
                          >
                            {country?.flag}
                            {country?.name}&nbsp;({country?.code})
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <input
                  id="phone"
                  value={phone}
                  maxLength={10}
                  max={10}
                  onChange={(e) => {
                    const newValue = e.target.value.replace(/\D/g, '');
                    setPhone(newValue);
                  }}
                  disabled={isPhoneDisabled}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none disabled:bg-gray-100"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
          {isOtpSent ? (
            <>
              <p className="text-sm text-gray-600 mb-4">Enter verification code send to {selectedCountry?.code} {phone}</p>
              <CodeInput dispatch={setOtp} />
              <div className='flex justify-between mb-4'>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-[#b5a183] text-white text-sm rounded hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183] mt-4"
                >
                  Verify OTP
                </button>
                {showResend ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-sm text-gray-600 hover:text-indigo-500  mt-6"
                  >
                    Don&apos;t receive OTP? <span className="text-green-500">Resend</span>
                  </button>
                ) : (
                  <span className="text-sm text-gray-600  mt-6">Resend OTP in {timer} seconds</span>
                )}
              </div>
            </>
          ) : (
            <>
              <p id="helper-text-explanation" className="mt-4 mb-2 text-xs text-gray-500 dark:text-gray-400">We&apos;ll send you an SMS with a verification code.</p>
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-4 py-2 bg-[#b5a183] text-white font-medium rounded-lg text-sm hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183]"
                style={{ width: '100%' }}
              >
                Send verification code
              </button>
            </>
          )}
        </form>
        <div className="text-center my-4">OR</div>
        <GoogleLoginComponent />
      </div>
    </div>
  );
};

export default OTPPage;