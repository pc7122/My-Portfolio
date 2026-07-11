"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
}

const NOTES = [
  { text: "About Me", sub: "who is this guy?", color: "#fef08a", textColor: "#713f12", rotate: -4 },
  { text: "Resume", sub: "download →", color: "#fda4af", textColor: "#881337", rotate: 3 },
  { text: "Contact", sub: "let's talk!", color: "#86efac", textColor: "#14532d", rotate: -2 },
];

export function StickyNotesObject({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const [peeled, setPeeled] = useState<number | null>(null);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ width: 170, height: 110 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setPeeled(null); }}
      onClick={onClick}
      whileHover={{ y: -4 }}
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
            📝 About & Contact
          </motion.div>
        )}
      </AnimatePresence>

      {NOTES.map((note, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm shadow-lg"
          style={{
            width: 72,
            height: 68,
            background: note.color,
            left: i * 44,
            top: i === 1 ? 12 : 0,
            rotate: note.rotate,
            originX: "50%",
            originY: "100%",
            zIndex: peeled === i ? 10 : i,
          }}
          onHoverStart={() => setPeeled(i)}
          onHoverEnd={() => setPeeled(null)}
          animate={{
            rotateZ: peeled === i ? note.rotate * 0.4 : note.rotate,
            y: peeled === i ? -8 : 0,
            scale: peeled === i ? 1.08 : 1,
            boxShadow: peeled === i
              ? "4px 8px 24px rgba(0,0,0,0.45)"
              : "2px 4px 12px rgba(0,0,0,0.25)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
        >
          {/* Fold corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4"
            style={{
              background: "linear-gradient(225deg, rgba(0,0,0,0.12) 50%, transparent 50%)",
            }}
          />
          {/* Note content */}
          <div className="p-2 h-full flex flex-col justify-between">
            <div
              className="text-[8px] font-bold leading-tight"
              style={{ color: note.textColor, fontFamily: "monospace" }}
            >
              {note.text}
            </div>
            <div
              className="text-[7px] opacity-60"
              style={{ color: note.textColor, fontFamily: "monospace" }}
            >
              {note.sub}
            </div>
            {/* Ruled lines */}
            {[36, 46, 56].map((y, li) => (
              <div
                key={li}
                className="absolute left-2 right-2 h-px"
                style={{ top: y, background: `${note.textColor}20` }}
              />
            ))}
          </div>
        </motion.div>
      ))}

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 blur-lg opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #000 0%, transparent 70%)" }}
      />
    </motion.div>
  );
}
