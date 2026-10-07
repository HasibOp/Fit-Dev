import Image from 'next/image';
import Link from 'next/link';
import { Workout } from '@/types/workout';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className='group bg-[#121212] border border-[#222222] rounded-2xl overflow-hidden hover:border-[#a3e635]/50 transition-all duration-300 flex flex-col'
    >
      {/* Image */}
      <div className='relative w-full h-48 overflow-hidden'>
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover group-hover:scale-105 transition-transform duration-500'
        />
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col flex-1'>
        {/* Muscle Group Tags */}
        <div className='flex flex-wrap gap-2 mb-3'>
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className='bg-[#a3e635] text-black text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full'
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className='font-oswald text-lg font-bold text-white uppercase tracking-wide mb-1'>
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className='text-gray-500 text-xs mb-4'>{workout.equipment}</p>

        {/* Stats Row */}
        <div className='flex items-center gap-4 text-gray-400 text-xs mt-auto'>
          {/* Duration */}
          <span className='flex items-center gap-1.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='10' />
              <polyline points='12 6 12 12 16 14' />
            </svg>
            {workout.duration} min
          </span>

          {/* Calories */}
          <span className='flex items-center gap-1.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' />
            </svg>
            {workout.caloriesBurned} kcal
          </span>

          {/* Rating */}
          <span className='flex items-center gap-1.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
            </svg>
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
