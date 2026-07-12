export type ThemeKey = 'green' | 'amber' | 'blue' | 'matrix';

export type LineType =
  | 'default'
  | 'success'
  | 'error'
  | 'info'
  | 'dim'
  | 'highlight'
  | 'command'
  | 'ascii'
  | 'progress'
  | 'link'
  | 'achievement'
  | 'separator';

export interface TerminalLine {
  id: string;
  text: string;
  type: LineType;
  /** ms delay before this line appears (staggered reveal) */
  delay?: number;
  href?: string; // for link type
  progressValue?: number; // 0-100 for progress type
}

export interface OutputBlock {
  lines: TerminalLine[];
}

export type TerminalMode = 'terminal' | 'snake' | 'matrix';

export interface TerminalState {
  lines: TerminalLine[];
  inputValue: string;
  commandHistory: string[];
  historyIndex: number;
  theme: ThemeKey;
  isBooted: boolean;
  mode: TerminalMode;
  isOpen: boolean;
  isMuted: boolean;
}

// ── Snake ──────────────────────────────────────────────────────────────────

export type CollectibleCategory = 'skill' | 'project' | 'achievement' | 'event';
export type CollectibleRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Collectible {
  id: string;
  emoji: string;
  label: string;
  category: CollectibleCategory;
  rarity: CollectibleRarity;
  /** Message shown in terminal when collected */
  message: string;
  /** Terminal line type for the message */
  messageType?: LineType;
  /** Special effect to trigger */
  effect?: 'speed_boost' | 'recruiter_overlay' | 'debug_sequence' | 'victory' | 'matrix';
}

export interface SnakeCell {
  x: number;
  y: number;
}

export interface SpawnedCollectible extends Collectible {
  cell: SnakeCell;
  spawnedAt: number;
}

export interface SnakeGameState {
  snake: SnakeCell[];
  direction: 'up' | 'down' | 'left' | 'right';
  nextDirection: 'up' | 'down' | 'left' | 'right';
  collectible: SpawnedCollectible | null;
  score: number;
  isRunning: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  speedMs: number;
  unlockedModules: string[];
}

// ── Achievements ──────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'found_terminal',   emoji: '🕵️', title: 'Hidden Terminal Found',   description: 'Discovered the secret OS.' },
  { id: 'first_command',    emoji: '⌨️', title: 'First Command',           description: 'Entered your first command.' },
  { id: 'explored_about',   emoji: '👤', title: 'Profile Loaded',          description: 'Read the about section.' },
  { id: 'explored_skills',  emoji: '🛠️', title: 'Skill Tree Unlocked',     description: 'Viewed the skills database.' },
  { id: 'explored_projects',emoji: '📁', title: 'Project Registry',        description: 'Explored the project registry.' },
  { id: 'read_experience',  emoji: '💼', title: 'Timeline Explorer',       description: 'Reviewed the experience timeline.' },
  { id: 'played_snake',     emoji: '🐍', title: 'Arcade Activated',        description: 'Launched the Snake game.' },
  { id: 'score_10',         emoji: '🎯', title: 'Getting Good',            description: 'Scored 10+ in Snake.' },
  { id: 'score_25',         emoji: '🏅', title: 'Snake Master',            description: 'Scored 25+ in Snake.' },
  { id: 'found_matrix',     emoji: '🟩', title: 'Matrix Mode',             description: 'Activated the matrix.' },
  { id: 'smart_recruiter',  emoji: '🤝', title: 'Smart Recruiter',         description: 'Ran the hireme command.' },
  { id: 'coffee_found',     emoji: '☕', title: 'Coffee Connoisseur',      description: 'Checked the coffee level.' },
  { id: 'full_victory',     emoji: '🚀', title: 'Dream Job Collected',     description: 'Completed the developer journey.' },
];
