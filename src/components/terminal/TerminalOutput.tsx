'use client';

import React, { useEffect, useRef } from 'react';
import { TerminalLine } from './types';

interface Props {
  lines: TerminalLine[];
  theme: string;
}

const LINE_STYLES: Record<string, React.CSSProperties> = {
  default:     { color: 'var(--t-fg)' },
  success:     { color: 'var(--t-accent)' },
  error:       { color: '#ff4444' },
  info:        { color: '#56b6c2' },
  dim:         { color: 'var(--t-dim-fg)' },
  highlight:   { color: '#ffffff', fontWeight: 600 },
  command:     { color: 'var(--t-accent)', fontWeight: 700 },
  ascii:       { color: 'var(--t-accent)', opacity: 0.8, fontSize: 12 },
  progress:    { color: 'var(--t-accent)', letterSpacing: 0 },
  separator:   { color: 'var(--t-dim-fg)', opacity: 0.4 },
  achievement: { color: '#ffd700', fontWeight: 600 },
};

export const TerminalOutput: React.FC<Props> = ({ lines, theme }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-3 space-y-0"
      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.7 }}
    >
      {lines.map((l) => {
        if (l.type === 'link') {
          return (
            <div key={l.id}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: 'var(--t-accent)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}
              >
                {l.text}
              </a>
            </div>
          );
        }

        return (
          <div
            key={l.id}
            style={{
              ...LINE_STYLES[l.type] ?? LINE_STYLES.default,
              whiteSpace: 'pre',
              minHeight: l.text === '' ? '0.4em' : undefined,
            }}
          >
            {l.text}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};
