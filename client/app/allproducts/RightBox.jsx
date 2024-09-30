"use client";
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axios';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/actions/userActions';

const ColorOption = ({ color }) => (
    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${color}-300 border border-gray-300`} />
);

function RightBox({ product }) {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state?.userDetails);
    const router = useRouter()

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
    const [isInStock, setIsInStock] = useState(true);
    if (!product) return null;

    const addCartData = async (proId1) => {

        if (!userDetails) {
            router.push('/register');
        } else {
            try {
                const urlQuery = `/user/addToCart/${proId1}`;
                const response = await axiosInstance.patch(urlQuery, { size: selectedSize });
                dispatch(setUserDetails(response?.data?.userData));

            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const handleSizeSelect = (e, size, index) => {
        e.stopPropagation()
        setSelectedSize(size);
        setSelectedSizeIndex(index);
        console.log('product?.sizes', product?.sizes);

        const selectedSizeData = product?.sizes?.find((s) => s.sizes === size);
        setIsInStock(selectedSizeData?.quantity > 0);
    };
    const handleAddToCartClick = (e, product) => {
        e.stopPropagation()
        if (selectedSize || product?.stock) {
            addCartData(product?._id);
        } else {
            alert('please select size')
        }
    };

    return (
        <div className="lg:col-span-4 side-item hidden md:block cursor-pointer" onClick={() => router.push(`/products/${product?._id}`)}>
            <div className="sticky top-24 bg-white rounded-lg overflow-hidden shadow-md p-4">
                <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`} alt={product.name} className="w-full h-full object-cover mb-4" />
                <h2 className="text-sm sm:text-lg font-semibold mb-2">{product.name}</h2>
                {product?.feature.map((fea, index) => (
                    < p key={index} className="text-xs sm:text-sm text-gray-600 mb-1">{fea}</p>
                ))}
                <p className="font-semibold mb-2 mt-4">Price • <span className='line-through'>AED {product?.price}</span> &bull; <>AED {product?.sale_rate}</></p>

                <div className="flex justify-between mb-4">
                    {/* <Link href={`/products/${product?._id}`}> */}
                    <button className="bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center text-xs sm:text-sm"
                        onClick={(e) => handleAddToCartClick(e, product)}
                    >
                        <ShoppingCart size={16} className="mr-2 z-10" />
                        Add to Cart
                    </button>
                    {/* </Link> */}
                    <button className="bg-gray-200 px-3 py-2 sm:px-4 sm:py-2 rounded text-xs sm:text-sm">Shop Now</button>
                </div>
                {product?.sizes?.length > 0 && <div className="mb-4">
                    <h3 className="text-sm sm:text-lg font-semibold mb-2">Available Size</h3>
                    <div className="flex space-x-2">
                        {product?.sizes.map((sizeObj, index) => (
                            sizeObj?.quantity > 0 && <button className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center text-xs sm:text-sm ${selectedSizeIndex === index
                                ? 'border-[#B17E3E]'
                                : 'hover:bg-gray-100'
                                }`} key={index}
                                onClick={(e) => handleSizeSelect(e, sizeObj.sizes, index)}
                            >
                                {console.log('sizeObj?.quantity', sizeObj?.quantity)}
                                {sizeObj.sizes}

                            </button>
                        ))}
                    </div>
                </div>}
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
                </div>
            </div>
        </div >
    );
}

export default RightBox;

