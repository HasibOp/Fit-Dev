'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWorkoutStore } from '@/store/useWorkoutStore';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const { planWorkouts, savedWorkouts, removeFromPlan, removeFromSaved } =
    useWorkoutStore();

  const currentList = activeTab === 'plan' ? planWorkouts : savedWorkouts;

  // Calculate metrics
  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planWorkouts.reduce(
    (sum, w) => sum + w.caloriesBurned,
    0,
  );

  const handleRemove = (id: number) => {
    if (activeTab === 'plan') {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
  };

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 md:px-8'>
      {/* Heading */}
      <div className='mb-10'>
        <h1 className='font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight'>
          My Plan
        </h1>
        <p className='text-gray-500 text-sm mt-2'>
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
        {[
          { label: 'Exercises', value: totalExercises },
          { label: 'Minutes', value: totalMinutes },
          { label: 'Calories', value: totalCalories },
        ].map((metric) => (
          <div
            key={metric.label}
            className='bg-[#121212] border border-[#222222] rounded-2xl p-6'
          >
            <p className='text-gray-500 text-xs font-bold uppercase tracking-widest mb-2'>
              {metric.label}
            </p>
            <p className='font-oswald text-3xl font-bold text-[#a3e635]'>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-8'>
        <button
          onClick={() => setActiveTab('plan')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            activeTab === 'plan'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white bg-[#121212] border border-[#222]'
          }`}
        >
          Today's Plan ({planWorkouts.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            activeTab === 'saved'
              ? 'bg-[#a3e635] text-black'
              : 'text-gray-400 hover:text-white bg-[#121212] border border-[#222]'
          }`}
        >
          Saved ({savedWorkouts.length})
        </button>
      </div>

      {/* Loading State */}
      {currentList.length === 0 ? (
        <div className='text-center py-20'>
          <h3 className='font-oswald text-2xl font-bold text-white uppercase mb-3'>
            Nothing Here Yet
          </h3>
          <p className='text-gray-500 text-sm mb-6'>
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href='/'
            className='bg-[#a3e635] text-black font-extrabold text-xs tracking-widest uppercase px-8 py-4 rounded-sm hover:bg-[#84cc16] transition-colors inline-block'
          >
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {currentList.map((workout) => (
            <div
              key={workout.id}
              className='bg-[#121212] border border-[#222222] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4'
            >
              {/* Thumbnail */}
              <div className='relative w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0'>
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  sizes='96px'
                  className='object-cover'
                />
              </div>

              {/* Info */}
              <div className='flex-1 w-full'>
                <h3 className='font-oswald text-lg font-bold text-white uppercase tracking-wide'>
                  {workout.name}
                </h3>
                <p className='text-gray-500 text-xs mb-2'>
                  {workout.equipment}
                </p>
                <div className='flex items-center gap-4 text-gray-400 text-xs'>
                  <span>{workout.duration} min</span>
                  <span>{workout.caloriesBurned} kcal</span>
                  <span className='flex items-center gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='12'
                      height='12'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                    </svg>
                    {workout.rating}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center gap-2 w-full sm:w-auto'>
                <Link
                  href={`/workouts/${workout.id}`}
                  className='flex-1 sm:flex-none text-center bg-[#a3e635] text-black font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-sm hover:bg-[#84cc16] transition-colors'
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemove(workout.id)}
                  className='flex-shrink-0 w-10 h-10 flex items-center justify-center border border-red-500/50 text-red-500 rounded-sm hover:bg-red-500/10 transition-colors'
                  aria-label='Remove'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18' />
                    <line x1='6' y1='6' x2='18' y2='18' />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
