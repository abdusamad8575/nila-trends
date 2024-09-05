import Image from 'next/image';
import Link from 'next/link';

const Profile = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center md:mt-24 p-4 bg-gray-50 ">
      {/* Mobile View */}
      <div className="w-full max-w-xl h-full bg-white rounded-2xl shadow-lg p-4 md:hidden">
        
        {/* Profile Section */}
        <div className="flex items-center mb-4">
          <Image
            src="/assets/profile.png"
            alt="Profile Picture"
            width={70}
            height={70}
            className="rounded-full"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">matildapallu@gmail.com</p>
            <p className="text-base">Matilda Pallu</p>
            <p className="text-base">Ph: 9876123450</p>
          </div>
        </div>

        {/* Action Buttons - Coupons and Support */}
        <div className="flex justify-between mb-4">
          <button className="flex-1 bg-gray-100 py-2 mx-2 rounded-lg text-center">
            <span className="block">Coupons</span>
          </button>
          <button className="flex-1 bg-gray-100 py-2 mx-2 rounded-lg text-center">
            <span className="block">Support</span>
          </button>
        </div>

        {/* My Orders */}
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
        <div className="flex justify-around mb-6">
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl">🔄</span>
            <span className="text-sm">Return</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl">⚙️</span>
            <span className="text-sm">Processing</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl">🚚</span>
            <span className="text-sm">Shipping</span>
          </button>
          <button className="flex flex-col items-center text-gray-700">
            <span className="text-2xl">💳</span>
            <span className="text-sm">Unpaid</span>
          </button>
        </div>

        {/* Links */}
        <div className="border-t border-gray-200 py-4">
          <Link href="#" className="block text-gray-700 text-base mb-2">
            Shipping addresses
          </Link>
          <Link href="#" className="block text-gray-700 text-base mb-2">
            Settings
          </Link>
          <button className="text-red-500 text-base">Sign Out</button>
        </div>
      </div>


      {/* Desktop View - Updated to match the reference image */}
      <div className="w-full max-w-7xl h-full bg-white rounded-2xl shadow-lg p-6 hidden md:flex">
        {/* Left Section */}
        <div className="w-1/2 pr-4 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button className="text-gray-500 text-2xl">&times;</button>
          </div>

          <div className="flex items-center mb-6">
            <Image
              src="/assets/profile.png"
              alt="Profile Picture"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">matildapallu@gmail.com</p>
              <p className="text-base">Matilda Pallu</p>
              <p className="text-base">Ph: 9876123450</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">Shipping addresses</h2>

          <div className="space-y-4 flex-grow overflow-auto pr-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Matilda Pallu</p>
                    <p>98937778492</p>
                    <p>Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-gray-200 rounded-md">Edit</button>
                    <input type="radio" name="address" className="form-radio" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Settings</h2>
          <button className="text-red-500 mt-2">Sign Out</button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 pl-4 border-l border-gray-200">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="flex space-x-2 mb-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full">Delivered</button>
            <button className="px-4 py-2 bg-gray-200 rounded-full">Processing</button>
            <button className="px-4 py-2 bg-gray-200 rounded-full">Cancelled</button>
            <button className="px-4 py-2 bg-gray-200 rounded-full">returned</button>
          </div>

          <div className="space-y-4 overflow-auto h-[calc(100vh-250px)] pr-2">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Order No: 1947034</p>
                  <p className="text-gray-500">22-07-2024</p>
                </div>
                <p className="text-sm mb-1">Shipping addresses</p>
                <p className="text-sm mb-2">Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                <div className="flex justify-between items-center">
                  <p>Quantity: 4</p>
                  <p>Total Amount: $109.99</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button className="px-4 py-1 bg-gray-200 rounded-md">Details</button>
                  <p className="text-green-600">Delivered</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;





