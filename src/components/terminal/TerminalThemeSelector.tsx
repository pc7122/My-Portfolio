'use client';

import React from 'react';
import { ThemeKey } from './types';

interface Props {
  current: ThemeKey;
  onChange: (t: ThemeKey) => void;
}

const THEMES: { key: ThemeKey; label: string; color: string }[] = [
  { key: 'green',  label: 'green',  color: '#00ff41' },
  { key: 'amber',  label: 'amber',  color: '#ffb000' },
  { key: 'blue',   label: 'blue',   color: '#00d4ff' },
  { key: 'matrix', label: 'matrix', color: '#00ff41' },
];

export const TerminalThemeSelector: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="flex items-center gap-1.5">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          title={`theme ${t.label}`}
          className="w-3.5 h-3.5 rounded-full border transition-all hover:scale-125"
          style={{
            background: t.color,
            borderColor: current === t.key ? '#fff' : `${t.color}60`,
            boxShadow: current === t.key ? `0 0 8px ${t.color}` : 'none',
          }}
          aria-label={`Switch to ${t.label} theme`}
        />
      ))}
    </div>
  );
};
