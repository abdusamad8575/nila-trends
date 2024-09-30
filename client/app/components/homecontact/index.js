import { Carousel } from 'antd';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const WardrobeSection = () => {
  const router = useRouter()
  return (
    <div className={roboto.className}>
      <div className="md:max-w-7xl mx-auto p-4 mb-14">
        <div className="bg-[#C2B4A3] rounded-lg p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-stone-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
          <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-3/4'>
              <h2 className="text-3xl font-bold mb-4">ELEVATE YOUR WARDROBE</h2>
              <p className="mb-4">
                Discover the magic of Nilaa&apos;s exclusive collections, where each piece is crafted with
                unparalleled attention to detail.
              </p>
              <p className="mb-4">
                Experience the ultimate wardrobe companion, designed to elevate your style effortlessly.
              </p>
              <p className="mb-4">
                Here, timeless tradition harmoniously meets modern elegance, creating a seamless fusion of
                classic charm and contemporary sophistication.
              </p>
            </div>
            <div className='w-full md:w-1/4 flex items-center md:justify-center'>
              <button onClick={() => router.push('/allproducts')} className="bg-stone-800 text-white px-4 py-2 rounded hover:bg-stone-700 transition-colors">
                Shop Now →
              </button>
            </div>
          </div>
        </div>
        <Carousel autoplay autoplaySpeed={10000} arrows className='custom-carousel bg-[#e9e2da] rounded-lg' >
          <div className="text-center pb-10 px-10">
            <svg className="w-6 h-6 text-stone-500 mx-auto my-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-semibold mb-2">Founders Words</h3>
            <p className="text-sm md:text-base italic text-stone-600">
              There comes a moment when everything aligns. Follow your instincts, and you&apos;ll feel mother nature&apos;s gentle embrace, sweeping away all the negativity and revealing a path uniquely yours. In that precious instant, you will connect deeply with yourself, and your inner voice will softly say, &quot;This is the time I&apos;ve longed for—to create my own journey and embrace my honesty.&quot;
            </p>
          </div>
          <div className="text-center pb-10 px-10">
            <svg className="w-6 h-6 text-stone-500 mx-auto my-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-semibold mb-2">To our beloved Artisians</h3>
            <p className="text-sm italic md:text-base text-stone-600">
              &quot;Your incredible talent and dedication breathe life into each creation. At Nilaa, we hold your artistry and unwavering support close to our hearts, deeply valuing the time and effort you pour into crafting each masterpiece. Your work is not just appreciated—it&apos;s cherished.&quot;
            </p>
          </div>
        </Carousel>
      </div>
      <div
        className="min-h-20 bg-white rounded-lg shadow p-4 sm:p-6 xl:p-8 dark:bg-gray-800 antialiased"
        style={{
          backgroundImage: 'url(/assets/footer.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div>
          <p className="text-sm italic md:max-w-[50vw] text-gray-800 sm:mb-0 p-4 sm:p-6 xl:p-8">
            Connect to Nilaa,
            <br />
            Share your valuable thoughts and suggestions, or even your fashion needs or ideas, and we&apos;ll craft something unique just for you.
            <br />
            <br />
            Store 11, New Gold Souq Center Building,
            <br />
            Al Raffa, Dubai, UAE
            <br />
            <Link target='_blank' href="tel:971521193364">ph: +971 521 193 364</Link>
            <br />
            <Link target='_blank' href="https://maps.app.goo.gl/1ja1nN6XhQ6drkML6" className='text-blue-500 font-thin'>view directions</Link>
          </p>
        </div>
        <div className="rounded-lg pb-36 shadow sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8">
          <p className="mb-4 text-sm text-center text-gray-800 sm:mb-0">
            &copy; 2024 <Link target='_blank' href="https://nilaatrends.com/" className="hover:underline">Nilaatrends.com</Link>. All rights reserved.
          </p>
          <div className="flex justify-center items-center space-x-1">
            <Link target='_blank' href="https://www.facebook.com/profile.php?id=61561403615774&mibextid=ZbWKwL" className="inline-flex justify-center p-2 text-gray-800 rounded-lg cursor-pointer hover:text-blue-700">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            {/* <Link target='_blank' href="#" className="inline-flex justify-center p-2 text-gray-800 rounded-lg cursor-pointer hover:text-blue-700">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path fill="currentColor" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link> */}
            <Link target='_blank' href="#" className="inline-flex justify-center p-2 text-gray-800 rounded-lg cursor-pointer hover:text-blue-700">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd" />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
              </svg>
              <span className="sr-only">Linked in</span>
            </Link>
            <Link target='_blank' href="https://www.tiktok.com/@nilaa.trends?_t=8pg8o2lEMra&_r=1" className="inline-flex justify-center p-2 text-gray-800 rounded-lg cursor-pointer hover:text-blue-700">
              <svg
                className="w-6 h-6 mt-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.5 4.916a3.832 3.832 0 01-2.133-.647 4.083 4.083 0 01-1.329-1.719c-.256-.004-.507-.021-.757-.052v6.72a4.532 4.532 0 01-6.544 4.064 4.55 4.55 0 01-1.47-1.211 4.487 4.487 0 01-.923-2.852 4.533 4.533 0 015.465-4.451v2.04a2.507 2.507 0 00-3.565 2.217c0 .69.282 1.31.736 1.757a2.493 2.493 0 004.218-1.757V.333h2.5a6.33 6.33 0 003.04 5.583 6.322 6.322 0 003.46 1.034v2.5a8.826 8.826 0 01-3.5-.784v-.001Z"
                />
              </svg>
              <span className="sr-only">Tiktok</span>
            </Link>
            <Link target='_blank' href="https://www.instagram.com/nilaa.trends?igsh=MWUzNHcxbmZudm5vbw==" className="inline-flex justify-center p-2 text-gray-800 rounded-lg cursor-pointer  hover:text-blue-700">
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardrobeSection;
