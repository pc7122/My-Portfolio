"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

const BOOKS = [
  { color: "#1e3a5f", spine: "#2563eb", title: "React Native", accent: "#60a5fa" },
  { color: "#1a3a2a", spine: "#059669", title: "System Design", accent: "#34d399" },
  { color: "#3b1f1f", spine: "#dc2626", title: "Machine Learning", accent: "#f87171" },
  { color: "#2d1f4a", spine: "#7c3aed", title: "AI Engineering", accent: "#a78bfa" },
];

export function BooksObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setHoveredBook(null); }}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute -top-11 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs px-3.5 py-2 rounded-full whitespace-nowrap border border-indigo-500/25 z-50 pointer-events-none font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            📚 Skills & Learning
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "0 0 40px 8px rgba(124,58,237,0.25)" }}
      />

      <svg width="118" height="128" viewBox="0 0 118 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Books stacked flat, viewed from above — showing both top face and spines */}
        {BOOKS.map((book, i) => {
          const baseY = 100 - i * 22;
          const offsetX = i * 2;
          const isH = hoveredBook === i;

          return (
            <motion.g
              key={i}
              onHoverStart={() => setHoveredBook(i)}
              onHoverEnd={() => setHoveredBook(null)}
              animate={{ y: isH ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              {/* Book shadow */}
              <rect
                x={8 + offsetX}
                y={baseY + 18}
                width={100}
                height={4}
                rx={2}
                fill="#000"
                opacity={0.3}
              />
              {/* Book back cover (slightly visible) */}
              <rect
                x={8 + offsetX}
                y={baseY + 2}
                width={100}
                height={20}
                rx={3}
                fill={book.color}
                opacity={0.5}
              />
              {/* Book top face */}
              <rect
                x={8 + offsetX}
                y={baseY - 10}
                width={100}
                height={14}
                rx={3}
                fill={book.color}
                stroke={book.spine}
                strokeWidth={0.8}
              />
              {/* Spine edge */}
              <rect
                x={8 + offsetX}
                y={baseY - 10}
                width={6}
                height={14}
                rx={2}
                fill={book.spine}
              />
              {/* Title on top face */}
              <text
                x={22 + offsetX}
                y={baseY - 1}
                fontSize={6.5}
                fill={book.accent}
                fontFamily="monospace"
                fontWeight="600"
                opacity={0.9}
              >
                {book.title}
              </text>
              {/* Pages edge */}
              <rect
                x={104 + offsetX}
                y={baseY - 9}
                width={4}
                height={12}
                rx={1}
                fill="#e5e7eb"
                opacity={0.15}
              />

              {/* Hover book label */}
              <AnimatePresence>
                {isH && (
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <rect x={22 + offsetX} y={baseY - 26} width={80} height={14} rx={3} fill="#000" opacity={0.8} />
                    <text
                      x={62 + offsetX}
                      y={baseY - 16}
                      fontSize={7}
                      fill={book.accent}
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {book.title}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          );
        })}
      </svg>

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-lg opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
