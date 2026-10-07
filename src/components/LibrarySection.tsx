import WorkoutCard from './WorkoutCard';
import { Workout } from '@/types/workout';

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) throw new Error('Failed to fetch workouts');
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section
      id='library'
      className='w-full max-w-7xl mx-auto px-4 py-16 md:px-8'
    >
      {/* Heading */}
      <div className='mb-10'>
        <h2 className='font-oswald text-4xl md:text-5xl font-bold text-white uppercase tracking-tight'>
          The Library
        </h2>
        <p className='text-gray-500 text-sm mt-2'>
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Grid */}
      {workouts.length === 0 ? (
        <p className='text-gray-400 text-center py-20'>
          No workouts available.
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
