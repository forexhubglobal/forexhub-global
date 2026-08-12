"use client";

import { useTrackingStore } from '@/store/trackingStore';
import React, { AnchorHTMLAttributes, useEffect, useState } from 'react';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function TrackedLink({ href, children, ...props }: TrackedLinkProps) {
  const [finalHref, setFinalHref] = useState(href);

  // We read from the store dynamically on mount so there's no hydration mismatch
  // and it always gets the latest UTMs.
  useEffect(() => {
    // We import here so we don't accidentally read state during SSR
    const utmString = useTrackingStore.getState().getUTMString();
    
    if (utmString && href) {
      try {
        const url = new URL(href);
        const paramsString = utmString.replace('?', '');
        const storedParams = new URLSearchParams(paramsString);
        
        // Append only if the original URL doesn't already have them
        storedParams.forEach((value, key) => {
          if (!url.searchParams.has(key)) {
            url.searchParams.append(key, value);
          }
        });
        
        setFinalHref(url.toString());
      } catch (e) {
        // Fallback for relative paths or invalid URLs
        if (href.includes('?')) {
          setFinalHref(`${href}&${utmString.replace('?', '')}`);
        } else {
          setFinalHref(`${href}${utmString}`);
        }
      }
    }
  }, [href]);

  return (
    <a href={finalHref} {...props}>
      {children}
    </a>
  );
}
