'use client';

import { useState, useCallback, useEffect } from 'react';
import { Achievement, ALL_ACHIEVEMENTS } from '../types';

const STORAGE_KEY = 'prathamesh_os_achievements';

export function useAchievements() {
  const [earned, setEarned] = useState<Achievement[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const achievements = ALL_ACHIEVEMENTS.filter((a) => ids.includes(a.id));
        setEarned(achievements);
      }
    } catch {
      // ignore
    }
  }, []);

  const has = useCallback(
    (id: string) => earned.some((a) => a.id === id),
    [earned]
  );

  const unlock = useCallback(
    (id: string): Achievement | null => {
      const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (!achievement) return null;

      setEarned((prev) => {
        if (prev.some((a) => a.id === id)) return prev;
        const next = [...prev, achievement];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map((a) => a.id)));
        } catch {
          // ignore
        }
        return next;
      });

      return has(id) ? null : achievement; // return null if already had it
    },
    [has]
  );

  return { earned, has, unlock };
}
