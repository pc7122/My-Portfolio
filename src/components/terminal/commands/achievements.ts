import { TerminalLine, Achievement } from '../types';
import { line, blank, separator, stagger } from './utils';

export function achievementsCommand(earned: Achievement[]): TerminalLine[] {
  const out: TerminalLine[] = [
    blank(),
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║              ACHIEVEMENT ARCHIVE                   ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line(`Unlocked: ${earned.length} achievement${earned.length !== 1 ? 's' : ''}`, earned.length > 0 ? 'success' : 'dim'),
    blank(),
  ];

  if (earned.length === 0) {
    out.push(line('  No achievements yet.', 'dim'));
    out.push(line('  Explore the OS to unlock them all!', 'dim'));
    out.push(blank());
  } else {
    earned.forEach((a) => {
      out.push(line(`  ${a.emoji}  ${a.title}`, 'highlight'));
      out.push(line(`       ${a.description}`, 'dim'));
      out.push(blank());
    });
  }

  out.push(separator());
  out.push(line('  Achievements save automatically in your browser.', 'dim'));
  out.push(blank());

  return stagger(out, 0, 50);
}
