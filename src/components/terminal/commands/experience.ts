import { TerminalLine } from '../types';
import { line, blank, separator, stagger } from './utils';

const experience = [
  {
    role: 'Member of Technical Team',
    org: 'Vendekin Technologies',
    period: 'Jan 2025 — Present',
    tag: 'CURRENT',
    points: [
      'Real-time error management system with 9+ language translation',
      'Reduced machine downtime by 40% across 200+ SKU vending fleet',
      'Advertising analytics platform — 10+ KPIs across 300+ campaigns',
      'Promotional engines driving 25–35% ATV increase across 500+ machines',
      'Slot-Based Restriction System managing 50+ products per machine',
    ],
  },
  {
    role: 'Member of Technical Team — Intern',
    org: 'Vendekin Technologies',
    period: 'Jul 2024 — Dec 2024',
    tag: 'INTERN',
    points: [
      'Modernized 50,000+ line React Native codebase',
      'Achieved 45% faster load times & 30% setup time reduction',
      'Built custom vending machine request-response simulation server',
    ],
  },
  {
    role: 'Data Science — Intern',
    org: 'Ahen Pvt. Ltd.',
    period: 'Jan 2023 — Feb 2023',
    tag: 'INTERN',
    points: [
      'Web scraping pipelines for Google Maps data analysis',
      'Insights driving marketing campaign optimization',
    ],
  },
  {
    role: 'PHP Developer — Trainee',
    org: 'R. B. Tech Services',
    period: 'Jul 2020 — Aug 2020',
    tag: 'TRAINEE',
    points: [
      'Notice management system using PHP, SQL & JavaScript',
    ],
  },
];

const education = [
  { degree: "Bachelor's Degree (Artificial Intelligence)", org: 'AISSMS Institute of Information Technology', period: '2021 — 2024' },
  { degree: 'Diploma (Computer Engineering)', org: 'Government Polytechnic', period: '2018 — 2021' },
  { degree: 'SSC', org: 'B. N. Sarda Vidyalaya', period: '2017 — 2018' },
];

export function experienceCommand(): TerminalLine[] {
  const out: TerminalLine[] = [
    line('╔════════════════════════════════════════════════════╗', 'ascii'),
    line('║              EXPERIENCE TIMELINE                   ║', 'ascii'),
    line('╚════════════════════════════════════════════════════╝', 'ascii'),
    blank(),
  ];

  experience.forEach((e, i) => {
    out.push(line(`┌── [${String(i + 1).padStart(2, '0')}] ${e.tag}`, 'info'));
    out.push(line(`│   ${e.role}`, 'highlight'));
    out.push(line(`│   ${e.org}`, 'default'));
    out.push(line(`│   ${e.period}`, 'dim'));
    out.push(line('│', 'dim'));
    e.points.forEach((p) => {
      out.push(line(`│   ▸ ${p}`, 'default'));
    });
    out.push(line('└' + '─'.repeat(52), 'dim'));
    out.push(blank());
  });

  out.push(separator());
  out.push(line('// EDUCATION', 'info'));
  out.push(separator());
  out.push(blank());

  education.forEach((e) => {
    out.push(line(`  🎓  ${e.degree}`, 'highlight'));
    out.push(line(`       ${e.org}`, 'default'));
    out.push(line(`       ${e.period}`, 'dim'));
    out.push(blank());
  });

  return stagger(out, 0, 30);
}
