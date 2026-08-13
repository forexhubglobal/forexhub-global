'use client';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0,
      dark: 1, // 1 is fully dark
      diffuse: 1.2,
      mapSamples: 24000,
      mapBrightness: 10,
      baseColor: [0.8, 0.8, 0.8], // Bright light gray/white dots so it's visible!
      markerColor: [0, 1, 1], // Bright cyan markers
      glowColor: [0.1, 0.1, 0.1], // Very subtle white/gray glow
      markers: [
        // Kuala Lumpur
        { location: [3.1390, 101.6869], size: 0.1 },
        // London
        { location: [51.5074, -0.1278], size: 0.05 },
        // New York
        { location: [40.7128, -74.0060], size: 0.05 },
        // Tokyo
        { location: [35.6762, 139.6503], size: 0.05 }
      ],
      // @ts-ignore - onRender is missing from cobe's TypeScript definitions
      onRender: (state: any) => {
        // Called on every animation frame
        state.phi = phi;
        phi += 0.003; // Rotation speed
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center opacity-80 pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{
          width: 800,
          height: 800,
          maxWidth: '100%',
          aspectRatio: 1,
        }}
        className="transition-opacity duration-1000"
      />
    </div>
  );
}
