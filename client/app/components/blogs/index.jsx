import React, { useEffect, useState } from 'react';
import { Scheherazade_New } from 'next/font/google';
import axiosInstance from '../../../axios';
import BlogCard from './BlogCard';

const scheherazade_New = Scheherazade_New({
   subsets: ['latin'],
   weight: '400',
   display: 'swap',
})

const Blogs = () => {
   const [blogs, setBlogs] = useState(null);
   const fetchBlogs = async () => {
      try {
         const { data } = await axiosInstance.get(`/blogs`);
         console.log('blogs-', data);
         setBlogs(data?.data);
      } catch (error) {
         console.error('Error fetching blogs:', error.message);
      }
   };

   useEffect(() => {
      fetchBlogs();
   }, []);

   return (
      <>
         <div className="max-w-7xl mx-auto p-1 py-10 md:mt-10">
            <h1 className={`${scheherazade_New.className} text-2xl md:text-3xl font-black md:mb-2`}>POPULAR BLOG POSTS</h1>
            <p className="text-xs md:text-sm text-gray-600">Unveiling All the Latest Fashion Trends</p>
            <div
               className="flex overflow-x-auto space-x-4 scrollbar-hide py-4"
            >
               {blogs ? blogs?.map((blog) => (
                  <BlogCard
                     key={blog._id}
                     blog_id={blog._id}
                     image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${blog?.image}`}
                     title={blog?.title}
                     subtitle={blog?.subtitle}
                     date={blog?.createdAt}
                     url={blog?.url}
                     updated={blog?.updatedAt}
                  />
               )) :
                  Array(9).fill().map((_item, index) => <BlogCard key={index} />)}
            </div>
         </div>
      </>
   );
};

export default Blogs;
