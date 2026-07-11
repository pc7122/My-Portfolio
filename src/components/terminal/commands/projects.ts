import { TerminalLine } from '../types';
import { line, blank, separator, stagger } from './utils';

export const PROJECTS = [
  {
    id: '001',
    title: 'Smart Vending OS',
    tag: 'Backend & Mobile',
    stack: ['React Native', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    desc: 'End-to-end platform for 500+ connected vending machines — operator app, real-time inventory, contactless payments, and backend management.',
    challenges: 'Offline-first architecture across unstable mobile networks; real-time sync for 50+ SKUs per machine.',
    learnings: 'Mastered React Query caching strategies, conflict resolution for offline queues, and multi-language i18n at scale.',
  },
  {
    id: '002',
    title: 'EmoSense',
    tag: 'Computer Vision',
    stack: ['TensorFlow', 'OpenCV', 'Python'],
    desc: 'Multimodal emotion recognition combining facial micro-expressions with audio prosody analysis.',
    challenges: 'Fusing two distinct model outputs (CNN + audio) into a unified confidence score in real time.',
    learnings: 'Model fusion techniques, emotion dataset curation, and real-time inference optimization.',
  },
  {
    id: '003',
    title: 'Operator Mobile App',
    tag: 'React Native',
    stack: ['React Native', 'TypeScript', 'Tailwind CSS'],
    desc: 'Cross-platform app for technicians to monitor and manage fleets of vending machines remotely.',
    challenges: 'Dynamic machine state visualization and push-notification routing for 200+ device events.',
    learnings: 'React Native performance tuning, background task scheduling, and fleet telemetry dashboards.',
  },
  {
    id: '004',
    title: 'Real-time Data Pipeline',
    tag: 'Backend',
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    desc: 'High-throughput ingestion pipeline streaming application event logs and analytics to the cloud.',
    challenges: 'Handling burst traffic spikes (>10K events/min) without data loss.',
    learnings: 'Message queuing patterns, async batching, and database indexing for time-series data.',
  },
  {
    id: '005',
    title: 'Plant Disease Detection',
    tag: 'AI · FastAPI',
    stack: ['FastAPI', 'TensorFlow', 'React'],
    desc: 'CNN classifier diagnosing leaf disease from a single photo, served via a FastAPI microservice.',
    challenges: 'Small dataset training with heavy augmentation to avoid overfitting.',
    learnings: 'Transfer learning with MobileNetV2, REST API deployment, and confidence-score calibration.',
  },
  {
    id: '006',
    title: 'Developer Portfolio OS',
    tag: 'Meta',
    stack: ['Next.js', 'TypeScript', 'Framer Motion'],
    desc: 'The very OS you are exploring right now — a hidden retro terminal embedded in a modern portfolio.',
    challenges: 'Building a 60fps Canvas Snake game inside a React terminal overlay with zero new dependencies.',
    learnings: 'Canvas game loop architecture, CRT shader effects in CSS, and terminal UX design patterns.',
  },
];

export function projectsCommand(args: string[]): TerminalLine[] {
  const idx = args[0] ? parseInt(args[0], 10) - 1 : -1;

  if (idx >= 0 && idx < PROJECTS.length) {
    const p = PROJECTS[idx];
    const out: TerminalLine[] = [
      blank(),
      line(`[${p.id}] ${p.title}`, 'highlight'),
      line(`Tag: ${p.tag}`, 'info'),
      blank(),
      line('DESCRIPTION', 'dim'),
      line(p.desc, 'default'),
      blank(),
      line('TECH STACK', 'dim'),
      line('  ' + p.stack.join('  ·  '), 'info'),
      blank(),
      line('CHALLENGES', 'dim'),
      line(p.challenges, 'default'),
      blank(),
      line('LEARNINGS', 'dim'),
      line(p.learnings, 'default'),
      blank(),
      line(`← type "projects" to return to list`, 'dim'),
      blank(),
    ];
    return stagger(out, 0, 30);
  }

  // List view
  const out: TerminalLine[] = [
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║                PROJECT REGISTRY                    ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
    line('Scanning project database...', 'dim'),
    blank(),
  ];

  PROJECTS.forEach((p) => {
    out.push(line(`  [${p.id}]  ${p.title}`, 'highlight'));
    out.push(line(`         ${p.tag}  ·  ${p.stack.slice(0, 3).join(', ')}`, 'dim'));
    out.push(blank());
  });

  out.push(separator());
  out.push(line('  → type "projects 1" to explore a project in detail', 'dim'));
  out.push(blank());

  return stagger(out, 0, 35);
}
