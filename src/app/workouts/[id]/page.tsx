import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Workout } from '@/types/workout';
import WorkoutActions from '@/components/WorkoutActions';

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/fitlog/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params; // await params in Next.js 15
  const workout = await getWorkout(id);

  if (!workout) notFound();

  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 md:px-8'>
      <div className='bg-[#121212] border border-[#222222] rounded-[2rem] overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* LEFT: Image */}
          <div className='lg:w-1/2 relative min-h-[300px] lg:min-h-[600px]'>
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className='object-cover'
              priority
            />
          </div>

          {/* RIGHT: Content */}
          <div className='lg:w-1/2 p-8 md:p-12 flex flex-col'>
            {/* Title */}
            <h1 className='font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight mb-3'>
              {workout.name}
            </h1>

            {/* Description */}
            <p className='text-gray-400 text-sm mb-6'>{workout.description}</p>

            {/* Tags */}
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

            {/* Specs Table */}
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

            {/* Instructions */}
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

            {/* Action Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
}
