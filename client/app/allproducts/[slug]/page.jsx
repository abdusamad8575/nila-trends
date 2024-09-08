"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RightBox from '../RightBox'
import { Pagination } from '@mui/material'
import { Filter, Search } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

const ProductCard = ({ image, category, ProId, title, fit, price, onClick }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={onClick}>
    <img src={image} alt={title} className="w-full h-48 sm:h-64 object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2 space-x-2">
        <span className="bg-gray-200 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded flex-shrink-0">
          {category}
        </span>
        <Link href={`/products/${ProId}`}>
          <button className="text-[10px] sm:text-xs text-blue-600 px-1.5 py-0.5 whitespace-nowrap">
            Shop Now
          </button>
        </Link>
      </div>
      <h3 className="mt-2 text-sm sm:text-lg font-semibold">{title}</h3>
      {/* <p className="text-xs sm:text-sm text-gray-600">Fit • {fit}</p> */}
      <p className="text-xs sm:text-sm text-gray-600">{fit}</p>
      <p className="text-xs sm:text-sm text-gray-600">Price • AED:{price}</p>
    </div>
  </div>
);

const Filters = () => {
  const param = useParams()
  const category = param?.slug?.replace(/%20/g, ' ');
  console.log(category);
  const [message, setMessage] = useState()
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async (page = 1, search = '') => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: { page, search }
      });
      console.log('products-', data.products);

      setProducts(data.products);
      setMessage(data.message)
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };
  const fetchFilters = async (page = 1, search = '') => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${category}`, {
        params: { page, search }
      });
      console.log('products-', data.docs);

      setProducts(data.products);
      setMessage(data.message)

      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchFilters(page, search)
    // fetchProducts(page, search);
  }, [page, search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const fixedSelectedProduct = selectedProduct ? selectedProduct : products[0]
  return (
    <div className="max-w-7xl mx-auto p-4 mt-12 md:mt-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 first-item">
          <div className="flex items-center mb-4">
            <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg">
              <Filter size={16} className="mr-2" />
              <span className="text-xs sm:text-sm">Filter</span>
            </button>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Kurta Sets"
                value={search}
                onChange={handleSearchChange}
                className="w-full py-2 px-3 sm:px-4 border border-gray-300 rounded-r-lg text-xs sm:text-sm"
              />
              <Search size={20} className="absolute right-2.5 sm:right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <div className='w-full pb-5 text-sm'>{message}</div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                ProId={product._id}
                image={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product.image[0]}`}
                category={product?.category?.name}
                title={product.name}
                fit={product.fitAndCare[0] || 'Regular'}
                price={product.sale_rate}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className="flex justify-center mt-4"
          />
        </div>

        <RightBox product={fixedSelectedProduct} />
      </div>
    </div>
  )
}

export default Filters