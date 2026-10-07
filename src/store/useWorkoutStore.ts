import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout } from '@/types/workout';

interface WorkoutStore {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      planWorkouts: [],
      savedWorkouts: [],

      addToPlan: (workout) => {
        const exists = get().planWorkouts.find((w) => w.id === workout.id);
        if (!exists) {
          set({ planWorkouts: [...get().planWorkouts, workout] });
        }
      },

      saveForLater: (workout) => {
        const exists = get().savedWorkouts.find((w) => w.id === workout.id);
        if (!exists) {
          set({ savedWorkouts: [...get().savedWorkouts, workout] });
        }
      },

      removeFromPlan: (id) => {
        set({ planWorkouts: get().planWorkouts.filter((w) => w.id !== id) });
      },

      removeFromSaved: (id) => {
        set({ savedWorkouts: get().savedWorkouts.filter((w) => w.id !== id) });
      },

      isInPlan: (id) => get().planWorkouts.some((w) => w.id === id),
      isSaved: (id) => get().savedWorkouts.some((w) => w.id === id),
    }),
    {
      name: 'fitlog-storage', // localStorage key
    }
  )
);