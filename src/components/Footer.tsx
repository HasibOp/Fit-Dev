import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-[#0a0a0a] border-t border-gray-800 py-8 px-8 mt-auto'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <Image src='/logo.png' alt='FitLog Logo' width={24} height={24} />
          <span className='font-extrabold text-white tracking-wider'>
            FITLOG
          </span>
        </div>
        <p className='text-gray-500 text-xs text-center md:text-right'>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
