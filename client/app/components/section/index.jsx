import React, { useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import { Scheherazade_New } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../../redux/actions/userActions';
import axiosInstance from '../../../axios';

const scheherazade_New = Scheherazade_New({
   subsets: ['latin'],
   weight: '400',
   display: 'swap',
})

const Index = () => {
   const router = useRouter();
   const dispatch = useDispatch();
   const userData = useSelector(state => state.userDetails);
   const [products, setProducts] = useState(null);
   const [wishlistItems, setWishlistItems] = useState([]);
   const fetchProducts = async () => {
      try {
         const { data } = await axiosInstance.get(`/section/store`);
         console.log('products-', data);
         setProducts(data?.data);
      } catch (error) {
         console.error('Error fetching products:', error.message);
      }
   };

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

   // const toggleWishlist = async (proId) => {
   //    if (!userData) {
   //       router.push('/register');
   //    } else {
   //       try {
   //          if (isInWishlist(proId)) {
   //             const response = await axiosInstance.patch(`/user/removeFromWishlist/${proId}`);
   //             dispatch(setUserDetails(response?.data?.userData));
   //          } else {
   //             const response = await axiosInstance.patch(`/user/addToWishlist/${proId}`);
   //             dispatch(setUserDetails(response?.data?.userData));
   //          }
   //          await fetchWishlist();
   //       } catch (error) {
   //          console.error('Error toggling wishlist:', error);
   //       }
   //    }
   // };
   const toggleWishlist = async (proId) => {
      if (!userData) {
        router.push('/register');
      } else {
        const alreadyInWishlist = isInWishlist(proId);
        setWishlistItems((prev) => {
          if (alreadyInWishlist) {
            return prev.filter(item => item._id !== proId);
          } else {
            return [...prev, { _id: proId }];
          }
        });
    
        try {
          const response = await axiosInstance.patch(
            alreadyInWishlist ? `/user/removeFromWishlist/${proId}` : `/user/addToWishlist/${proId}`
          );
          dispatch(setUserDetails(response?.data?.userData));
          // await fetchWishlist(); 
        } catch (error) {
          console.error('Error toggling wishlist:', error);
          setWishlistItems(prev => (alreadyInWishlist ? [...prev, { _id: proId }] : prev.filter(item => item._id !== proId)));
        }
      }
    };
   useEffect(() => {
      fetchProducts();
      fetchWishlist();
   }, []);

   const handleScroll = (event) => {
      const container = event.currentTarget;
      const scrollInterval = setInterval(() => {
         container.scrollLeft += 1;
      }, 10);

      container.addEventListener('mouseenter', () => {
         clearInterval(scrollInterval);
      });
   };

   return (
      <>
         {products ? products?.map((section) => (
            <div className="max-w-7xl mx-auto p-4 pt-6 md:mt-10" key={section?.title}>
               <h1 className={`${scheherazade_New.className} text-2xl md:text-3xl font-bold md:mb-2`}>{section?.title}</h1>
               <p className="text-xs md:text-sm text-gray-600">{section?.subtitle}</p>
               <div
                  className="flex overflow-x-auto space-x-4 scrollbar-hide py-4 pr-2"
                  onMouseLeave={handleScroll}
               >
                  {section?.product?.map((product) => (
                     <SectionCard
                        key={product._id}
                        ProId={product._id}
                        image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
                        category={product?.category?.name}
                        title={product.name}
                        fit={product?.fitAndCare?.[0] || 'Regular'}
                        price={product?.price}
                        sale_rate={product?.sale_rate}
                        onWishlistClick={() => toggleWishlist(product._id)}
                        isInWishlist={isInWishlist(product._id)}
                     />
                  ))}
               </div>
            </div>
         )) :
            Array(9).fill().map((_item, index) =>
               <div className="max-w-7xl mx-auto p-4 pt-6 md:mt-10" key={index}>
                  <h1 className={`${scheherazade_New.className} text-2xl md:text-3xl bg-slate-200 w-3/5 md:w-2/5 h-6 md:h-8 animate-pulse mb-2`}></h1>
                  <p className="text-xs md:text-sm  bg-slate-200 w-2/5 md:w-1/5 h-4 animate-pulse"></p>
                  <div
                     className="flex overflow-x-auto space-x-4 scrollbar-hide py-4"
                     onMouseLeave={handleScroll}
                  >
                     {Array(9).fill().map((_item, index) => <SectionCard key={index} />)}
                  </div>
               </div>
            )
         }
      </>
   );
};

export default Index;
