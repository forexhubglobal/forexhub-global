'use client';
import { useState, useEffect } from 'react';
import TrackedLink from '@/components/TrackedLink';

export default function RegisterButton({ 
  defaultLink, 
  brokerSlug,
  className = "block text-center w-full md:w-auto bg-gradient-to-r from-neon-blue to-primary-600 hover:from-neon-blue hover:to-neon-purple text-black px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6)] transition-all transform hover:-translate-y-1"
}: { 
  defaultLink?: string, 
  brokerSlug?: string,
  className?: string 
}) {
  const [link, setLink] = useState(defaultLink || '#');

  useEffect(() => {
    try {
      const ibDataStr = localStorage.getItem('forexhub_ib_data');
      if (ibDataStr && brokerSlug) {
        const ibData = JSON.parse(ibDataStr);
        // Periksa jika IB ada set link khusus untuk broker ini
        if (ibData && ibData.links && ibData.links[brokerSlug]) {
          setLink(ibData.links[brokerSlug]);
        }
      }
    } catch (e) {
      console.error("Error reading IB data", e);
    }
  }, [brokerSlug, defaultLink]);

  return (
    <TrackedLink href={link} target="_blank" rel="noopener noreferrer" className={className}>
      Buka Akaun
    </TrackedLink>
  );
}
