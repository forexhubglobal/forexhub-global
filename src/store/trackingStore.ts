import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TrackingState {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  click_id: string | null;
  setUTMs: (params: { source?: string | null; medium?: string | null; campaign?: string | null; click_id?: string | null }) => void;
  getUTMString: () => string;
}

export const useTrackingStore = create<TrackingState>()(
  persist(
    (set, get) => ({
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      click_id: null,
      setUTMs: (params) => set((state) => ({
        utm_source: params.source || state.utm_source,
        utm_medium: params.medium || state.utm_medium,
        utm_campaign: params.campaign || state.utm_campaign,
        click_id: params.click_id || state.click_id,
      })),
      getUTMString: () => {
        const { utm_source, utm_medium, utm_campaign, click_id } = get();
        const params = new URLSearchParams();
        if (utm_source) params.append('utm_source', utm_source);
        if (utm_medium) params.append('utm_medium', utm_medium);
        if (utm_campaign) params.append('utm_campaign', utm_campaign);
        if (click_id) params.append('click_id', click_id);
        
        const stringParams = params.toString();
        return stringParams ? `?${stringParams}` : '';
      }
    }),
    {
      name: 'forexhub-tracking-storage', // disimpan dalam localStorage
    }
  )
);
