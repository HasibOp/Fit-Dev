'use client';

import { useWorkoutStore } from '@/store/useWorkoutStore';
import { Workout } from '@/types/workout';
import toast from 'react-hot-toast';

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const { planWorkouts, addToPlan, saveForLater, isInPlan, isSaved } =
    useWorkoutStore();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const isPlanFull = planWorkouts.length >= 5;

  const handleAddToPlan = () => {
    if (inPlan) {
      toast.error("Already in today's plan");
      return;
    }
    if (isPlanFull) {
      toast.error("Today's plan is full (Max 5 lifts)");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    if (saved) {
      toast.error('Already saved');
      return;
    }
    saveForLater(workout);
    toast.success('Saved for later');
  };

  return (
    <div className='flex flex-col sm:flex-row gap-3 mt-auto'>
      <button
        onClick={handleAddToPlan}
        disabled={inPlan || isPlanFull}
        className={`flex-1 font-extrabold text-xs tracking-widest uppercase px-6 py-4 rounded-sm transition-colors duration-200 flex items-center justify-center gap-2 ${
          inPlan || isPlanFull
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-[#a3e635] text-black hover:bg-[#84cc16]'
        }`}
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
          <line x1='12' y1='5' x2='12' y2='19' />
          <line x1='5' y1='12' x2='19' y2='12' />
        </svg>
        {inPlan
          ? 'In Plan'
          : isPlanFull
            ? 'Plan Full (Max 5)'
            : "Add to Today's Plan"}
      </button>

      <button
        onClick={handleSaveForLater}
        disabled={saved}
        className={`flex-1 font-extrabold text-xs tracking-widest uppercase px-6 py-4 rounded-sm transition-colors duration-200 flex items-center justify-center gap-2 border ${
          saved
            ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
            : 'bg-transparent text-white border-[#a3e635] hover:bg-[#a3e635]/10'
        }`}
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
          <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
        </svg>
        {saved ? 'Saved' : 'Save for Later'}
      </button>
    </div>
  );
}
