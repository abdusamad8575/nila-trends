"use client";
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Input, Radio } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../../../axios'
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../../../redux/actions/userActions';
import { setProfile } from '../../../redux/actions/storeActions';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import toast from 'react-hot-toast';

function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter()
  const storeData = useSelector(state => state.storeDetails);
  const storeDataCheckout = useSelector(state => state?.storeDetails?.checkout);
  const userDetails = useSelector(state => state.userDetails);
  const checkoutProduct = storeData?.checkoutProduct
  // const checkoutProduct = useSelector(state => state?.storeDetails?.checkoutProduct);
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const [DeliveryInstruction, setDeliveryInstruction] = useState(false)
  const [DeliveryAddress, setDeliveryAddress] = useState('')
  const [coupon, setCoupon] = useState(null);
  const [addCoupon, setAddCoupon] = useState(false);
  const inputRef = useRef()
  const [addresses, setAddresses] = useState([]);

  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [appliedCouponDetails, setAppliedCouponDetails] = useState('');
  const [discount, setDiscount] = useState(0);
  const [ordersCount, setOrdersCount] = useState();

  const fetchCoupons = async () => {
    try {
      const { data } = await axiosInstance.get('/coupons/client');
      setCoupons(data.data);
    } catch (error) {
      console.error('Failed to fetch coupons', error);
    }
  };


  // useEffect(() => {
  //   fetchCoupons();
  // }, [userDetails]);

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
  }, [storeData]);

  useEffect(() => {
    setOrdersCount(userDetails?.orderCount)
  }, [storeData, userDetails]);



  const [cartData, setCartData] = useState([])
  const [salePriceTotal, setSalePriceTotal] = useState(0)
  const [proPriceTotal, setProPriceTotal] = useState(0)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [selectedDaliveryDays, setSelectedDaliveryDays] = useState("12");

  const calculateTotalSalePrice = (items) => {
    let totalSalePrice = 0;

    items.forEach((item) => {
      totalSalePrice += item?.productId?.sale_rate * item?.qty;
    });
    return totalSalePrice;
  };
  const calculateTotalProPrice = (items) => {
    let totalSalePrice = 0;
    items.forEach((item) => {
      totalSalePrice += item?.productId?.price * item?.qty;
    });
    return totalSalePrice;
  };
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/user/getcarts`);
      setCartData(response?.data?.data)
      const items = response?.data?.data?.item;
      const filteredItems = items.filter((obj) => {
        return obj.productId.isAvailable != false
      })
      const totalSalePrice = calculateTotalSalePrice(filteredItems);
      setSalePriceTotal(totalSalePrice)
      const totalProPrice = calculateTotalProPrice(filteredItems);
      setProPriceTotal(totalProPrice)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    setAppliedCoupon('')
    setAppliedCouponDetails('')
    setDiscount(0)
    setCoupon(null)
    setAddCoupon(false)
    setDeliveryAddress('')
    setSelectedDaliveryDays('12')
    if (checkoutProduct) {
      const newCartItem = {
        item: [{
          productId: checkoutProduct?.product,
          size: checkoutProduct?.selectedSize,
          price: checkoutProduct?.product?.price,
          coupon: checkoutProduct?.coupon,
          qty: 1,
        }]
      };
      setCartData(newCartItem);
      const items = newCartItem?.item;
      const filteredItems = items.filter((obj) => {
        return obj.productId.isAvailable != false
      })
      const totalSalePrice = calculateTotalSalePrice(filteredItems);
      setSalePriceTotal(totalSalePrice)
      const totalProPrice = calculateTotalProPrice(filteredItems);
      setProPriceTotal(totalProPrice)
      // if(checkoutProduct?.coupon){
      //   handleCoupon(checkoutProduct?.coupon?.code)
      // }
    } else {
      setCartData([])
      fetchData()
    }
  }, [storeData])

  const handleCoupon = async (couponCode) => {
    console.log('samad coupons',coupons);
    console.log('samad couponCode',couponCode);

    try {
      setDiscount(0)
      // if (inputRef.current) {
      //   setAddCoupon(false);
      //   setCoupon(inputRef.current.value)
      // }
      let useCoupon;

      if (couponCode) {
        useCoupon = coupons?.filter((coupon) => {
          // console.log('coupon.code === couponCode',coupon.code, couponCode);

          if (coupon.code === couponCode) {
            setAppliedCoupon(coupon?.code);
            setCoupon(coupon?.code)
            setAppliedCouponDetails(coupon);
            return coupon
          }

        })
        useCoupon[0] ? '' : toast.error('your coupon code not exists')
      }
      if (useCoupon) {
        const couponId = useCoupon[0]?._id;

        const { data } = await axiosInstance.post('/coupons/validate-coupon', {
          couponId,
          userDetails,
          salePriceIncludingDeliveryCharge,
        });

        if (data.valid) {
          setDiscount(data.discount);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Failed to apply coupon', error);
    }
  };

  const handleDeliveryAddress = (details) => {
    setDeliveryAddress(details);
  }
  const handleDeliveryInstruction = () => {
    setDeliveryInstruction(!DeliveryInstruction);

  }
  const handleProfile = (state) => {
    isSmallScreen ? router.push('/profile') : dispatch(setProfile(state))
  }

  const deliveryCharge = Number(selectedDaliveryDays);
  const includedDeliveryCharge = ordersCount === 0 ? 0 : salePriceTotal < 200 ? salePriceTotal + deliveryCharge : 0;
  const salePriceIncludingDeliveryCharge = (includedDeliveryCharge ? includedDeliveryCharge : salePriceTotal).toFixed(2)
  const maximumDiscountPrice = ((appliedCouponDetails?.maxValue < ((salePriceIncludingDeliveryCharge * discount) / 100)) ? appliedCouponDetails?.maxValue : ((salePriceIncludingDeliveryCharge * discount) / 100)).toFixed(2)
  const lastTotal = discount > 0
    ? salePriceIncludingDeliveryCharge - maximumDiscountPrice : salePriceIncludingDeliveryCharge;

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };
  const handleDaliveryDaysChange = (e) => {
    setSelectedDaliveryDays(e.target.value);
  };
  const checkDaliveryDays = lastTotal < 200 ? (selectedDaliveryDays === '12' ? '2' : '1') : 'free'
  const deliveryDays = ordersCount === 0 ? 'free' : checkDaliveryDays
  const handlePaymentSuccess = async () => {

    const mappedItems = await cartData?.item?.map((item) => ({
      product_id: item.productId._id,
      qty: item.qty,
      price: item.productId.sale_rate,
      size: item?.size
    }));

    const totalPrice = mappedItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
    );

    const productsOrderData = {
      item: mappedItems,
      totalPrice,
    };




    const response = await axiosInstance.post(`/orders`, {
      payment_mode: selectedPaymentMethod,
      delivery_days: deliveryDays,
      amount: lastTotal,
      address: DeliveryAddress,
      products: productsOrderData,
      couponId: appliedCouponDetails._id,
    });

    dispatch(setUserDetails(response.data.user));
    alert('Your order has been placed!')
    router.push('/')
  };

  const handleProceedToPayment = () => {
    if (!DeliveryAddress) {
      alert("Please select a delivery address.");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    // if (!selectedDaliveryDays ) {
    //   alert("Please Select a Delivery Day!.");
    //   return;
    // }

    if (selectedPaymentMethod === "COD") {
      handlePaymentSuccess();
    } else if (selectedPaymentMethod === "SamsungPay") {
      alert('pay the Samsung Pay')
    } else if (selectedPaymentMethod === "ApplePay") {
      alert('pay the Apple Pay')
    }
  };


  const checkCheaptCoupon = async (data) => {
    try {

      const couponsIncluded = data.filter(item => item.coupon);

      const uniqueCoupons = {};
      couponsIncluded.forEach(item => {
        const couponId = item.coupon._id;
        if (!uniqueCoupons[couponId] || uniqueCoupons[couponId].discount > item.coupon.discount) {
          uniqueCoupons[couponId] = item.coupon;
          uniqueCoupons[couponId].associatedItems = uniqueCoupons[couponId].associatedItems || [];
          uniqueCoupons[couponId].associatedItems.push(item);
        }
      });
      const filteredCoupons = Object.values(uniqueCoupons);


      if (filteredCoupons.length === 0) {
        return null;
      }

      let cheapestCoupon = filteredCoupons[0];

      filteredCoupons.forEach(coupon => {
        if (coupon.discount < cheapestCoupon.discount) {
          cheapestCoupon = coupon;
        } else if (coupon.discount === cheapestCoupon.discount) {
          if (coupon.minValue < cheapestCoupon.minValue) {
            cheapestCoupon = coupon;
          }
        }
      });

      return cheapestCoupon;
    } catch (error) {
      console.error(error);
    }
  };
  const setAlreyIncludedCoupons = async () => {
    try {

      if (cartData?.item?.length === 1 && cartData?.item[0]?.coupon) {
        console.log('1');
        
        await handleCoupon(cartData?.item[0]?.coupon?.code)
      } else if (cartData?.item?.length > 1) {
        console.log('2');
        const cheapestCoupon = await checkCheaptCoupon(cartData?.item)
        if(cheapestCoupon){
          console.log('3');
          await handleCoupon(cheapestCoupon?.code)
        }
      }


    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoupons();
    if(storeDataCheckout){

      setAlreyIncludedCoupons();
    }
  }, [ storeDataCheckout,coupon,cartData]);

  return (
    <div className='flex flex-col gap-3 p-4 mb-28 md:mb-1 text-sm md:text-sm'>
      <h2 className='font-bold text-lg pt-16 md:pt-1'>Proceed to Checkout</h2>
      <hr className='border-dashed ' />
      <div className="space-y-4">
        <h3 className='font-bold text-sm'>Delivery Items</h3>
        <div className="flex flex-col gap-1.5 justify-between px-5 py-2 border rounded-md overflow-y-auto max-h-32">
          {cartData?.item?.slice().reverse().map((item, index) => (
            <div key={item?._id} className="flex items-center justify-between space-x-4">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.productId?.image[0]}`}
                alt="Product"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-grow text-left">
                <h4 className="font-semibold text-sm">{item?.productId?.name}</h4>
                {item?.size && <p className="text-gray-500 text-xs">Size • {item?.size}</p>}
                <p className="text-gray-500 text-xs">Quantity  • {item?.qty}</p>
                <p className="text-gray-500 text-xs">AED • {item?.productId?.sale_rate}</p>
              </div>
            </div>

          ))}
        </div>

      </div>
      <hr className='border-dashed ' />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between"> <p>Subtotal</p><p>AED:<span>{(salePriceTotal).toFixed(2)}</span></p>  </div>
        <div className="flex flex-row justify-between"> <p>Delivery Charge</p><p>AED:<span>{includedDeliveryCharge ? deliveryCharge : 'Free'}</span></p> </div>
        {coupon && <div className="flex flex-row justify-between"> <p>Coupon discount</p><p>AED:<span>{maximumDiscountPrice}</span></p> </div>}
        <hr className='border-dashed ' />
        <div className="flex flex-row justify-between"> <p>Total Charge</p><p>AED:<span>{lastTotal}</span></p> </div>
      </div>

      <hr className="border-dashed " />
      {(lastTotal < 200 && ordersCount > 0) && <div className="flex flex-row gap-2 pb-10 md:pb-1">
        <div className="flex-1">
          <p className=" w-full text-xs font-medium ">how much days expecting  your delivery.</p>
          <div className="flex flex-col">
            <Radio.Group onChange={handleDaliveryDaysChange} value={selectedDaliveryDays} >
              <Radio value="18">1 day (AED:18)</Radio>
              <Radio value="12">2 day (AED:12)</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>}


      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex-row flex gap-3"> <p>Shipping</p><Svg /><p><span className='text-green-500'>1 - 2</span> days delivery</p>. {ordersCount === 0 && <span className='text-green-500'>free delivery on your order</span>} </div>
          {/* <label onClick={handleDeliveryAddress} className='text-green-500 cursor-pointer'>{DeliveryAddress ? <p>Change</p> : <p>Save</p>} </label> */}
        </div>
        <div className="flex flex-row justify-between"> <p>Your addresses</p> </div>
        {DeliveryAddress ? <p className='font-semibold'>{`${DeliveryAddress?.firstname} ${DeliveryAddress?.lastname}, 
        ${DeliveryAddress?.address_line_1}, ${DeliveryAddress?.address_line_2}, 
        ${DeliveryAddress?.city}, ${DeliveryAddress?.state}, 
        ${DeliveryAddress?.country}, 
        ${DeliveryAddress?.zip}, 
        ${DeliveryAddress?.mobile}`}</p> :
          <div className="flex flex-col gap-1.5 justify-between px-5 py-2 border rounded-md overflow-y-auto h-24">
            <ul className="w-full text-sm font-medium ">
              {addresses?.length > 0 ? addresses.map((details, index) => (
                <li key={index} className="w-full mb-2">
                  <div className="flex items-start gap-3" key={index} onClick={() => handleDeliveryAddress(details)}>
                    <input id={`checkbox-${index}`} type="checkbox" value="" className="cursor-pointer w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label htmlFor={`checkbox-${index}`} className="w-full text-xs md:text-sm font-medium cursor-pointer">{`${details?.firstname} ${details?.lastname},
                    ${details?.address_line_1}, ${details?.address_line_2}, 
                    ${details?.city}, ${details?.state}, 
                    ${details?.country}, 
                    ${details?.zip}, 
                    Ph:${details?.mobile}`}</label>
                  </div>
                </li>
              )) : <p className="text-red-500 font-normal flex justify-center">Please add your address first, then return to checkout and select the address to order.</p>}
            </ul>
          </div>}
      </div>
      <div className="flex flex-row flex-wrap gap-2 mt-2">
        <div onClick={() => setAddCoupon(!addCoupon)} className="bg-gray-100 border-dashed rounded-full border-2 border-gray-300 cursor-pointer">
          <p className='text-center text-sm px-5'> Add coupon <span>{addCoupon ? <CloseOutlined /> : <PlusOutlined />}</span></p>
        </div>
        <div onClick={userDetails ? () => handleProfile(true) : () => router.push('/register')} className="bg-gray-100 border-dashed rounded-full border-2 border-gray-300 px-2 w-58 cursor-pointer">
          {/* <p className='text-center  text-sm'> Add Address <span>{DeliveryInstruction ? <CloseOutlined /> : <PlusOutlined />}</span></p> */}
          <p className='text-center  text-sm'> Add Address <span> <PlusOutlined /></span></p>
        </div>
      </div>
      {addCoupon && (
        <div className='flex mt-1 bg-black rounded-lg'>
          <input ref={inputRef} onChange={(e) => setAppliedCoupon(e.target.value)} className="w-full px-3 border rounded-lg h-8 outline-none" value={appliedCoupon} placeholder="Add a Coupon Code" />
          <button onClick={() => handleCoupon(appliedCoupon)} className='bg-[#1F1F1F] text-white rounded-md px-3'>apply</button>
        </div>)}
      {/* {DeliveryInstruction && (<Input className='rounded-lg' placeholder="Add a delivery Instruction" />)} */}
      <hr className='border-dashed' />
      {discount > 0 && <div className='flex gap-2'>
        <div
          onClick={handleDeliveryInstruction}
          className="bg-[#FBFFFF] bg-gradient-to-tr to-[#FBFFFF] from-[#EAC4A2] border-dashed rounded-full border-2 border-gray-300 px-2 w-1/3"
        >
          <p className="text-center text-sm">{coupon}</p>
        </div>
        <span className='text-green-500 text-xs md:text-sm'>coupon applied <CheckOutlined /></span>
      </div>}



      <hr className="border-dashed " />
      <div className="flex flex-row gap-2 pb-10 md:pb-1">
        <div className="flex-1">
          <p className="font-bold text-sm">Payment Options</p>
          <div className="flex flex-col">
            <Radio.Group onChange={handlePaymentMethodChange} value={selectedPaymentMethod} >
              <Radio value="COD">Cash on Delivery (COD)</Radio>
              <Radio value="online" disabled>Online Payment</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>

      <div className="flex pt-2 h-full">
        <p className=" w-full text-xs font-medium ">Review the order carefully, by proceeding will redirect to secure payment gateway page.</p>
      </div>
      <button onClick={handleProceedToPayment} className='bg-[#1F1F1F] text-white py-2 rounded-lg'>Proceed To Payment</button>
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