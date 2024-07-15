'use client';

import React from 'react';
import Navbar from '../Navbar';
import Filter from '../Filter';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='fixed bg-white z-10 w-full'>
        <Navbar />
      </div>
      <div className='h-[72px]' />
      <Filter />
      <div className='w-full px-4 md:px-6 py-4'>{children}</div>
    </div>
  );
}
