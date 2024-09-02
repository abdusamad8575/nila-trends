import Image from 'next/image';

const Profile = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center mt-16 p-4">
      <div className="w-full max-w-7xl h-full bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-4 flex flex-col">
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

          {/* Shipping Address Cards */}
          <div className="space-y-4 flex-grow overflow-auto pr-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                <div>
                  <p className="font-semibold">Matilda Pallu</p>
                  <p>98937778492</p>
                  <p>Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600">Edit</button>
                  <input type="radio" name="address" className="form-radio" />
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6">Settings</h2>
          <button className="text-red-500 mt-4">Sign Out</button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 pl-0 md:pl-4 border-t md:border-t-0 md:border-l border-gray-200">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded-full">Delivered</button>
            <button className="bg-gray-100 px-4 py-2 rounded-full">Processing</button>
            <button className="bg-gray-100 px-4 py-2 rounded-full">Cancelled</button>
            <button className="bg-gray-100 px-4 py-2 rounded-full">Returned</button>
          </div>

          <div className="space-y-4 overflow-auto h-full pr-2">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <p>Order No: 1947034</p>
                  <p className="text-gray-500 text-sm">22-07-2024</p>
                </div>
                <p className="text-sm mb-2">Shipping addresses</p>
                <p className="text-sm mb-2">Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India</p>
                <p className="text-sm mb-2">Quantity: 4</p>
                <div className="flex justify-between items-center">
                  <p>Total Amount: $109.99</p>
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
