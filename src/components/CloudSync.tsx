'use client';

import { useEffect } from 'react';
import { useAcademyStore } from '@/store/academyStore';

export default function CloudSync() {
  const fetchFromCloud = useAcademyStore((state) => state.fetchFromCloud);

  useEffect(() => {
    // Initial fetch on mount
    fetchFromCloud();
  }, [fetchFromCloud]);

  return null; // Silent component
}
