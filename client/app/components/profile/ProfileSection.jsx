"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserDetails } from '../../../redux/actions/userActions';
import { FaPencilAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AddressForm from './AddressForm';

const ProfileSection = ({ showOrders }) => {
   const dispatch = useDispatch();
   const router = useRouter()

   const [user, setUser] = useState(null);
   const userDetails = useSelector(state => state.userDetails);
   const [profileImage, setProfileImage] = useState(null);
   const [previewImage, setPreviewImage] = useState('/assets/avatar.png');
   const [addresses, setAddresses] = useState([]);
   const [newAddress, setNewAddress] = useState({ fullname: '', email: '', address_line_1: '', address_line_2: '', emirate: 'Select your Emirate', area: '', code: '+971', mobile: '', type: 'home' });
   const [showAddressForm, setShowAddressForm] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

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
         .then(() => toast.success('User details updated.'))
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

   const addAddress = () => {
      axiosInstance.post('/address', newAddress)
         .then((res) => {
            setShowAddressForm(false);
            setAddresses(res?.data?.data)
            setNewAddress({
               fullname: '', email: '', address_line_1: '', address_line_2: '', emirate: 'Select your Emirate', area: '', code: '+971', mobile: '', type: 'home'
            });
         })
         .catch((error) => console.error(error));
   };

   const editAddress = async () => {
      try {
         const res = await axiosInstance.patch(`/address`, newAddress);
         setShowAddressForm(false);
         setIsEditing(false);
         setAddresses(res?.data?.data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleEditClick = (address) => {
      setNewAddress(address);
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
      const { fullname, email, address_line_1, emirate, area, code, mobile } = newAddress;
      if (!fullname || !email || !address_line_1 || !emirate || emirate === "Select your Emirate" || !area || !code || !mobile) {
         return false;
      }
      return true;
   };

   const logoutUser = () => {
      dispatch(clearUserDetails());
      localStorage.removeItem('Tokens');
      router.push('/')
   };

   useEffect(() => {
      axiosInstance.get('/user')
         .then((res) => {
            setUser(res?.data?.data);
            setPreviewImage(`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${res?.data?.data?.profile}` || '/assets/avatar.png');
         })
         .catch((error) => console.error(error));
   }, []);

   return (
      <div>
         <div className='mb-6 p-3 border rounded-md'>
            <div className="flex items-center ">
               <div className="relative overflow-hidden rounded-full cursor-pointer w-20 h-20 bg-black">
                  <Image
                     src={previewImage}
                     alt="Profile Picture"
                     fill
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

               <div className="ml-4 flex flex-col text-sm md:text-base">
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
            <button onClick={saveUserDetails} className="text-blue-500 mt-3 text-sm">
               Save Changes
            </button>
         </div>

         <div className='flex justify-between mt-5'>
            <h2 className="text-md md:text-xl font-bold mb-4">Shipping addresses</h2>
            <button onClick={() => setShowAddressForm(true)} className="text-blue-400 text-xs md:text-sm px-4">+ Add New Address</button>
         </div>
         <div className="grid xl:grid-cols-2 gap-4">
            {(!addresses?.length || showAddressForm) ?
               <div className="border col-span-2 rounded-lg p-4">
                  <AddressForm data={newAddress} dispatch={setNewAddress} />
                  <hr />
                  <div className='flex justify-end gap-2 items-center pt-3'>
                     <button
                        onClick={() => {
                           setShowAddressForm(false)
                           setNewAddress({})
                        }}
                        className="px-3 py-1.5 text-xs md:text-sm text-gray-900 focus:outline-none bg-yellow-400 rounded-lg border border-gray-200 hover:bg-yellow-200"
                     >
                        Discard Changes
                     </button>
                     <button
                        onClick={isEditing ? editAddress : addAddress}
                        className={`px-3 py-1.5 text-xs md:text-sm text-gray-900 focus:outline-none  ${!validateFields() ? "bg-gray-200 cursor-not-allowed" : "bg-yellow-400"} rounded-lg border hover:bg-yellow-200`}
                        disabled={!validateFields()}
                     >
                        {isEditing ? 'Update Address' : 'Add Address'}
                     </button>
                  </div>
               </div>
               : addresses?.map((address, index) =>
                  <div key={index} className="flex flex-col text-xs md:text-sm border rounded-lg p-4">
                     <div className="relative flex justify-between items-start mb-2">
                        <div>
                           <p className="font-bold">{address?.fullname}</p>
                           <p>Email: {address?.email}</p>
                           <p>Phone: {address?.code} {address?.mobile}</p>
                        </div>
                        <div className="flex items-center xl:hidden gap-2">
                           <button onClick={() => handleEditClick(address)} className="font-medium">Edit</button>
                           <button onClick={() => handleDelete(address._id)} className="text-red-500 font-medium">Delete</button>
                        </div>
                     </div>
                     <p className="text-gray-600">{address?.address_line_1}, {address?.address_line_2}, {address?.area}, {address?.emirate}</p>
                     <div className="xl:flex hidden items-center gap-2 mt-auto pt-3">
                        <button onClick={() => handleEditClick(address)} className="font-medium">Edit</button>
                        <button onClick={() => handleDelete(address._id)} className="text-red-500 font-medium">Delete</button>
                     </div>
                  </div>
               )}
         </div>
         <div onClick={() => showOrders(prev => !prev)} className='flex justify-between md:hidden mt-8 mb-4'>
            <h2 className="text-xl font-bold ">My Orders</h2>
            <p className='text-xs text-blue-500'>view all orders</p>
         </div>
         <hr />
         <h2 className="text-xl font-bold mt-8 mb-4">Settings</h2><hr />
         <button className="text-red-500 font-bold" onClick={logoutUser}>Sign Out</button>
      </div>
   )
}

export default ProfileSection