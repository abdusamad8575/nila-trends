"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/actions/userActions';
import { useRouter } from 'next/navigation';
import RightBox from '../allproducts/RightBox';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';

const KurtaSetsListing = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);


  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const fixedSelectedProduct = selectedProduct ? selectedProduct : products?.[0];

  const isInWishlist = (productId) => {

    if (wishlistItems === undefined) {
      return false;
    }
    return wishlistItems.some((item) => item?._id === productId);
  };

  const fetchWishlist = async () => {
    try {
      const wishlistResponse = await axiosInstance.get('/user/getwishlist');
      setProducts(wishlistResponse?.data?.data)
      setWishlistItems(wishlistResponse?.data?.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const toggleWishlist = async (proId) => {
    if (!userData) {
      router.push('/register');
    } else {
      try {
        if (isInWishlist(proId)) {
          // Remove from wishlist
          const response = await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
          dispatch(setUserDetails(response?.data?.userData));
        } else {
          // Add to wishlist
          const response = await axiosInstance.patch(`/user/addToWishlist/${proId}`);
          dispatch(setUserDetails(response?.data?.userData));
        }
        await fetchWishlist();
      } catch (error) {
        console.error('Error toggling wishlist:', error);
      }
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-12 md:mt-28">
      {wishlistItems?.length === 0 ?
        (<>
          <motion.h2
            className="text-center mb-4 section-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Wishlist
          </motion.h2>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs sm:text-sm text-gray-600 mb-1">Your wishlist is empty.</p>
            <Link href="/allproducts">
              <button className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-2 rounded text-xs sm:text-sm mt-5">
                <i className="fas fa-plus me-2"></i>Add Items
              </button>
            </Link>
          </motion.div>
        </>
        )
        :
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 first-item">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  ProId={product._id}
                  images={product?.image}
                  category={product?.category?.name}
                  title={product.name}
                  fit={product.fitAndCare[0] || 'Regular'}
                  price={product.price}
                  sale_rate={product.sale_rate}
                  onClick={() => handleProductClick(product)}
                  onWishlistClick={() => toggleWishlist(product._id)}
                  isInWishlist={isInWishlist(product._id)}
                />
              ))}
            </div>
            {/* <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="flex justify-center mt-4"
          /> */}
          </div>
          <RightBox product={fixedSelectedProduct} />
        </div>}
    </div>
  );
};

export default KurtaSetsListing;
