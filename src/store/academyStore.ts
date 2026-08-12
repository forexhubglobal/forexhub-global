import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/utils/supabase/client';

interface AcademyState {
  completedLessons: string[];
  markAsComplete: (slug: string) => void;
  markAsIncomplete: (slug: string) => void;
  isCompleted: (slug: string) => boolean;
  getCourseProgress: (courseSlugs: string[]) => number;
  fetchFromCloud: () => Promise<void>;
}

export const useAcademyStore = create<AcademyState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      
      markAsComplete: async (slug) => {
        const state = get();
        if (!state.completedLessons.includes(slug)) {
          const newLessons = [...state.completedLessons, slug];
          set({ completedLessons: newLessons });
          
          // Background Cloud Sync
          try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
              await supabase.from('user_progress').upsert({
                user_id: user.id,
                completed_lessons: newLessons,
                updated_at: new Date().toISOString()
              }, { onConflict: 'user_id' });
            }
          } catch (e) {
            console.error('Failed to sync to cloud', e);
          }
        }
      },

      markAsIncomplete: async (slug) => {
        const state = get();
        const newLessons = state.completedLessons.filter(s => s !== slug);
        set({ completedLessons: newLessons });
        
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('user_progress').upsert({
              user_id: user.id,
              completed_lessons: newLessons,
              updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
          }
        } catch (e) {}
      },

      isCompleted: (slug) => {
        return get().completedLessons.includes(slug);
      },

      getCourseProgress: (courseSlugs) => {
        if (courseSlugs.length === 0) return 0;
        const completed = courseSlugs.filter(slug => get().completedLessons.includes(slug)).length;
        return Math.round((completed / courseSlugs.length) * 100);
      },

      fetchFromCloud: async () => {
        try {
          const supabase = createClient();
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data } = await supabase
              .from('user_progress')
              .select('completed_lessons')
              .eq('user_id', user.id)
              .single();
            
            if (data && data.completed_lessons) {
              // Merge local and cloud to prevent losing anonymous progress
              const localLessons = get().completedLessons;
              const merged = Array.from(new Set([...localLessons, ...data.completed_lessons]));
              set({ completedLessons: merged });
              
              // If we merged new stuff, save it back to cloud
              if (merged.length > data.completed_lessons.length) {
                await supabase.from('user_progress').upsert({
                  user_id: user.id,
                  completed_lessons: merged,
                  updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });
              }
            }
          }
        } catch (e) {
          console.error('Failed to fetch from cloud', e);
        }
      }
    }),
    {
      name: 'forexhub-academy-progress',
    }
  )
);
