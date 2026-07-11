"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
  facts: string[];
  factIndex: number;
}

export function FunFactsModal({ onClose, facts, factIndex }: Props) {
  const [displayed, setDisplayed] = useState(factIndex);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setDisplayed(factIndex);
    setKey((k) => k + 1);
  }, [factIndex]);

  const nextFact = () => {
    setDisplayed((d) => (d + 1) % facts.length);
    setKey((k) => k + 1);
  };

  const prevFact = () => {
    setDisplayed((d) => (d - 1 + facts.length) % facts.length);
    setKey((k) => k + 1);
  };

  return (
    <ModalWrapper
      title="Fun Facts"
      subtitle="Click the mug again to cycle through facts"
      icon="☕"
      onClose={onClose}
    >
      <div className="p-6 space-y-6">
        {/* Main fact card */}
        <div className="relative min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              className="text-center px-8"
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Fact bubble */}
              <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-orange-500/5 p-8">
                {/* Coffee stain decorations */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-amber-500/10 opacity-40" />
                <div className="absolute bottom-4 left-4 w-5 h-5 rounded-full border border-amber-500/8 opacity-30" />

                <div className="text-4xl mb-4">☕</div>
                <p className="text-white/80 text-base leading-relaxed font-mono">
                  {facts[displayed]}
                </p>
                <p className="text-xs text-white/25 font-mono mt-4">
                  {displayed + 1} / {facts.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevFact}
            className="px-4 py-2 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all text-sm font-mono"
          >
            ← Prev
          </button>
          <div className="flex gap-1.5">
            {facts.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDisplayed(i); setKey((k) => k + 1); }}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background: i === displayed ? "#f59e0b" : "rgba(255,255,255,0.15)",
                  transform: i === displayed ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <button
            onClick={nextFact}
            className="px-4 py-2 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/4 transition-all text-sm font-mono"
          >
            Next →
          </button>
        </div>

        {/* All facts grid */}
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest mb-3">
            All Facts
          </p>
          <div className="space-y-2">
            {facts.map((fact, i) => (
              <motion.button
                key={i}
                className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
                  i === displayed
                    ? "border-amber-500/30 bg-amber-500/8 text-amber-300"
                    : "border-white/6 bg-white/2 text-white/40 hover:border-white/12 hover:text-white/60"
                }`}
                onClick={() => { setDisplayed(i); setKey((k) => k + 1); }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                {fact}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
