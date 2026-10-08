import Image from 'next/image';

export default function Hero() {
  return (
    <section className='w-full max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:px-8 md:py-12'>
      <div className='bg-[#121212] border border-[#222222] rounded-4xl flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl'>
        <div className='flex-1 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-10 w-full'>
          <span className='text-[#a3e635] font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-3 sm:mb-4'>
            Workout Library
          </span>

          <h1 className='font-oswald text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white uppercase leading-[1.05] tracking-tight mb-4 sm:mb-6'>
            Train with intent. <br className='hidden lg:block' /> Log every set.
          </h1>

          <p className='text-gray-400 text-xs sm:text-sm md:text-base max-w-md mb-6 sm:mb-8'>
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into todays plan, and watch the weeks work add up.
          </p>

          <a
            href='#library'
            className='bg-[#a3e635] text-black font-extrabold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase px-6 sm:px-8 py-3 sm:py-4 rounded-sm hover:bg-[#84cc16] transition-colors duration-200 flex items-center gap-2'
          >
            Browse Workouts
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M12 5v14' />
              <path d='m19 12-7 7-7-7' />
            </svg>
          </a>
        </div>

        <div className='flex-1 w-full flex justify-center md:justify-end relative'>
          <Image
            src='/hero-image.png'
            alt='Anatomical figure on a stationary bike'
            width={600}
            height={600}
            className='object-cover w-full h-auto max-h-75 sm:max-h-100 md:max-h-125 lg:max-h-150 object-center md:object-right'
            priority
          />
        </div>
      </div>
    </section>
  );
}
