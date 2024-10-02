import React, { useState } from 'react'
import StarRating from './StarRating'
import ReviewCard from './ReviewCard'
import ModalLayout from '../common/ModalLayout'
import AddReview from './AddReview'

const Review = ({ data }) => {
   const rating = 4.3
   const reviews = [
      {
         author: "Asher P Rajan",
         rating: 4,
         title: "Thinking to buy another one!",
         images: ["1727785213339-WhatsApp Image 2024-09-30 at 2.47.35 PM (1).jpeg", "1727785069936-WhatsApp Image 2024-09-30 at 2.47.35 PM.jpeg"],
         desc: "This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.",
         createdAt: new Date()
      },
      {
         author: "Ramesh PP",
         rating: 5,
         title: "Good quality material and nice features",
         images: ["1727785213339-WhatsApp Image 2024-09-30 at 2.47.35 PM (1).jpeg", "1727785069936-WhatsApp Image 2024-09-30 at 2.47.35 PM.jpeg"],
         desc: "Good quality material used. Also quick delivery.But the packaging was too casual only came in a plastic bag.over all product is nice and recommend to buy .The product is light weight and very comfortable, also provide security with bands and also a good company over is fells ease to use",
         createdAt: new Date()
      },
   ]
   const [openAddReview, setOpenAddReview] = useState(false)
   return (
      <>
         <h2 className={`text-2xl font-semibold mb-4`}>Customer reviews</h2>
         <div className='flex flex-col md:flex-row gap-4'>
            <div className='w-full md:w-1/3 pb-5'>
               <div className="flex items-center mb-2">
                  <StarRating rating={rating} />
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
               </div>
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
               {['70%', '17%', '8%', '4%', '1%'].map((x, idx) =>
                  <div className="flex items-center mt-4">
                     <p className="text-sm font-medium text-blue-600">{5 - idx} star</p>
                     <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                        <div className="h-5 bg-yellow-300 rounded" style={{ width: x }}></div>
                     </div>
                     <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{x}</span>
                  </div>
               )}
               <aside className='pt-8'>
                  <hr />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-700">Review this product</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Share your thoughts with other customers</p>
                  <div className="flex items-center mt-3">
                     <p onClick={()=>setOpenAddReview(true)} className="px-2 py-1.5 text-xs font-medium cursor-pointer text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                        Write a product review
                     </p>
                  </div>
               </aside>
            </div>

            <div className='w-full md:w-2/3 flex flex-col gap-5'>
               {reviews.map(review => <ReviewCard data={review} />)}
            </div>
            <ModalLayout open={openAddReview} setOpen={setOpenAddReview}><AddReview product={data}/></ModalLayout>
         </div>
      </>
   )
}

export default Review