import React from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const ProductCard = ({ image, title, fit, price }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <img src={image} alt={title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <span className="bg-gray-200 text-xs font-semibold px-2 py-1 rounded">Womenswear</span>
      <Link href={'/products'}>
        <button className="float-right text-sm text-blue-600">Shop Now</button>
      </Link>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">Fit • {fit}</p>
      <p className="text-sm text-gray-600">Price • ${price}</p>
    </div>
  </div>
);

const ColorOption = ({ color }) => (
  <div className={`w-6 h-6 rounded-full bg-${color}-300 border border-gray-300`} />
);

const SizeOption = ({ size }) => (
  <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm">
    {size}
  </div>
);

const KurtaSetsListing = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 first-item">
          <div className="flex items-center mb-4">
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-l-lg">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Kurta Sets"
                className="w-full py-2 px-4 border border-gray-300 rounded-r-lg"
              />
              <Search size={20} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCard
              image="/assets/product1.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
            <ProductCard
              image="/assets/product2.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
            <ProductCard
              image="/assets/proudct3.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
            <ProductCard
              image="/assets/product1.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
            <ProductCard
              image="/assets/product2.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
            <ProductCard
              image="/assets/proudct3.png"
              title="Timeless A-line Evening Dress"
              fit="Ankle-length"
              price="109.99"
            />
          </div>
        </div>
        <div className="lg:col-span-4 side-item hidden md:block">
          <div className="sticky top-24 bg-white rounded-lg overflow-hidden shadow-md p-4">
            <img src="/assets/product.png" alt="Chiku Brown Printed Cotton" className="w-full h-64 object-cover mb-4" />
            <h2 className="text-lg font-semibold mb-2">Chiku Brown Printed Cotton Zari Weaving</h2>
            <p className="text-sm text-gray-600 mb-4">
              Red floral print a-line Ethnic Dress V-neck, Short, puff sleeve Midi length in flared hem
            </p>
            <p className="font-semibold mb-2">Price • $79.99</p>
            <div className="flex justify-between mb-4">
              <button className="bg-black text-white px-4 py-2 rounded flex items-center">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </button>
              <Link href="/products">
                <button className="bg-gray-200 px-4 py-2 rounded">Shop Now</button>
              </Link>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Size</h3>
              <div className="flex space-x-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <SizeOption key={size} size={size} />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Color & Texture</h3>
              <div className="flex space-x-2">
                <ColorOption color="red" />
                <ColorOption color="green" />
                <ColorOption color="blue" />
                <ColorOption color="yellow" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fit & Care</h3>
              <p className="text-sm text-gray-600">Fit • Any face shape</p>
              <p className="text-sm text-gray-600">Material & Care • 100% Cotton</p>
              <p className="text-sm text-gray-600">Care • Machine Wash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KurtaSetsListing;
