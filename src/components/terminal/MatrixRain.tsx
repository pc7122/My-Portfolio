'use client';

import React, { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()ｱｲｳｴｵｶｷｸｹｺﾊﾋﾌﾍﾎ'.split('');

export const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const FONT_SIZE = 14;
    const cols = Math.floor(canvas.width / FONT_SIZE);
    const drops: number[] = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * canvas.height / FONT_SIZE)
    );

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 8, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((y, x) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, x * FONT_SIZE, y * FONT_SIZE);

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};
