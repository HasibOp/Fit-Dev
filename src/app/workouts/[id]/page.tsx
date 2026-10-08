import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Workout } from '@/types/workout';
import WorkoutActions from '@/components/WorkoutActions';

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  const primaryUrl = process.env.API_URL_PRIMARY;
  const secondaryUrl = process.env.API_URL_SECONDARY;

  if (!primaryUrl && !secondaryUrl) {
    console.error('No API URLs configured in environment variables.');
    return null;
  }

  const fetchFromUrl = async (url: string) => {
    const res = await fetch(`${url}/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch from ${url}/${id}`);
    return res.json();
  };

  if (primaryUrl) {
    try {
      return await fetchFromUrl(primaryUrl);
    } catch (error) {
      console.warn('Primary API failed. Attempting secondary API...', error);
    }
  }

  if (secondaryUrl) {
    try {
      return await fetchFromUrl(secondaryUrl);
    } catch (error) {
      console.error('Secondary API failed as well:', error);
    }
  }

  return null;
}

async function WorkoutDetails({ params }: WorkoutDetailPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 md:px-8'>
      <div className='bg-[#121212] border border-[#222222] rounded-4xl overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* LEFT: Image */}
          <div className='lg:w-1/2 relative min-h-75 lg:min-h-150'>
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='lg:w-1/2 p-8 md:p-12 flex flex-col'>
            <h1 className='font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-3'>
              {workout.name}
            </h1>
            <p className='text-gray-400 text-sm mb-6'>{workout.description}</p>

            <div className='flex flex-wrap gap-2 mb-8'>
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className='bg-[#a3e635] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full'
                >
                  {group}
                </span>
              ))}
            </div>

            <div className='border border-[#2a2a2a] rounded-xl overflow-hidden mb-8'>
              {[
                { label: 'Equipment', value: workout.equipment },
                { label: 'Difficulty', value: workout.difficulty },
                { label: 'Sets', value: workout.sets.toString() },
                { label: 'Reps', value: workout.reps },
                { label: 'Duration', value: `${workout.duration} min` },
                { label: 'Calories', value: `${workout.caloriesBurned} kcal` },
                { label: 'Rating', value: workout.rating.toString() },
              ].map((row) => (
                <div
                  key={row.label}
                  className='flex items-center justify-between px-5 py-3.5 border-b border-[#2a2a2a] last:border-b-0'
                >
                  <span className='text-gray-500 text-xs font-bold uppercase tracking-widest'>
                    {row.label}
                  </span>
                  <span className='text-white text-sm font-medium'>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className='mb-8'>
              <h2 className='font-oswald text-xl font-bold text-white uppercase tracking-wide mb-4'>
                Instructions
              </h2>
              <ol className='space-y-3'>
                {workout.instructions.map((step, index) => (
                  <li key={index} className='flex gap-3'>
                    <span className='shrink-0 w-6 h-6 rounded-full bg-[#a3e635] text-black text-xs font-bold flex items-center justify-center'>
                      {index + 1}
                    </span>
                    <span className='text-gray-300 text-sm'>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <WorkoutDetails params={params} />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 md:px-8 animate-pulse'>
      <div className='bg-[#121212] border border-[#222222] rounded-4xl h-150 flex items-center justify-center'>
        <p className='text-[#a3e635] font-bold tracking-widest uppercase'>
          Loading Workout Details…
        </p>
      </div>
    </div>
  );
}
