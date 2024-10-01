'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'antd';
import axiosInstance from '../../../axios';

const StatBox = ({ number, text }) => (
  <div className="text-center border border-dashed border-gray-300 p-4">
    <div className="text-2xl font-bold">{number}</div>
    <div className="text-sm text-gray-600">{text}</div>
  </div>
);

const FashionLanding = () => {
  const router = useRouter()
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [banners, setBanners] = useState([])
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const fetchBanners = async () => {
    try {
      const { data } = await axiosInstance.get(`/banners/store`);
      console.log('products-', data);
      setBanners(data?.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  useEffect(() => {
    fetchBanners()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-4 mt-16 md:mt-32">
      <div className="md:border-2 md:border-dashed border-gray-300 md:p-4">
        <Carousel autoplay autoplaySpeed={7000} className='custom-carousel'>
          {banners?.map(item => (
            <div key={item?._id} className='md:mb-10'>
              <div className="relative h-[20vh] md:h-[400px] mb-8 rounded-xl overflow-hidden">
                {item?.type === "image" ?
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${item?.src}`}
                    alt={item?.title}
                    layout="fill"
                    objectFit="cover"
                    className="object-center"
                    onClick={() => router.push(item?.url ?? '/allproducts')}
                  /> : <>
                    <video
                      ref={videoRef}
                      className="top-0 left-0 w-full h-full min-w-full min-h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onClick={() => router.push(item?.url ?? '/allproducts')}
                    >
                      <source
                        src={
                          'https://d2o83l9a5alywg.cloudfront.net/handloomsaree.mov'
                        }
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-4 left-4 p-2 bg-black bg-opacity-50 text-white rounded"
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </>}
              </div>

              <div onClick={() => router.push(item?.url ?? '/allproducts')} className="hidden md:grid md:grid-cols-2 gap-8 mt-8">
                <div className="md:col-span-1">
                  <h1 className="text-5xl font-sans mb-4">
                    {item?.title}
                  </h1>
                  <h1 className="text-2xl font-sans italic mb-4">
                    {item?.subtitle}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {item?.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <StatBox number="1,500 +" text="Fashion Products" />
                  <StatBox number="50 +" text="New arrivals every month." />
                  <StatBox number="30%" text="UPTO OFF on select items." />
                  <StatBox number="95%" text="Customer Satisfaction Rate" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FashionLanding;