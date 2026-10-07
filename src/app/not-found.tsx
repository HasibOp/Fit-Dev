import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'>
      <h1 className='font-oswald text-6xl md:text-8xl font-bold text-[#a3e635] mb-4'>
        404
      </h1>
      <h2 className='font-oswald text-3xl font-bold text-white uppercase tracking-widest mb-4'>
        Page Not Found
      </h2>
      <p className='text-gray-400 mb-8 max-w-md'>
        The workout or page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href='/'
        className='bg-[#a3e635] text-black font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-[#84cc16] transition-colors'
      >
        Back to Home
      </Link>
    </div>
  );
}
