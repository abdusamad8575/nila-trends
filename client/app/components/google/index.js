'use client';
import axios from '../../../axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

const GoogleLoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadGoogleApi = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.onload = () => {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
          });

          window.google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            { theme: 'outline', size: 'large', logo_alignment: "center", }
          );
        };
        document.body.appendChild(script);
      };
      loadGoogleApi();
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const id_token = response.credential;
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`, { tokenId: id_token });
      localStorage.setItem('Tokens', JSON.stringify({
        access: res.data.token.accessToken,
        refresh: res.data.token.refreshToken,
      }));
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.error('Error during Google login: ', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed z-50 top-0 left-0 bg-white opacity-80 w-[100vw] h-[100vh] flex items-center justify-center">
          <p className="text-black text-xl font-medium"><CircularProgress size={20} color='inherit' />&nbsp;loading...</p>
        </div>
      )}
      <div id="googleSignInDiv" className="mb-4"></div>
    </>
  );
};

export default GoogleLoginComponent;

