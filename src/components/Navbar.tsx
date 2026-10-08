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
    <nav className='flex items-center justify-between bg-[#0a0a0a] border-b border-gray-800 px-3 sm:px-8 py-3 sm:py-4 text-white'>
      <Link href='/' className='flex items-center gap-1 sm:gap-2 shrink-0'>
        <Image
          src='/logo.png'
          alt='FitLog Logo'
          width={24}
          height={24}
          className='object-contain sm:w-8 sm:h-8'
        />
        <span className='hidden sm:block font-extrabold text-sm sm:text-xl tracking-wider'>
          FITLOG
        </span>
      </Link>

      <div className='flex items-center gap-1 sm:gap-2'>
        <Link
          href='/workouts'
          className={`px-2 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold transition-colors whitespace-nowrap ${
            pathname === '/workouts'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Workouts
        </Link>
        <Link
          href='/my-plan'
          className={`px-2 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-sm font-semibold transition-colors whitespace-nowrap ${
            pathname === '/my-plan'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Plan
        </Link>
      </div>

      <div className='flex items-center gap-2 sm:gap-6 text-[11px] sm:text-sm font-medium shrink-0'>
        <Link
          href='/my-plan'
          className='flex items-center gap-1 sm:gap-2 group whitespace-nowrap'
        >
          <span className='hidden sm:block text-gray-300 group-hover:text-white transition-colors'>
            Plan
          </span>
          <span className='flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-[#a3e635] text-black text-[9px] sm:text-xs font-bold rounded-full group-hover:bg-[#84cc16] transition-colors'>
            {planCount}
          </span>
        </Link>

        <Link
          href='/my-plan'
          className='flex items-center gap-1 sm:gap-2 group whitespace-nowrap'
        >
          <span className='hidden sm:block text-gray-300 group-hover:text-white transition-colors'>
            Saved
          </span>
          <span className='flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-gray-700 text-white text-[9px] sm:text-xs font-bold rounded-full group-hover:bg-gray-600 transition-colors'>
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
