import Image from 'next/image';

const Banner = () => {
  return (
    <div className="bg-gray-100 p-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[400px] mb-4">
          <Image 
            src="/path-to-your-image.jpg"
            alt="Fashion model"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <button className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded text-sm">
            Shop Now ↗
          </button>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-3xl font-bold mb-2">ELEVATE YOUR STYLE WITH NILAA TRENDS</h2>
          <p className="text-gray-600 mb-6">
            Explore a world of fashion at NiaaTrends, where trends meet affordability. Immerse yourself in the latest styles and seize exclusive promotions.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-3xl font-bold">1,500 +</p>
              <p className="text-sm text-gray-500">Fashion Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50 +</p>
              <p className="text-sm text-gray-500">New arrivals every month.</p>
            </div>
            <div>
              <p className="text-3xl font-bold">30%</p>
              <p className="text-sm text-gray-500">UPTO OFF on select items.</p>
            </div>
            <div>
              <p className="text-3xl font-bold">95%</p>
              <p className="text-sm text-gray-500">Customer Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;