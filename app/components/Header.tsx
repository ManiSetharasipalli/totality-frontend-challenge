'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AdjustmentsHorizontalIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import ShoppingCartIcon

const Header = () => {

  return (
    <div className='p-5 flex justify-between items-center shadow-sm bg-white fixed w-full z-50'>
      {/* Container for Logo, Title, and Search Bar */}
      <div className='flex items-center w-full md:w-auto'>
        <Link href="/" passHref>
          <div className='flex items-center cursor-pointer'>
            <Image src='/logo.svg' width={40} height={40} alt='Logo' />
            <h2 className='text-xl md:text-2xl text-blue-400 ml-2'>RentEase</h2>
          </div>
        </Link>
      </div>

      {/* Dropdown Button with User Icon and Menu Icon */}
      <div className='relative flex items-center gap-5'>
        <Link href='/filters' passHref>
          <div className='flex items-center cursor-pointer px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
            <AdjustmentsHorizontalIcon className='h-6 w-6 text-gray-600 mr-2' />
            <span className='text-gray-800 font-semibold'>Filter</span>
          </div>
        </Link>

        {/* Cart Icon */}
        <Link href='/cart' passHref>
          <div className='flex items-center cursor-pointer px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
            <ShoppingCartIcon className='h-6 w-6 text-gray-600' />
            <span className='sr-only'>Cart</span> {/* For accessibility */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
