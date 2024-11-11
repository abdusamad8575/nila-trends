'use client'
import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '../../axios';
import toast from 'react-hot-toast';

export default function PaymentConfirmation() {
  console.log('1');



  const router = useRouter();
  // const { ref } = router.query; 
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  console.log('ref', ref);


  useEffect(() => {
    if (ref) {
      confirmPayment(ref);
    }
  }, [ref]);

  const confirmPayment = async (orderReference) => {

    try {
      const storedOrderData = localStorage.getItem('orderDetails');
      const orderDetails = storedOrderData ? JSON.parse(storedOrderData) : null;
      console.log('orderDetails12', orderDetails);

      const response = await axiosInstance.post('/payment/confirm', { orderReference,orderDetails });
      if (response.data.message === 'Payment successful') {
        toast.success("Payment confirmed!");
        // router.push('/order-success'); 
        router.push('/'); 
      } else {
        toast.error("Payment not captured.");
        // router.push('/order-failed');
        router.push('/');
      }
    } catch (error) {
      toast.error("Payment confirmation failed. Please contact support.");
    }
  };

  return <div>Loading...</div>;
}
