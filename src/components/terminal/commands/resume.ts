import { TerminalLine } from '../types';
import { line, blank, stagger } from './utils';

export function resumeCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('Preparing Resume Package...', 'dim'),
    line('Compiling experience data...', 'dim'),
    line('Packaging PDF...', 'dim'),
    line('Applying digital signature...', 'dim'),
    blank(),
    line('Resume Ready ✓', 'success'),
    blank(),
    line('PRATHAMESH_CHAUDHARY_RESUME.pdf', 'highlight'),
    { id: `resume-dl-${Date.now()}`, text: '[ Download Resume ]', type: 'link', href: '/Prathamesh_Chaudhary.pdf' },
    blank(),
    line('  → Opens in a new tab', 'dim'),
    blank(),
  ], 0, 200);
}
