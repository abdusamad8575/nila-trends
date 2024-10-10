"use client";
import { useEffect, useState } from "react";
import axiosInstance from '../../../axios'
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../redux/actions/userActions';
import { setCheckout, setCart, setCheckoutProduct } from '../../../redux/actions/storeActions';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { motion } from 'framer-motion';
import Link from "next/link";

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter()
  const userData = useSelector(state => state.userDetails);
  const [cartData, setCartData] = useState([])
  const [salePriceTotal, setSalePriceTotal] = useState(0)
  const [proPriceTotal, setProPriceTotal] = useState(0)
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [ordersCount, setOrdersCount] = useState();
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
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
    fetchData()
  }, [userData])

  useEffect(() => {
    setOrdersCount(userData?.orderCount)
  }, [userData]);
  // console.log('userData', userData);
  // console.log('ordersCount', ordersCount);
  console.log('cartData', cartData);





  const handleQuantityChange = async (item, operation, index) => {
    let newQty = item?.qty;
    if (operation === 'increment' && item?.size) {
      item?.productId?.sizes?.forEach((siz) => {
        if (siz.sizes === item.size && item?.qty < siz.quantity) {
          newQty += 1;
        }
      })
    } else if (operation === 'decrement' && item?.size) {
      item?.productId?.sizes?.forEach((siz) => {
        if (siz.sizes === item.size && item?.qty > 1) {
          newQty -= 1;
        }
      })

    } else {
      if (operation === 'increment' && item?.qty < item?.productId?.stock) {
        newQty += 1;
      } else if (operation === 'decrement' && item.qty > 1) {
        newQty -= 1;
      }
    }
    setLoadingIndex(index);

    try {
      const response = await axiosInstance.patch(`/user/updateQty`, { qty: newQty, productId: item?.productId?._id, size: item.size });
      dispatch(setUserDetails(response?.data?.userData));

      !isSmallScreen && dispatch(setCart(true))
      await fetchData();
    } catch (error) {
      console.log(error);

      const revertedCartData = { ...cartData };
      revertedCartData.item[index].qty = item?.qty;
      setCartData(revertedCartData);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleRemoveItem = async (itemId) => {
    let urlQuery = `/user/removeFromCart/${itemId._id}`
    try {
      const response = await axiosInstance.patch(urlQuery, { size: itemId?.size });
      if (response?.data?.userData) {
        dispatch(setUserDetails(response?.data?.userData));
        dispatch(setCart(true))
      }
      const updatedCartItems = cartData.item.filter((item) => item?._id !== itemId?._id);
      const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + (item?.price * item?.qty), 0);
      setProPriceTotal(null)
      setSalePriceTotal(null)
      setCartData({
        ...cartData,
        item: updatedCartItems,
        totalPrice: updatedTotalPrice
      });

      const filteredItems = updatedCartItems.filter((obj) => {
        return obj.productId.isAvailable != false
      })
      const totalSalePrice = calculateTotalSalePrice(filteredItems);
      setSalePriceTotal(totalSalePrice)
      const totalProPrice = calculateTotalProPrice(filteredItems);
      setProPriceTotal(totalProPrice)
    } catch (error) {
      console.error("Error removing item from wishlist:", error);

    }
  };

  const handleCheckout = () => {
    dispatch(setCheckoutProduct(null))
    dispatch(setCheckout(true))
  }

  const deliveryCharge = 12
  const includedDeliveryCharge = ordersCount === 0 ? 0 : salePriceTotal < 200 ? salePriceTotal + deliveryCharge : 0;
  const lastTotal = (includedDeliveryCharge ? includedDeliveryCharge : salePriceTotal).toFixed(2)

  return (
    <div className="p-4 md:min-h-[40vh]">
      <h2 className="text-2xl font-semibold mb-4 hidden lg:block">Shopping Cart 🛒</h2>
      <div className=" flex justify-center items-center p-4 border">
        {!cartData?.item?.length ? <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm text-gray-600 mt-8">Your cart is empty.</p>
          <Link href="/allproducts">
            <button className="bg-gray-200 px-3 py-1 sm:px-4 sm:py-2 rounded text-xs sm:text-sm mt-2">
              <i className="fas fa-plus me-2"></i>Add Items
            </button>
          </Link>
        </motion.div> :
          <div className="bg-white rounded-lg md:p-6 relative w-full">

            {/* MOBILE VIEW - Cart Total and Checkout at the top */}
            <div className="block lg:hidden mb-4 space-y-2">
              <div className="flex items-center border-b">
                <p className="text-lg font-semibold">Cart Total :</p>&nbsp;&nbsp;
                <p className="text-lg font-semibold">AED - {lastTotal}</p>
              </div>
              <div className="text-xs flex justify-between">
                <p>Subtotal</p>
                <p>AED - {(salePriceTotal).toFixed(2)}</p>
              </div>
              <div className="text-xs flex justify-between">
                <p>Delivery Charge</p>
                <p>{ordersCount === 0 ? 'Free ' : includedDeliveryCharge ? deliveryCharge : 'Free'}</p>
              </div>
              <div className="flex justify-between items-center text-sm border-t">
                <p className="font-semibold">Grand Total :</p>&nbsp;&nbsp;
                <p className="font-semibold">AED - {lastTotal}</p>

              </div>
              <button className="mt-2 w-full bg-black text-white py-2 rounded-lg" onClick={() => router.push('/checkout')}>
                Proceed To Checkout
              </button>
            </div>

            <div className="flex flex-col lg:flex-row md:gap-4">
              <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                <h3 className="text-lg font-semibold mb-2">Items - {cartData?.item?.length}</h3>

                <div className="space-y-4 md:max-h-[50vh] md:overflow-y-scroll pr-4">

                  {cartData?.item?.slice().reverse().map((item, index) => (
                    <div key={item?._id} className="flex items-center justify-between space-x-4 border-t pt-2">
                      <div className="overflow-hidden w-1/5">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.productId?.image?.[0]}`}
                          alt="Product"
                          width={50}
                          height={50}
                          className="w-16 md:w-20 h-16 md:h-20 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow text-left w-3/5">
                        <h4 className="font-semibold text-sm">{item?.productId?.name}</h4>
                        {item?.size && <p className="text-gray-500 text-xs">Size • {item?.size}</p>}
                        <p className="text-gray-500 text-xs">AED • {item?.productId?.sale_rate}</p>
                        {item?.coupon && <p className="text-green-500 text-xs">used {item?.coupon?.discount}% coupon</p>}
                      </div>
                      <div className="flex items-center w-1/5">
                        {item?.productId?.isAvailable ? (
                          <>
                            <button className="px-2 border border-gray-300 rounded"
                              onClick={() => handleQuantityChange(item, 'decrement', index)}
                              disabled={item.qty === 1 || loadingIndex === index}>
                              {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '-'}
                            </button>
                            <span className="mx-2">{item?.qty}</span>
                            <button className="px-2 border border-gray-300 rounded"
                              onClick={() => handleQuantityChange(item, 'increment', index)}
                              disabled={loadingIndex === index}>
                              {loadingIndex === index ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : '+'}
                            </button>
                          </>
                        ) :
                          (
                            <div>
                              <p style={{ color: 'red', fontSize: '18px', fontWeight: '600' }} >unavailable</p>
                            </div>
                          )

                        }
                      </div>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                  ))}

                </div>
              </div>

              {/* Cart Totals - Only for Desktop */}
              <div className="hidden lg:block w-full lg:w-1/3 lg:ml-4">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Cart totals</h3>
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>AED - {(salePriceTotal).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery Charge</p>
                    <p>{ordersCount === 0 ? 'Free ' : includedDeliveryCharge ? deliveryCharge : 'Free'}</p>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>AED - {lastTotal}</p>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    🚚 2 days delivery
                    <span className="text-green-600 cursor-pointer ml-2">Change</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Your address<br />
                    Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India
                  </p>
                  <button className="mt-4 text-sm text-gray-700 hover:underline">Add a delivery instruction</button>

                  <div className="flex items-center mt-4">
                    <input type="checkbox" id="singlePack" className="mr-2" />
                    <label htmlFor="singlePack" className="text-sm">Get All these items in single pack</label>
                  </div>

                  <button className="mt-4 w-full bg-black text-white py-2 rounded-lg" onClick={handleCheckout}>
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>
  );
}
