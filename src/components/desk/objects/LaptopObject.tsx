"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CODE_LINES = [
  { color: "#9ca3af", text: "// portfolio.tsx" },
  { color: "#6366f1", text: "import { DeskScene } from './desk'" },
  { color: "#a78bfa", text: "" },
  { color: "#34d399", text: "const Prathamesh = () => {" },
  { color: "#9ca3af", text: "  const skills = [" },
  { color: "#fbbf24", text: "    'React Native'," },
  { color: "#fbbf24", text: "    'FastAPI', 'AI/ML'," },
  { color: "#9ca3af", text: "  ]" },
  { color: "#34d399", text: "  return <DeskScene />" },
  { color: "#34d399", text: "}" },
];

const BOOT_MSGS = [
  "Initializing portfolio...",
  "Loading React Native projects...",
  "Loading AI/ML projects...",
  "Compiling achievements...",
  "Projects ready ✓",
];

interface Props {
  onClick: () => void;
}

export function LaptopObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [booting, setBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [codeOffset, setCodeOffset] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCodeOffset((p) => (p + 1) % CODE_LINES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const handleClick = () => {
    if (booting) return;
    setBooting(true);
    setBootStep(0);
    let step = 0;
    const iv = setInterval(() => {
      step++;
      setBootStep(step);
      if (step >= BOOT_MSGS.length - 1) {
        clearInterval(iv);
        setTimeout(() => {
          setBooting(false);
          onClick();
        }, 450);
      }
    }, 380);
  };

  const visibleLines = CODE_LINES.slice(codeOffset, codeOffset + 6).concat(
    CODE_LINES.slice(0, Math.max(0, 6 - (CODE_LINES.length - codeOffset)))
  );

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && !booting && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            💻 Click to view Projects
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 55px 12px rgba(99,102,241,0.28)", borderRadius: 10 }}
      />

      <svg width="268" height="180" viewBox="0 0 268 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ── BASE / KEYBOARD ── */}
        <rect x="0" y="130" width="268" height="48" rx="5" fill="#12121f" stroke="#2a2a45" strokeWidth="1.2" />

        {/* Keyboard area */}
        {/* Row 1 — function-like keys (small) */}
        {Array.from({ length: 13 }).map((_, i) => (
          <motion.rect
            key={`r1-${i}`}
            x={8 + i * 19.5}
            y={137}
            width={16}
            height={7}
            rx={2}
            fill={hovered ? "#23234a" : "#1c1c36"}
            animate={{ fill: hovered ? "#23234a" : "#1c1c36" }}
            transition={{ duration: 0.2, delay: i * 0.015 }}
          />
        ))}
        {/* Row 2 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={`r2-${i}`} x={12 + i * 21} y={148} width={18} height={8} rx={2} fill="#1a1a33" />
        ))}
        {/* Row 3 */}
        {Array.from({ length: 11 }).map((_, i) => (
          <rect key={`r3-${i}`} x={18 + i * 22} y={160} width={19} height={8} rx={2} fill="#1a1a33" />
        ))}
        {/* Spacebar */}
        <rect x="75" y="171" width="118" height="5" rx="2" fill="#1a1a33" />
        {/* Fn corner keys */}
        <rect x="8" y="171" width="22" height="5" rx="2" fill="#1a1a33" />
        <rect x="238" y="171" width="22" height="5" rx="2" fill="#1a1a33" />

        {/* Trackpad */}
        <rect x="104" y="137" width="60" height="36" rx="5" fill="#161628" stroke="#252545" strokeWidth="0.8" />

        {/* Hinge / join */}
        <rect x="4" y="127" width="260" height="5" rx="2" fill="#0e0e1e" />

        {/* ── SCREEN PANEL ── */}
        <rect x="8" y="4" width="252" height="126" rx="9" fill="#0f0f1e" stroke="#2a2a45" strokeWidth="1.2" />
        <rect x="10" y="6" width="248" height="122" rx="8" fill={booting ? "#060611" : "#09091a"} />

        {/* Camera dot */}
        <circle cx="134" cy="11" r="2.5" fill="#1e1e38" />
        <circle cx="134" cy="11" r="1" fill="#333355" />

        {/* ── SCREEN CONTENT ── */}
        {booting ? (
          // Boot sequence
          <>
            <rect x="12" y="8" width="244" height="118" rx="7" fill="#060611" />
            {BOOT_MSGS.slice(0, bootStep + 1).map((msg, i) => (
              <text
                key={i}
                x={22}
                y={28 + i * 17}
                fontSize={8.5}
                fill={i === bootStep ? "#6366f1" : "#3d3d6b"}
                fontFamily="monospace"
              >
                {i < bootStep ? `✓ ${msg}` : `▸ ${msg}`}
              </text>
            ))}
            {/* Blinking cursor on last line */}
            <motion.rect
              x={22 + (BOOT_MSGS[bootStep]?.length ?? 0) * 5.1 + 14}
              y={20 + bootStep * 17}
              width={5}
              height={9}
              fill="#6366f1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          </>
        ) : (
          // Idle code view
          <>
            {/* Status bar */}
            <rect x="10" y="6" width="248" height="10" rx="0" fill="#0c0c1e" />
            <circle cx="22" cy="11" r="3" fill="#ff5f56" />
            <circle cx="32" cy="11" r="3" fill="#ffbd2e" />
            <circle cx="42" cy="11" r="3" fill="#27c93f" />
            <text x="100" y="14" fontSize={6} fill="#3d3d6a" fontFamily="monospace" textAnchor="middle">
              portfolio.tsx
            </text>

            {/* Line numbers + code */}
            {visibleLines.map((line, i) => (
              <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x={20} y={28 + i * 14} fontSize={7} fill="#2d2d52" fontFamily="monospace">
                  {codeOffset + i + 1}
                </text>
                <text x={36} y={28 + i * 14} fontSize={7.5} fill={line.color} fontFamily="monospace">
                  {line.text}
                </text>
              </motion.g>
            ))}

            {/* Blinking cursor */}
            <motion.rect
              x={36}
              y={28 + 6 * 14 - 10}
              width={5}
              height={9}
              fill="#6366f1"
              opacity={0.7}
              animate={{ opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />

            {/* Bottom status */}
            <rect x="10" y="118" width="248" height="10" fill="#0c0c1e" />
            <text x="20" y="126" fontSize={6} fill="#3d3d6a" fontFamily="monospace">
              TypeScript React
            </text>
            <text x="200" y="126" fontSize={6} fill="#6366f1" fontFamily="monospace">
              Ln 8 Col 24
            </text>
          </>
        )}

        {/* Screen reflection */}
        <motion.rect
          x="10"
          y="6"
          width="248"
          height="122"
          rx="8"
          fill="url(#screenReflect)"
          animate={{ opacity: hovered ? 0.12 : 0.04 }}
          transition={{ duration: 0.3 }}
        />

        {/* ── LOGO on lid center ── */}
        <motion.g animate={{ opacity: hovered ? 0.8 : 0.25 }} transition={{ duration: 0.3 }}>
          <circle cx="134" cy="66" r="9" fill="none" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="134" y1="57" x2="134" y2="75" stroke="#6366f1" strokeWidth="0.8" />
          <line x1="125" y1="66" x2="143" y2="66" stroke="#6366f1" strokeWidth="0.8" />
        </motion.g>

        <defs>
          <linearGradient id="screenReflect" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Drop shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-5 blur-xl opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
