"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Available for new opportunities",
  "Open to DevOps & SRE roles",
  "Accepting freelance & contract work",
  "Usually replies within 24 hours",
];

const MESSAGE_INTERVAL_MS = 3200;

function useLahoreTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
    });

    function update() {
      setTime(formatter.format(new Date()));
    }

    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function AvailabilityBadge() {
  const [messageIndex, setMessageIndex] = useState(0);
  const time = useLahoreTime();

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>

      <span className="relative inline-flex h-4 min-w-[15rem] items-center overflow-hidden sm:min-w-[17rem]">
        <AnimatePresence mode="wait">
          <motion.span
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 whitespace-nowrap"
          >
            {MESSAGES[messageIndex]}
          </motion.span>
        </AnimatePresence>
      </span>

      {time && (
        <>
          <span className="text-border">·</span>
          <span className="whitespace-nowrap text-muted">{time} PKT</span>
        </>
      )}
    </div>
  );
}
