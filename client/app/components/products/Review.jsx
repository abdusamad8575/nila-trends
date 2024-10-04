import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import StarRating from './StarRating'
import ReviewCard from './ReviewCard'
import ModalLayout from '../common/ModalLayout'
import AddReview from './AddReview'
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios';

const Review = ({ data }) => {
   const userDetails = useSelector((state) => state.userDetails);
   const [reviews, setReviews] = useState([]);
   const [canWriteReview, setCanWriteReview] = useState(false);
   const [showAllReviews, setShowAllReviews] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const fetchReviews = async () => {
         try {
            const response = await axiosInstance.get(`/reviews/${data._id}`);
            const sortedReviews = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setReviews(sortedReviews);
         } catch (error) {
            console.error('Error fetching reviews:', error);
         }
      };

      const checkCanWriteReview = async () => {
         try {
            const response = await axiosInstance.get(`/orders/user/${userDetails?._id}/product/${data._id}`);
            setCanWriteReview(response?.data?.canWriteReview);
         } catch (error) {
            console.error('Error checking if user can write review:', error);
         }
      };

      fetchReviews();
      if (userDetails) {
         console.log('userDetails existing');
         checkCanWriteReview();
      }
   }, [data, userDetails]);
   const [openAddReview, setOpenAddReview] = useState(false)

   const totalReviews = reviews.length;
   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
   const averageRatings = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0';
   const averageRating = (averageRatings % 1 === 0) ? Math.round(averageRatings) : averageRatings;

   const ratingCounts = [0, 0, 0, 0, 0];
   reviews.forEach((review) => {
      ratingCounts[review.rating - 1]++;
   });

   const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);
   const handleReadMore = () => {
      setShowAllReviews(true);
   };

   return (
      <>
         <h2 className={`text-2xl font-semibold mb-4`}>Customer reviews</h2>
         <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full md:w-1/3 pb-5'>
               <div className="flex items-center mb-2">
                  <StarRating rating={averageRating} />
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{averageRating}</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
               </div>
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{reviews?.length && `${reviews?.length} global ratings`} </p>
               {[5, 4, 3, 2, 1].map((x, idx) =>
                  <div key={idx} className="flex items-center mt-4">
                     <p className="text-sm font-medium text-blue-600">{x} star</p>
                     <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                        <div className="h-5 bg-yellow-300 rounded" style={{ width: (ratingCounts[x - 1] / totalReviews) * 100 }}></div>
                     </div>
                     <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{totalReviews > 0 ? `${((ratingCounts[x - 1] / totalReviews) * 100).toFixed(0)}%` : '0%'}</span>
                  </div>
               )}
               <aside className='pt-8'>
                  <hr />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-700">Review this product</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Share your thoughts with other customers</p>
                  <div className="flex items-center mt-3">
                     <button onClick={() => userDetails ? setOpenAddReview(true) : router.push('/register')} disabled={!canWriteReview} className="px-2 py-1.5 text-xs font-medium cursor-pointer text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                        Write a product review
                     </button>
                  </div>
               </aside>
            </div>

            <div className='w-full md:w-2/3 flex flex-col gap-5'>
               {reviews.length > 0 ?
                  <>
                     {displayedReviews.map(review => <ReviewCard key={review?._id} data={review} />)}
                     {!showAllReviews && reviews.length > 4 && (
                        <button className='block mb-2 text-sm font-medium text-blue-500 cursor-pointer' onClick={handleReadMore}>
                           Read More Reviews
                        </button>
                     )}
                  </>
                  :
                  <div className="flex items-center mb-4">
                     <div className="flex flex-col justify-start items-start align-top font-medium">
                        <p>
                           No Reviews...
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-700">Review this product</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Share your thoughts with other customers</p>
                        <div className="flex items-center mt-3">
                           <button onClick={() => userDetails ? setOpenAddReview(true) : router.push('/register')} disabled={!canWriteReview} className="px-2 py-1.5 text-xs font-medium cursor-pointer text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                              Write a product review
                           </button>
                        </div>
                     </div>
                  </div>}
            </div>
            <ModalLayout open={openAddReview} setOpen={setOpenAddReview}><AddReview product={data} setOpen={setOpenAddReview} setReviews={setReviews} reviews={reviews} /></ModalLayout>
         </div>
      </>
   )
}

export default Review