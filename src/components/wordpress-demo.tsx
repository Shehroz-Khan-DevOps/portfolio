"use client";

import { User, Globe, ShieldCheck, Waypoints, Server, Database, RefreshCw, Router } from "lucide-react";
import { motion } from "framer-motion";
import { HoverExpandPanel } from "./hover-expand-panel";

const W = 760;
const H = 630;

// AWS-style category colors: networking = purple, security = red, compute = orange, database = blue
const CATEGORY = {
  networking: "#8C4FFF",
  security: "#DD344C",
  compute: "#ED7100",
  database: "#527FFF",
};

const NODES = {
  user: { x: 380, y: 25 },
  dns: { x: 380, y: 110 },
  acm: { x: 660, y: 75 },
  alb: { x: 380, y: 195 },
  asg: { x: 380, y: 275 },
  natL: { x: 230, y: 384 },
  natR: { x: 530, y: 384 },
  ec2L: { x: 230, y: 457 },
  ec2R: { x: 530, y: 457 },
  rdsL: { x: 230, y: 542 },
  rdsR: { x: 530, y: 542 },
};

function pct(x: number, y: number) {
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` };
}

function pctBox(x: number, y: number, w: number, h: number) {
  return {
    left: `${(x / W) * 100}%`,
    top: `${(y / H) * 100}%`,
    width: `${(w / W) * 100}%`,
    height: `${(h / H) * 100}%`,
  };
}

function Node({
  x,
  y,
  icon: Icon,
  label,
  sublabel,
  color,
  compact,
}: {
  x: number;
  y: number;
  icon: typeof User;
  label: string;
  sublabel?: string;
  color?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${
        compact ? "" : "w-[76px] gap-1"
      }`}
      style={pct(x, y)}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg shadow-sm ${
          compact ? "h-5 w-5" : "h-9 w-9"
        }`}
        style={{ background: color ?? "var(--surface-2)", border: color ? "none" : "1px solid var(--border)" }}
      >
        <Icon className={compact ? "h-3 w-3" : "h-5 w-5"} style={{ color: color ? "#fff" : "var(--foreground)" }} />
      </div>
      {!compact && (
        <div className="text-center leading-tight">
          <p className="whitespace-nowrap text-[10px] font-semibold text-foreground">{label}</p>
          {sublabel && <p className="whitespace-nowrap text-[8px] text-muted">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

function GroupBox({
  x,
  y,
  w,
  h,
  label,
  dashed = true,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-md ${dashed ? "border border-dashed" : "border"} border-border/70`}
      style={pctBox(x, y, w, h)}
    >
      <span className="absolute -top-2 left-2 whitespace-nowrap bg-surface px-1 text-[8px] uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

function StaticLines() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
      <line x1={NODES.user.x} y1={NODES.user.y + 16} x2={NODES.dns.x} y2={NODES.dns.y - 18} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.dns.x} y1={NODES.dns.y + 18} x2={NODES.alb.x} y2={NODES.alb.y - 18} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.acm.x} y1={NODES.acm.y + 18} x2={NODES.alb.x + 14} y2={NODES.alb.y - 8} stroke="var(--border)" strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={NODES.alb.x} y1={NODES.alb.y + 18} x2={NODES.asg.x} y2={NODES.asg.y - 18} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.asg.x - 10} y1={NODES.asg.y + 15} x2={NODES.ec2L.x + 8} y2={NODES.ec2L.y - 20} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.asg.x + 10} y1={NODES.asg.y + 15} x2={NODES.ec2R.x - 8} y2={NODES.ec2R.y - 20} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.ec2L.x} y1={NODES.ec2L.y + 20} x2={NODES.rdsL.x} y2={NODES.rdsL.y - 18} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.ec2R.x} y1={NODES.ec2R.y + 20} x2={NODES.rdsR.x} y2={NODES.rdsR.y - 18} stroke="var(--border)" strokeWidth={1.5} />
      <line x1={NODES.rdsL.x + 18} y1={NODES.rdsL.y} x2={NODES.rdsR.x - 18} y2={NODES.rdsR.y} stroke="var(--accent-2)" strokeWidth={1.5} strokeDasharray="3 3" />
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
  const path = makePath(NODES.user, NODES.dns, NODES.alb, NODES.asg, ec2, rds, rds, NODES.user);
  const times = [0, 0.12, 0.26, 0.38, 0.55, 0.72, 0.86, 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full">
      <motion.circle
        r={4}
        fill="var(--accent)"
        initial={{ cx: NODES.user.x, cy: NODES.user.y, opacity: 0 }}
        animate={{ cx: path.cx, cy: path.cy, opacity: [0, 1, 1, 1, 1, 1, 0, 0] }}
        transition={{ duration: 3.6, times, repeat: Infinity, delay, ease: "easeInOut" }}
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
        r={3}
        fill="var(--accent-2)"
        cy={NODES.rdsL.y}
        initial={{ cx: NODES.rdsL.x + 18 }}
        animate={{ cx: [NODES.rdsL.x + 18, midX, NODES.rdsR.x - 18, midX, NODES.rdsL.x + 18] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function Diagram({ active, compact }: { active: boolean; compact?: boolean }) {
  return (
    <div className="relative mx-auto aspect-[760/630] w-full max-w-2xl">
      <GroupBox x={70} y={330} w={620} h={272} label="VPC · us-east-2" />
      <GroupBox x={90} y={344} w={280} h={248} label="AZ-a" />
      <GroupBox x={390} y={344} w={280} h={248} label="AZ-b" />

      <GroupBox x={110} y={354} w={240} h={60} label="Public subnet" />
      <GroupBox x={410} y={354} w={240} h={60} label="Public subnet" />
      <GroupBox x={110} y={422} w={240} h={160} label="Private subnet" />
      <GroupBox x={410} y={422} w={240} h={160} label="Private subnet" />

      <StaticLines />
      <SyncPulse active={active} />
      <RequestDot delay={0} active={active} branch="L" />
      <RequestDot delay={0.6} active={active} branch="R" />

      <Node x={NODES.user.x} y={NODES.user.y} icon={User} label="User" compact={compact} />
      <Node x={NODES.dns.x} y={NODES.dns.y} icon={Globe} label="Route 53" sublabel="DNS" color={CATEGORY.networking} compact={compact} />
      <Node x={NODES.acm.x} y={NODES.acm.y} icon={ShieldCheck} label="ACM" sublabel="TLS cert" color={CATEGORY.security} compact={compact} />
      <Node x={NODES.alb.x} y={NODES.alb.y} icon={Waypoints} label="ALB" sublabel="Load balancer" color={CATEGORY.networking} compact={compact} />
      <Node x={NODES.asg.x} y={NODES.asg.y} icon={RefreshCw} label="Auto Scaling" color={CATEGORY.compute} compact={compact} />
      <Node x={NODES.natL.x} y={NODES.natL.y} icon={Router} label="NAT GW" color={CATEGORY.networking} compact={compact} />
      <Node x={NODES.natR.x} y={NODES.natR.y} icon={Router} label="NAT GW" color={CATEGORY.networking} compact={compact} />
      <Node x={NODES.ec2L.x} y={NODES.ec2L.y} icon={Server} label="EC2" sublabel="WordPress" color={CATEGORY.compute} compact={compact} />
      <Node x={NODES.ec2R.x} y={NODES.ec2R.y} icon={Server} label="EC2" sublabel="WordPress" color={CATEGORY.compute} compact={compact} />
      <Node x={NODES.rdsL.x} y={NODES.rdsL.y} icon={Database} label="RDS" sublabel="Primary" color={CATEGORY.database} compact={compact} />
      <Node x={NODES.rdsR.x} y={NODES.rdsR.y} icon={Database} label="RDS" sublabel="Standby" color={CATEGORY.database} compact={compact} />
    </div>
  );
}

export function WordPressDemo() {
  return (
    <HoverExpandPanel
      label="Request flow"
      resting={() => <Diagram active={false} compact />}
      expanded={(active) => <Diagram active={active} />}
    />
  );
}
