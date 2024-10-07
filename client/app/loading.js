"use client"
import { CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed z-50 top-0 bg-white opacity-80 w-[100vw] h-[100vh] flex items-center justify-center">
      <p className="text-black text-xl font-medium"><CircularProgress size={20} color='inherit' />&nbsp;loading...</p>
    </div>
  );
};

export default Loading;
