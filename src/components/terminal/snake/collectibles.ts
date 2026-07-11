import { Collectible } from '../types';

export const COLLECTIBLES: Collectible[] = [
  // ── Skills (common) ───────────────────────────────────────────────────────
  {
    id: 'rn',
    emoji: '⚛',
    label: 'React Native',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: React Native — Cross-platform mobile mastery.',
    messageType: 'success',
  },
  {
    id: 'ts',
    emoji: 'Ⓣ',
    label: 'TypeScript',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: TypeScript — Type-safe engineering at scale.',
    messageType: 'success',
  },
  {
    id: 'firebase',
    emoji: '🔥',
    label: 'Firebase',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: Firebase — Real-time backend without the hassle.',
    messageType: 'success',
  },
  {
    id: 'redux',
    emoji: '⚡',
    label: 'Redux',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: Redux — Predictable state, every time.',
    messageType: 'success',
  },
  {
    id: 'python',
    emoji: '🐍',
    label: 'Python',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: Python — From data pipelines to ML models.',
    messageType: 'success',
  },
  {
    id: 'ai',
    emoji: '🤖',
    label: 'AI Engineering',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: AI — Building intelligent systems that reason.',
    messageType: 'success',
  },
  {
    id: 'ml',
    emoji: '🧠',
    label: 'Machine Learning',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: Machine Learning — Training models that ship.',
    messageType: 'success',
  },
  {
    id: 'cloud',
    emoji: '☁',
    label: 'Cloud',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: Cloud — Scalable infrastructure in the sky.',
    messageType: 'success',
  },
  {
    id: 'fastapi',
    emoji: '🚄',
    label: 'FastAPI',
    category: 'skill',
    rarity: 'common',
    message: 'Skill Acquired: FastAPI — Blazing fast Python APIs.',
    messageType: 'success',
  },

  // ── Projects (uncommon) ───────────────────────────────────────────────────
  {
    id: 'vendekin',
    emoji: '📱',
    label: 'Vendekin Platform',
    category: 'project',
    rarity: 'uncommon',
    message: 'Project Discovered: Vendekin Mobile Platform — 500+ smart vending machines.',
    messageType: 'info',
  },
  {
    id: 'emosense',
    emoji: '😊',
    label: 'EmoSense',
    category: 'project',
    rarity: 'uncommon',
    message: 'Project Discovered: EmoSense — Multimodal emotion recognition AI.',
    messageType: 'info',
  },
  {
    id: 'plant',
    emoji: '🌿',
    label: 'Plant Disease AI',
    category: 'project',
    rarity: 'uncommon',
    message: 'Project Discovered: Plant Disease Detection — CNN classifier in production.',
    messageType: 'info',
  },
  {
    id: 'portfolio',
    emoji: '🌐',
    label: 'Portfolio OS',
    category: 'project',
    rarity: 'uncommon',
    message: 'Project Discovered: Developer Portfolio OS — The very OS you are inside right now.',
    messageType: 'info',
  },

  // ── Achievements (rare) ───────────────────────────────────────────────────
  {
    id: 'arch_revamp',
    emoji: '🏆',
    label: 'Architecture Revamp',
    category: 'achievement',
    rarity: 'rare',
    message: 'Achievement Unlocked: Architecture Revamp — 50K+ line codebase modernization.',
    messageType: 'highlight',
  },
  {
    id: 'dual_machine',
    emoji: '🏆',
    label: 'Dual Machine Support',
    category: 'achievement',
    rarity: 'rare',
    message: 'Achievement Unlocked: Dual Machine Support — Remote simulation engineering.',
    messageType: 'highlight',
  },
  {
    id: 'first_production',
    emoji: '🏆',
    label: 'First Production Release',
    category: 'achievement',
    rarity: 'rare',
    message: 'Achievement Unlocked: First Production Release — Real users, real machines, shipped.',
    messageType: 'highlight',
  },
  {
    id: 'error_recovery',
    emoji: '🏆',
    label: 'Error Recovery System',
    category: 'achievement',
    rarity: 'rare',
    message: 'Achievement Unlocked: Error Recovery System — 40% downtime reduction at scale.',
    messageType: 'highlight',
  },

  // ── Special Events ────────────────────────────────────────────────────────
  {
    id: 'bug',
    emoji: '🐛',
    label: 'Bug',
    category: 'event',
    rarity: 'uncommon',
    message: 'Bug Detected... Debugging... Issue Fixed ✓',
    messageType: 'error',
    effect: 'debug_sequence',
  },
  {
    id: 'coffee',
    emoji: '☕',
    label: 'Coffee',
    category: 'event',
    rarity: 'uncommon',
    message: 'Energy Boost Activated! Speed +50% for 5 seconds.',
    messageType: 'success',
    effect: 'speed_boost',
  },
  {
    id: 'recruiter',
    emoji: '💼',
    label: 'Recruiter Badge',
    category: 'event',
    rarity: 'rare',
    message: 'Recruiter Mode Activated — Quick profile summary incoming.',
    messageType: 'highlight',
    effect: 'recruiter_overlay',
  },
  {
    id: 'dream_job',
    emoji: '🚀',
    label: 'Dream Job',
    category: 'event',
    rarity: 'legendary',
    message: 'WARNING: Major Opportunity Detected — DREAM JOB UNLOCKED!',
    messageType: 'highlight',
    effect: 'victory',
  },
];

/** Weighted random collectible picker */
export function pickCollectible(score: number): Collectible {
  // As score increases, rarer items appear more often
  const weights: Record<string, number> = {
    common: Math.max(50 - score, 20),
    uncommon: Math.min(30 + score * 0.5, 45),
    rare: Math.min(15 + score * 0.3, 25),
    legendary: score >= 20 ? 5 : 0,
  };

  const pool: Collectible[] = [];
  COLLECTIBLES.forEach((c) => {
    const w = Math.ceil(weights[c.rarity] || 1);
    for (let i = 0; i < w; i++) pool.push(c);
  });

  return pool[Math.floor(Math.random() * pool.length)];
}

export const SCORE_MILESTONES: { score: number; module: string }[] = [
  { score: 5,  module: 'Skills Database' },
  { score: 10, module: 'Experience Timeline' },
  { score: 15, module: 'Project Registry' },
  { score: 20, module: 'Achievement Archive' },
  { score: 25, module: 'Recruiter Summary' },
];
