// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Cart from '../cart';
// import ModalLayout from '../common/ModalLayout';
// import { useTheme } from 'next-themes';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import axiosInstance from '../../../axios'
// import { setUserDetails, clearUserDetails } from '../../../redux/actions/userActions';



// const Navbar = () => {
//   const dispatch = useDispatch();
//   const [userData,setUserData] = useState(useSelector(state => state.userDetails))

//   // const token = localStorage.getItem('Tokens');
//   useEffect(() => {
//     console.warn('check1');

//     const fetchData = async () => {
//       console.warn('check2');
//       try {
//         const response = await axiosInstance.get('/auth/user');
//         console.warn('check3',response.data);
//         dispatch(setUserDetails(response.data.data));
//         setUserData(response.data.data);
//       } catch (error) {
//         console.log('errr', error);
//         dispatch(clearUserDetails());
//       }
//     };
//     fetchData();

//   }, []);
//   // const userDetails = useSelector(state => state.userDetails);
//   console.log('userDetails', userData);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { theme, setTheme } = useTheme()
//   const [cartData, setCartData] = useState([])

//   let urlQuery = '';
//   useEffect(() => {
//     urlQuery = `/user/getcarts`
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get(urlQuery);
//         setCartData(response?.data?.data?.item?.length)
//       } catch (error) {
//         console.log('errr', error);
//       }
//     }

//     fetchData()
//   }, [])

//   useEffect(() => {
//     console.log(theme)
//   }, [theme])

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`bg-white font-sans fixed top-0 left-0 w-full transition-opacity duration-300 ${isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-opacity-100 backdrop-blur-none'} z-50`}
//       style={{ backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
//     >
//       <div className="mx-auto">
//         {/* Top section */}
//         <div className="flex flex-col md:flex-row justify-around items-center py-3">
//           {/* Left section */}
//           <div className="flex space-x-1 mb-2 md:mb-0">
//             <button className="px-3 py-1 bg-[#c2b280] text-white text-sm rounded ">
//               Trends
//             </button>
//             <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded"
//               style={{
//                 border: '2px dashed #cccccc',
//                 borderRadius: '8px'
//               }}>
//               Accessories
//             </button>
//             <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded"
//               style={{
//                 border: '2px dashed #cccccc',
//                 borderRadius: '8px'
//               }}>
//               Exclusive
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="text-2xl font-serif italic mb-2 md:mb-0">
//             <Link href={'/'}> NilaaTrends</Link>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-8 text-[#BFA285] mb-2 md:mb-0">
//             <Link href='/allproducts'>
//               <button>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </button>
//             </Link>
//             <Link href="">
//               <button>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </button>
//             </Link>
//             {/* <button onClick={() => setTheme(theme==="dark"?"light":"dark")}>Dark Mode</button> */}

//             {userData ? <button onClick={() => setOpen(true)}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartData > 0 && <span className="absolute top-2 bg-[#FF5722] text-white text-xs py-[0.1em] px-[0.5em] rounded-full">
//                 {cartData}
//               </span>}
//             </button> :
//               <Link href="/register">
//                 <button>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </button>
//               </Link>}


//             <Link href={userData ? '/profile' : '/register'}>
//               <button >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Bottom menu */}
//         <div className="flex flex-wrap justify-center py-2 space-x-10 text-sm font-bold bg-[#faf9f3] overflow-x-auto">
//           <Link href="/allproducts/Keralatraditional" className="text-gray-700 hover:text-gray-900">Kerala traditional</Link>
//           <Link href="/allproducts/Kurta" className="text-gray-700 hover:text-gray-900">Kurta</Link>
//           <Link href="/allproducts/kurti" className="text-gray-700 hover:text-gray-900">Kurti set</Link>
//           <Link href="/allproducts/Ethnic wear" className="text-gray-700 hover:text-gray-900">Ethnic wear</Link>
//           <Link href="/allproducts/Feminine" className="text-gray-700 hover:text-gray-900">Feminine</Link>
//           <Link href="/allproducts/Festive wear" className="text-gray-700 hover:text-gray-900">Festive wear</Link>
//           <Link href="/allproducts/Dual flare ears" className="text-gray-700 hover:text-gray-900">Dual flare ears</Link>
//           <Link href="/allproducts/Beach wear" className="text-gray-700 hover:text-gray-900">Beach wear</Link>
//         </div>
//       </div>
//       <ModalLayout open={open} setOpen={setOpen} bgcolor={'#fff'}><Cart /></ModalLayout>
//     </nav>
//   );
// };

// export default Navbar;



'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cart from '../cart';
import ModalLayout from '../common/ModalLayout';
import { useTheme } from 'next-themes';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../axios'
import { setUserDetails, clearUserDetails } from '../../../redux/actions/userActions';
import {   usePathname } from 'next/navigation';

const Navbar = () => {
  const dispatch = useDispatch();
  const path = usePathname();
  const userData = useSelector(state => state.userDetails);
  console.log('navUserDetails', userData);

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if (userData) {
      setCartData(userData?.cart?.item?.length || 0);
    }
  }, [userData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/auth/user');
        console.warn('Check3', response.data);
        dispatch(setUserDetails(response.data.data));
      } catch (error) {
        console.log('errr', error);
        dispatch(clearUserDetails());
      }
    };

    if (!userData) {
      fetchData();
    }
  }, [dispatch, path]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axiosInstance.get('/user/getcarts');
        setCartData(response?.data?.data?.item?.length || 0);
      } catch (error) {
        console.log('errr', error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white font-sans fixed top-0 left-0 w-full transition-opacity duration-300 ${isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-opacity-100 backdrop-blur-none'} z-50`}
      style={{ backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
    >
      <div className="mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-around items-center py-3">
          {/* Left section */}
          <div className="flex space-x-1 mb-2 md:mb-0">
            <button className="px-3 py-1 bg-[#c2b280] text-white text-sm rounded ">Trends</button>
            <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded" style={{ border: '2px dashed #cccccc', borderRadius: '8px' }}>Accessories</button>
            <button className="px-3 py-1 bg-[#f2f2f2] text-gray-700 text-sm rounded" style={{ border: '2px dashed #cccccc', borderRadius: '8px' }}>Exclusive</button>
          </div>

          {/* Logo */}
          <div className="text-2xl font-serif italic mb-2 md:mb-0">
            <Link href="/">NilaaTrends</Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-8 text-[#BFA285] mb-2 md:mb-0">
            <Link href='/allproducts'>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </Link>
            <Link href="">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </Link>

            {userData ? <button onClick={() => setOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartData > 0 && <span className="absolute top-2 bg-[#FF5722] text-white text-xs py-[0.1em] px-[0.5em] rounded-full">{cartData}</span>}
            </button> : <Link href="/register">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </Link>}

            <Link href={userData ? '/profile' : '/register'}>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom menu */}
        <div className="flex flex-wrap justify-center py-2 space-x-10 text-sm font-bold bg-[#faf9f3] overflow-x-auto">
          <Link href="/allproducts/Keralatraditional" className="text-gray-700 hover:text-gray-900">Kerala traditional</Link>
          <Link href="/allproducts/Kurta" className="text-gray-700 hover:text-gray-900">Kurta</Link>
          <Link href="/allproducts/kurti" className="text-gray-700 hover:text-gray-900">Kurti set</Link>
          <Link href="/allproducts/Ethnic wear" className="text-gray-700 hover:text-gray-900">Ethnic wear</Link>
          <Link href="/allproducts/Feminine" className="text-gray-700 hover:text-gray-900">Feminine</Link>
          <Link href="/allproducts/Festive wear" className="text-gray-700 hover:text-gray-900">Festive wear</Link>
          <Link href="/allproducts/Dual flare ears" className="text-gray-700 hover:text-gray-900">Dual flare ears</Link>
          <Link href="/allproducts/Beach wear" className="text-gray-700 hover:text-gray-900">Beach wear</Link>
        </div>
      </div>
      <ModalLayout open={open} setOpen={setOpen} bgcolor={'#fff'}><Cart /></ModalLayout>
    </nav>
  );
};

export default Navbar;
