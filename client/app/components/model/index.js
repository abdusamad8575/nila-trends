import React from 'react';

const Modal = ({ isOpen, onClose, availableCoupons, onCouponSelect, selectedCoupon }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg md:min-w-[30%] z-60">
                <h2 className="text-lg font-bold mb-4">Select a Coupon</h2>
                {availableCoupons.map(coupon => (
                    <div key={coupon._id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={selectedCoupon === coupon._id}
                            onChange={() => onCouponSelect(coupon._id)}
                            className="mr-2"
                        />
                        <label>Apply {coupon.discount}% coupon</label>
                    </div>
                ))}
                <div className='flex justify-end'>
                    <button onClick={onClose} className="text-red-500 font-medium">
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Modal;
