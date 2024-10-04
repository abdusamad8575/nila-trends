"use client";
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useSelector } from 'react-redux';
import OrderList from './OrderList';
import ProfileSection from './ProfileSection';
import OrderDetails from './OrderDetails';

const Profile = () => {

  const [showOrders, setShowOrders] = useState(false)

  const [user, setUser] = useState(null);
  const userDetails = useSelector(state => state.userDetails);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(orders?.[0] ?? null);
  const [selectedStatus, setSelectedStatus] = useState('Placed');

  useEffect(() => {
    axiosInstance.get(`/orders/client?status=${selectedStatus}`)
      .then((res) => setOrders(res?.data?.data))
      .catch((error) => console.error(error));
  }, [selectedStatus, userDetails]);

  useEffect(() => {
    axiosInstance.get('/user')
      .then((res) => {
        setUser(res?.data?.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSelect = (data) => {
    setSelectedOrder(data)
    setShowOrders(true)
  }
  const handleBack = () => {
    selectedOrder ? setSelectedOrder(null)
      : setShowOrders(false)
  }
  return (
    <div className="w-full py-20 lg:pt-1 md:h-[70vh] bg-white  sm:block p-4">
      <div className="flex justify-between items-center mb-6">
        {!showOrders ?
          <h1 className="text-2xl font-bold">My Profile</h1> : <>
            <button className='hidden md:block font-semibold text-base' onClick={() => setShowOrders(false)}>← Back</button>
            <button className='md:hidden font-semibold text-base' onClick={handleBack}>← Back</button>
          </>
        }
      </div>
      {user && (
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className={`w-full md:w-1/2 xl:w-3/5 order-${showOrders ? 1 : 0}`}>
            {showOrders ? <OrderDetails data={selectedOrder} /> : <ProfileSection showOrders={setShowOrders} />}
          </div>
          <div className={`w-full md:w-1/2 xl:w-2/5 order-${showOrders ? 0 : 1} ${showOrders ? "block" : "hidden"} md:block`}>
            <OrderList
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              orders={orders} selectedOrder={selectedOrder}
              setSelectedOrder={handleSelect}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;




{/* <div className='w-full max-w-xl h-full bg-white rounded-2xl shadow-lg p-4 md:hidden'>
{user && (
  <>
    <h1 className="text-2xl font-bold mb-4">Hey! {user?.username || 'User'}</h1>


    <div className="flex flex-col sm:flex-row items-center mb-6">

      <div className="relative cursor-pointer w-20 h-20 sm:w-24 sm:h-24">
        <img
          src={previewImage}
          alt="Profile Picture"
          className="rounded-full object-cover w-full h-full"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          onClick={handleIconClick}
        >
          <FaPencilAlt className="text-white text-xl sm:text-2xl" />
        </div>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <div className="ml-4 mt-4 sm:mt-0 flex flex-col">
        <input
          type="text"
          className="font-bold text-lg"
          placeholder="Username"
          value={user.username || ''}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="text"
          className="text-gray-600 mt-2"
          placeholder="Email"
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          className="mt-2"
          placeholder="Phone"
          value={user.phone || ''}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
      </div>
    </div>

    <button onClick={saveUserDetails} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
      Save Details
    </button>

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

    <h2 className="text-xl font-bold mb-4">Shipping Addresses</h2>
    <div className="space-y-4">
      {addresses?.length > 0 ? addresses?.map((address) => (
        <div key={address._id} className="border rounded-lg p-4">
          <p className="font-bold">{address?.firstname} {address?.lastname}</p>
          <p className="text-sm text-gray-600">{address?.address_line_1}, {address?.address_line_2}, {address?.city}, {address?.state}, {address?.zip}, {address?.country}</p>
          <p className="text-sm text-gray-600">Email: {address?.email}</p>
          <p className="text-sm text-gray-600"> {address?.mobile}</p>
          <div className="flex justify-between items-center  mt-4">
            <button onClick={() => handleEditClick(address)} className="bg-gray-200 text-sm px-3 py-1 rounded-full">Edit</button>
            <button onClick={() => handleDelete(address._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      )) : <p className="text-red-500  flex justify-center">address not font</p>}
      {showAddressForm && (
        <div className="border rounded-lg p-4">
          <input
            type="text"
            placeholder="First Name"
            value={newAddress.firstname}
            onChange={(e) => setNewAddress({ ...newAddress, firstname: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newAddress.lastname}
            onChange={(e) => setNewAddress({ ...newAddress, lastname: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newAddress.email}
            onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="Address Line 1"
            value={newAddress.address_line_1}
            onChange={(e) => setNewAddress({ ...newAddress, address_line_1: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="Address Line 2"
            value={newAddress.address_line_2}
            onChange={(e) => setNewAddress({ ...newAddress, address_line_2: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="State"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="ZIP"
            value={newAddress.zip}
            onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="Country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            className="w-full mb-2"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={newAddress.mobile}
            onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
            className="w-full mb-2"
          />
          <div className='flex justify-between items-center'>
            <button
              onClick={isEditing ? editAddress : addAddress}
              className=" bg-green-500 text-white py-2 px-4 rounded-lg"
              disabled={!validateFields()}
            >
              {isEditing ? 'Update Address' : 'Add Address'}
            </button>
            <button
              onClick={() => setShowAddressForm(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setShowAddressForm(true)} className="bg-gray-100 py-2 px-4 rounded-lg w-full text-center">Add New Address</button>
    </div>

    <h2 className="text-xl font-bold mt-8 mb-4">My Orders</h2>
    <div className="flex space-x-2 mb-4">
      {['Placed', 'Delivered', 'Canceled', 'Returned'].map((status) => (
        <button
          key={status}
          onClick={() => setSelectedStatus(status)}
          className={`px-3 py-1 rounded-full text-sm ${selectedStatus === status ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
            }`}
        >
          {status}
        </button>
      ))}
    </div>
    <div className="space-y-4">
      {orders?.map((order) => (
        <div key={order._id} className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-bold">Order No : {order?._id}</p>
              <p className="text-xs text-gray-600">Shipping addresses</p>
              <p className="text-xs text-gray-600 max-w-xs">{order?.address.address_line_1}, {order?.address.city}</p>
            </div>
            <p className="text-sm text-gray-600">{dayjs(order?.createdAt).format('DD/MM/YYYY')}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm">products : {order?.products?.item?.length} </p>
            <div className="text-right">
              <p className="text-sm">Total Amount AED:{order?.amount}</p>
              <Link href={'/'}><button className="text-sm bg-gray-200 px-3 py-1 rounded-full mt-1">Details</button></Link>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">{order?.status}</p>
        </div>
      ))}
    </div>
    <h2 className="text-xl font-bold mt-8 mb-4">Settings</h2>
    <button className="text-red-500 font-bold" onClick={logoutUser}>Sign Out</button>

  </>
)}

</div> */}