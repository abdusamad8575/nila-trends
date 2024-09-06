"use client";


export default function Cart() {


  return (
    <div className=" flex justify-center items-center p-4 ">
      <div className="bg-white rounded-lg p-6 relative">
        {/* Close button */}
     

        {/* MOBILE VIEW - Cart Total and Checkout at the top */}
        <div className="block lg:hidden mb-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Cart Total :</p>
            <p className="text-lg font-semibold">$72</p>
          </div>
          <button className="mt-2 w-full bg-black text-white py-2 rounded-lg">
            Proceed To Checkout
          </button>
        </div>

        {/* Shopping Cart Header */}
        <h2 className="text-2xl font-semibold mb-4 hidden lg:block">Shopping Cart 🛒</h2>

        {/* Items and Cart Totals */}
        <div className="flex flex-col lg:flex-row">
          {/* Items */}
          <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold mb-2 hidden lg:block">Items - 4</h3>

            {/* Item List */}
            <div className="space-y-4">
              {/* Item */}
              <div className="flex items-center justify-between space-x-4">
                <img
                  src="/assets/product1.png"
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow text-left">
                  <h4 className="font-semibold text-sm">Timeless A-line Evening Dress</h4>
                  <p className="text-gray-500 text-xs">Size • medium</p>
                  <p className="text-gray-500 text-xs">$109.99</p>
                </div>
                <div className="flex items-center">
                  <button className="px-2 border border-gray-300 rounded">-</button>
                  <span className="mx-2">1</span>
                  <button className="px-2 border border-gray-300 rounded">+</button>
                </div>
              </div>

              {/* Another Item */}
              <div className="flex items-center justify-between space-x-4">
                <img
                  src="/assets/product2.png"
                  alt="Product"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-grow text-left">
                  <h4 className="font-semibold text-sm">Timeless A-line Evening Dress</h4>
                  <p className="text-gray-500 text-xs">Size • medium</p>
                  <p className="text-gray-500 text-xs">$109.99</p>
                </div>
                <div className="flex items-center">
                  <button className="px-2 border border-gray-300 rounded">-</button>
                  <span className="mx-2">1</span>
                  <button className="px-2 border border-gray-300 rounded">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Totals - Only for Desktop */}
          <div className="hidden lg:block w-full lg:w-1/3 lg:ml-4">
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Cart totals</h3>
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>$66</p>
              </div>
              <div className="flex justify-between">
                <p>Delivery Charge</p>
                <p>$6</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>$72</p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                🚚 3 days delivery
                <span className="text-green-600 cursor-pointer ml-2">Change</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Your address<br/>
                Manzil, Neettani, Thadatharikathu Veedu, Chullimanoor, NEDUMANGAD, KERALA, 695541, India
              </p>
              <button className="mt-4 text-sm text-gray-700 hover:underline">Add a delivery instruction</button>

              <div className="flex items-center mt-4">
                <input type="checkbox" id="singlePack" className="mr-2" />
                <label htmlFor="singlePack" className="text-sm">Get All these items in single pack</label>
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 rounded-lg">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
