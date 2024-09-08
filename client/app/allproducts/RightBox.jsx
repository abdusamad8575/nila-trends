import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ColorOption = ({ color }) => (
    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${color}-300 border border-gray-300`} />
);

const SizeOption = ({ size }) => (
    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs sm:text-sm">
        {size}
    </div>
);

function RightBox({ product }) {
    const router = useRouter()
    if (!product) return null;

    return (
        <div className="lg:col-span-4 side-item hidden md:block cursor-pointer" onClick={()=>router.push(`/products/${product?._id}`)}>
            <div className="sticky top-24 bg-white rounded-lg overflow-hidden shadow-md p-4">
                <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`} alt={product.name} className="w-full h-full object-cover mb-4" />
                <h2 className="text-sm sm:text-lg font-semibold mb-2">{product.name}</h2>
                {product?.feature.map((fea,index) => (
                    < p key={index} className="text-xs sm:text-sm text-gray-600 mb-1">{fea}</p>
                ))}
                <p className="font-semibold mb-2 mt-4">Price • AED:{product.price}</p>
                <div className="flex justify-between mb-4">
                    <button className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center text-xs sm:text-sm">
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                    </button>
                    <Link href={`/products/${product?._id}`}> 
                        <button className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">Shop Now</button>
                    </Link>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Available Size</h3>
                    <div className="flex space-x-2">
                        {product.sizes.map((sizeObj) => (
                            <SizeOption key={sizeObj.sizes} size={sizeObj.sizes} />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Available Color & Texture</h3>
                    <div className="flex space-x-2">
                        {['red', 'green', 'blue', 'yellow'].map((color) => (
                            <ColorOption key={color} color={color} />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Fit & Care</h3>
                    {product?.fitAndCare.map((fit, index) => (
                        <p key={index} className="text-xs sm:text-sm text-gray-600">{fit}</p>
                    ))}
                    {/* <p className="text-xs sm:text-sm text-gray-600">Material & Care • {product.material}</p>
                <p className="text-xs sm:text-sm text-gray-600">Care • {product.fitAndCare[1]}</p> */}
                </div>
            </div>
        </div >
    );
}

export default RightBox;

