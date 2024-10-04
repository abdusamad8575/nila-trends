import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react'

const OrderDetails = ({ data }) => {
   return (
      <div className={`w-full ${data ? "block" : "hidden"} md:block`}>
         <div key={data?._id} className="bg-gray-100 rounded-lg p-4 cursor-pointer">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <p className="font-bold">Order No : {data?._id}</p>
                  <p className="text-xs text-gray-600">Shipping addresses</p>
                  <p className="text-xs text-gray-600 max-w-xs">{data?.address.address_line_1}, {data?.address.city}</p>
               </div>
               <p className="text-sm text-gray-600">{dayjs(data?.createdAt).format('DD/MM/YYYY')}</p>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-sm">products : {data?.products?.item?.length} </p>
               <div className="text-right">
                  <p className="text-sm">Total Amount AED:{data?.amount}</p>
                  <button className="text-sm bg-gray-200 px-3 py-1 rounded-full mt-1">Details</button>
               </div>
            </div>
            <p className="text-green-500 text-sm mt-2">{data?.status}</p>
         </div>
         <div>
         <h2 className="text-lg font-semibold mb-4">Items - {data?.products?.item?.length}</h2>

            {data?.products?.item.map(product => <div className='flex gap-3 py-4 border-t'>
               <div className='overflow-hidden w-14 md:w-20 h-14 md:h-20 border-[2px] rounded-lg border-[#B17E3E] cursor-pointer' >
                  <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.product_id?.image?.[0]}`} height={100} width={150} />
               </div>
               <div >
                  <p className="block text-sm font-medium text-gray-900">{product?.product_id?.name}</p>
                  <p className="mb-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                     {product?.product_id?.description?.substring(0,50)}...
                  </p>
               </div>
               <p className="text-xs text-gray-600">
                  Fit • {product?.product_id?.fit} &nbsp;&nbsp; Price • {product?.product_id?.price}
                </p>
            </div>)}
         </div>
      </div>
   )
}

export default OrderDetails