"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";

export function HoverExpandPanel({
  label,
  hint,
  resting,
  expanded,
}: {
  label: string;
  hint?: string;
  resting: (active: boolean) => ReactNode;
  expanded: (active: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  function openPreview() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPreviewOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setPreviewOpen(false), 180);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={openPreview}
        onMouseLeave={scheduleClose}
        className="rounded-xl border border-border bg-surface p-4 sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</p>
        </div>

        {resting(inView)}

        {hint && <p className="mt-4 text-center text-[11px] text-muted">{hint}</p>}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {previewOpen && (
              <motion.div
                key="hover-expand-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onMouseEnter={openPreview}
                  onMouseLeave={scheduleClose}
                  className="pointer-events-auto max-h-[88vh] w-[min(95vw,960px)] overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:p-8"
                >
                  <p className="mb-5 font-mono text-xs uppercase tracking-widest text-muted">
                    {label}
                  </p>

                  {expanded(previewOpen)}

                  <p className="mt-6 text-center text-xs text-muted">
                    Move your cursor away to close
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
