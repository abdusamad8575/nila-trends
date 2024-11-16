import React, { useState } from 'react'

const countries = [
   {
      name: "UAE", code: "+971", flag: <svg className='h-4 w-4' viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M30 0H0V20H30V0Z" fill="#F0F0F0" />
         <path d="M30 0H0V6.66643H30V0Z" fill="#6DA544" />
         <path d="M30 13.3329H0V19.9994H30V13.3329Z" fill="black" />
         <path d="M9.99978 0H0V20H9.99978V0Z" fill="#A2001D" />
      </svg>
   },
   {
      name: "India", code: "+91", flag: <svg className='h-4 w-4' viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M30 0H0V20H30V0Z" fill="#F0F0F0" />
         <path d="M30 0H0V6.66665H30V0Z" fill="#FF9811" />
         <path d="M30 13.3334H0V20H30V13.3334Z" fill="#6DA544" />
         <path d="M15.0017 12.572C16.4222 12.572 17.5737 11.4205 17.5737 9.99994C17.5737 8.57942 16.4222 7.42786 15.0017 7.42786C13.5812 7.42786 12.4297 8.57942 12.4297 9.99994C12.4297 11.4205 13.5812 12.572 15.0017 12.572Z" fill="#0052B4" />
         <path d="M14.9981 11.6074C15.8859 11.6074 16.6055 10.8877 16.6055 9.99995C16.6055 9.11216 15.8859 8.39246 14.9981 8.39246C14.1103 8.39246 13.3906 9.11216 13.3906 9.99995C13.3906 10.8877 14.1103 11.6074 14.9981 11.6074Z" fill="#F0F0F0" />
         <path d="M14.9992 8.01636L15.4951 9.14109L16.7171 9.0082L15.991 10L16.7171 10.9919L15.4951 10.859L14.9992 11.9837L14.5032 10.859L13.2812 10.9919L14.0073 10L13.2812 9.0082L14.5032 9.14109L14.9992 8.01636Z" fill="#0052B4" />
      </svg>
   },
];

const AddressForm = ({ data, dispatch }) => {
   const [selectedCountry, setSelectedCountry] = useState(data?.code === "+91" ? countries[1] : countries[0]);
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleCountrySelect = (country) => {
      setSelectedCountry(country);
      dispatch(prev => ({ ...prev, code: country?.code }))
      setDropdownOpen(false);
   };

   const handleChange = (e) => {
      dispatch(prev => ({ ...prev, [e.target.name]: e.target.value }))
   }
   const fields = [
      { name: "area", placeholder: "Area Name", label: "Area Name" },
      { name: "address_line_1", placeholder: "Building Name/Villa No.", label: "Building Name/Villa No." },
      { name: "address_line_2", placeholder: "Floor, Apartment No.", label: "Floor, Apartment No." },
   ]
   const personalInformation = [
      { name: "fullname", placeholder: "Enter your Full Name", label: "Full Name" },
      { name: "email", placeholder: "Enter your Email Address", label: "Email Address" },
   ]
   return (
      <div className='grid grid-cols-2 gap-3 pb-6'>
         <div className="col-span-2">
            <label htmlFor="emirate" className="block mb-2 text-xs font-medium text-gray-900">Emirate</label>
            <select
               id='emirate'
               value={data?.emirate}
               name="emirate"
               onChange={handleChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 pl-3 text-sm" >
               <option value="Select your Emirate" disabled>Select your Emirate</option>
               {["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"].map(item => <option key={item} value={item}>{item}</option>)}
            </select>
         </div>
         {fields?.map(item =>
            <div key={item?.name} className="col-span-2 md:col-span-1">
               <label htmlFor={item?.name} className="block mb-2 text-xs font-medium text-gray-900">{item?.label}</label>
               <input
                  type="text"
                  id={item?.name}
                  placeholder={item?.placeholder}
                  value={data?.[item?.name]}
                  name={item?.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 pl-3 text-sm" />
            </div>
         )}
         <div className="col-span-2">
            <p className="block mb-2 text-xs font-medium text-gray-900">Personal Information</p>
         </div>
         {personalInformation?.map(item =>
            <div key={item?.name} className="col-span-2 md:col-span-1">
               <label htmlFor={item?.name} className="block mb-2 text-xs font-medium text-gray-900">{item?.label}</label>
               <input
                  type="text"
                  id={item?.name}
                  placeholder={item?.placeholder}
                  value={data?.[item?.name]}
                  name={item?.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2 pl-3 text-sm" />
            </div>
         )}
         <div className="col-span-2 md:col-span-1">
            <label htmlFor="mobile" className="block mb-2 text-xs font-medium text-gray-900">
               Mobile Number
            </label>
            <div className="flex items-center">
               <button
                  id="dropdown-phone-button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex-shrink-0 z-10 inline-flex items-center gap-2 py-2.5 px-2 text-xs font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                  type="button"
               >
                  {selectedCountry.flag}
                  {selectedCountry.code}
               </button>

               {dropdownOpen && (
                  <div id="dropdown-phone" className="absolute mt-36 border z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52">
                     <ul className="py-2 text-sm text-gray-700">
                        {countries?.map(country =>
                           <li key={country?.code}>
                              <button
                                 type="button"
                                 onClick={() => handleCountrySelect(country)}
                                 className={`${selectedCountry?.name === country?.name && "bg-slate-200"} inline-flex w-full items-center gap-2 px-4 py-1 text-sm hover:bg-gray-100`}
                              >
                                 {country?.flag}
                                 {country?.name}&nbsp;({country?.code})
                              </button>
                           </li>
                        )}
                     </ul>
                  </div>
               )}
               <input
                  id="mobile"
                  name="mobile"
                  value={data?.mobile}
                  maxLength={10}
                  max={10}
                  onChange={(e) => {
                     e.target.value = e.target.value.replace(/\D/g, '');
                     handleChange(e)
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-r-lg block w-full p-2 pl-3 text-sm"
                  placeholder="Enter phone number"
               />
            </div>
         </div>
      </div>
   )
}

export default AddressForm