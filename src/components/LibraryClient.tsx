'use client';

import { useState, useMemo } from 'react';
import { Workout } from '@/types/workout';
import WorkoutCard from './WorkoutCard';

interface LibraryClientProps {
  initialWorkouts: Workout[];
}

export default function LibraryClient({ initialWorkouts }: LibraryClientProps) {
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>(
    'duration',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const processedWorkouts = useMemo(() => {
    let result = [...initialWorkouts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(query) ||
          w.muscleGroups.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'duration') return a.duration - b.duration;
      if (sortBy === 'calories') return a.caloriesBurned - b.caloriesBurned;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [initialWorkouts, sortBy, searchQuery]);

  return (
    <section
      id='library'
      className='w-full max-w-7xl mx-auto px-4 py-16 md:px-8'
    >
      <div className='mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <h2 className='font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight'>
            The Library
          </h2>
          <p className='text-gray-500 text-sm mt-2'>
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
          <div className='relative flex-1 sm:w-64'>
            <input
              type='text'
              placeholder='Search workouts...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-[#121212] border border-[#222] text-white text-sm rounded-sm px-4 py-3 pl-10 focus:outline-none focus:border-[#a3e635] transition-colors'
            />
            <svg
              className='absolute left-3 top-3.5 text-gray-500'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.3-4.3' />
            </svg>
          </div>

          <div className='relative'>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'duration' | 'calories' | 'rating')
              }
              className='appearance-none bg-[#121212] border border-[#222] text-white text-sm rounded-sm px-4 py-3 pr-10 focus:outline-none focus:border-[#a3e635] transition-colors cursor-pointer w-full'
            >
              <option value='duration'>Sort by: Duration</option>
              <option value='calories'>Sort by: Calories</option>
              <option value='rating'>Sort by: Rating</option>
            </select>
            <svg
              className='absolute right-3 top-3.5 text-gray-500 pointer-events-none'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m6 9 6 6 6-6' />
            </svg>
          </div>
        </div>
      </div>

      {processedWorkouts.length === 0 ? (
        <p className='text-gray-400 text-center py-20'>
          No workouts match your search.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {processedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
