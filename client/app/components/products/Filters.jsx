import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

export default function Filters({ search, handleSearchChange }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='relative flex flex-col w-full gap-2'>
            <div className='flex'>
                <button
                    id="dropdownDefault"
                    onClick={toggleDropdown}
                    className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 rounded-l-lg">
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

            <div
                id="dropdown"
                className={` z-10 ${isDropdownOpen ? 'block' : 'hidden'} w-full p-3 bg-[#e9ded0] rounded-lg shadow `}
            >
                <h6 className="mb-3 text-sm font-medium text-gray-900">Category</h6>
                <ul className=" text-sm" aria-labelledby="dropdownDefault">
                    {Array(10).fill().map(item => <li className="flex items-center">
                        <input
                            id="apple"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900">
                            Apple (56)
                        </label>
                    </li>)}
                </ul>
            </div>
        </div>

    );
}
