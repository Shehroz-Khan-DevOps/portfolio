"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TerminalEntry = {
  command: string;
  output: { label: string; value: string }[];
};

const ENTRIES: TerminalEntry[] = [
  {
    command: "whoami",
    output: [
      { label: "name", value: "M. Shehroz Khan" },
      { label: "role", value: "Software Systems & DevOps Engineer" },
      { label: "base", value: "Lahore, Pakistan" },
      { label: "status", value: "open_to_opportunities" },
    ],
  },
  {
    command: "uptime --production",
    output: [
      { label: "zero_downtime", value: "100% across all migrations" },
      { label: "incidents", value: "50+ resolved on-call as SRE" },
    ],
  },
  {
    command: "kubectl get pods -A | grep -v Running | wc -l",
    output: [{ label: "failing", value: "0 (all pods healthy)" }],
  },
  {
    command: "terraform plan | tail -1",
    output: [{ label: "result", value: "Plan: 0 to add, 0 to change, 0 to destroy." }],
  },
];

const TYPE_SPEED_MS = 45;
const OUTPUT_DELAY_MS = 300;
const HOLD_MS = 2200;

export function TerminalAnimation() {
  const [entryIndex, setEntryIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const entry = ENTRIES[entryIndex];
    setTyped("");
    setShowOutput(false);

    let charIndex = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function typeNextChar() {
      charIndex += 1;
      setTyped(entry.command.slice(0, charIndex));

      if (charIndex < entry.command.length) {
        timers.push(setTimeout(typeNextChar, TYPE_SPEED_MS));
      } else {
        timers.push(setTimeout(() => setShowOutput(true), OUTPUT_DELAY_MS));
        timers.push(
          setTimeout(() => {
            setEntryIndex((prev) => (prev + 1) % ENTRIES.length);
          }, OUTPUT_DELAY_MS + HOLD_MS)
        );
      }
    }

    timers.push(setTimeout(typeNextChar, TYPE_SPEED_MS));

    return () => timers.forEach(clearTimeout);
  }, [entryIndex]);

  const entry = ENTRIES[entryIndex];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[var(--terminal-bg)] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 font-mono text-xs text-white/40">shehroz@prod:~</span>
      </div>
      <div className="min-h-[172px] px-5 py-4 font-mono text-sm leading-relaxed text-[var(--terminal-fg)]">
        <p>
          <span className="text-white/40">$</span> {typed}
          <span className="animate-blink">▍</span>
        </p>
        <AnimatePresence mode="wait">
          {showOutput && (
            <motion.div
              key={entryIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-0.5"
            >
              {entry.output.map((line) => (
                <p key={line.label}>
                  <span>{line.label}</span>
                  <span className="text-white/40">{"  "}</span>
                  <span className="text-white/80">{line.value}</span>
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
