'use client';

import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xs">NilaaTrends</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back to NilaaTrends</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email/Phone"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-gray-600 hover:underline">Forget Password ?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#b5a183] text-white p-2 rounded hover:bg-[#a39073]"
          >
            SIGN IN
          </button>
        </form>
        <div className="text-center my-4">OR</div>
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 p-2 rounded hover:bg-gray-50">
          Continue with Google
        </button>
        <div className="text-center mt-4">
          <span className="text-gray-600">I don&apos;t have a account </span>
          <a href="#" className="text-[#b5a183] hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;