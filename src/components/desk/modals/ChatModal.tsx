"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

interface Message {
  role: "user" | "ai";
  text: string;
  id: number;
}

const SUGGESTIONS = [
  "Tell me about Prathamesh",
  "Show me his projects",
  "Why should I hire him?",
  "What AI skills does he have?",
  "How can I contact him?",
];

const RESPONSES: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /\b(who|about|prathamesh|introduce|yourself)\b/i,
    reply:
      "I'm Prathamesh Chaudhary — a full-stack engineer based in Pune, India. I specialise in React Native, AI/ML, and IoT systems. I currently build the platform powering Vendekin's smart vending machine network (200+ machines). I thrive at the intersection of hardware, mobile, and applied AI. 🚀",
  },
  {
    pattern: /\b(project|portfolio|built|work|what.*made)\b/i,
    reply:
      "Some highlights: 🔹 Smart Vending OS — React Native + FastAPI powering 200+ machines 🔹 EmoSense — multi-modal emotion detection (TensorFlow + OpenCV) 🔹 Operator App — fleet monitoring with 50% faster response time 🔹 YOLOv5 car detection, plant disease classifier, real-time data pipeline. Click the 💻 laptop on the desk to see all projects!",
  },
  {
    pattern: /\b(hire|recruit|opportunity|job|position|team|work together)\b/i,
    reply:
      "Great question! Here's the pitch: ✅ 2+ years shipping production React Native apps ✅ Built AI/ML pipelines from model training to FastAPI deployment ✅ Experienced with IoT + real-time systems (MQTT, WebSockets) ✅ Reduced app load times by 45%, machine downtime by 40% ✅ Available for full-time roles & freelance. Let's talk — prathameshpc77@gmail.com 📩",
  },
  {
    pattern: /\b(ai|machine learning|ml|deep learning|tensorflow|pytorch|llm|gpt|model)\b/i,
    reply:
      "I've been building with AI for 2+ years. Current toolkit: TensorFlow, PyTorch, OpenCV, Pandas, and LLM APIs (Claude, OpenAI). Projects: emotion detection, plant disease classification, YOLOv5 vehicle detection. Currently deep-diving into AI agents, RAG systems, and LLM fine-tuning. I use Claude Code daily! 🤖",
  },
  {
    pattern: /\b(mobile|react native|ios|android|app)\b/i,
    reply:
      "React Native is my primary mobile stack. I've shipped production apps used by field operators daily — real-time telemetry, push notifications, OTA updates via EAS, and complex state management. The apps handle MQTT streams and WebSocket connections to backend IoT infrastructure. 📱",
  },
  {
    pattern: /\b(contact|email|reach|connect|linkedin|github)\b/i,
    reply:
      "You can reach Prathamesh at: 📧 prathameshpc77@gmail.com 💼 LinkedIn: linkedin.com/in/prathameshpc77 🐙 GitHub: github.com/prathameshpc77 📍 Pune, Maharashtra, India. Or click the 📝 sticky notes on the desk for quick links!",
  },
  {
    pattern: /\b(skill|tech|stack|language|framework|tool)\b/i,
    reply:
      "Core stack: React Native, TypeScript, Python, FastAPI, PostgreSQL, TensorFlow. Additional: Next.js, Django REST, MQTT, WebSockets, Docker, Firebase, Raspberry Pi/Arduino. Tools: Claude Code (daily driver), Git, Postman, Cursor. Click the 📚 books on the desk for a full skills breakdown!",
  },
  {
    pattern: /\b(experience|career|company|vendekin|job history|background)\b/i,
    reply:
      "Career summary: 🎯 Vendekin (Full-time, Jan 2025–Present) — React Native + AI/backend 🎯 Vendekin (Intern, Jul–Dec 2024) — Mobile modernisation 🎯 Ahen Pvt. Ltd. (2023) — Data Science intern 🎯 Education: B.Tech AI from AISSMS. Click the 🎧 headphones on the desk for the full timeline!",
  },
  {
    pattern: /\b(hello|hi|hey|greet)\b/i,
    reply:
      "Hey there! 👋 I'm the AI version of Prathamesh. Ask me anything — about his projects, skills, experience, or why he'd be a great hire. Or try clicking on the desk objects to explore! What would you like to know?",
  },
  {
    pattern: /\b(iot|raspberry|arduino|hardware|sensor|mqtt)\b/i,
    reply:
      "IoT is a core part of the work! The vending machine network uses Raspberry Pi units running FastAPI + MQTT brokers. Real-time sensor data (temperature, inventory, errors) streams to the cloud and mobile app. It's the hardware-meets-software challenge that makes the work exciting. 🔧",
  },
];

const DEFAULT_REPLY =
  "Interesting question! I'd recommend checking the desk objects for specific info — 💻 laptop for projects, 🎧 headphones for experience, 📚 books for skills. Or try asking about: projects, AI skills, experience, hiring, or contact details!";

let msgId = 0;

export function ChatModal({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hey! I'm AI Prathamesh 🤖 Ask me anything about Prathamesh Chaudhary — his projects, skills, experience, or why you should hire him. I'll answer with real information!",
      id: msgId++,
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const query = text.trim();
    if (!query || typing) return;

    const userMsg: Message = { role: "user", text: query, id: msgId++ };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    const match = RESPONSES.find((r) => r.pattern.test(query));
    const reply = match?.reply ?? DEFAULT_REPLY;

    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: reply, id: msgId++ }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <ModalWrapper
      title="AI Prathamesh"
      subtitle="Ask me anything — I'll answer with real info"
      icon="🖥️"
      onClose={onClose}
    >
      <div className="flex flex-col" style={{ height: "min(68vh, 520px)" }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] mr-2 shrink-0 mt-0.5">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white/6 border border-white/8 text-white/80 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {typing && (
              <motion.div
                className="flex justify-start items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] shrink-0">
                  🤖
                </div>
                <div className="bg-white/6 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-2.5 flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                      animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 0.7, delay: i * 0.18, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="px-5 pb-2 flex gap-2 flex-wrap">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/40 hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/8 transition-all font-mono whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/6 flex gap-2 shrink-0">
          <input
            className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-indigo-500/40 focus:bg-white/8 transition-all font-mono"
            placeholder="Ask anything about Prathamesh..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={typing}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
