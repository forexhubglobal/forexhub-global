import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BrokerStoreState {
  savedBrokers: string[];
  toggleBroker: (slug: string) => void;
  isSaved: (slug: string) => boolean;
}

export const useBrokerStore = create<BrokerStoreState>()(
  persist(
    (set, get) => ({
      savedBrokers: [],
      
      toggleBroker: (slug) => {
        const state = get();
        if (state.savedBrokers.includes(slug)) {
          set({ savedBrokers: state.savedBrokers.filter(s => s !== slug) });
        } else {
          set({ savedBrokers: [...state.savedBrokers, slug] });
        }
      },

      isSaved: (slug) => {
        return get().savedBrokers.includes(slug);
      },
    }),
    {
      name: 'forexhub-saved-brokers',
    }
  )
);
