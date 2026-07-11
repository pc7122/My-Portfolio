import { TerminalLine } from '../types';
import { line, blank, separator, stagger } from './utils';

export function contactCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║                CONTACT DIRECTORY                   ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('📧  Email', 'dim'),
    { id: `c-email-${Date.now()}`, text: '    prathameshpc7122@gmail.com', type: 'link', href: 'mailto:prathameshpc7122@gmail.com' },
    blank(),
    line('💼  LinkedIn', 'dim'),
    { id: `c-li-${Date.now()}`, text: '    linkedin.com/in/prathamesh-chaudhary-77b99b22b', type: 'link', href: 'https://www.linkedin.com/in/prathamesh-chaudhary-77b99b22b' },
    blank(),
    line('🐙  GitHub', 'dim'),
    { id: `c-gh-${Date.now()}`, text: '    github.com/pc7122', type: 'link', href: 'https://github.com/pc7122' },
    blank(),
    separator(),
    line('STATUS', 'dim'),
    blank(),
    line('  ✅  Available for full-time roles', 'success'),
    line('  ✅  Open to freelance & consulting', 'success'),
    line('  ✅  React Native / AI / IoT projects', 'success'),
    blank(),
    line('  Response time: < 24 hours', 'dim'),
    blank(),
  ], 0, 80);
}
