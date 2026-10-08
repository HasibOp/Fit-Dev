import { Workout } from '@/types/workout';
import LibraryClient from './LibraryClient';

async function getWorkouts(): Promise<Workout[]> {
  const primaryUrl = process.env.API_URL_PRIMARY;
  const secondaryUrl = process.env.API_URL_SECONDARY;

  if (!primaryUrl && !secondaryUrl) {
    console.error('No API URLs configured in environment variables.');
    return [];
  }

  const fetchFromUrl = async (url: string) => {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
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

  return [];
}

export default async function LibrarySection() {
  const workouts = await getWorkouts();
  return <LibraryClient initialWorkouts={workouts} />;
}
