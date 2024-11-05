import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import axiosInstance from '../../../axios';

export default function Filters({
  setPriceRange,
  setSelectedDiscount,
  setSelectedRatings,
  setSelectedCategories,
  setSorting,
  handleSearchChange
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [price, setPrice] = useState(250);
  const [category, setCategory] = useState([]);

  const placeholders = ['Search for Sarees','Search for Kurta Sets', 'Search for Casual Wear', 'Search for Party Dresses'];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [showingPlaceholder, setShowingPlaceholder] = useState(true);
  const [onFocus, setOnFocus] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingPlaceholder(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        setCurrentPlaceholder(placeholders[(index + 1) % placeholders.length]);
        setShowingPlaceholder(true);
      }, 500);
    }, 1000);

    return () => clearInterval(interval);
  }, [index, placeholders]);



  const fetchCategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/categoryName`
      );
      setCategory(data?.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    setPriceRange([10, e.target.value]);
  };

  const handleCategoryChange = (e, categoryName) => {
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, categoryName]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((cat) => cat !== categoryName)
      );
    }
  };

  const handleDiscountChange = (e, discount) => {
    setSelectedDiscount(discount);
  };

  const handleRatingChange = (e, rating) => {
    console.log('rating', rating);
    if (rating === 5) {
      setSelectedRatings(0);
    } else {
      setSelectedRatings(rating);
    }

  };

  const handleSortingChange = (e) => {
    setSorting(e.target.value);
  };

  return (
    <div className="relative flex flex-col w-full gap-2">
      <div className="flex">
        <button
          id="dropdownDefault"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg"
        >
          <Filter size={16} className="mr-2" />
          <span className="text-xs sm:text-sm">Filter</span>
        </button>
        <div className="flex-grow relative">
          <input
            type="text"
            // placeholder="eg: Kurta Sets"
            // placeholder={currentPlaceholder}
            onChange={handleSearchChange}
            onFocus={()=>setOnFocus(true)}
            onBlur={()=>setOnFocus(false)}
            className="w-full py-2 px-3 sm:px-4 border font-bold border-gray-300 rounded-r-lg text-sm sm:text-md"
            style={{
              caretColor: 'transparent', 
            }}
          />
          <div className={`absolute left-2.5 top-2.5 transition-opacity duration-500 text-xs sm:text-sm ${!onFocus && showingPlaceholder ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-gray-400">{currentPlaceholder}</span>
          </div>
          <Search
            size={20}
            className="absolute right-2.5 sm:right-3 top-2.5 text-gray-400"
          />
        </div>
      </div>

      <div
        id="dropdown"
        className={`z-10 overflow-hidden transition-height duration-300 pop ${isDropdownOpen
          ? 'opacity-1 p-4'
          : 'max-h-[1px] opacity-0'
          } w-full bg-[#e9ded0] rounded-lg shadow`}
      >
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="sm:w-1/4">
            <h6 className="mb-3 text-sm font-medium text-gray-900">
              Category
            </h6>
            <ul className="text-sm" aria-labelledby="dropdownDefault">
              {category?.map((x, index) => (
                <li className="flex items-center mt-2" key={index}>
                  <input
                    id={`checkbox${index}`}
                    type="checkbox"
                    onChange={(e) => handleCategoryChange(e, x?.name)}
                    name="category"
                    className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                  />
                  <label
                    htmlFor={`checkbox${index}`}
                    className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900"
                  >
                    {x?.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:w-2/4">
            <div className="w-full mb-8">
              <h6 className="mb-2 text-sm font-medium text-gray-900">
                Price
              </h6>
              <ul className="text-sm" aria-labelledby="dropdownDefault">
                <div className="relative">
                  <label htmlFor="price-range-input" className="sr-only">
                    Default range
                  </label>
                  <input
                    id="price-range-input"
                    type="range"
                    value={price}
                    min="10"
                    max="500"
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500 absolute start-0 -bottom-6">
                    Min (AED 10)
                  </span>
                  <span className="text-sm text-gray-500 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    {`AED ${price}`}
                  </span>
                  <span className="text-sm text-gray-500 absolute end-0 -bottom-6">
                    Max (AED 500)
                  </span>
                </div>
              </ul>
            </div>
            <div className="w-full">
              <h6 className="mb-2 text-sm font-medium text-gray-900">
                Discount
              </h6>
              <ul className="text-sm" aria-labelledby="dropdownDefault">
                {[0, 10, 25, 50, 70].map((item) => (
                  <li className="flex items-center mb-1" key={item}>
                    <input
                      id={`disc${item}`}
                      type="radio"
                      defaultChecked={!item}
                      name="discount"
                      onChange={(e) => handleDiscountChange(e, item)}
                      className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                    />
                    <label
                      htmlFor={`disc${item}`}
                      className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900"
                    >
                      {item ? `${item}% and more` : 'All'}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sm:w-2/4">
            <div className="w-full mb-8">
              <h6 className="mb-3 text-sm font-medium text-gray-900">
                Customer Reviews
              </h6>
              <ul className="text-sm" aria-labelledby="dropdownDefault">
                {Array(5)
                  .fill()
                  .map((x, index) => (
                    <li className="flex items-center mt-2" key={index}>
                      <input
                        id={`radio${index}`}
                        type="radio"
                        name="rating"
                        onChange={(e) => handleRatingChange(e, 5 - index)}
                        className="w-4 h-4 bg-gray-100 border-gray-300 cursor-pointer rounded text-primary-600"
                      />
                      <label
                        htmlFor={`radio${index}`}
                        className="cursor-pointer flex ml-2 text-sm font-medium text-gray-900"
                      >
                        {index ? (
                          <>
                            <StarRating rating={5 - index} /> & up
                          </>
                        ) : (
                          'All'
                        )}
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="w-full">
              {/* <label htmlFor="sorting" className="text-sm font-medium text-gray-900">Sort by Price</label> */}
              <h6 className="mb-2 text-sm font-medium text-gray-900">
                Sort by Price
              </h6>
              <select id="sorting" onChange={handleSortingChange} className="block w-full text-sm p-2 border border-gray-300 bg-[#faf9f3] rounded outline-none">
                <option value="">None</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
