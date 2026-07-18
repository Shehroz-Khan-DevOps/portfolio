"use client";

import { User, Globe, ShieldCheck, Network, Server, Database, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { HoverExpandPanel } from "./hover-expand-panel";

const W = 720;
const H = 500;

const NODES = {
  user: { x: 360, y: 30 },
  dns: { x: 360, y: 115 },
  acm: { x: 630, y: 75 },
  alb: { x: 360, y: 210 },
  asg: { x: 360, y: 270 },
  ec2L: { x: 210, y: 340 },
  ec2R: { x: 510, y: 340 },
  rdsL: { x: 210, y: 435 },
  rdsR: { x: 510, y: 435 },
};

function pct(x: number, y: number) {
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
}

function Node({
  x,
  y,
  icon: Icon,
  label,
  sublabel,
  color = "var(--accent)",
}: {
  x: number;
  y: number;
  icon: typeof User;
  label: string;
  sublabel?: string;
  color?: string;
}) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
      style={pct(x, y)}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 shadow-sm"
        style={{ color }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-center leading-tight">
        <p className="text-[10px] font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-[9px] text-muted">{sublabel}</p>}
      </div>
    </div>
  );
}

function GroupBox({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <div
      className="absolute rounded-md border border-dashed border-border/70"
      style={{
        left: `${(x / W) * 100}%`,
        top: `${(y / H) * 100}%`,
        width: `${(w / W) * 100}%`,
        height: `${(h / H) * 100}%`,
      }}
    >
      <span className="absolute -top-2 left-2 bg-surface px-1 text-[9px] uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

function StaticLines() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
      <line x1={NODES.user.x} y1={NODES.user.y + 12} x2={NODES.dns.x} y2={NODES.dns.y - 14} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.dns.x} y1={NODES.dns.y + 14} x2={NODES.alb.x} y2={NODES.alb.y - 14} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.acm.x} y1={NODES.acm.y + 14} x2={NODES.alb.x + 12} y2={NODES.alb.y - 8} stroke="var(--border)" strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={NODES.alb.x - 10} y1={NODES.alb.y + 12} x2={NODES.ec2L.x} y2={NODES.ec2L.y - 16} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.alb.x + 10} y1={NODES.alb.y + 12} x2={NODES.ec2R.x} y2={NODES.ec2R.y - 16} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.ec2L.x} y1={NODES.ec2L.y + 14} x2={NODES.rdsL.x} y2={NODES.rdsL.y - 14} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.ec2R.x} y1={NODES.ec2R.y + 14} x2={NODES.rdsR.x} y2={NODES.rdsR.y - 14} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.rdsL.x + 14} y1={NODES.rdsL.y} x2={NODES.rdsR.x - 14} y2={NODES.rdsR.y} stroke="var(--accent-2)" strokeWidth={1.5} strokeDasharray="3 3" />
    </svg>
  );
}

function makePath(...points: { x: number; y: number }[]) {
  return {
    cx: points.map((p) => p.x),
    cy: points.map((p) => p.y),
  };
}

function RequestDot({ delay, active, branch }: { delay: number; active: boolean; branch: "L" | "R" }) {
  if (!active) return null;

  const ec2 = branch === "L" ? NODES.ec2L : NODES.ec2R;
  const rds = branch === "L" ? NODES.rdsL : NODES.rdsR;
  const path = makePath(NODES.user, NODES.dns, NODES.alb, ec2, rds, rds, NODES.user);
  const times = [0, 0.14, 0.3, 0.5, 0.68, 0.82, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
      <motion.circle
        r={5}
        fill="var(--accent)"
        initial={{ cx: NODES.user.x, cy: NODES.user.y, opacity: 0 }}
        animate={{ cx: path.cx, cy: path.cy, opacity: [0, 1, 1, 1, 1, 0, 0] }}
        transition={{ duration: 3.2, times, repeat: Infinity, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SyncPulse({ active }: { active: boolean }) {
  if (!active) return null;

  const midX = (NODES.rdsL.x + NODES.rdsR.x) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
      <motion.circle
        r={3.5}
        fill="var(--accent-2)"
        cy={NODES.rdsL.y}
        initial={{ cx: NODES.rdsL.x + 14 }}
        animate={{ cx: [NODES.rdsL.x + 14, midX, NODES.rdsR.x - 14, midX, NODES.rdsL.x + 14] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function Diagram({ active }: { active: boolean }) {
  return (
    <div className="relative mx-auto aspect-[720/500] w-full max-w-2xl">
      <GroupBox x={95} y={185} w={550} h={295} label="VPC · us-east-2" />
      <GroupBox x={115} y={205} w={210} h={255} label="AZ-a" />
      <GroupBox x={415} y={205} w={210} h={255} label="AZ-b" />

      <StaticLines />
      <SyncPulse active={active} />
      <RequestDot delay={0} active={active} branch="L" />
      <RequestDot delay={0.5} active={active} branch="R" />

      <Node x={NODES.user.x} y={NODES.user.y} icon={User} label="User" color="var(--foreground)" />
      <Node x={NODES.dns.x} y={NODES.dns.y} icon={Globe} label="Route 53" sublabel="DNS" />
      <Node x={NODES.acm.x} y={NODES.acm.y} icon={ShieldCheck} label="ACM" sublabel="TLS cert" color="var(--status-warning)" />
      <Node x={NODES.alb.x} y={NODES.alb.y} icon={Network} label="ALB" sublabel="Load balancer" />
      <Node x={NODES.asg.x} y={NODES.asg.y} icon={RefreshCw} label="Auto Scaling" color="var(--muted)" />
      <Node x={NODES.ec2L.x} y={NODES.ec2L.y} icon={Server} label="EC2" sublabel="WordPress" />
      <Node x={NODES.ec2R.x} y={NODES.ec2R.y} icon={Server} label="EC2" sublabel="WordPress" />
      <Node x={NODES.rdsL.x} y={NODES.rdsL.y} icon={Database} label="RDS" sublabel="Primary" color="var(--accent-2)" />
      <Node x={NODES.rdsR.x} y={NODES.rdsR.y} icon={Database} label="RDS" sublabel="Standby" color="var(--accent-2)" />
    </div>
  );
}

export function WordPressDemo() {
  return (
    <HoverExpandPanel
      label="Request flow"
      hint="Hover to watch a request travel through the infrastructure"
      resting={() => <Diagram active={false} />}
      expanded={(active) => <Diagram active={active} />}
    />
  );
}
