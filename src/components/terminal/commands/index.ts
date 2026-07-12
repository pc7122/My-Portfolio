import { TerminalLine, Achievement } from '../types';
import { line, blank, separator, stagger } from './utils';
import { aboutCommand } from './about';
import { skillsCommand } from './skills';
import { experienceCommand } from './experience';
import { projectsCommand } from './projects';
import { resumeCommand } from './resume';
import { contactCommand } from './contact';
import { achievementsCommand } from './achievements';
import { hiremeCommand, coffeeCommand, funfactCommand, matrixCommand, educationCommand } from './hidden';

export type CommandResult = {
  lines: TerminalLine[];
  sideEffect?: 'open_snake' | 'activate_matrix' | 'clear';
  unlockAchievement?: string;
};

function helpCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║           AI Prathamesh OS — HELP                  ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('COMMANDS', 'info'),
    separator(),
    blank(),
    line('  about          Developer profile & interests', 'default'),
    line('  skills         Skill tree with proficiency levels', 'default'),
    line('  experience     Work & internship timeline', 'default'),
    line('  education      Academic background', 'default'),
    line('  projects       Project registry', 'default'),
    line('  resume         Download resume', 'default'),
    line('  contact        Get in touch', 'default'),
    line('  achievements   View unlocked achievements', 'default'),
    blank(),
    line('  play snake     Launch the arcade module 🐍', 'highlight'),
    blank(),
    line('  theme green    Switch terminal theme', 'default'),
    line('  theme amber    ├── amber', 'dim'),
    line('  theme blue     ├── blue', 'dim'),
    line('  theme matrix   └── matrix', 'dim'),
    blank(),
    line('  clear          Clear terminal', 'default'),
    line('  help           Show this menu', 'default'),
    blank(),
    separator(),
    line('  HINT: There are hidden commands. Keep exploring.', 'dim'),
    blank(),
  ], 0, 30);
}

export function processCommand(
  rawInput: string,
  earnedAchievements: Achievement[]
): CommandResult {
  const trimmed = rawInput.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  // --- help ---
  if (cmd === 'help' || cmd === '?') {
    return { lines: helpCommand() };
  }

  // --- about ---
  if (cmd === 'about') {
    return { lines: aboutCommand(), unlockAchievement: 'explored_about' };
  }

  // --- skills ---
  if (cmd === 'skills' || cmd === 'skill') {
    return { lines: skillsCommand(), unlockAchievement: 'explored_skills' };
  }

  // --- experience ---
  if (cmd === 'experience' || cmd === 'exp') {
    return { lines: experienceCommand(), unlockAchievement: 'read_experience' };
  }

  // --- education ---
  if (cmd === 'education' || cmd === 'edu') {
    return { lines: educationCommand() };
  }

  // --- projects ---
  if (cmd === 'projects' || cmd === 'project') {
    return { lines: projectsCommand(args), unlockAchievement: 'explored_projects' };
  }

  // --- resume ---
  if (cmd === 'resume' || cmd === 'cv') {
    return { lines: resumeCommand() };
  }

  // --- contact ---
  if (cmd === 'contact') {
    return { lines: contactCommand() };
  }

  // --- achievements ---
  if (cmd === 'achievements' || cmd === 'ach') {
    return { lines: achievementsCommand(earnedAchievements) };
  }

  // --- clear ---
  if (cmd === 'clear' || cmd === 'cls') {
    return { lines: [], sideEffect: 'clear' };
  }

  // --- theme ---
  if (cmd === 'theme') {
    const t = args[0] || '';
    if (['green', 'amber', 'blue', 'matrix'].includes(t)) {
      return {
        lines: stagger([
          blank(),
          line(`Theme switched to: ${t.toUpperCase()}`, 'success'),
          blank(),
        ], 0, 100),
        unlockAchievement: t === 'matrix' ? 'found_matrix' : undefined,
        sideEffect: t === 'matrix' ? 'activate_matrix' : undefined,
      };
    }
    return {
      lines: stagger([
        blank(),
        line('Usage: theme [green|amber|blue|matrix]', 'error'),
        blank(),
      ], 0, 80),
    };
  }

  // --- play snake ---
  if ((cmd === 'play' && args[0] === 'snake') || trimmed === 'snake') {
    return {
      lines: stagger([
        blank(),
        line('Launching Arcade Module...', 'dim'),
        line('Searching Game Registry...', 'dim'),
        blank(),
        line('Found: RETRO_SNAKE.exe', 'success'),
        blank(),
        line('Initializing Engine...', 'dim'),
        line('Loading Developer Journey...', 'dim'),
        line('Loading Skill Tokens...', 'dim'),
        line('Loading Achievement Database...', 'dim'),
        blank(),
        line('Snake Module Ready ✓', 'success'),
        blank(),
        line('Controls: ← ↑ → ↓  or  W A S D', 'info'),
        line('Press any arrow key to begin.', 'info'),
        blank(),
      ], 0, 250),
      sideEffect: 'open_snake',
      unlockAchievement: 'played_snake',
    };
  }

  // --- hidden commands ---
  if (cmd === 'hireme' || cmd === 'hire') {
    return { lines: hiremeCommand(), unlockAchievement: 'smart_recruiter' };
  }

  if (cmd === 'coffee' || cmd === 'brew') {
    return { lines: coffeeCommand(), unlockAchievement: 'coffee_found' };
  }

  if (cmd === 'funfact' || cmd === 'fact') {
    return { lines: funfactCommand() };
  }

  if (cmd === 'matrix') {
    return {
      lines: matrixCommand(),
      sideEffect: 'activate_matrix',
      unlockAchievement: 'found_matrix',
    };
  }

  // --- whoami (bonus) ---
  if (cmd === 'whoami') {
    return {
      lines: stagger([
        blank(),
        line('prathamesh@portfolio — Developer, Builder, Debugger-of-Things', 'highlight'),
        blank(),
      ], 0, 100),
    };
  }

  // --- unknown ---
  return {
    lines: stagger([
      blank(),
      line(`Command not found: ${cmd}`, 'error'),
      line('  Type "help" to see available commands.', 'dim'),
      blank(),
    ], 0, 60),
  };
}
