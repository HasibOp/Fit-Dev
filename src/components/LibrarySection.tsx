import { Workout } from '@/types/workout';
import LibraryClient from './LibraryClient';

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      next: { revalidate: 3600 },
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
  return <LibraryClient initialWorkouts={workouts} />;
}
