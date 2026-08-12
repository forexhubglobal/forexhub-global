"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTrackingStore } from '@/store/trackingStore';

function UTMTracker() {
  const searchParams = useSearchParams();
  const setUTMs = useTrackingStore((state) => state.setUTMs);

  useEffect(() => {
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');
    const campaign = searchParams.get('utm_campaign');
    const click_id = searchParams.get('click_id') || searchParams.get('gclid') || searchParams.get('fbclid');

    if (source || medium || campaign || click_id) {
      setUTMs({
        source,
        medium,
        campaign,
        click_id
      });
      console.log('UTM parameters stored successfully for tracking.');
    }
  }, [searchParams, setUTMs]);

  return null;
}

export default function UTMWrapper() {
  return (
    <Suspense fallback={null}>
      <UTMTracker />
    </Suspense>
  );
}
