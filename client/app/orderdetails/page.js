'use client';
import React, { useState } from 'react';

const OrderPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy order data for demo purposes
  const orders = [
    {
      id: '1947034',
      address: 'Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India',
      quantity: 4,
      total: 109.99,
      status: 'Delivered',
      date: '22-07-2024',
      items: [
        { name: 'Timeless A-line Evening Dress', size: 'Medium', price: 109.99, quantity: 1, image: '/dress1.jpg' },
        { name: 'Timeless A-line Evening Dress', size: 'Medium', price: 109.99, quantity: 1, image: '/dress2.jpg' },
      ],
    },
    {
      id: '1947035',
      address: 'John Doe, Sample Address, City, STATE, 123456, USA',
      quantity: 2,
      total: 299.99,
      status: 'Processing',
      date: '15-07-2024',
      items: [
        { name: 'Casual T-Shirt', size: 'Large', price: 29.99, quantity: 1, image: '/shirt.jpg' },
        { name: 'Jeans', size: '32', price: 49.99, quantity: 1, image: '/jeans.jpg' },
      ],
    },
  ];

  return (
    <div className="order-page">
      {/* Order List Section */}
      <div className="order-list">
        <h2>My Orders</h2>
        <div className="order-filters">
          <button className="filter-btn">Delivered</button>
          <button className="filter-btn">Processing</button>
          <button className="filter-btn">Cancelled</button>
          <button className="filter-btn">Returned</button>
        </div>

        {/* Orders */}
        <div className="orders">
          {orders.map((order) => (
            <div className="order-card" key={order.id} onClick={() => setSelectedOrder(order)}>
              <div className="order-info">
                <p>Order No: <strong>{order.id}</strong></p>
                <p>Shipping address: {order.address}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total Amount: ${order.total}</p>
              </div>
              <div className="order-status">
                <p>{order.status}</p>
                <button className="details-btn">Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Section */}
      <div className="order-details">
        {selectedOrder ? (
          <>
            <div className="details-header">
              <h3>Order No: {selectedOrder.id}</h3>
              <p>Shipping address: {selectedOrder.address}</p>
              <p>Date: {selectedOrder.date}</p>
              <p>Total Amount: ${selectedOrder.total}</p>
              <p>Status: {selectedOrder.status}</p>
            </div>
            <div className="items-list">
              <h3>Items - {selectedOrder.items.length}</h3>
              {selectedOrder.items.map((item, index) => (
                <div className="item-card" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <p>{item.name}</p>
                    <p>Size: {item.size}</p>
                    <p>Price: ${item.price}</p>
                    <div className="quantity">
                      <button>-</button>
                      <span>{item.quantity}</span>
                      <button>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>Select an order to view details</div>
        )}
      </div>

      <style jsx>{`
        /* Basic styling for the order page */
        .order-page {
          display: flex;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .order-list {
          flex: 1;
          border-right: 1px solid #e0e0e0;
          padding-right: 20px;
        }

        .order-details {
          flex: 2;
          padding-left: 20px;
        }

        .order-filters {
          margin-bottom: 20px;
        }

        .filter-btn {
          margin-right: 10px;
          background-color: #e0e0e0;
          border: none;
          padding: 10px;
          border-radius: 20px;
          cursor: pointer;
        }

        .order-card {
          background-color: #f9f9f9;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .order-info {
          font-size: 14px;
        }

        .details-btn {
          background-color: #eee;
          border: none;
          padding: 8px 12px;
          border-radius: 20px;
          cursor: pointer;
        }

        .item-card {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .item-card img {
          width: 100px;
          height: auto;
          margin-right: 20px;
        }

        .item-details {
          flex: 1;
        }

        .quantity {
          display: flex;
          align-items: center;
        }

        .quantity button {
          background-color: #eee;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default OrderPage;
