"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
  Layers,
  ShieldCheck,
  AlertTriangle,
  CloudOff,
  Ghost,
  Percent,
} from "lucide-react";

type DashboardData = {
  total: number;
  managed: number;
  drifted: number;
  unmanaged: number;
  ghost: number;
  coverage: number;
};

const BEFORE: DashboardData = { total: 4, managed: 1, drifted: 2, unmanaged: 1, ghost: 0, coverage: 25 };
const AFTER: DashboardData = { total: 4, managed: 3, drifted: 0, unmanaged: 0, ghost: 1, coverage: 100 };

const STAGES = ["Before", "Codifying", "After"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_DURATIONS: Record<Stage, number> = {
  Before: 3400,
  Codifying: 4200,
  After: 2400,
};

const LOG_LINES = [
  { text: "$ driftlens codify --auto", tone: "cmd" },
  { text: "→ resource: aws_s3_bucket.app_assets      [drifted]", tone: "dim" },
  { text: "✓ generated app_assets.tf", tone: "ok" },
  { text: "→ resource: aws_iam_role.ci_deploy         [drifted]", tone: "dim" },
  { text: "✓ generated ci_deploy.tf", tone: "ok" },
  { text: "→ resource: aws_security_group.web         [unmanaged]", tone: "dim" },
  { text: "✓ generated web_sg.tf", tone: "ok" },
  { text: "→ opening pull request via GitHub PR automation...", tone: "dim" },
  { text: "✓ PR #142 opened — awaiting review", tone: "ok" },
] as const;

function useCountUp(target: number, active: boolean, duration = 1.1) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, target, duration]);

  return value;
}

function StatTile({
  label,
  value,
  suffix,
  icon: Icon,
  color,
  active,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: typeof Layers;
  color: string;
  active: boolean;
}) {
  const displayed = useCountUp(value, active);

  return (
    <div className="rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        <span className="text-[11px] uppercase tracking-wide text-muted">{label}</span>
      </div>
      <p className="mt-1.5 font-mono text-xl font-semibold text-foreground">
        {displayed}
        {suffix ?? ""}
      </p>
    </div>
  );
}

function CoverageDonut({ data, active }: { data: DashboardData; active: boolean }) {
  const size = 128;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = useCountUp(data.coverage, active, 1.2);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: active ? circumference * (1 - data.coverage / 100) : circumference,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-foreground">{pct}%</span>
          <span className="text-[10px] text-muted">Coverage</span>
        </div>
      </div>
      <ul className="mt-3 flex gap-4 text-xs">
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          Managed {data.managed}
        </li>
        <li className="flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full bg-border" />
          Unmanaged {data.unmanaged}
        </li>
      </ul>
    </div>
  );
}

function ResourcesByTypeBar({ data, active }: { data: DashboardData; active: boolean }) {
  const maxValue = 4;
  const managedPct = (data.managed / maxValue) * 100;
  const unmanagedPct = (data.unmanaged / maxValue) * 100;

  return (
    <div className="flex flex-col">
      <p className="text-xs text-muted">Resources by Type</p>
      <div className="mt-3 flex h-32 items-end gap-3">
        <div className="flex h-full flex-1 flex-col justify-end gap-0.5">
          <motion.div
            className="w-full rounded-t"
            style={{ background: "var(--accent)" }}
            animate={{ height: active ? `${managedPct}%` : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="w-full rounded-t"
            style={{ background: "var(--status-serious)" }}
            animate={{ height: active ? `${unmanagedPct}%` : 0 }}
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
          <span className="h-2 w-2 rounded-full" style={{ background: "var(--status-serious)" }} />
          Unmanaged
        </li>
      </ul>
    </div>
  );
}

function DashboardView({ data, active }: { data: DashboardData; active: boolean }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <StatTile label="Total Resources" value={data.total} icon={Layers} color="var(--muted)" active={active} />
        <StatTile label="Managed" value={data.managed} icon={ShieldCheck} color="var(--accent)" active={active} />
        <StatTile label="Drifted" value={data.drifted} icon={AlertTriangle} color="var(--status-critical)" active={active} />
        <StatTile label="Unmanaged" value={data.unmanaged} icon={CloudOff} color="var(--status-serious)" active={active} />
        <StatTile label="Ghost" value={data.ghost} icon={Ghost} color="var(--status-warning)" active={active} />
        <StatTile label="Coverage" value={data.coverage} suffix="%" icon={Percent} color="var(--accent)" active={active} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <CoverageDonut data={data} active={active} />
        <ResourcesByTypeBar data={data} active={active} />
      </div>
    </>
  );
}

function CodifyingView({ active }: { active: boolean }) {
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setLineCount(0);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOG_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineCount(i + 1), 350 * (i + 1)));
    });
    return () => timers.forEach(clearTimeout);
  }, [active]);

  const progressPct = (lineCount / LOG_LINES.length) * 100;

  return (
    <div className="flex min-h-[220px] flex-col">
      <div className="overflow-hidden rounded-lg border border-border bg-[var(--terminal-bg)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-white/40">driftlens@codify:~</span>
        </div>
        <div className="min-h-[168px] px-4 py-3 font-mono text-xs leading-relaxed sm:text-sm">
          {LOG_LINES.slice(0, lineCount).map((line, i) => (
            <p
              key={i}
              className={
                line.tone === "cmd"
                  ? "text-white/90"
                  : line.tone === "ok"
                    ? "text-[var(--terminal-fg)]"
                    : "text-white/50"
              }
            >
              {line.text}
            </p>
          ))}
          {lineCount < LOG_LINES.length && (
            <span className="animate-blink text-[var(--terminal-fg)]">▍</span>
          )}
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--accent)" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export function DriftLensDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [stage, setStage] = useState<Stage>("After");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setStage("After");
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      if (cancelled) return;
      setStage("Before");
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setStage("Codifying");
          timers.push(
            setTimeout(() => {
              if (cancelled) return;
              setStage("After");
              timers.push(
                setTimeout(() => {
                  if (!cancelled) runCycle();
                }, STAGE_DURATIONS.After)
              );
            }, STAGE_DURATIONS.Codifying)
          );
        }, STAGE_DURATIONS.Before)
      );
    }

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isHovered]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl border border-border bg-surface p-4 transition-transform duration-300 ease-out hover:z-20 hover:scale-[1.06] hover:shadow-2xl sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Live dashboard preview
        </p>
        <div className="flex gap-1 rounded-full border border-border bg-surface-2 p-1">
          {STAGES.map((s) => (
            <span
              key={s}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                stage === s ? "bg-accent text-accent-foreground" : "text-muted"
              }`}
            >
              {s === "Before" ? "Drift detected" : s === "Codifying" ? "Codifying" : "Resolved"}
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {stage === "Before" && <DashboardView data={BEFORE} active={inView} />}
          {stage === "Codifying" && <CodifyingView active={isHovered} />}
          {stage === "After" && <DashboardView data={AFTER} active={inView} />}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 text-center text-[11px] text-muted">
        Hover to watch the drift → codify → resolve cycle
      </p>
    </div>
  );
}
