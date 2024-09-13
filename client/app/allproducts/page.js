// "use client";
// import React, { useState, useEffect } from 'react';
// import { Search, Filter } from 'lucide-react';
// import Link from 'next/link';
// import RightBox from './RightBox';
// import Pagination from '@mui/material/Pagination';
// import axiosInstance from '../../axios'
// import { useDispatch,useSelector } from 'react-redux';
// import { setUserDetails } from '../../redux/actions/userActions';
// import {useRouter} from 'next/navigation';

// const ProductCard = ({ image, category, ProId, title, fit, price, onClick }) => (
//   <>
//     <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-md cursor-pointer" >
//       <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" onClick={onClick}/>
//       <div className="p-4">
//         <div className="flex justify-between items-center mb-2 space-x-2" onClick={onClick}>
//           <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
//             {category}
//           </span>
//           <Link href={`/products/${ProId}`}>
//             <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//         <h3 className="mt-2 text-sm sm:text-lg font-semibold" onClick={onClick}>{title}</h3>
//         {/* <p className="text-xs sm:text-sm text-gray-600">Fit • {fit}</p> */}
//         <div className='flex justify-between'>
//           <div onClick={onClick}>
//             <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
//             <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
//           </div>
//           <button>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//     <div className="md:hidden bg-white rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={onClick}>
//       <Link href={`/products/${ProId}`}>
//         <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" />
//         <div className="p-4">
//           <div className="flex justify-between items-center mb-2 space-x-2">
//             <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
//               {category}
//             </span>
//             <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
//               Shop Now
//             </button>
//           </div>
//           <h3 className="mt-2 text-sm sm:text-lg font-semibold">{title}</h3>
//           {/* <p className="text-xs sm:text-sm text-gray-600">Fit • {fit}</p> */}
//           <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
//           <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
//         </div>
//       </Link>
//     </div>
//   </>
// );

// const KurtaSetsListing = () => {
//   const dispatch = useDispatch();
//   const userData = useSelector(state => state.userDetails);
//   const router = useRouter()
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [wishlistItems, setWishlistItems] = useState([]);


//   const fetchProducts = async (page = 1, search = '') => {
//     try {
//       const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
//         params: { page, search }
//       });
//       console.log('products-', data.docs);

//       setProducts(data.products);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       console.error('Error fetching products:', error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(page, search);
//   }, [page, search]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };
//   const fixedSelectedProduct = selectedProduct ? selectedProduct : products?.[0]

//   const isInWishlist = (productId) => {
//     if (wishlistItems === undefined) {
//       return null;
//     }
//     return wishlistItems.some((item) => item?._id === productId);
//   };
//   const fetchWishlist = async () => {
//     try {
//       const wishlistResponse = await axiosInstance.get('/user/getwishlist');
//       setWishlistItems(wishlistResponse?.data?.data);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };


//   const addToWishlist = async (proId) => {

//     if (!userData) {
//       router.push('/register')
//       console.log('addToWishlist');

//     } else {
//       try {
//         const response = await axiosInstance.patch(`/user/addToWishlist/${proId}`);
//         await fetchWishlist();
//       } catch (error) {
//         console.error('Error adding to wishlist:', error);
//       }
//     }
//   };
//   const removeWishlist = async (proId) => {
//     if (!userData) {
//       router.push('/register')
//     } else {
//       try {
//         const response = await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
//         await fetchWishlist();
//         setNotif(prev => !prev);
//       } catch (error) {
//         console.error('Error removing from wishlist:', error);
//       }
//     }
//   };
//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-12 md:mt-28">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//         <div className="lg:col-span-8 first-item">
//           <div className="flex items-center mb-4">
//             <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg">
//               <Filter size={16} className="mr-2" />
//               <span className="text-xs sm:text-sm">Filter</span>
//             </button>
//             <div className="flex-grow relative">
//               <input
//                 type="text"
//                 placeholder="Kurta Sets"
//                 value={search}
//                 onChange={handleSearchChange}
//                 className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-r-lg text-xs sm:text-sm"
//               />
//               <Search size={20} className="absolute right-2.5 sm:right-3 top-2.5 text-gray-400" />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {products?.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 ProId={product._id}
//                 image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
//                 category={product?.category?.name}
//                 title={product.name}
//                 fit={product.fitAndCare[0] || 'Regular'}
//                 price={product.sale_rate}
//                 onClick={() => handleProductClick(product)}
//               />
//             ))}
//           </div>
//           <Pagination
//             count={totalPages}
//             page={page}
//             onChange={handlePageChange}
//             className="flex justify-center mt-4"
//           />
//         </div>

//         <RightBox product={fixedSelectedProduct} />
//       </div>
//     </div>
//   );
// };

// export default KurtaSetsListing;



"use client";
import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import RightBox from './RightBox';
import Pagination from '@mui/material/Pagination';
import axiosInstance from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/actions/userActions';
import { useRouter } from 'next/navigation';

// Updated ProductCard component
const ProductCard = ({ image, category, ProId, title, fit, price, onClick, onWishlistClick, isInWishlist }) => (
  <>
    <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow-md cursor-pointer">
      <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" onClick={onClick} />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 space-x-2" onClick={onClick}>
          <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
            {category}
          </span>
          <Link href={`/products/${ProId}`}>
            <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
              Shop Now
            </button>
          </Link>
        </div>
        <h3 className="mt-2 text-sm sm:text-lg font-semibold" onClick={onClick}>{title}</h3>
        <div className='flex justify-between'>
          <div onClick={onClick}>
            <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
            <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
          </div>
          {/* Updated button to handle wishlist toggle */}
          <button onClick={onWishlistClick} className={`focus:outline-none ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    {/* Same for mobile view */}
    <div className="md:hidden bg-white rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={onClick}>
      <Link href={`/products/${ProId}`}>
        <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2 space-x-2">
            <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
              {category}
            </span>
            <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
              Shop Now
            </button>
          </div>
          <h3 className="mt-2 text-sm sm:text-lg font-semibold">{title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
          <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
        </div>
      </Link>
    </div>
  </>
);

const KurtaSetsListing = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userDetails);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  const fetchProducts = async (page = 1, search = '') => {
    try {
      const { data } = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: { page, search }
      });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProducts(page, search);
  }, [page, search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

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
          const response =await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
          dispatch(setUserDetails(response?.data?.userData));
        } else {
          // Add to wishlist
          const response =await axiosInstance.patch(`/user/addToWishlist/${proId}`);
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 first-item">
          <div className="flex items-center mb-4">
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg">
              <Filter size={16} className="mr-2" />
              <span className="text-xs sm:text-sm">Filter</span>
            </button>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Kurta Sets"
                value={search}
                onChange={handleSearchChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-r-lg text-xs sm:text-sm"
              />
              <Search size={20} className="absolute right-2.5 sm:right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                ProId={product._id}
                image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
                category={product?.category?.name}
                title={product.name}
                fit={product.fitAndCare[0] || 'Regular'}
                price={product.sale_rate}
                onClick={() => handleProductClick(product)}
                onWishlistClick={() => toggleWishlist(product._id)}
                isInWishlist={isInWishlist(product._id)}
              />
            ))}
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="flex justify-center mt-4"
          />
        </div>
        <RightBox product={fixedSelectedProduct} />
      </div>
    </div>
  );
};

export default KurtaSetsListing;
