'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SnakeEngine, GRID_COLS, GRID_ROWS, Direction } from './SnakeEngine';
import { Collectible, TerminalLine } from '../types';
import { SCORE_MILESTONES } from './collectibles';
import { line, blank } from '../commands/utils';

interface Props {
  onTerminalOutput: (lines: TerminalLine[]) => void;
  onGameEnd: () => void;
  theme: string; // 'green' | 'amber' | 'blue' | 'matrix'
}

const THEME_COLORS: Record<string, { accent: string; dim: string; bg: string; snake: string; head: string }> = {
  green:  { accent: '#00ff41', dim: '#003b00',  bg: '#0a0f0a', snake: '#00cc34', head: '#00ff41' },
  amber:  { accent: '#ffb000', dim: '#3b2700',  bg: '#0f0b00', snake: '#cc8800', head: '#ffb000' },
  blue:   { accent: '#00d4ff', dim: '#003b47',  bg: '#000f14', snake: '#00a8cc', head: '#00d4ff' },
  matrix: { accent: '#00ff41', dim: '#002200',  bg: '#000800', snake: '#008820', head: '#00ff41' },
};

const CELL = 22; // px per cell

export const SnakeGame: React.FC<Props> = ({ onTerminalOutput, onGameEnd, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SnakeEngine | null>(null);
  const rafRef = useRef<number>(0);
  const [score, setScore] = useState(0);
  const [popup, setPopup] = useState<string | null>(null);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [started, setStarted] = useState(false);
  const popupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const milestoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const colors = THEME_COLORS[theme] ?? THEME_COLORS.green;

  const showPopup = useCallback((msg: string) => {
    setPopup(msg);
    if (popupTimer.current) clearTimeout(popupTimer.current);
    popupTimer.current = setTimeout(() => setPopup(null), 2200);
  }, []);

  const showMilestone = useCallback((mod: string) => {
    setMilestone(mod);
    if (milestoneTimer.current) clearTimeout(milestoneTimer.current);
    milestoneTimer.current = setTimeout(() => setMilestone(null), 3000);
  }, []);

  // Draw loop
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const engine = engineRef.current;
    if (!canvas || !engine) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = GRID_COLS * CELL;
    const H = GRID_ROWS * CELL;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    // Grid dots
    ctx.fillStyle = colors.dim;
    for (let x = 0; x < GRID_COLS; x++) {
      for (let y = 0; y < GRID_ROWS; y++) {
        ctx.beginPath();
        ctx.arc(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Snake body
    engine.snake.forEach((cell, idx) => {
      const isHead = idx === 0;
      const px = cell.x * CELL;
      const py = cell.y * CELL;
      const pad = isHead ? 2 : 3;

      ctx.fillStyle = isHead ? colors.head : colors.snake;
      if (isHead) {
        ctx.shadowBlur = 12;
        ctx.shadowColor = colors.head;
      } else {
        ctx.shadowBlur = 0;
      }
      roundRect(ctx, px + pad, py + pad, CELL - pad * 2, CELL - pad * 2, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Collectible
    if (engine.collectible) {
      const { cell, emoji, rarity } = engine.collectible;
      const cx = cell.x * CELL + CELL / 2;
      const cy = cell.y * CELL + CELL / 2;
      const pulse = 1 + 0.12 * Math.sin(Date.now() / 300);

      // Glow ring for rare+
      if (rarity !== 'common') {
        const glowColor = rarity === 'legendary' ? '#ffd700' : colors.accent;
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = glowColor;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, (CELL / 2 - 2) * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Emoji
      ctx.font = `${Math.round(CELL * 0.7 * pulse)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, cx, cy + 1);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [colors]);

  useEffect(() => {
    const engine = new SnakeEngine({
      onCollect: (c: Collectible) => {
        showPopup(c.message);
        onTerminalOutput([
          blank(),
          line(c.message, c.messageType ?? 'success'),
          blank(),
        ]);
      },
      onScoreChange: (s) => setScore(s),
      onMilestone: (mod) => {
        showMilestone(mod);
        onTerminalOutput([
          blank(),
          line(`┌─────────────────────────────────────────┐`, 'info'),
          line(`│  🔓 New Module Unlocked: ${mod.padEnd(16)} │`, 'success'),
          line(`└─────────────────────────────────────────┘`, 'info'),
          blank(),
        ]);
      },
      onGameOver: (s) => {
        setGameOver(true);
        onTerminalOutput([
          blank(),
          line('Game Over — Developer journey paused.', 'error'),
          line(`Final Score: ${s}`, 'highlight'),
          blank(),
          line('Type "play snake" to try again.', 'dim'),
          blank(),
        ]);
      },
      onVictory: (s) => {
        setVictory(true);
        onTerminalOutput(victoryLines(s));
      },
    });

    engineRef.current = engine;
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      engine.destroy();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, onTerminalOutput, showPopup, showMilestone]);

  // Keyboard control
  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
      w: 'up', s: 'down', a: 'left', d: 'right',
      W: 'up', S: 'down', A: 'left', D: 'right',
    };

    const handler = (e: KeyboardEvent) => {
      const dir = keyMap[e.key];
      if (!dir) return;
      e.preventDefault();

      const engine = engineRef.current;
      if (!engine) return;

      if (!started && !gameOver && !victory) {
        setStarted(true);
        engine.start();
      }

      engine.setDirection(dir);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [started, gameOver, victory]);

  const handleRestart = () => {
    setGameOver(false);
    setVictory(false);
    setStarted(false);
    setScore(0);
    engineRef.current?.reset();
  };

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* HUD */}
      <div className="flex items-center justify-between w-full px-2" style={{ fontFamily: 'JetBrains Mono, monospace', color: colors.accent }}>
        <span style={{ fontSize: 12 }}>SCORE: <strong>{score}</strong></span>
        <span style={{ fontSize: 11, color: colors.dim === '#003b00' ? '#00cc34' : colors.accent, opacity: 0.7 }}>
          {SCORE_MILESTONES.find((m) => m.score > score)
            ? `NEXT UNLOCK @ ${SCORE_MILESTONES.find((m) => m.score > score)!.score}`
            : 'ALL MODULES UNLOCKED'}
        </span>
        <span style={{ fontSize: 12 }}>
          {!started && !gameOver && !victory ? '▶ PRESS ARROW TO START' : ''}
          {gameOver && 'GAME OVER'}
          {victory && '🎉 VICTORY!'}
        </span>
      </div>

      {/* Canvas */}
      <div className="relative" style={{ border: `1px solid ${colors.accent}40`, borderRadius: 6, overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={GRID_COLS * CELL}
          height={GRID_ROWS * CELL}
          style={{ display: 'block' }}
        />

        {/* Popup message */}
        {popup && (
          <div
            className="absolute left-1/2 top-4 -translate-x-1/2 text-center px-4 py-2 rounded-lg"
            style={{
              background: `${colors.bg}ee`,
              border: `1px solid ${colors.accent}`,
              color: colors.accent,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              maxWidth: '80%',
              zIndex: 10,
              boxShadow: `0 0 16px ${colors.accent}40`,
            }}
          >
            {popup}
          </div>
        )}

        {/* Milestone banner */}
        {milestone && (
          <div
            className="absolute left-1/2 bottom-4 -translate-x-1/2 text-center px-4 py-2 rounded-lg"
            style={{
              background: `${colors.bg}ee`,
              border: `1px solid ${colors.accent}`,
              color: colors.accent,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              zIndex: 10,
              boxShadow: `0 0 20px ${colors.accent}60`,
            }}
          >
            🔓 Module Unlocked: <strong>{milestone}</strong>
          </div>
        )}

        {/* Game over / victory overlay */}
        {(gameOver || victory) && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: `${colors.bg}cc`, zIndex: 20 }}
          >
            <div style={{ color: victory ? '#ffd700' : colors.accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700 }}>
              {victory ? '🚀 MISSION COMPLETE' : '💀 GAME OVER'}
            </div>
            <div style={{ color: colors.accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
              Score: {score}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="px-4 py-2 rounded text-xs font-mono transition-all hover:opacity-80"
                style={{ border: `1px solid ${colors.accent}`, color: colors.accent, background: 'transparent' }}
              >
                ↺ Play Again
              </button>
              <button
                onClick={onGameEnd}
                className="px-4 py-2 rounded text-xs font-mono transition-all hover:opacity-80"
                style={{ border: `1px solid ${colors.accent}60`, color: `${colors.accent}80`, background: 'transparent' }}
              >
                ← Exit Game
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: `${colors.accent}60` }}>
        ← ↑ → ↓ or W A S D to move
      </div>
    </div>
  );
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function victoryLines(score: number): TerminalLine[] {
  const timestamp = Date.now();
  const items: TerminalLine[] = [
    blank(),
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║            🚀  MISSION COMPLETE  🚀                ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('Developer Profile Fully Loaded ✓', 'success'),
    blank(),
    line('NAME         : Prathamesh Chaudhary', 'highlight'),
    line('ROLE         : React Native + AI/ML Engineer', 'highlight'),
    line('EXPERIENCE   : Production Mobile Applications', 'highlight'),
    blank(),
    line('SPECIALIZATION:', 'info'),
    line('  ⚛  React Native', 'default'),
    line('  Ⓣ  TypeScript', 'default'),
    line('  🔥  Firebase', 'default'),
    line('  🤖  AI Systems', 'default'),
    blank(),
    line('CURRENT FOCUS:', 'info'),
    line('  Building scalable products and advancing AI engineering.', 'default'),
    blank(),
    line('─────────────────────────────────────────────────────', 'separator'),
    blank(),
    line('Portfolio Exploration: 100% ████████████████████ ✓', 'success'),
    blank(),
    line('NEXT STEPS:', 'highlight'),
    { id: `v-resume-${timestamp}`, text: '  📄 View Resume', type: 'link' as const, href: '/Prathamesh_Chaudhary.pdf' },
    { id: `v-gh-${timestamp}`, text: '  🐙 Explore GitHub →  github.com/pc7122', type: 'link' as const, href: 'https://github.com/pc7122' },
    { id: `v-li-${timestamp}`, text: '  💼 Connect on LinkedIn', type: 'link' as const, href: 'https://www.linkedin.com/in/prathamesh-chaudhary-77b99b22b' },
    { id: `v-mail-${timestamp}`, text: '  📧 Send Email → prathameshpc7122@gmail.com', type: 'link' as const, href: 'mailto:prathameshpc7122@gmail.com' },
    blank(),
    line(`Final Score: ${score}`, 'dim'),
    blank(),
  ];
  return items.map((l, i) => ({ ...l, delay: i * 80 }));
}

