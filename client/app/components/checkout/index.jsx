import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useRef, useState } from 'react'

function Checkout() {
  const [DeliveryInstruction, setDeliveryInstruction] = useState(false)
  const [DeliveryAddress, setDeliveryAddress] = useState(false)
  const [coupon, setCoupon] = useState(null);
  const [addCoupon, setAddCoupon] = useState(false);
  const inputRef = useRef()

  const handleCoupon = () => {
    if (inputRef.current) {
      setAddCoupon(false);
      setCoupon(inputRef.current.value)
    }
  }
  const handleDeliveryAddress = () => {
    setDeliveryAddress(!DeliveryAddress);
  }
  const handleDeliveryInstruction = () => {
    setDeliveryInstruction(!DeliveryInstruction);
  }

  return (
    <div className='flex flex-col gap-3 p-4'>
      <h2 className='font-bold text-lg pt-16 md:pt-1'>Proceed to Checkout</h2>
      <hr className='border-dashed ' />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between"> <p>Subtotal</p><p>$<span>66</span></p>  </div>
        <div className="flex flex-row justify-between"> <p>Delivery Charge</p><p>$<span>66</span></p> </div>
        {coupon && <div className="flex flex-row justify-between"> <p>Coupon discount</p><p>$<span>20</span></p> </div>}
        <hr className='border-dashed ' />
        <div className="flex flex-row justify-between"> <p>Total Charge</p><p>$<span>77</span></p> </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex-row flex gap-3"> <p>Shipping</p><Svg /><p><span className='text-green-500'>3 - 7</span> days delivery</p> </div>
          <label onClick={handleDeliveryAddress} className='text-green-500 cursor-pointer'>{DeliveryAddress ? <p>Change</p> : <p>Save</p>} </label>
        </div>
        <div className="flex flex-row justify-between"> <p>Your addresses</p> </div>
        {DeliveryAddress ? <p className='font-semibold'>Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p> :
          <div className="flex flex-col gap-1.5 justify-between px-5 py-2 border rounded-md overflow-y-auto h-24">
            <ul className="w-full text-sm font-medium ">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index} className="w-full">
                  <div className="flex items-start gap-3" onClick={handleDeliveryAddress}>
                    <input id={`checkbox-${index}`} type="checkbox" value="" className="cursor-pointer w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label htmlFor={`checkbox-${index}`} className="w-full text-sm font-medium cursor-pointer">Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>}
      </div>
      <div className="flex flex-row flex-wrap gap-2 mt-2">
        <div onClick={() => setAddCoupon(!addCoupon)} className="bg-gray-100 border-dashed rounded-full border-2 border-gray-300 cursor-pointer">
          <p className='text-center text-sm px-5'> Add coupon <span>{addCoupon ? <CloseOutlined /> : <PlusOutlined />}</span></p>
        </div>
        <div onClick={handleDeliveryInstruction} className="bg-gray-100 border-dashed rounded-full border-2 border-gray-300 px-2 w-58 cursor-pointer">
          <p className='text-center  text-sm'> Add delivery Instruction  <span>{DeliveryInstruction ? <CloseOutlined /> : <PlusOutlined />}</span></p>
        </div>
      </div>
      {addCoupon && (
        <div className='flex mt-1 bg-black rounded-lg'>
          <input ref={inputRef} className="w-full border rounded-lg h-8 outline-none" placeholder="   Add a Coupon Code" />
          <button onClick={handleCoupon} className='bg-[#1F1F1F] text-white rounded-md px-3'>apply</button>
        </div>)}
      {DeliveryInstruction && (<Input className='rounded-lg' placeholder="Add a delivery Instruction" />)}
      <hr className='border-dashed' />
      {coupon && <div className='flex gap-2'>
        <div
          onClick={handleDeliveryInstruction}
          className="bg-[#FBFFFF] bg-gradient-to-tr to-[#FBFFFF] from-[#EAC4A2] border-dashed rounded-full border-2 border-gray-300 px-2 w-1/3"
        >
          <p className="text-center text-sm">{coupon}</p>
        </div>
        <span className='text-green-500 text-sm'>coupon applied <CheckOutlined /></span>
      </div>}

      <div className="flex pt-2 h-full">
        <p className=" w-full text-xs font-medium ">Review the order carefully, by proceeding will redirect to secure payment gateway page.</p>
      </div>
      <button className='bg-[#1F1F1F] text-white py-2 rounded-lg'>Proceed To Payment</button>
    </div>
  )
}

export default Checkout



const Svg = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 17.5C19.5 18.163 19.2366 18.7989 18.7678 19.2678C18.2989 19.7366 17.663 20 17 20C16.337 20 15.7011 19.7366 15.2322 19.2678C14.7634 18.7989 14.5 18.163 14.5 17.5C14.5 16.837 14.7634 16.2011 15.2322 15.7322C15.7011 15.2634 16.337 15 17 15C17.663 15 18.2989 15.2634 18.7678 15.7322C19.2366 16.2011 19.5 16.837 19.5 17.5ZM9.5 17.5C9.5 18.163 9.23661 18.7989 8.76777 19.2678C8.29893 19.7366 7.66304 20 7 20C6.33696 20 5.70107 19.7366 5.23223 19.2678C4.76339 18.7989 4.5 18.163 4.5 17.5C4.5 16.837 4.76339 16.2011 5.23223 15.7322C5.70107 15.2634 6.33696 15 7 15C7.66304 15 8.29893 15.2634 8.76777 15.7322C9.23661 16.2011 9.5 16.837 9.5 17.5Z" stroke="#545454" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.5 17.5H9.5M19.5 17.5H20.263C20.483 17.5 20.593 17.5 20.685 17.488C21.016 17.4468 21.3239 17.2964 21.5599 17.0606C21.7959 16.8248 21.9465 16.517 21.988 16.186C22 16.093 22 15.983 22 15.763V13C22 11.2761 21.3152 9.62279 20.0962 8.40381C18.8772 7.18482 17.2239 6.5 15.5 6.5M2 4H12C13.414 4 14.121 4 14.56 4.44C15 4.878 15 5.585 15 7V15.5M2 12.75V15C2 15.935 2 16.402 2.201 16.75C2.33265 16.978 2.52199 17.1674 2.75 17.299C3.098 17.5 3.565 17.5 4.5 17.5M2 7H8M2 10H6" stroke="#545454" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}




const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false)
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <label className='flex items-center cursor-pointer select-none text-dark'>
      <div className='relative'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <div className='box mr-4 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-dark-3'>
          <span className='opacity-0'>
            <svg
              width='11'
              height='8'
              viewBox='0 0 11 8'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z'
                fill='#3056D3'
                stroke='#3056D3'
                strokeWidth='0.4'
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <p>Get All these items in single pack</p>
    </label>
  )
}