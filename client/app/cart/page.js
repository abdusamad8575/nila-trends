"use client"; // This ensures the component is a Client Component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the App Router

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Close the modal by navigating back
  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    setIsClient(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-8">
      <div className="bg-white rounded-lg max-w-7xl w-full p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Shopping Cart Header */}
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart 🛒</h2>

        {/* Items and Cart Totals */}
        <div className="flex flex-col md:flex-row">
          {/* Items */}
          <div className="w-full md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Items - 4</h3>

            {/* Item List */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <img src="/assets/product1.png" alt="Product" className="w-20 h-20 object-cover rounded-md mb-4 sm:mb-0" />
                <div className="w-full sm:w-auto sm:flex-grow px-4">
                  <h4 className="font-semibold">Timeless A-line Evening Dress</h4>
                  <p className="text-gray-500">Fit + Ankle-length &nbsp; Price $109.99</p>
                </div>
                <div className="w-24 sm:w-32 text-center mb-4 sm:mb-0">Medium</div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <button className="px-2">-</button>
                  <span className="mx-2">1</span>
                  <button className="px-2">+</button>
                </div>
                <button className="text-gray-500 hover:text-gray-700">save for later</button>
              </div>

              {/* Another item */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <img src="/assets/product2.png" alt="Product" className="w-20 h-20 object-cover rounded-md mb-4 sm:mb-0" />
                <div className="w-full sm:w-auto sm:flex-grow px-4">
                  <h4 className="font-semibold">Timeless A-line Evening Dress</h4>
                  <p className="text-gray-500">Fit + Ankle-length &nbsp; Price $109.99</p>
                </div>
                <div className="w-24 sm:w-32 text-center mb-4 sm:mb-0">Medium</div>
                <div className="flex items-center mb-4 sm:mb-0">
                  <button className="px-2">-</button>
                  <span className="mx-2">1</span>
                  <button className="px-2">+</button>
                </div>
                <button className="text-gray-500 hover:text-gray-700">save for later</button>
              </div>
            </div>
          </div>

          {/* Cart Totals */}
          <div className="w-full md:w-1/3 md:ml-4">
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Cart totals</h3>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$66</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charge</p>
                <p>$6</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>$72</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                🚚 3 days delivery
                <span className="text-green-600 cursor-pointer ml-2">Change</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Your address<br/>
                Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India
              </p>
              <button className="mt-4 text-sm text-gray-700 hover:underline">Add a delivery instruction</button>

              <div className="flex items-center mt-4">
                <input type="checkbox" id="singlePack" className="mr-2" />
                <label htmlFor="singlePack" className="text-sm">Get All these items in single pack</label>
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
