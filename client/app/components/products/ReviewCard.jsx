import React, { useState } from 'react'
import StarRating from './StarRating'
import Image from 'next/image'
import ModalLayout from '../common/ModalLayout'

const ReviewCard = ({ data }) => {
   const [open, setOpen] = useState(false)
   const [selected, setSelected] = useState(data?.image[0] ?? null)
   return (
      <article>
         <div className="flex items-center mb-4">
            <Image className="w-10 h-10 me-4 rounded-full" src="/assets/avatar.png" alt="Profile picture" width={40} height={40} />
            <div className="flex flex-col justify-start items-start align-top font-medium">
               <p>
                  {data?.userId?.username ? data?.userId?.username : 'user'}
               </p>
               <p className="flex items-center text-xs font-medium text-blue-500">
                  {data?.approved && <><svg class="w-4 h-4 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                  </svg>
                     &nbsp;verified
                  </>}
               </p>
            </div>
         </div>
         <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <StarRating rating={data?.rating} />
            <h3 className="ms-2 text-sm font-semibold text-gray-900">{data?.headline}</h3>
         </div>
         <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>
               Reviewed on{' '}
               <time dateTime="2017-03-03 19:00">{new Date(data?.createdAt).toDateString()}</time>
            </p>
         </footer>
         <p className="mb-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
            {data?.review}    
         </p>
         <p onClick={() => setOpen(true)} className="block mb-2 text-sm font-medium text-blue-500 cursor-pointer">Read more</p>
         <div className='flex gap-2 pb-3'>
            {data?.image?.map(image => (
               <div key={image} className='overflow-hidden w-14 h-14 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' onClick={() => setOpen(true)}>
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`} height={50} width={100} />
               </div>
            ))}
         </div>
         <aside>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
            <div className="flex items-center mt-3">
               <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                  Helpful
               </a>
               <a href="#" className="ps-4 text-xs font-medium text-blue-500 ms-4">Report abuse</a>
            </div>
         </aside>
         <ModalLayout open={open} setOpen={setOpen}>
            <div className='flex flex-col md:flex-row gap-4 p-3'>
              {selected &&  <div className='w-full md:w-1/2'>
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${selected}`} height={500} width={500} />
               </div>}
               <div className='w-full md:w-1/2'>
                  <div className="flex items-center mb-4">
                     <Image className="w-10 h-10 me-4 rounded-full" src="/assets/avatar.png" alt="Profile picture" width={40} height={40} />
                     <div className="font-medium">
                        <p>
                        {data?.userId?.username ? data?.userId?.username : 'user'}
                        <p className="flex items-center text-xs font-medium text-blue-500">
                  {data?.approved && <><svg class="w-4 h-4 text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd" />
                  </svg>
                     &nbsp;verified
                  </>}
               </p>
                        </p>
                     </div>
                  </div>
                  <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                     <StarRating rating={data?.rating} />
                     <h3 className="ms-2 text-sm font-semibold text-gray-900">{data?.title}</h3>
                  </div>
                  <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                     <p>
                        Reviewed on{' '}
                        <time dateTime="2017-03-03 19:00">{new Date(data?.createdAt).toDateString()}</time>
                     </p>
                  </footer>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                     {data?.review}
                  </p>
                  <div className='flex gap-2 pb-3'>
                     {data?.image?.map(image => (
                        <div key={image} className='overflow-hidden w-14 md:w-20 h-14 md:h-20 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' onClick={() => setSelected(image)}>
                           <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`} height={100} width={150} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </ModalLayout>
      </article>
   )
}

export default ReviewCard