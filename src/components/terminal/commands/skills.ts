import { TerminalLine } from '../types';
import { line, blank, separator, progressBar, stagger } from './utils';

interface SkillGroup {
  title: string;
  items: { name: string; level: number }[];
}

const skillGroups: SkillGroup[] = [
  {
    title: 'MOBILE',
    items: [
      { name: 'React Native', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Redux / Zustand', level: 82 },
    ],
  },
  {
    title: 'FRONTEND',
    items: [
      { name: 'React / Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    title: 'BACKEND',
    items: [
      { name: 'Django / FastAPI', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Firebase', level: 82 },
    ],
  },
  {
    title: 'AI / ML',
    items: [
      { name: 'TensorFlow', level: 85 },
      { name: 'OpenCV / YOLO', level: 80 },
      { name: 'Pandas / NumPy', level: 88 },
    ],
  },
  {
    title: 'DEVOPS & TOOLS',
    items: [
      { name: 'Git', level: 88 },
      { name: 'MQTT / WebSockets', level: 78 },
      { name: 'Python', level: 82 },
    ],
  },
];

export function skillsCommand(): TerminalLine[] {
  const out: TerminalLine[] = [
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║                 SKILLS DATABASE                    ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('Loading skill modules...', 'dim'),
    blank(),
  ];

  skillGroups.forEach((group) => {
    out.push(separator());
    out.push(line(`// ${group.title}`, 'info'));
    out.push(separator());
    group.items.forEach((s) => out.push(progressBar(s.name, s.level)));
    out.push(blank());
  });

  out.push(line('All skill modules loaded ✓', 'success'));
  out.push(blank());

  return stagger(out, 0, 35);
}
