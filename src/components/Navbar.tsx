'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className='flex items-center justify-between bg-[#0a0a0a] border-b border-gray-800 px-8 py-4 text-white'>
      <Link href='/' className='flex items-center gap-2'>
        <Image
          src='/logo.png'
          alt='FitLog Logo'
          width={32}
          height={32}
          className='object-contain'
        />
        <span className='font-extrabold text-xl tracking-wider'>FITLOG</span>
      </Link>

      <div className='flex items-center gap-2'>
        <Link
          href='/workouts'
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            pathname === '/workouts'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href='/my-plan'
          className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            pathname === '/my-plan'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      <div className='flex items-center gap-6 text-sm font-medium'>
        <Link href='/my-plan' className='flex items-center gap-2 group'>
          <span className='text-gray-300 group-hover:text-white transition-colors'>
            Plan
          </span>
          <span className='flex items-center justify-center w-5 h-5 bg-[#a3e635] text-black text-xs font-bold rounded-full group-hover:bg-[#84cc16] transition-colors'>
            {planCount}
          </span>
        </Link>

        <Link href='/my-plan' className='flex items-center gap-2 group'>
          <span className='text-gray-300 group-hover:text-white transition-colors'>
            Saved
          </span>
          <span className='flex items-center justify-center w-5 h-5 bg-gray-700 text-white text-xs font-bold rounded-full group-hover:bg-gray-600 transition-colors'>
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
