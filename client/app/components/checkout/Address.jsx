import React, { useEffect, useState } from 'react'
import AddressForm from '../profile/AddressForm';
import axiosInstance from '../../../axios';

const Address = ({ data, dispatch, selected }) => {
   const initData = { fullname: '', email: '', address_line_1: '', address_line_2: '', emirate: 'Select your Emirate', area: '', code: '+971', mobile: '', type: 'home' }
   const [addresses, setAddresses] = useState(data);
   const [newAddress, setNewAddress] = useState(initData);
   const [showAddressForm, setShowAddressForm] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   useEffect(() => {
      setAddresses(data)
      console.warn(data)
   }, [data])
   const addAddress = () => {
      axiosInstance.post('/address', newAddress)
         .then((res) => {
            setShowAddressForm(false);
            setAddresses(res?.data?.data)
            setNewAddress(initData);
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
   const handleAddClick = () => {
      setIsEditing(false);
      setNewAddress(initData);
      setShowAddressForm(true)
   };

   const validateFields = () => {
      const { fullname, email, address_line_1, emirate, area, code, mobile } = newAddress;
      if (!fullname || !email || !address_line_1 || !emirate || emirate === "Select your Emirate" || !area || !code || !mobile) {
         return false;
      }
      return true;
   };

   return (
      <div className='py-4'>
         <div className='flex justify-between'>
            <h2 className="text-sm md:text-md font-medium mb-4">Your saved addresses</h2>
            <button onClick={handleAddClick} className="text-blue-400 text-xs md:text-sm px-4">+ Add New Address</button>
         </div>
         <div className="grid xl:grid-cols-2 gap-4">
            {(!addresses?.length || showAddressForm) ?
               <div className="border col-span-2 rounded-lg p-4">
                  <AddressForm data={newAddress} dispatch={setNewAddress} />
                  <hr />
                  <div className='flex justify-end gap-2 items-center pt-3'>
                     <button
                        onClick={() => setShowAddressForm(false)}
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
               : addresses?.map(address =>
                  <div key={address._id} onClick={() => dispatch(address)} className={`flex flex-row gap-2 text-xs md:text-sm border-2 rounded-lg p-4 ${selected._id === address._id && "border-blue-400"}`}>
                     <input id={`checkbox-${address._id}`} type="radio" name='address' className="cursor-pointer w-4 h-4 mt-1" checked={selected._id === address._id} />
                     <div className="relative flex justify-between items-start mb-2 w-full">
                        <div>
                           <p className="font-bold">{address?.fullname}</p>
                           <p className="text-gray-600">{address?.address_line_1}, {address?.address_line_2}, {address?.area}, {address?.emirate}</p>
                           <p className="text-gray-600">Email: {address?.email}</p>
                           <p className="text-gray-600">Phone: {address?.code} {address?.mobile}</p>
                           <div className="xl:flex hidden items-center gap-2 mt-auto pt-3">
                              <button onClick={() => handleEditClick(address)} className="font-medium text-blue-400">Edit Address</button>
                           </div>
                        </div>
                        <div className="flex items-center xl:hidden gap-2">
                           <button onClick={() => handleEditClick(address)} className="font-medium text-blue-400">Edit Address</button>
                        </div>
                     </div>
                  </div>
               )}
         </div>
      </div>
   )
}

export default Address