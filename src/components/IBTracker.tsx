'use client';
import { useEffect } from 'react';

export default function IBTracker({ ibData }: { ibData: any }) {
  useEffect(() => {
    if (ibData) {
      try {
        // Simpan maklumat IB ke dalam localStorage browser pelawat
        localStorage.setItem('forexhub_ib_data', JSON.stringify({
          slug: ibData.slug,
          name: ibData.name,
          tiktok: ibData.tiktok,
          links: ibData.brokerLinks || {},
          timestamp: Date.now()
        }));
        console.log("IB Tracker Activated:", ibData.slug);
      } catch (e) {
        console.error("Failed to set IB Tracker", e);
      }
    }
  }, [ibData]);

  return null; // Komponen halimunan
}
