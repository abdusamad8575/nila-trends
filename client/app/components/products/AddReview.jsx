import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Rating from "@mui/material/Rating";
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios';

const AddReview = ({ product,setOpen,setReviews,reviews }) => {
    const userDetails = useSelector((state) => state.userDetails);
    const [data, setData] = useState({ image: [] })
    const [newReview, setNewReview] = useState({
        headline: '',
        rating: 0,
        review: '',
      });
      const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = React.useRef(null);

    const handleRemoveImage = (index) => {
        if (data?.image?.length === 1) {
            toast.error('Atleast 1 image is required')
            return
        }
        const image = data?.image?.filter((_, i) => i !== index);
        setData(prev => ({ ...prev, image: [...image] }));
    };

    const handleImageChange = (e) => {
        const image = [...data?.image, ...e.target.files];
        if (image?.length > 5) {
            toast.error("Maximum 5 images are allowed");
            image.length = 8;
        }
        setData(prev => ({ ...prev, image }));
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };
    const handleRatingChange = (event, newValue) => {
        setNewReview({ ...newReview, rating: newValue });
      };
      const handleReviewChange = (e) => {
        const { name, value } = e.target;
          setNewReview({ ...newReview, [name]: value });
      };

      const handleSubmitReview = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        
        const formData = new FormData();
        formData.append('productId', product._id);
        formData.append('userId', userDetails._id);
        formData.append('headline', newReview.headline);
        formData.append('rating', newReview.rating);
        formData.append('review', newReview.review);
        data.image.forEach((image) => formData.append('images', image));
    
        try {
          const response = await axiosInstance.post('/reviews', formData, {
            headers: {
              Authorization: `Bearer ${userDetails.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
    
          setReviews([response.data.data, ...reviews]);
          setNewReview({ headline: '', rating: 0, review: '' });
        //   handleCloseReviewModal();
          alert('your review is added')
          setOpen(false)
        } catch (error) {
          console.error('Error submitting review:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
    return (
        <div className='lg:max-w-[500px] mx-auto my-4 lg:my-6'>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Create Review</h3>
            <div className='flex gap-3 py-4'>
                <div className='overflow-hidden w-14 md:w-20 h-14 md:h-20 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' >
                    <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[0]}`} height={100} width={150} />
                </div>
                <div >
                    <p className="block text-sm font-medium text-gray-900">{product?.name}</p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {product?.description?.substring(0, 50)}
                    </p>
                </div>
            </div>
            <hr />
            <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmitReview}>
                <div className="">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900">Add a headline</label>
                    <input type="text" id="base-input" placeholder="what's the most important to know?" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                    name="headline"
                    value={newReview.headline}
                    onChange={handleReviewChange} 
                    required/>
                </div>
                <div className="">
                    <label for="base-input" className="block mb-2 text-sm font-medium text-gray-900">Add a Rating</label>
                    <Rating
                        name="simple-controlled"
                        value={newReview.rating}
                        onChange={handleRatingChange}
                        required
                    /></div>
                <div className=''>
                    <label for="small-input" className="block text-sm font-medium text-gray-900">Add a photo or video</label>
                    <p className='font-xs mb-2'>Shoppers find images and videos more helpful than text alone.</p>
                    <div className='flex gap-3'>
                        {data?.image?.map((img, index) =>
                            <div key={index} className='relative overflow-hidden w-14 md:w-20 h-14 md:h-20 border-[2px] rounded-lg border-gray-300'>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleRemoveImage(index)
                                    }}
                                    className={`absolute top-0 right-0 m-[-2px] bg-slate-50 rounded-2xl z-50 focus:outline-none cursor-pointer`}
                                >
                                    <svg class="w-6 h-6 p-1 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                    </svg>
                                </button>
                                <Image src={URL.createObjectURL(img)} height={100} width={150} />
                            </div>
                        )}
                        <div className='overflow-hidden w-14 md:w-20 h-14 md:h-20 border-[2px] rounded-lg border-gray-300 bg-gray-50 cursor-pointer' onClick={handleFileSelect}>
                            <svg className="w-full h-full text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        multiple
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="">
                    <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900">Add a written review</label>
                    <textarea type="text" rows={4} id="large-input" placeholder="what did you like or dislike?" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
                    name="review"
                    value={newReview.review}
                    onChange={handleReviewChange}
                    required/>
                </div>
                <div className="flex justify-end" >
                    <button className="px-2 py-1.5 text-xs md:text-sm font-medium cursor-pointer text-gray-900 focus:outline-none bg-yellow-400 rounded-lg border border-gray-200 hover:bg-yellow-200 focus:z-10 focus:ring-4 focus:ring-gray-100" type="submit" disabled={isLoading}>Submit Review</button>
                </div>
                <hr />
                <p className='text-xs'>Your review will be live as soon as the review is processed.</p>
            </form>
        </div>
    )
}

export default AddReview