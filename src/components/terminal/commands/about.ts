import { TerminalLine } from '../types';
import { line, blank, separator, stagger, uid } from './utils';

export function aboutCommand(): TerminalLine[] {
  return stagger([
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║             LOADING DEVELOPER PROFILE              ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('Name     : Prathamesh Chaudhary', 'highlight'),
    line('Role     : React Native + AI/ML Engineer', 'info'),
    line('Location : Pune, India 🇮🇳', 'default'),
    line('Status   : Available for new opportunities ✅', 'success'),
    blank(),
    separator(),
    line('// WHO I AM', 'dim'),
    separator(),
    blank(),
    line(
      'I build production-grade systems at the intersection of',
      'default'
    ),
    line('mobile, AI, and IoT — shipping real products used by', 'default'),
    line('real people every day.', 'default'),
    blank(),
    line(
      'Currently working at Vendekin Technologies building a',
      'default'
    ),
    line('React Native + TypeScript platform that powers 500+', 'default'),
    line('smart vending machines across India.', 'default'),
    blank(),
    separator(),
    line('// INTERESTS', 'dim'),
    separator(),
    blank(),
    line('  ⚛  React Native mobile engineering', 'default'),
    line('  🤖  AI/ML systems & computer vision', 'default'),
    line('  ☁  Scalable cloud backends', 'default'),
    line('  🔧  IoT hardware-software integration', 'default'),
    line('  📊  Data pipelines & analytics', 'default'),
    blank(),
    separator(),
    line('// CAREER GOAL', 'dim'),
    separator(),
    blank(),
    line('Building intelligent products that ship — where code', 'default'),
    line('meets hardware meets ML meets delightful UX.', 'default'),
    blank(),
    line('  → type "skills"     to view capabilities', 'dim'),
    line('  → type "experience" to view timeline', 'dim'),
    line('  → type "projects"   to view shipped work', 'dim'),
    blank(),
  ], 0, 40);
}
