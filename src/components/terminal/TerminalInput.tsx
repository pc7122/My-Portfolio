'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  isBooted: boolean;
  /** Pass true each time the terminal opens so we can re-focus */
  isOpen: boolean;
}

export const TerminalInput: React.FC<Props> = ({
  value, onChange, onSubmit, onHistoryUp, onHistoryDown, isBooted, isOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = useCallback(() => {
    // tiny delay so the DOM is settled after animation
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  // Focus when boot completes
  useEffect(() => {
    if (isBooted) focus();
  }, [isBooted, focus]);

  // Re-focus every time terminal is opened (covers re-open case)
  useEffect(() => {
    if (isOpen && isBooted) focus();
  }, [isOpen, isBooted, focus]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Stop ALL key events from bubbling out of the input so our global
    // keydown handler (which listens on window) doesn't interfere.
    e.stopPropagation();

    if (e.key === 'Enter') {
      const v = value.trim();
      onChange('');
      if (v) onSubmit(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryDown();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = [
        'help', 'about', 'skills', 'experience', 'education',
        'projects', 'resume', 'contact', 'achievements', 'clear',
        'play snake', 'theme green', 'theme amber', 'theme blue', 'theme matrix',
        'hireme', 'coffee', 'funfact', 'matrix', 'whoami',
      ];
      const match = cmds.find((c) => c.startsWith(value.toLowerCase()));
      if (match) onChange(match);
    }
    // All other keys (a-z, 0-9, space, etc.) fall through normally
    // so the native <input> value updates via onChange below
  };

  if (!isBooted) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        borderTop: '1px solid var(--t-border)',
        flexShrink: 0,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <span style={{ color: 'var(--t-accent)', userSelect: 'none', whiteSpace: 'nowrap', fontSize: 12, flexShrink: 0 }}>
        prathamesh@portfolio:~$
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          background: 'transparent',
          outline: 'none',
          border: 'none',
          color: 'var(--t-fg)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13,
          caretColor: 'var(--t-accent)',
          minWidth: 0,
        }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
    </div>
  );
};
