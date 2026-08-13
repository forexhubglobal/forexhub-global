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
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1, // Dark mode
      diffuse: 1.2, // Subtle lighting
      mapSamples: 16000, // Dense dots
      mapBrightness: 6,
      baseColor: [0.5, 0.5, 0.5], // Light gray dots
      markerColor: [0.1, 0.8, 1], // Cyan markers
      glowColor: [0.05, 0.05, 0.05], // Very faint glow
      markers: [],
      // @ts-ignore
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen pointer-events-none">
      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            contain: 'layout paint size',
          }}
        />
      </div>
    </div>
  );
}
