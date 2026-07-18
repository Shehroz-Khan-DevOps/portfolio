"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import {
  Layers,
  ShieldCheck,
  AlertTriangle,
  CloudOff,
  Ghost,
  Percent,
} from "lucide-react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  icon: typeof Layers;
  color: string;
};

const STATS: Stat[] = [
  { label: "Total Resources", value: 4, icon: Layers, color: "var(--muted)" },
  { label: "Managed", value: 3, icon: ShieldCheck, color: "var(--accent)" },
  { label: "Drifted", value: 0, icon: AlertTriangle, color: "var(--status-critical)" },
  { label: "Unmanaged", value: 0, icon: CloudOff, color: "var(--status-serious)" },
  { label: "Ghost", value: 1, icon: Ghost, color: "var(--status-warning)" },
  { label: "Coverage", value: 100, suffix: "%", icon: Percent, color: "var(--accent)" },
];

const MANAGED = 3;
const UNMANAGED = 0;
const TOTAL = MANAGED + UNMANAGED;
const COVERAGE_PCT = TOTAL === 0 ? 0 : Math.round((MANAGED / TOTAL) * 100);

function useCountUp(target: number, active: boolean, duration = 1.1) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, duration]);

  return value;
}

function StatTile({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.value, active);
  const Icon = stat.icon;

  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" style={{ color: stat.color }} />
        <span className="text-[11px] uppercase tracking-wide text-muted">
          {stat.label}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-xl font-semibold text-foreground">
        {value}
        {stat.suffix ?? ""}
      </p>
    </div>
  );
}

function CoverageDonut({ active }: { active: boolean }) {
  const size = 128;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = useCountUp(COVERAGE_PCT, active, 1.2);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: active
                ? circumference * (1 - COVERAGE_PCT / 100)
                : circumference,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-foreground">
            {pct}%
          </span>
          <span className="text-[10px] text-muted">Coverage</span>
        </div>
      </div>
      <ul className="mt-3 flex gap-4 text-xs">
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          Managed {MANAGED}
        </li>
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full bg-border" />
          Unmanaged {UNMANAGED}
        </li>
      </ul>
    </div>
  );
}

function ResourcesByTypeBar({ active }: { active: boolean }) {
  const maxValue = 4;
  const managedHeightPct = (MANAGED / maxValue) * 100;
  const unmanagedHeightPct = (UNMANAGED / maxValue) * 100;

  return (
    <div className="flex flex-col">
      <p className="text-xs text-muted">Resources by Type</p>
      <div className="mt-3 flex h-32 items-end gap-3">
        <div className="flex h-full flex-1 flex-col justify-end">
          <motion.div
            className="w-full rounded-t"
            style={{ background: "var(--accent)" }}
            initial={{ height: 0 }}
            animate={{ height: active ? `${managedHeightPct}%` : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="w-full rounded-t border border-b-0 border-dashed border-border"
            initial={{ height: 0 }}
            animate={{ height: active ? `${unmanagedHeightPct}%` : 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[11px] text-muted">s3_bucket</p>
      <ul className="mt-2 flex justify-center gap-4 text-xs">
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          Managed
        </li>
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full bg-border" />
          Unmanaged
        </li>
      </ul>
    </div>
  );
}

export function DriftLensDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="mt-5 rounded-xl border border-border bg-surface p-4 sm:p-5"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
        Live dashboard preview
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((stat) => (
          <StatTile key={stat.label} stat={stat} active={inView} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <CoverageDonut active={inView} />
        <ResourcesByTypeBar active={inView} />
      </div>
    </div>
  );
}
