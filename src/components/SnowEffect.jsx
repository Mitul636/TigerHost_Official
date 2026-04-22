import { useEffect, useRef } from 'react';

const SNOWFLAKE_COUNT = 45;

export function SnowEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const snowflakes = [];

    for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      const size = Math.random() * 4 + 1.5;
      const left = Math.random() * 100;
      const duration = Math.random() * 12 + 8;
      const delay = Math.random() * 15;
      const drift = Math.random() > 0.5 ? 'snowfall' : 'snowfall-slow';

      flake.style.width = `${size}px`;
      flake.style.height = `${size}px`;
      flake.style.left = `${left}%`;
      flake.style.animation = `${drift} ${duration}s ${delay}s linear infinite`;
      flake.style.opacity = `${Math.random() * 0.5 + 0.2}`;

      container.appendChild(flake);
      snowflakes.push(flake);
    }

    return () => {
      snowflakes.forEach((f) => f.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden" />;
}