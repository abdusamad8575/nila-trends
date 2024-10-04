'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const OrderDetailPage = () => {
  const [activeTab, setActiveTab] = useState('Delivered');
  const tabs = ['Delivered', 'Processing', 'Cancelled', 'returned'];

  const orderDetails = {
    orderNo: '1947034',
    date: '22-07-2024',
    shippingAddress: 'Manzil, Neettani,, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India',
    totalAmount: '$109.99',
    status: 'Delivered',
    quantity: 4,
    items: [
      {
        name: 'Timeless A-line Evening Dress',
        fit: 'Ankle-length',
        price: '$109.99',
        size: 'Medium',
        quantity: 1,
        image: '/assets/product1.png'
      },
      {
        name: 'Timeless A-line Evening Dress',
        fit: 'Ankle-length',
        price: '$109.99',
        size: 'Medium',
        quantity: 1,
        image: '/assets/product2.png'
      }
    ]
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl mt-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <button className="text-gray-500 text-2xl">&times;</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === tab ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          {[1, 2].map((_, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Order No : {orderDetails.orderNo}</p>
                  <p className="text-xs text-gray-600">Shipping addresses</p>
                  <p className="text-xs text-gray-600 max-w-xs">{orderDetails.shippingAddress}</p>
                </div>
                <p className="text-sm text-gray-600 mt-2 sm:mt-0">{orderDetails.date}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
                <p className="text-sm">Quantity : {orderDetails.quantity}</p>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                  <p className="text-sm">Total Amount {orderDetails.totalAmount}</p>
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded-full mt-1">Details</button>
                </div>
              </div>
              <p className="text-green-500 text-sm mt-2">{orderDetails.status}</p>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default OrderDetailPage;