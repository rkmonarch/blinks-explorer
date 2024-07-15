import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function BlinksSkeleton() {
  return (
    <section className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-3 2xl:columns-4 3xl:columns-5 4xl:columns-7 gap-6'>
      <Skeleton className='w-full break-inside-avoid h-96 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-96 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-80 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-72 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-96 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-80 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-96 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-72 mb-4 rounded-xl' />
      <Skeleton className='w-full break-inside-avoid h-72 mb-4 rounded-xl' />
    </section>
  );
}
