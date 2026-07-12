import { TerminalLine } from '../types';

let _idCounter = 0;
export const uid = () => `tl-${Date.now()}-${_idCounter++}`;

export const line = (
  text: string,
  type: TerminalLine['type'] = 'default',
  extra?: Partial<TerminalLine>
): TerminalLine => ({
  id: uid(),
  text,
  type,
  ...extra,
});

export const blank = (): TerminalLine => line('', 'dim');

export const separator = (): TerminalLine =>
  line('─'.repeat(56), 'separator');

export const progressBar = (
  label: string,
  value: number
): TerminalLine => {
  const filled = Math.round(value / 10);
  const empty = 10 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return line(`${label.padEnd(20)} ${bar}  ${value}%`, 'progress');
};

export const stagger = (lines: TerminalLine[], baseDelay = 0, step = 60): TerminalLine[] =>
  lines.map((l, i) => ({ ...l, delay: baseDelay + i * step }));
