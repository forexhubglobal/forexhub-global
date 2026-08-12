import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AcademyState {
  completedLessons: string[];
  markAsComplete: (slug: string) => void;
  markAsIncomplete: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getCourseProgress: (courseSlugs: string[]) => number;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      
      markAsComplete: (slug) => set((state) => {
        if (!state.completedLessons.includes(slug)) {
          return { completedLessons: [...state.completedLessons, slug] };
        }
        return state;
      }),

      markAsIncomplete: (slug) => set((state) => ({
        completedLessons: state.completedLessons.filter(s => s !== slug)
      })),

      isCompleted: (slug) => {
        return get().completedLessons.includes(slug);
      },

      // Returns progress as a percentage (0 to 100)
      getCourseProgress: (courseSlugs) => {
        if (courseSlugs.length === 0) return 0;
        const completed = courseSlugs.filter(slug => get().completedLessons.includes(slug)).length;
        return Math.round((completed / courseSlugs.length) * 100);
      }
    }),
    {
      name: 'forexhub-academy-progress', // Disimpan dalam browser localStorage
    }
  )
);
