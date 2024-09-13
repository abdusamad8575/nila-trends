// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// const OTPPage = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '']);

//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move to next input if value is entered
//     if (value !== '' && index < 4) {
//       document.getElementById(`otp-${index + 1}`).focus();
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 md:mt-20">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
//             <span className="text-gray-600 text-xs">NilaaTrends</span>
//           </div>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-6">Welcome to NilaaTrends</h2>
//         <form>
//           {/* <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div> */}
//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone No</label>
//             <input
//               type="tel"
//               id="phone"
//               className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <p className="text-sm text-gray-600 mb-2">We&apos;ll send a verification code to your Inbox</p>
//           <div className="flex justify-between mb-4">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 id={`otp-${index}`}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 className="w-10 h-10 text-center border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
//               />
//             ))}
//           </div>
//           <div className="flex justify-between items-center mb-4">
//             <button
//               type="button"
//               className="px-4 py-2 bg-[#b5a183] text-white rounded hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183]"
//             >
//               GET OTP
//             </button>
//             <a href="#" className="text-sm text-gray-600 hover:text-indigo-500">
//               Don&apos;t receive OTP? <span className="text-green-500">Resend</span>
//             </a>
//           </div>
//         </form>
//         <div className="text-center my-4">OR</div>
//         <button className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded hover:bg-gray-50">
//           <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
//           Continue with Google
//         </button>
//         {/* <div className="text-center mt-4">
//           <span className="text-gray-600">I have a account </span>
//           <a href="/login" className="text-[#b5a183] hover:underline">Sign in</a>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default OTPPage;


'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleLoginComponent from '../components/google';
import { useRouter } from 'next/navigation';


const OTPPage = () => {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [phone, setPhone] = useState('');
  // const [countryCode, setCountryCode] = useState('+1');
  const [isOtpSent, setIsOtpSent] = useState(false);       
  const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
  const [timer, setTimer] = useState(5);
  const [showResend, setShowResend] = useState(false);

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

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSendOtp = async () => {
    try {
      if(phone){
      setShowResend(false)
      setTimer(5)
      // const fullPhoneNumber = `${countryCode}${phone}`;
      const fullPhoneNumber = `${phone}`;
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
        number: fullPhoneNumber,
      });
      setIsOtpSent(true);
      setIsPhoneDisabled(true);
    }else{
      alert('please fill the phone number')
    }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };


  const handleVerifyOtp = async () => {
    try {
      // const fullPhoneNumber = `${countryCode}${phone}`;
      const fullPhoneNumber = `${phone}`;
      const enteredOtp = otp.join('');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        number: fullPhoneNumber,
        otp: enteredOtp,
      });
      console.log('response-', response.data);
      localStorage.setItem(
        "Tokens",
        JSON.stringify({ access: response.data.data.token.accessToken, refresh: response.data.data.token.refreshToken })
      );

      if (response.data) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error?.response?.data?.message ?? 'Invalid OTP. Please try again.');
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
          {/* <div className="mb-4">
            <label htmlFor="country-code" className="block text-sm font-medium text-gray-700">Country Code</label>
            <select
              id="country-code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
            </select>
          </div> */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone No</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isPhoneDisabled}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {isOtpSent ? (
            <>
              <p className="text-sm text-gray-600 mb-2">We&apos;ll send a verification code to your Inbox</p>
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

              <div className='flex justify-between mb-4'>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-4 py-2 bg-[#b5a183] text-white rounded hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183] mt-4"
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
            <button
              type="button"
              onClick={handleSendOtp}
              className="px-4 py-2 bg-[#b5a183] text-white rounded hover:bg-[#a39073] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b5a183]"
              style={{width:'100%'}}
            >
              GET OTP
            </button>
          )}


        </form>
        <div className="text-center my-4">OR</div>
        <GoogleLoginComponent />

        {/* <div className="text-center mt-4">
           <span className="text-gray-600">I have a account </span>
           <a href="/login" className="text-[#b5a183] hover:underline">Sign in</a>
         </div> */}
      </div>
    </div>
  );
};

export default OTPPage;

// "use Client"
// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page