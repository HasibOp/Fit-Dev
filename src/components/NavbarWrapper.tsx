'use client';

import { useWorkoutStore } from '@/store/useWorkoutStore';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const planCount = useWorkoutStore((state) => state.planWorkouts.length);
  const savedCount = useWorkoutStore((state) => state.savedWorkouts.length);

  return <Navbar planCount={planCount} savedCount={savedCount} />;
}
