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
      dark: 1, 
      diffuse: 1.2, 
      mapSamples: 16000, 
      mapBrightness: 12, // Very bright
      baseColor: [1, 1, 1], // Pure white dots for maximum visibility
      markerColor: [0.1, 0.8, 1], 
      glowColor: [0.2, 0.2, 0.2], // Visible glow
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-full max-w-[900px] aspect-square flex items-center justify-center">
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            contain: 'layout paint size',
            opacity: 1, // Full opacity
          }}
        />
      </div>
    </div>
  );
}
