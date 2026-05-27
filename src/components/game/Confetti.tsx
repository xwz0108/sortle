import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number; // milliseconds
  onComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 5000, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const end = Date.now() + duration;

    const colors = ['#FF6B9D', '#C44DFF', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8A5B'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        onComplete?.();
      }
    };

    // Big burst on start
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      gravity: 1.2,
      scalar: 1.2,
      drift: 0,
    });

    // Start continuous fireworks
    frame();

    return () => {
      confetti.reset();
    };
  }, [duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Confetti;
