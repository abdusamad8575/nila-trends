import React from 'react'

const AddressForm = ({ data, dispatch }) => {
   const handleChange = (e) => {
      dispatch(prev => ({ ...prev, [e.target.name]: e.target.value }))
   }
   const fields = [
      { name: "firstname", placeholder: "First Name", label: "First Name" },
      { name: "lastname", placeholder: "Last Name", label: "Last Name" },
      { name: "email", placeholder: "Email Address", label: "Email Address" },
      { name: "address_line_1", placeholder: "Address Line 1", label: "Address Line 1" },
      { name: "address_line_2", placeholder: "Address Line 2", label: "Address Line 2" },
      { name: "city", placeholder: "City Name", label: "City Name" },
      { name: "zip", placeholder: "ZIP", label: "Postal Code" },
      { name: "state", placeholder: "State", label: "State" },
      { name: "country", placeholder: "Country", label: "Country" },
      { name: "mobile", placeholder: "Mobile", label: "Mobile Number" },
   ]
   return (
      <div className='grid grid-cols-2 gap-2 pb-6'>
         {fields?.map(item =>
            <div key={item?.name} className="">
               <label for="base-input" className="block mb-2 text-xs font-medium text-gray-900">{item?.label}</label>
               <input
                  type="text"
                  id="base-input"
                  placeholder={item?.placeholder}
                  value={data?.[item?.name]}
                  name={item?.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1 pl-3 text-xs md:text-sm" />
            </div>
         )}
      </div>
   )
}

export default AddressForm