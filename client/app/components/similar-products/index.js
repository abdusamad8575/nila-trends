import React from 'react';

const SimilarStores = () => {
  const products = [
    {
      id: 1,
      image: '/assets/product1.png', // Replace with actual image paths
      title: 'Timeless A-line Evening Dress',
      category: 'Womenswear',
      price: '$109.99',
    },
    {
      id: 2,
      image: '/assets/product2.png',
      title: 'Timeless A-line Evening Dress',
      category: 'Womenswear',
      price: '$109.99',
    },
    {
      id: 3,
      image: '/assets/proudct3.png',
      title: 'Timeless A-line Evening Dress',
      category: 'Womenswear',
      price: '$109.99',
    },
    {
      id: 4,
      image: '/assets/product.png',
      title: 'Timeless A-line Evening Dress',
      category: 'Womenswear',
      price: '$109.99',
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="py-8 w-full md:w-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Similar Stores</h2>
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide px-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[60%] sm:min-w-[40%] md:min-w-[30%] lg:min-w-[20%] bg-white rounded-lg shadow-md flex-shrink-0"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">Fit•Ankle-length</p>
                <p className="text-gray-800 font-bold">{product.price}</p>
                <button className="mt-4 bg-transparent hover:bg-gray-200 text-black font-semibold py-2 px-4 border border-gray-300 rounded-full">
                  Shop Now &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarStores;
