'use client';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let globe: any;

    const onResize = () => {
      if (canvasRef.current) {
        // Safe dimensions: cap at 800px to prevent WebGL context failures on weak GPUs
        // IMPORTANT: Fallback to 800 if offsetWidth is 0 (e.g. during initial render)
        let w = canvasRef.current.offsetWidth;
        if (w === 0) w = 800;
        width = Math.min(w, 800);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    if (!canvasRef.current) return;

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2, // scale internal resolution safely
      height: width * 2,
      phi: 0,
      theta: 0,
      dark: 1, 
      diffuse: 1.2, 
      mapSamples: 16000, 
      mapBrightness: 12, 
      baseColor: [1, 1, 1], // Pure white dots
      markerColor: [0.1, 0.8, 1], 
      glowColor: [0.2, 0.2, 0.2], 
      markers: [],
      // @ts-ignore
      onRender: (state) => {
        // Auto-rotation + user drag interaction
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center opacity-90">
        <canvas
          ref={canvasRef}
          className="pointer-events-auto cursor-grab active:cursor-grabbing w-full h-full"
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current!.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current!.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.01;
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta * 0.01;
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            contain: 'layout paint size', // standard for cobe
          }}
        />
      </div>
    </div>
  );
}
