"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-xl glass hover:bg-secondary/60 transition-all duration-300 group ${className}`}
    >
      <Sun
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-primary"
        }`}
      />
      <Moon
        size={18}
        className={`absolute transition-all duration-500 ${
          isDark ? "opacity-100 rotate-0 scale-100 text-primary" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
};
