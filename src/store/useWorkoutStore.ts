import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout } from '@/types/workout';

interface WorkoutStore {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  completedWorkoutIds: number[]; 
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void; 
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean; 
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      planWorkouts: [],
      savedWorkouts: [],
      completedWorkoutIds: [],

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
        set({ 
          planWorkouts: get().planWorkouts.filter((w) => w.id !== id),
          completedWorkoutIds: get().completedWorkoutIds.filter((cId) => cId !== id)
        });
      },

      removeFromSaved: (id) => {
        set({ savedWorkouts: get().savedWorkouts.filter((w) => w.id !== id) });
      },

      markAsDone: (id) => {
        if (!get().completedWorkoutIds.includes(id)) {
          set({ completedWorkoutIds: [...get().completedWorkoutIds, id] });
        }
      },

      isInPlan: (id) => get().planWorkouts.some((w) => w.id === id),
      isSaved: (id) => get().savedWorkouts.some((w) => w.id === id),
      isDone: (id) => get().completedWorkoutIds.includes(id),
    }),
    {
      name: 'fitlog-storage',
    }
  )
);