import { TerminalLine } from '../types';
import { line, blank, separator, progressBar, stagger } from './utils';

const FUN_FACTS = [
  "I've debugged more vending machine errors at 2AM than I care to admit.",
  'I can read a Firestore error log faster than most people read plain English.',
  'My first app shipped with a feature that worked perfectly — on my simulator only.',
  "I once reduced an app's load time by 45% without touching a single UI component.",
  'I believe the best code is the code you never have to look at again.',
  "I've built systems that serve chai at scale. Yes, from vending machines. Yes, really.",
  'My debugging process: console.log → read docs → console.log again → it works somehow.',
  'I once wrote a 500-line component that I later replaced with 12 lines of React Query.',
];

export function hiremeCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('Excellent choice.', 'success'),
    blank(),
    line('REASONS TO HIRE PRATHAMESH', 'highlight'),
    separator(),
    blank(),
    line('  ✓  Production experience — real machines, real users', 'success'),
    line('  ✓  React Native expertise — 50,000+ line codebase owner', 'success'),
    line('  ✓  Product mindset — ships features, not just code', 'success'),
    line('  ✓  AI-focused growth — ML models in production', 'success'),
    line('  ✓  Strong ownership — from design to deployment', 'success'),
    line('  ✓  Fast learner — adapted 4 tech stacks in 2 years', 'success'),
    blank(),
    separator(),
    blank(),
    line('Let\'s build something intelligent together.', 'highlight'),
    blank(),
    { id: `hireme-contact-${Date.now()}`, text: '  → prathameshpc7122@gmail.com', type: 'link', href: 'mailto:prathameshpc7122@gmail.com' },
    blank(),
  ], 0, 100);
}

export function coffeeCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('Checking energy reserves...', 'dim'),
    blank(),
    line('☕  Coffee Level', 'highlight'),
    blank(),
    progressBar('Current Level', 100),
    blank(),
    line('  Productivity:  MAXIMUM', 'success'),
    line('  Bug Fix Rate:  EXTREME', 'success'),
    line('  Creativity:    OVER 9000', 'success'),
    blank(),
    line('"Fueled by curiosity, caffeine, and compiler errors."', 'dim'),
    blank(),
  ], 0, 150);
}

export function funfactCommand(): TerminalLine[] {
  const fact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
  return stagger([
    blank(),
    line('🎲  Retrieving random fact...', 'dim'),
    blank(),
    line(`"${fact}"`, 'highlight'),
    blank(),
    line('  → type "funfact" again for a different one', 'dim'),
    blank(),
  ], 0, 150);
}

export function matrixCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('⚠  WARNING: INITIATING MATRIX MODE', 'error'),
    blank(),
    line('Wake up, Neo...', 'success'),
    line('The Matrix has you...', 'success'),
    line('Follow the white rabbit.', 'success'),
    blank(),
    line('Knock, knock, Neo.', 'highlight'),
    blank(),
    line('[MATRIX RAIN ACTIVATED]', 'success'),
    blank(),
  ], 0, 300);
}

export function educationCommand(): TerminalLine[] {
  return stagger([
    blank(),
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║                EDUCATION RECORD                    ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line("🎓  Bachelor's Degree (Artificial Intelligence)", 'highlight'),
    line('    AISSMS Institute of Information Technology', 'default'),
    line('    2021 — 2024', 'dim'),
    blank(),
    line('🎓  Diploma (Computer Engineering)', 'highlight'),
    line('    Government Polytechnic', 'default'),
    line('    2018 — 2021', 'dim'),
    blank(),
    line('🎓  SSC', 'highlight'),
    line('    B. N. Sarda Vidyalaya', 'default'),
    line('    2017 — 2018', 'dim'),
    blank(),
  ], 0, 80);
}
