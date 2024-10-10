import Link from 'next/link';
import React from 'react'

const BlogCard = ({ image, blog_id, title, subtitle, date, url, updated }) => {
   const [loading, setLoading] = React.useState(true)
   return (
      <div
         key={blog_id}
         className="w-96 bg-white rounded-lg shadow-md flex-shrink-0"
      >
         <div className="cursor-pointer rounded-lg flex flex-col relative">
            <button
               className={`absolute top-0 right-0 m-1 bg-slate-50 rounded-2xl p-1 focus:outline-none text-gray-400`}
            >
               <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M14.516 6.743c-.41-.368-.443-1-.077-1.41a.99.99 0 0 1 1.405-.078l5.487 4.948.007.006A2.047 2.047 0 0 1 22 11.721a2.06 2.06 0 0 1-.662 1.51l-5.584 5.09a.99.99 0 0 1-1.404-.07 1.003 1.003 0 0 1 .068-1.412l5.578-5.082a.05.05 0 0 0 .015-.036.051.051 0 0 0-.015-.036l-5.48-4.942Zm-6.543 9.199v-.42a4.168 4.168 0 0 0-2.715 2.415c-.154.382-.44.695-.806.88a1.683 1.683 0 0 1-2.167-.571 1.705 1.705 0 0 1-.279-1.092V15.88c0-3.77 2.526-7.039 5.967-7.573V7.57a1.957 1.957 0 0 1 .993-1.838 1.931 1.931 0 0 1 2.153.184l5.08 4.248a.646.646 0 0 1 .012.011l.011.01a2.098 2.098 0 0 1 .703 1.57 2.108 2.108 0 0 1-.726 1.59l-5.08 4.25a1.933 1.933 0 0 1-2.929-.614 1.957 1.957 0 0 1-.217-1.04Z" clip-rule="evenodd" />
               </svg>
            </button>
            <Link href={`/blogs/${blog_id}`}>
               <img src={image} onLoad={() => setLoading(false)} alt={title} className={`${loading && "hidden"} w-full h-48 sm:h-64 object-cover`} />
               {(!image || loading) && <div
                  role="status"
                  className="flex items-center justify-center w-full h-48 sm:h-64 bg-gray-300 animate-pulse"
               >
                  <svg
                     className="w-10 h-10 text-gray-200"
                     aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor"
                     viewBox="0 0 20 18"
                  >
                     <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
               </div>}
            </Link>
            <div className="py-4 px-2">
               <Link href={`/blogs/${blog_id}`}>
                  <div className="flex justify-between items-center mb-2 space-x-2">
                     <span className={`${!title && "h-3 md:h-4 w-2/5 animate-pulse text-gray-200"} bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0`}>
                        Nilaa Trends
                     </span>
                     <button className={`${!title && "h-3 md:h-4 w-2/5 animate-pulse  bg-gray-200 text-gray-200"} text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap`}>
                        {new Date(date).toDateString()}
                     </button>
                  </div>
                  <h3 className={`${!title && "h-3 md:h-4 animate-pulse bg-slate-200"} mt-2 text-sm sm:text-lg font-semibold truncate`}>{title}</h3>
               </Link>
               <div className='flex justify-between'>
                  <Link href={`/blogs/${blog_id}`} className='w-full'>
                     <p className={`${!subtitle && "animate-pulse h-2 md:h-3 w-full bg-slate-200 mt-1"} text-xs sm:text-sm text-gray-600 truncate`}>{subtitle}</p>
                     <p className={`${!subtitle && "animate-pulse h-3 md:h-4 w-4/5 bg-slate-200 mt-1 text-slate-200"} text-xs sm:text-sm text-blue-600`}>Read more</p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
export default BlogCard