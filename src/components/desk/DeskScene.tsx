"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { LaptopObject } from "./objects/LaptopObject";
import { PhoneObject } from "./objects/PhoneObject";
import { BooksObject } from "./objects/BooksObject";
import { CoffeeMugObject } from "./objects/CoffeeMugObject";
import { ControllerObject } from "./objects/ControllerObject";
import { StickyNotesObject } from "./objects/StickyNotesObject";
import { HeadphonesObject } from "./objects/HeadphonesObject";
import { MonitorObject } from "./objects/MonitorObject";
import { ProjectsModal } from "./modals/ProjectsModal";
import { ExperienceModal } from "./modals/ExperienceModal";
import { LearningModal } from "./modals/LearningModal";
import { MobileModal } from "./modals/MobileModal";
import { FunFactsModal } from "./modals/FunFactsModal";
import { HobbiesModal } from "./modals/HobbiesModal";
import { ChatModal } from "./modals/ChatModal";
import { ContactModal } from "./modals/ContactModal";
import { AchievementToast } from "./Achievements";

export type ModalType =
  | "projects"
  | "experience"
  | "learning"
  | "mobile"
  | "funfacts"
  | "hobbies"
  | "chat"
  | "contact"
  | null;

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "projects", title: "Project Explorer", icon: "💻", unlocked: false },
  { id: "experience", title: "Career Investigator", icon: "💼", unlocked: false },
  { id: "learning", title: "Bookworm", icon: "📚", unlocked: false },
  { id: "mobile", title: "App Connoisseur", icon: "📱", unlocked: false },
  { id: "funfacts", title: "Coffee Enthusiast", icon: "☕", unlocked: false },
  { id: "hobbies", title: "Gamer", icon: "🎮", unlocked: false },
  { id: "chat", title: "AI Whisperer", icon: "🤖", unlocked: false },
  { id: "contact", title: "Networker", icon: "🤝", unlocked: false },
  { id: "easter_egg", title: "Secret Finder 🥚", icon: "🥚", unlocked: false },
  { id: "all", title: "True Explorer — Hire This Dev!", icon: "⭐", unlocked: false },
];

export const FUN_FACTS = [
  "☕  Runs on coffee and TypeScript",
  "🚀  Built first mobile app at age 22",
  "💡  Most-used shortcut: Cmd+P (VS Code)",
  "🤖  Uses Claude Code as primary AI coding tool",
  "📱  Code deployed across 200+ vending machines",
  "🌱  Currently deep-diving into AI engineering",
  "⚡  Favourite stack: React Native + FastAPI",
  "🎯  Slashed app load times by 45% at Vendekin",
  "🔧  Can debug a FastAPI endpoint faster than you can Google it",
  "🎸  Codes better with lo-fi music in the background",
];

export default function DeskScene() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [factIndex, setFactIndex] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const deskRef = useRef<HTMLDivElement>(null);
  const easterBuffer = useRef("");
  const achievementQueue = useRef<Achievement[]>([]);
  const showingAchievement = useRef(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 30,
    damping: 28,
  });
  const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-5, 5]), {
    stiffness: 30,
    damping: 28,
  });

  useEffect(() => {
    const t = setTimeout(() => setIntroComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!deskRef.current) return;
      const r = deskRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width);
      mouseY.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      easterBuffer.current = (easterBuffer.current + e.key.toLowerCase()).slice(-6);
      if (easterBuffer.current === "hireme" && !showEasterEgg) {
        setShowEasterEgg(true);
        triggerAchievement("easter_egg");
        setTimeout(() => setShowEasterEgg(false), 5000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEasterEgg]);

  const processQueue = useCallback(() => {
    if (showingAchievement.current || achievementQueue.current.length === 0) return;
    showingAchievement.current = true;
    const next = achievementQueue.current.shift()!;
    setNewAchievement(next);
    setTimeout(() => {
      setNewAchievement(null);
      showingAchievement.current = false;
      setTimeout(processQueue, 400);
    }, 3200);
  }, []);

  const triggerAchievement = useCallback(
    (id: string) => {
      setAchievements((prev) => {
        if (prev.find((a) => a.id === id)?.unlocked) return prev;
        const updated = prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
        const item = updated.find((a) => a.id === id)!;
        achievementQueue.current.push(item);
        processQueue();
        const mains = ["projects", "experience", "learning", "mobile", "funfacts", "hobbies", "chat", "contact"];
        const allDone = mains.every((mid) => updated.find((a) => a.id === mid)?.unlocked);
        if (allDone) setTimeout(() => triggerAchievement("all"), 1200);
        return updated;
      });
    },
    [processQueue]
  );

  const openModal = useCallback(
    (modal: ModalType) => {
      setActiveModal(modal);
      if (modal) triggerAchievement(modal);
    },
    [triggerAchievement]
  );

  const handleCoffeeClick = useCallback(() => {
    setFactIndex((i) => (i + 1) % FUN_FACTS.length);
    openModal("funfacts");
  }, [openModal]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div
      ref={deskRef}
      className="relative w-full h-screen overflow-hidden select-none"
      style={{
        background:
          "radial-gradient(ellipse 130% 80% at 50% -5%, #1d0f45 0%, #080810 65%)",
      }}
    >
      {/* Room ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] opacity-20 blur-3xl rounded-full"
          style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-10 left-1/5 w-[350px] h-[250px] opacity-10 blur-3xl rounded-full"
          style={{ background: "radial-gradient(ellipse, #4f46e5 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-10 right-1/5 w-[350px] h-[250px] opacity-10 blur-3xl rounded-full"
          style={{ background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)" }}
        />
      </div>

      {/* ── DESK SURFACE ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-t-2xl"
        style={{
          top: "9%",
          x: parallaxX,
          y: parallaxY,
        }}
      >
        {/* Wood board */}
        <div
          className="absolute inset-0 rounded-t-2xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1e1308 0%, #241710 45%, #1c1208 100%)",
            boxShadow: "0 -2px 0 rgba(130,90,25,0.35), 0 -40px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 42px,
                rgba(210,150,70,0.6) 42px,
                rgba(210,150,70,0.6) 43px,
                transparent 43px,
                transparent 84px,
                rgba(210,150,70,0.35) 84px,
                rgba(210,150,70,0.35) 85px
              )`,
            }}
          />
          {/* Edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b6a22]/50 to-transparent" />
          {/* Mouse pad */}
          <div
            className="absolute"
            style={{
              left: "27%",
              right: "19%",
              top: "26%",
              bottom: "8%",
              borderRadius: 14,
              background: "rgba(4,4,16,0.72)",
              boxShadow:
                "inset 0 2px 14px rgba(0,0,0,0.7), 0 1px 0 rgba(70,50,15,0.25)",
            }}
          />
        </div>

        {/* ── OBJECTS ── */}

        {/* Monitor — top center */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "1%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : -28 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <MonitorObject onClick={() => openModal("chat")} />
        </motion.div>

        {/* Headphones — top right */}
        <motion.div
          className="absolute"
          style={{ right: "5%", top: "4%" }}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : 28 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          <HeadphonesObject onClick={() => openModal("experience")} />
        </motion.div>

        {/* Books — left */}
        <motion.div
          className="absolute"
          style={{ left: "3%", top: "30%" }}
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : -28 }}
          transition={{ duration: 0.55, delay: 0.28 }}
        >
          <BooksObject onClick={() => openModal("learning")} />
        </motion.div>

        {/* Laptop — center */}
        <motion.div
          className="absolute"
          style={{ left: "50%", top: "26%", transform: "translateX(-50%)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 0.88 }}
          transition={{ duration: 0.65, delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <LaptopObject onClick={() => openModal("projects")} />
        </motion.div>

        {/* Phone — right of laptop */}
        <motion.div
          className="absolute"
          style={{ right: "15%", top: "32%" }}
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : 22 }}
          transition={{ duration: 0.55, delay: 0.32 }}
        >
          <PhoneObject onClick={() => openModal("mobile")} />
        </motion.div>

        {/* Sticky Notes */}
        <motion.div
          className="absolute"
          style={{ left: "30%", bottom: "7%" }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 22 }}
          transition={{ duration: 0.55, delay: 0.42 }}
        >
          <StickyNotesObject onClick={() => openModal("contact")} />
        </motion.div>

        {/* Coffee Mug */}
        <motion.div
          className="absolute"
          style={{ right: "21%", bottom: "12%" }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: introComplete ? 1 : 0, y: introComplete ? 0 : 22 }}
          transition={{ duration: 0.55, delay: 0.48 }}
        >
          <CoffeeMugObject onClick={handleCoffeeClick} />
        </motion.div>

        {/* Controller — bottom left */}
        <motion.div
          className="absolute"
          style={{ left: "9%", bottom: "6%" }}
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: introComplete ? 1 : 0, x: introComplete ? 0 : -22 }}
          transition={{ duration: 0.55, delay: 0.52 }}
        >
          <ControllerObject onClick={() => openModal("hobbies")} />
        </motion.div>
      </motion.div>

      {/* Hint */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] text-white/20 font-mono pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.span
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          click objects to explore
        </motion.span>
        <span className="w-1 h-1 rounded-full bg-white/15" />
        <span>type &quot;hireme&quot; for a surprise</span>
      </motion.div>

      {/* Achievement counter pill */}
      <motion.div
        className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] text-white/30 font-mono bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/8"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-yellow-400/70">⭐</span>
        <span>
          {unlockedCount}/{achievements.length}
        </span>
      </motion.div>

      {/* Easter egg */}
      <AnimatePresence>{showEasterEgg && <EasterEgg />}</AnimatePresence>

      {/* Achievement toast */}
      <AnimatePresence>
        {newAchievement && <AchievementToast achievement={newAchievement} />}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === "projects" && (
          <ProjectsModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "experience" && (
          <ExperienceModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "learning" && (
          <LearningModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "mobile" && (
          <MobileModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "funfacts" && (
          <FunFactsModal
            onClose={() => setActiveModal(null)}
            facts={FUN_FACTS}
            factIndex={factIndex}
          />
        )}
        {activeModal === "hobbies" && (
          <HobbiesModal
            onClose={() => setActiveModal(null)}
            achievements={achievements}
          />
        )}
        {activeModal === "chat" && (
          <ChatModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "contact" && (
          <ContactModal onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function EasterEgg() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {Array.from({ length: 50 }).map((_, i) => {
        const colors = ["#6366f1", "#a78bfa", "#34d399", "#fbbf24", "#f472b6", "#60a5fa", "#fb923c"];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6 + (i % 4) * 3,
              height: 6 + (i % 4) * 3,
              background: colors[i % colors.length],
              left: `${(i * 7 + 5) % 96}%`,
              top: "-12px",
            }}
            animate={{
              y: ["0vh", "108vh"],
              x: [0, (i % 2 === 0 ? 1 : -1) * (30 + (i % 5) * 30)],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            }}
            transition={{
              duration: 1.8 + (i % 5) * 0.4,
              delay: (i % 10) * 0.06,
              ease: "easeIn",
            }}
          />
        );
      })}
      <motion.div
        className="absolute bg-[#0d0d1e]/95 backdrop-blur-xl border border-indigo-500/30 rounded-2xl px-10 py-7 text-center shadow-2xl"
        initial={{ scale: 0.4, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.15 }}
      >
        <div className="text-5xl mb-3">🥚</div>
        <div className="text-white font-semibold text-xl font-display">Easter Egg Found!</div>
        <div className="text-indigo-300 text-sm mt-2 font-mono">
          You typed &quot;hireme&quot; — wise choice. Let&apos;s talk! 🚀
        </div>
      </motion.div>
    </motion.div>
  );
}
