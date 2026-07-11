'use client';

import {
  useState, useCallback, useRef, useEffect, useReducer,
} from 'react';
import { TerminalLine, TerminalMode, ThemeKey, Achievement } from '../types';
import { processCommand } from '../commands';
import { line, blank, uid } from '../commands/utils';

const BOOT_LINES: TerminalLine[] = [
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  ██████╗ ██████╗  █████╗ ████████╗██╗  ██╗', type: 'ascii' },
  { id: uid(), text: '  ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║', type: 'ascii' },
  { id: uid(), text: '  ██████╔╝██████╔╝███████║   ██║   ███████║', type: 'ascii' },
  { id: uid(), text: '  ██╔═══╝ ██╔══██╗██╔══██║   ██║   ██╔══██║', type: 'ascii' },
  { id: uid(), text: '  ██║     ██║  ██║██║  ██║   ██║   ██║  ██║', type: 'ascii' },
  { id: uid(), text: '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝', type: 'ascii' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  AI Prathamesh OS  v1.0.0  —  Developer Edition', type: 'highlight' },
  { id: uid(), text: '  Built by Prathamesh Chaudhary', type: 'dim' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  ─────────────────────────────────────────────', type: 'separator' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  Booting System...', type: 'dim' },
  { id: uid(), text: '  Loading Developer Profile...          ✓', type: 'dim' },
  { id: uid(), text: '  Loading Experience Database...        ✓', type: 'dim' },
  { id: uid(), text: '  Loading Project Registry...           ✓', type: 'dim' },
  { id: uid(), text: '  Loading React Native Modules...       ✓', type: 'dim' },
  { id: uid(), text: '  Loading AI Knowledge Base...          ✓', type: 'dim' },
  { id: uid(), text: '  Loading Achievement Engine...         ✓', type: 'dim' },
  { id: uid(), text: '  Loading Arcade System...              ✓', type: 'dim' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  All Systems Operational ✓', type: 'success' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  Welcome, Visitor.', type: 'highlight' },
  { id: uid(), text: '', type: 'default' },
  { id: uid(), text: '  Type "help" to begin.', type: 'info' },
  { id: uid(), text: '', type: 'default' },
];

interface TerminalInternalState {
  lines: TerminalLine[];
  commandHistory: string[];
  historyIndex: number;
  mode: TerminalMode;
  theme: ThemeKey;
  isBooted: boolean;
}

type Action =
  | { type: 'BOOT_ADD_LINE'; line: TerminalLine }
  | { type: 'BOOT_COMPLETE' }
  | { type: 'ADD_LINES'; lines: TerminalLine[] }
  | { type: 'CLEAR' }
  | { type: 'SET_MODE'; mode: TerminalMode }
  | { type: 'SET_THEME'; theme: ThemeKey }
  | { type: 'PUSH_HISTORY'; cmd: string }
  | { type: 'SET_HISTORY_IDX'; idx: number };

function reducer(state: TerminalInternalState, action: Action): TerminalInternalState {
  switch (action.type) {
    case 'BOOT_ADD_LINE':
      return { ...state, lines: [...state.lines, action.line] };
    case 'BOOT_COMPLETE':
      return { ...state, isBooted: true };
    case 'ADD_LINES':
      return { ...state, lines: [...state.lines, ...action.lines] };
    case 'CLEAR':
      return { ...state, lines: [] };
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'PUSH_HISTORY':
      return {
        ...state,
        commandHistory: [action.cmd, ...state.commandHistory].slice(0, 50),
        historyIndex: -1,
      };
    case 'SET_HISTORY_IDX':
      return { ...state, historyIndex: action.idx };
    default:
      return state;
  }
}

const initialState: TerminalInternalState = {
  lines: [],
  commandHistory: [],
  historyIndex: -1,
  mode: 'terminal',
  theme: 'green',
  isBooted: false,
};

export function useTerminal(
  earnedAchievements: Achievement[],
  onUnlockAchievement: (id: string) => void,
  onAchievementPopup: (id: string) => void
) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const bootRef = useRef(false);

  // Boot sequence — runs once
  useEffect(() => {
    if (bootRef.current) return;
    bootRef.current = true;

    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        dispatch({ type: 'BOOT_ADD_LINE', line: BOOT_LINES[i] });
        i++;
      } else {
        clearInterval(interval);
        dispatch({ type: 'BOOT_COMPLETE' });
        // Unlock first achievement
        onUnlockAchievement('found_terminal');
        onAchievementPopup('found_terminal');
      }
    }, 90);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendLines = useCallback((lines: TerminalLine[]) => {
    // Stagger reveal based on delay property
    const base = Date.now();
    lines.forEach((l) => {
      const delay = l.delay ?? 0;
      setTimeout(() => {
        dispatch({ type: 'ADD_LINES', lines: [l] });
      }, delay);
    });
  }, []);

  const submitCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      // Echo command
      dispatch({
        type: 'ADD_LINES',
        lines: [
          blank(),
          { id: uid(), text: `prathamesh@portfolio:~$ ${trimmed}`, type: 'command' },
        ],
      });

      dispatch({ type: 'PUSH_HISTORY', cmd: trimmed });
      onUnlockAchievement('first_command');

      const result = processCommand(trimmed, earnedAchievements);

      if (result.sideEffect === 'clear') {
        dispatch({ type: 'CLEAR' });
        return;
      }

      if (result.sideEffect === 'open_snake') {
        appendLines(result.lines);
        setTimeout(() => dispatch({ type: 'SET_MODE', mode: 'snake' }), result.lines.length * 250 + 500);
        return;
      }

      if (result.sideEffect === 'activate_matrix') {
        appendLines(result.lines);
        setTimeout(() => dispatch({ type: 'SET_MODE', mode: 'matrix' }), 1200);
        setTimeout(() => dispatch({ type: 'SET_MODE', mode: 'terminal' }), 6000);
      }

      // Handle theme switching
      const parts = trimmed.toLowerCase().split(/\s+/);
      if (parts[0] === 'theme' && ['green', 'amber', 'blue', 'matrix'].includes(parts[1])) {
        dispatch({ type: 'SET_THEME', theme: parts[1] as ThemeKey });
      }

      // Unlock achievement if any
      if (result.unlockAchievement) {
        onUnlockAchievement(result.unlockAchievement);
        onAchievementPopup(result.unlockAchievement);
      }

      appendLines(result.lines);
    },
    [earnedAchievements, appendLines, onUnlockAchievement, onAchievementPopup]
  );

  const historyUp = useCallback(() => {
    const next = Math.min(state.historyIndex + 1, state.commandHistory.length - 1);
    dispatch({ type: 'SET_HISTORY_IDX', idx: next });
    setInputValue(state.commandHistory[next] ?? '');
  }, [state.historyIndex, state.commandHistory]);

  const historyDown = useCallback(() => {
    const next = Math.max(state.historyIndex - 1, -1);
    dispatch({ type: 'SET_HISTORY_IDX', idx: next });
    setInputValue(next === -1 ? '' : state.commandHistory[next] ?? '');
  }, [state.historyIndex, state.commandHistory]);

  const exitSnake = useCallback(() => {
    dispatch({ type: 'SET_MODE', mode: 'terminal' });
    appendLines([
      blank(),
      line('Arcade module closed.', 'dim'),
      line('Type "help" to continue exploring.', 'dim'),
      blank(),
    ]);
  }, [appendLines]);

  return {
    lines: state.lines,
    inputValue,
    setInputValue,
    mode: state.mode,
    theme: state.theme,
    isBooted: state.isBooted,
    submitCommand,
    historyUp,
    historyDown,
    appendLines,
    exitSnake,
  };
}
