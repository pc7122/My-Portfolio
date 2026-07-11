'use client';

import React, { useEffect, useCallback, useState, useRef, useReducer } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Terminal, Volume2, VolumeX } from 'lucide-react';
import { ThemeKey, Achievement, ALL_ACHIEVEMENTS, TerminalLine, TerminalMode } from './types';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { TerminalThemeSelector } from './TerminalThemeSelector';
import { MatrixRain } from './MatrixRain';
import { SnakeGame } from './snake/SnakeGame';
import { processCommand } from './commands';
import { line, blank, uid } from './commands/utils';
import { useAchievements } from './hooks/useAchievements';

/* ── Theme CSS Vars ─────────────────────────────────────────────────────── */

const THEME_VARS: Record<ThemeKey, Record<string, string>> = {
  green:  { '--t-bg': '#050e05', '--t-surface': '#080f08', '--t-accent': '#00ff41', '--t-dim-fg': '#4caf50', '--t-fg': '#c8ffc8', '--t-border': '#00ff4120' },
  amber:  { '--t-bg': '#0d0800', '--t-surface': '#110b00', '--t-accent': '#ffb000', '--t-dim-fg': '#cc8800', '--t-fg': '#fff3c8', '--t-border': '#ffb00020' },
  blue:   { '--t-bg': '#000c12', '--t-surface': '#001019', '--t-accent': '#00d4ff', '--t-dim-fg': '#0097b5', '--t-fg': '#c8f8ff', '--t-border': '#00d4ff20' },
  matrix: { '--t-bg': '#000800', '--t-surface': '#000b00', '--t-accent': '#00ff41', '--t-dim-fg': '#00aa28', '--t-fg': '#a8ffa8', '--t-border': '#00ff4120' },
};

/* ── Boot Lines ──────────────────────────────────────────────────────────── */

const BOOT_LINES: TerminalLine[] = [
  { id: 'b0',  text: '',                                                           type: 'default' },
  { id: 'b1',  text: '  ██████╗ ██████╗  █████╗ ████████╗██╗  ██╗',               type: 'ascii' },
  { id: 'b2',  text: '  ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║',               type: 'ascii' },
  { id: 'b3',  text: '  ██████╔╝██████╔╝███████║   ██║   ███████║',                type: 'ascii' },
  { id: 'b4',  text: '  ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██╔══██║',               type: 'ascii' },
  { id: 'b5',  text: '  ██║     ██║  ██║██║  ██║   ██║   ██║  ██║',               type: 'ascii' },
  { id: 'b6',  text: '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝',              type: 'ascii' },
  { id: 'b7',  text: '',                                                           type: 'default' },
  { id: 'b8',  text: '  AI Prathamesh OS  v1.0.0  —  Developer Edition',           type: 'highlight' },
  { id: 'b9',  text: '  Built by Prathamesh Chaudhary',                            type: 'dim' },
  { id: 'b10', text: '',                                                           type: 'default' },
  { id: 'b11', text: '  ─────────────────────────────────────────────',            type: 'separator' },
  { id: 'b12', text: '',                                                           type: 'default' },
  { id: 'b13', text: '  Booting System...',                                        type: 'dim' },
  { id: 'b14', text: '  Loading Developer Profile...          ✓',                  type: 'dim' },
  { id: 'b15', text: '  Loading Experience Database...        ✓',                  type: 'dim' },
  { id: 'b16', text: '  Loading Project Registry...           ✓',                  type: 'dim' },
  { id: 'b17', text: '  Loading React Native Modules...       ✓',                  type: 'dim' },
  { id: 'b18', text: '  Loading AI Knowledge Base...          ✓',                  type: 'dim' },
  { id: 'b19', text: '  Loading Achievement Engine...         ✓',                  type: 'dim' },
  { id: 'b20', text: '  Loading Arcade System...              ✓',                  type: 'dim' },
  { id: 'b21', text: '',                                                           type: 'default' },
  { id: 'b22', text: '  All Systems Operational ✓',                                type: 'success' },
  { id: 'b23', text: '',                                                           type: 'default' },
  { id: 'b24', text: '  Welcome, Visitor. Type "help" to begin.',                  type: 'highlight' },
  { id: 'b25', text: '',                                                           type: 'default' },
];

/* ── State ───────────────────────────────────────────────────────────────── */

interface State {
  lines: TerminalLine[];
  cmdHistory: string[];
  histIdx: number;
  mode: TerminalMode;
  theme: ThemeKey;
  booted: boolean;
}

type Act =
  | { type: 'ADD'; lines: TerminalLine[] }
  | { type: 'CLEAR' }
  | { type: 'BOOTED' }
  | { type: 'THEME'; theme: ThemeKey }
  | { type: 'MODE'; mode: TerminalMode }
  | { type: 'PUSH_CMD'; cmd: string }
  | { type: 'HIST_IDX'; idx: number };

const INIT: State = { lines: [], cmdHistory: [], histIdx: -1, mode: 'terminal', theme: 'green', booted: false };

function reducer(s: State, a: Act): State {
  switch (a.type) {
    case 'ADD':      return { ...s, lines: [...s.lines, ...a.lines] };
    case 'CLEAR':    return { ...s, lines: [] };
    case 'BOOTED':   return { ...s, booted: true };
    case 'THEME':    return { ...s, theme: a.theme };
    case 'MODE':     return { ...s, mode: a.mode };
    case 'PUSH_CMD': return { ...s, cmdHistory: [a.cmd, ...s.cmdHistory].slice(0, 50), histIdx: -1 };
    case 'HIST_IDX': return { ...s, histIdx: a.idx };
    default:         return s;
  }
}

/* ── Achievement Toast ───────────────────────────────────────────────────── */

interface Toast { id: string; achievement: Achievement }

/* ── Main Component ──────────────────────────────────────────────────────── */

export const TerminalOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [input, setInput] = useState('');

  const [state, dispatch] = useReducer(reducer, INIT);
  const bootedRef = useRef(false);  // tracks if boot has run
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const { earned, has, unlock } = useAchievements();

  /* -- helpers -- */

  const addLines = useCallback((lines: TerminalLine[]) => {
    // staggered reveal using delays on each line
    lines.forEach((l) => {
      const t = setTimeout(() => {
        dispatch({ type: 'ADD', lines: [l] });
      }, l.delay ?? 0);
      timersRef.current.push(t);
    });
  }, []);

  const showAchievementToast = useCallback((id: string) => {
    const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;
    const toast: Toast = { id: `${id}-${Date.now()}`, achievement };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), 4000);
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    if (has(id)) return;
    unlock(id);
    showAchievementToast(id);
  }, [has, unlock, showAchievementToast]);

  /* -- boot sequence: runs the first time terminal is opened -- */

  useEffect(() => {
    if (!isOpen) return;
    if (bootedRef.current) return;
    bootedRef.current = true;

    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        dispatch({ type: 'ADD', lines: [BOOT_LINES[i]] });
        i++;
      } else {
        clearInterval(iv);
        dispatch({ type: 'BOOTED' });
        unlockAchievement('found_terminal');
      }
    }, 80);

    return () => clearInterval(iv);
  }, [isOpen, unlockAchievement]);

  /* -- cleanup stagger timers on unmount -- */
  useEffect(() => {
    return () => { timersRef.current.forEach(clearTimeout); };
  }, []);

  /* -- keyboard toggle --
     IMPORTANT: do NOT use capture:true here — it would intercept keystrokes
     before they reach the controlled <input> in TerminalInput. Instead we
     listen in the bubble phase and only act when the event target is NOT
     our terminal input (because TerminalInput calls stopPropagation()). */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();

      // If the user is typing inside any input or textarea, let it be.
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    // bubble phase (default) — TerminalInput.stopPropagation() keeps its
    // own keydown events from reaching here.
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* -- command processing -- */

  const submitCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Echo command
    dispatch({ type: 'ADD', lines: [
      blank(),
      { id: uid(), text: `prathamesh@portfolio:~$ ${trimmed}`, type: 'command' },
    ]});
    dispatch({ type: 'PUSH_CMD', cmd: trimmed });

    unlockAchievement('first_command');

    const result = processCommand(trimmed, earned);

    // Side effects
    if (result.sideEffect === 'clear') {
      dispatch({ type: 'CLEAR' });
      return;
    }

    if (result.sideEffect === 'open_snake') {
      addLines(result.lines);
      const delay = result.lines.reduce((max, l) => Math.max(max, l.delay ?? 0), 0) + 800;
      setTimeout(() => dispatch({ type: 'MODE', mode: 'snake' }), delay);
      if (result.unlockAchievement) unlockAchievement(result.unlockAchievement);
      return;
    }

    if (result.sideEffect === 'activate_matrix') {
      addLines(result.lines);
      setTimeout(() => dispatch({ type: 'MODE', mode: 'matrix' }), 1200);
      setTimeout(() => dispatch({ type: 'MODE', mode: 'terminal' }), 7000);
    } else {
      addLines(result.lines);
    }

    // Theme change
    const parts = trimmed.toLowerCase().split(/\s+/);
    if (parts[0] === 'theme' && ['green', 'amber', 'blue', 'matrix'].includes(parts[1])) {
      dispatch({ type: 'THEME', theme: parts[1] as ThemeKey });
    }

    if (result.unlockAchievement) unlockAchievement(result.unlockAchievement);
  }, [earned, addLines, unlockAchievement]);

  /* -- history nav -- */

  const historyUp = useCallback(() => {
    const next = Math.min(state.histIdx + 1, state.cmdHistory.length - 1);
    dispatch({ type: 'HIST_IDX', idx: next });
    setInput(state.cmdHistory[next] ?? '');
  }, [state.histIdx, state.cmdHistory]);

  const historyDown = useCallback(() => {
    const next = Math.max(state.histIdx - 1, -1);
    dispatch({ type: 'HIST_IDX', idx: next });
    setInput(next === -1 ? '' : state.cmdHistory[next] ?? '');
  }, [state.histIdx, state.cmdHistory]);

  /* -- exit snake -- */

  const exitSnake = useCallback(() => {
    dispatch({ type: 'MODE', mode: 'terminal' });
    addLines([
      blank(),
      line('Arcade module closed.', 'dim'),
      line('Type "help" to continue exploring.', 'dim'),
      blank(),
    ]);
  }, [addLines]);

  /* -- snake output -- */

  const handleSnakeOutput = useCallback((lines: TerminalLine[]) => {
    addLines(lines);
  }, [addLines]);

  /* -- theme change via dot picker -- */

  const handleThemeChange = useCallback((t: ThemeKey) => {
    dispatch({ type: 'THEME', theme: t });
    addLines([blank(), line(`Theme switched to: ${t.toUpperCase()}`, 'success'), blank()]);
    if (t === 'matrix') {
      dispatch({ type: 'MODE', mode: 'matrix' });
      setTimeout(() => dispatch({ type: 'MODE', mode: 'terminal' }), 7000);
      unlockAchievement('found_matrix');
    }
  }, [addLines, unlockAchievement]);

  const vars = THEME_VARS[state.theme];

  /* ── Render ───────────────────────────────────────────────────────────── */

  return (
    <>
      {/* Achievement toasts */}
      <div className="fixed top-4 right-4 z-[10001] flex flex-col gap-2 pointer-events-none" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                background: '#111',
                border: '1px solid #ffd70060',
                boxShadow: '0 0 20px #ffd70030',
                borderRadius: 12,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minWidth: 240,
              }}
            >
              <span style={{ fontSize: 20 }}>{t.achievement.emoji}</span>
              <div>
                <div style={{ color: '#ffd700', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>ACHIEVEMENT UNLOCKED</div>
                <div style={{ color: '#fff', fontSize: 12, marginTop: 2 }}>{t.achievement.title}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="prathamesh-os"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              ...(Object.fromEntries(Object.entries(vars)) as React.CSSProperties),
              background: 'var(--t-bg)',
              fontFamily: 'JetBrains Mono, monospace',
            } as React.CSSProperties}
          >
            {/* CRT scanlines */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.10) 0px, rgba(0,0,0,0.10) 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Matrix rain */}
            {state.mode === 'matrix' && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                <MatrixRain />
              </div>
            )}

            {/* Top bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 20px', flexShrink: 0, position: 'relative', zIndex: 20,
              borderBottom: '1px solid var(--t-border)', background: 'var(--t-surface)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Terminal size={14} color="var(--t-accent)" />
                <span style={{ color: 'var(--t-accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em' }}>
                  AI PRATHAMESH OS v1.0
                </span>
                <span style={{ color: 'var(--t-dim-fg)', fontSize: 10, opacity: 0.8 }}>
                  — {state.mode === 'snake' ? 'ARCADE MODULE' : state.mode === 'matrix' ? 'MATRIX MODE' : 'TERMINAL'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <TerminalThemeSelector current={state.theme} onChange={handleThemeChange} />

                <button
                  onClick={() => setIsMuted((m) => !m)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t-dim-fg)', padding: 4, opacity: 0.6 }}
                  title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t-dim-fg)', padding: 4, opacity: 0.7 }}
                  title="Close terminal (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 20 }}>
              {state.mode === 'snake' ? (
                <div style={{
                  height: '100%', display: 'flex', flexDirection: 'column',
                  overflowY: 'auto', padding: 16, gap: 16,
                }}>
                  <SnakeGame
                    onTerminalOutput={handleSnakeOutput}
                    onGameEnd={exitSnake}
                    theme={state.theme}
                  />
                  {/* Log panel */}
                  <div style={{
                    background: 'var(--t-surface)', border: '1px solid var(--t-border)',
                    borderRadius: 8, padding: 12, minHeight: 120, overflowY: 'auto',
                  }}>
                    <div style={{ color: 'var(--t-dim-fg)', fontSize: 10, marginBottom: 8 }}>
                      {'// DEVELOPER JOURNEY LOG'}
                    </div>
                    <TerminalOutput lines={state.lines} theme={state.theme} />
                  </div>
                </div>
              ) : (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
                  <TerminalOutput lines={state.lines} theme={state.theme} />
                </div>
              )}
            </div>

            {/* Input */}
            {state.mode !== 'snake' && (
              <div style={{ position: 'relative', zIndex: 20 }}>
                <TerminalInput
                  value={input}
                  onChange={setInput}
                  onSubmit={submitCommand}
                  onHistoryUp={historyUp}
                  onHistoryDown={historyDown}
                  isBooted={state.booted}
                  isOpen={isOpen}
                />
              </div>
            )}

            {/* Status bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '5px 20px', flexShrink: 0, position: 'relative', zIndex: 20,
              borderTop: '1px solid var(--t-border)', background: 'var(--t-surface)',
              fontSize: 10, color: 'var(--t-dim-fg)',
            }}>
              <span>{earned.length}/{ALL_ACHIEVEMENTS.length} achievements • Esc to close • Tab to autocomplete</span>
              <span style={{ opacity: 0.4 }}>AI PRATHAMESH OS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating >_ Easter egg button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            onClick={() => setIsOpen(true)}
            title="Click or press ` to open the terminal OS"
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              borderRadius: 8,
              background: 'rgba(5,14,5,0.92)',
              border: '1px solid rgba(0,255,65,0.25)',
              color: 'rgba(0,255,65,0.65)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(0,255,65,0.12)',
              transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(0,255,65,0.55)';
              el.style.color = '#00ff41';
              el.style.boxShadow = '0 0 28px rgba(0,255,65,0.28)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(0,255,65,0.25)';
              el.style.color = 'rgba(0,255,65,0.65)';
              el.style.boxShadow = '0 0 20px rgba(0,255,65,0.12)';
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1 }}>{'>'}_</span>
            <span style={{ fontSize: 10, opacity: 0.7 }}>OS</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
