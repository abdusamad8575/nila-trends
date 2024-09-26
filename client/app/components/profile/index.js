// "use client";
// import Image from 'next/image';
// import Link from 'next/link';
// import { useDispatch } from 'react-redux';
// import {clearUserDetails } from '../../../redux/actions/userActions';
// import { useRouter } from 'next/navigation';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const router = useRouter()

//   const logoutUser = () => {
//     dispatch(clearUserDetails());

//     localStorage.removeItem('Tokens');
//     router.push('/')
//   };
//   return (
//     <div className="w-full flex justify-center items-center md:mt-1 p-4 bg-gray-50">
//       {/* Mobile View - Updated to match the provided image */}
//       <div className="w-full max-w-xl h-full bg-white rounded-2xl shadow-lg p-4 md:hidden">
//         <h1 className="text-2xl font-bold mb-4">Hey! Matilda Pallu</h1>

//         {/* Profile Section */}
//         <div className="flex items-center mb-6">
//           <Image
//             src="/assets/profile.png"
//             alt="Profile Picture"
//             width={70}
//             height={70}
//             className="rounded-full"
//           />
//           <div className="ml-4">
//             <p className="text-gray-600">matildapallu@gmail.com</p>
//             <p className="font-bold">Matilda Pallu</p>
//             <p>Ph : 9876123450</p>
//           </div>
//         </div>

//         {/* Action Buttons - Coupons and Support */}
//         <div className="flex justify-between mb-6">
//           <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
//             <span className="mr-2">🎟️</span>
//             <span>Coupons</span>
//           </button>
//           <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
//             <span className="mr-2">🎧</span>
//             <span>Support</span>
//           </button>
//         </div>

//         {/* My Orders */}
//         <h2 className="text-xl font-bold mb-4">My Orders</h2>
//         <div className="flex justify-around mb-6">
//           <button className="flex flex-col items-center text-gray-700">
//             <span className="text-2xl mb-1">↩️</span>
//             <span className="text-sm">Return</span>
//           </button>
//           <button className="flex flex-col items-center text-gray-700">
//             <span className="text-2xl mb-1">⚙️</span>
//             <span className="text-sm">Processing</span>
//           </button>
//           <button className="flex flex-col items-center text-gray-700">
//             <span className="text-2xl mb-1">🚚</span>
//             <span className="text-sm">Shipping</span>
//           </button>
//           <button className="flex flex-col items-center text-gray-700">
//             <span className="text-2xl mb-1">💳</span>
//             <span className="text-sm">Unpaid</span>
//           </button>
//         </div>

//         {/* Links */}
//         <div className="space-y-4">
//           <Link href="#" className="flex justify-between items-center text-gray-700 text-lg">
//             Shipping addresses
//             <span className="text-gray-400">&gt;</span>
//           </Link>
//           <Link href="#" className="flex justify-between items-center text-gray-700 text-lg">
//             Settings
//             <span className="text-gray-400">&gt;</span>
//           </Link>
//           <button className="text-red-500 text-lg font-semibold">Sign Out</button>
//         </div>
//       </div>

//       {/* Desktop View - Updated to match the reference image */}
//       <div className="w-full h-full bg-white hidden md:block">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">My Profile</h1>
//         </div>

//         <div className="flex gap-8">
//           {/* Left Section */}
//           <div className="w-2/3">
//             <div className="flex items-center mb-6">
//               <Image
//                 src="/assets/profile.png"
//                 alt="Profile Picture"
//                 width={80}
//                 height={80}
//                 className="rounded-full"
//               />
//               <div className="ml-4">
//                 <p className="text-gray-600">matildapallu@gmail.com</p>
//                 <p className="font-bold">Matilda Pallu</p>
//                 <p>Ph : 9876123450</p>
//               </div>
//             </div>

//             <h2 className="text-xl font-bold mb-4">Shipping addresses</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {[1, 2, 3, 4].map((item) => (
//                 <div key={item} className="border rounded-lg p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold">Matilda Pallu</p>
//                       <p>98937778492</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">Edit</button>
//                       <div className={`w-4 h-4 rounded-full ${item % 2 === 1 ? 'bg-blue-500' : 'border border-gray-300'}`}></div>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600">Manzil, Neettani,, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
//                 </div>
//               ))}
//             </div>

//             <h2 className="text-xl font-bold mt-8 mb-4">Settings</h2>
//             <button className="text-red-500 font-bold" onClick={logoutUser}>Sign Out</button>
//           </div>

//           {/* Right Section */}
//           <div className="w-1/3">
//             <h2 className="text-xl font-bold mb-4">My Orders</h2>
//             <div className="flex space-x-2 mb-4">
//               {['Delivered', 'Processing', 'Cancelled', 'returned'].map((status, index) => (
//                 <button
//                   key={index}
//                   className={`px-3 py-1 rounded-full text-sm ${
//                     status === 'Delivered' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   {status}
//                 </button>
//               ))}
//             </div>

//             <div className="space-y-4">
//               {[1, 2].map((item) => (
//                 <div key={item} className="bg-gray-100 rounded-lg p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-bold">Order No : 1947034</p>
//                       <p className="text-xs text-gray-600">Shipping addresses</p>
//                       <p className="text-xs text-gray-600 max-w-xs">Manzil, Neettani,, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
//                     </div>
//                     <p className="text-sm text-gray-600">22-07-2024</p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm">Quantity : 4</p>
//                     <div className="text-right">
//                       <p className="text-sm">Total Amount $109.99</p>
//                       <Link href={'/orderdetails'}><button className="text-sm bg-gray-200 px-3 py-1 rounded-full mt-1">Details</button></Link>
//                     </div>
//                   </div>
//                   <p className="text-green-500 text-sm mt-2">Delivered</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../axios';
import { useDispatch,useSelector } from 'react-redux';
import { clearUserDetails } from '../../../redux/actions/userActions';
import dayjs from 'dayjs';
import { FaPencilAlt } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [user, setUser] = useState(null);
  const userDetails = useSelector(state => state.userDetails);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('/assets/avatar.png');
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newAddress, setNewAddress] = useState({ firstname: '', lastname: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', mobile: '' });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Placed');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/orders/client?status=${selectedStatus}`)
      .then((res) => setOrders(res?.data?.data))
      .catch((error) => console.error(error));
  }, [selectedStatus,userDetails]);
  // useEffect(() => {
  //   axiosInstance.get('/user')
  //     .then((res) => setUser(res?.data?.data))
  //     .catch((error) => console.error(error));     
  // }, []);

  useEffect(() => {
    axiosInstance.get('/user')
      .then((res) => {
        setUser(res?.data?.data);
        setPreviewImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${res?.data?.data?.profile}` || '/assets/avatar.png');
      })
      .catch((error) => console.error(error));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleIconClick = () => {
    document.getElementById('profileImageInput').click();
  };

  const saveUserDetails = () => {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('username', user.username);
    formData.append('phone', user.phone);
    if (profileImage) {
      formData.append('profile', profileImage);
    }

    axiosInstance.post('/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => alert('User details updated.'))
      .catch((error) => console.error(error));
  };



  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get('/address');
      setAddresses(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);


  // const saveUserDetails = () => {
  //   axiosInstance.post('/user', user)
  //     .then(() => alert('User details updated.'))
  //     .catch((error) => console.error(error));
  // };

  const addAddress = () => {
    axiosInstance.post('/address', newAddress)
      .then((res) => {
        setShowAddressForm(false);
        setAddresses(res?.data?.data)
        setNewAddress({
          firstname: '', lastname: '', email: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', country: '', mobile: '', type: ''
        });
      })
      .catch((error) => console.error(error));
  };

  const editAddress = async () => {
    try {
      const res = await axiosInstance.patch(`/address`, { ...newAddress, _id: editId });
      setShowAddressForm(false);
      setIsEditing(false);
      setAddresses(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (address) => {
    setNewAddress(address);
    setEditId(address._id);
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/address/${id}`);
      console.log('res?.data', res?.data);
      setAddresses(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateFields = () => {
    const { firstname, lastname, email, address_line_1, city, state, zip, country, mobile } = newAddress;
    if (!firstname || !lastname || !email || !address_line_1 || !city || !state || !zip || !country || !mobile) {
      return false;
    }
    return true;
  };

  const logoutUser = () => {
    dispatch(clearUserDetails());

    localStorage.removeItem('Tokens');
    router.push('/')
  };


  // console.log('addresses', addresses);
  // console.log('orders', orders);
  // console.log('user', user);

  return (
    <div className="w-full flex justify-center items-center md:mt-1 p-4 bg-gray-50">
      <div className='w-full max-w-xl h-full bg-white rounded-2xl shadow-lg p-4 md:hidden'>
        {user && (
          <>
            <h1 className="text-2xl font-bold mb-4">Hey! {user?.username || 'User'}</h1>
           

            <div className="flex flex-col sm:flex-row items-center mb-6">

              {/* Profile Image Container */}
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

              {/* Profile Info */}
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

            {/* Action Buttons */}
            {/* <div className="flex justify-between mb-6">
              <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
                <span className="mr-2">🎟️</span>
                <span>Coupons</span>
              </button>
              <button className="flex-1 bg-gray-100 py-3 mx-2 rounded-lg text-center flex items-center justify-center">
                <span className="mr-2">🎧</span>
                <span>Support</span>
              </button>
            </div> */}

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

      </div>

      {/* Desktop View - Updated to match the reference image */}
      <div className="w-full h-full bg-white hidden md:block p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        {user && (
          <>
            <div className="flex gap-8">
              {/* Left Section */}
              <div className="w-2/3">
                <div className="flex items-center mb-6">
                  <div className="relative cursor-pointer">
                    <img
                      src={previewImage}
                      alt="Profile Picture"
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      onClick={handleIconClick}
                    >
                      <FaPencilAlt className="text-white text-2xl" />
                    </div>
                    <input
                      id="profileImageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  <div className="ml-4 flex flex-col">
                    <input
                      type="text"
                      className="font-bold"
                      placeholder="Username"
                      value={user?.username || ''}
                      onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <input
                      type="text"
                      className="text-gray-600"
                      placeholder="Email"
                      value={user?.email || ''}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={user?.phone || ''}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                  </div>
                </div>
                <button onClick={saveUserDetails} className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4">
                  Save Details
                </button>

                <h2 className="text-xl font-bold mb-4">Shipping addresses</h2>
                <div className="grid grid-cols-2 gap-4">
                  {addresses?.length > 0 ? addresses?.map((address, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold">{address?.firstname} {address?.lastname}</p>
                          <p>Email: {address?.email}</p>
                          <p>Phone: {address?.mobile}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleEditClick(address)} className="bg-gray-200 text-sm px-3 py-1 rounded-full">Edit</button>
                          <button onClick={() => handleDelete(address._id)} className="text-red-500">Delete</button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{address?.address_line_1}, {address?.address_line_2}, {address?.city}, {address?.state}, {address?.zip}, {address?.country}</p>
                    </div>
                  )) : <p className="text-red-500 flex justify-center">address not font</p>}
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
                </div>
                <div className='flex justify-center mt-5'>

                  <button onClick={() => setShowAddressForm(true)} className=" bg-gray-100 py-2 px-4 rounded-lg text-center">Add New Address</button>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Settings</h2>
                <button className="text-red-500 font-bold" onClick={logoutUser}>Sign Out</button>
              </div>


              {/* Right Section */}
              <div className="w-1/3">
                <h2 className="text-xl font-bold mb-4">My Orders</h2>
                <div className="flex space-x-2 mb-4">
                  {['Placed', 'Delivered', 'Canceled', 'Returned'].map((status, index) => (
                    <button
                      key={index}
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
              </div>
            </div>
          </>)}
      </div>

    </div>
  );
};

export default Profile;
