/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Flame,
  Gauge,
  Layers3,
  LockKeyhole,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export interface RevisionItem {
  problem_id: string;
  title: string;
  topic?: string;
  priorityLabel?: string;
  priorityScore?: number;
  confidence_rating?: number;
  revision_count?: number;
}

interface RevisionGateProps {
  blocked: boolean;
  revisions: RevisionItem[];
  onStartRevision?: () => void;
}

const priorityConfig = (label?: string) => {
  switch ((label || "").toLowerCase()) {
    case "high":
      return {
        label: "HIGH",
        icon: Flame,
        text: "text-red-300",
        bg: "bg-red-400/[0.07]",
        border: "border-red-400/15",
        glow: "shadow-red-500/10",
        dot: "bg-red-400",
      };

    case "medium":
      return {
        label: "MEDIUM",
        icon: Zap,
        text: "text-amber-300",
        bg: "bg-amber-400/[0.07]",
        border: "border-amber-400/15",
        glow: "shadow-amber-500/10",
        dot: "bg-amber-400",
      };

    case "low":
    default:
      return {
        label: "LOW",
        icon: Target,
        text: "text-emerald-300",
        bg: "bg-emerald-400/[0.07]",
        border: "border-emerald-400/15",
        glow: "shadow-emerald-500/10",
        dot: "bg-emerald-400",
      };
  }
};

export function RevisionGate({
  blocked,
  revisions,
  onStartRevision,
}: RevisionGateProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!blocked) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 40);

    return () => window.clearTimeout(timer);
  }, [blocked]);

  useEffect(() => {
    if (!blocked) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [blocked]);

  if (!blocked) return null;

  const visibleRevisions = revisions.slice(0, 5);

  const remaining = Math.max(
    0,
    revisions.length - visibleRevisions.length
  );

  const highCount = revisions.filter(
    (r) => r.priorityLabel?.toLowerCase() === "high"
  ).length;

  const averageConfidence =
    revisions.length > 0
      ? Math.round(
          revisions.reduce(
            (sum, r) =>
              sum + (Number(r.confidence_rating) || 0),
            0
          ) / revisions.length
        )
      : 0;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden p-4">
      {/* ───────────────── BACKDROP ───────────────── */}

      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Ambient background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[120px] transition-all duration-1000 ${
            visible
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0"
          }`}
        />

        <div
          className={`absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-600/[0.07] blur-[100px] transition-all duration-1000 delay-200 ${
            visible
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
        />

        <div
          className={`absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-cyan-500/[0.05] blur-[110px] transition-all duration-1000 delay-300 ${
            visible
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          }`}
        />
      </div>

      {/* ───────────────── MODAL ───────────────── */}

      <div
        className={`relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0b0d12]/95 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all duration-500 ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-[0.96] opacity-0"
        }`}
      >
        {/* Top gradient line */}

        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

        {/* Grid texture */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top ambient glow */}

        <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-blue-500/[0.08] blur-3xl" />

        <div className="relative">
          {/* ───────────────── HEADER ───────────────── */}

          <div className="px-6 pb-5 pt-6 sm:px-7 sm:pt-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-4">
                {/* Animated icon */}

                <div className="relative shrink-0">
                  <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-500/10 duration-[3000ms]" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/[0.14] to-violet-500/[0.08] shadow-lg shadow-blue-500/5">
                    <Brain className="h-6 w-6 text-blue-300" />

                    <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 animate-pulse text-cyan-300" />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.18em] text-blue-300">
                      REVISION CHECKPOINT
                    </span>

                    <span className="h-1 w-1 rounded-full bg-blue-400/50" />

                    <span className="flex items-center gap-1 text-xs font-medium text-zinc-300">
                      <LockKeyhole className="h-3 w-3" />
                      LOCKED
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Strengthen what you know.
                  </h2>

                  <p className="mt-1.5 max-w-[390px] text-sm leading-5 text-zinc-300 sm:text-[15px]">
                    A few concepts are due for review before you
                    continue solving new problems.
                  </p>
                </div>
              </div>

              {/* Pending count */}

              <div className="hidden shrink-0 text-right sm:block">
                <div className="text-2xl font-bold tracking-tight text-white">
                  {revisions.length}
                </div>

                <div className="text-xs font-medium uppercase tracking-wider text-zinc-300">
                  pending
                </div>
              </div>
            </div>
          </div>

          {/* ───────────────── QUICK STATS ───────────────── */}

          <div className="mx-6 grid grid-cols-3 gap-2 sm:mx-7">
            <MiniStat
              icon={<Clock3 />}
              label="Due"
              value={revisions.length}
            />

            <MiniStat
              icon={<Flame />}
              label="High"
              value={highCount}
              danger={highCount > 0}
            />

            <MiniStat
              icon={<Gauge />}
              label="Confidence"
              value={`${averageConfidence}%`}
            />
          </div>

          {/* ───────────────── DIVIDER ───────────────── */}

          <div className="mx-6 my-5 h-px bg-white/[0.06] sm:mx-7" />

          {/* ───────────────── LIST HEADER ───────────────── */}

          <div className="px-6 sm:px-7">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-blue-400" />

                <span className="text-sm font-semibold text-white">
                  Today's revisions
                </span>
              </div>

              <span className="text-xs text-zinc-300">
                Highest priority first
              </span>
            </div>

            {/* ───────────────── REVISION LIST ───────────────── */}

            <div className="space-y-2">
              {visibleRevisions.map((revision, index) => {
                const config = priorityConfig(
                  revision.priorityLabel
                );

                const PriorityIcon = config.icon;

                const confidence = Math.min(
                  100,
                  Math.max(
                    0,
                    Number(revision.confidence_rating) || 0
                  )
                );

                const progress = Math.min(
                  8,
                  revision.revision_count ?? 0
                );

                return (
                  <div
                    key={revision.problem_id}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.055] bg-white/[0.02] px-3.5 py-3 transition-all duration-300 hover:border-white/[0.11] hover:bg-white/[0.035]"
                    style={{
                      animation: visible
                        ? "revisionGateItemIn 0.45s ease-out both"
                        : undefined,
                      animationDelay: `${150 + index * 70}ms`,
                    }}
                  >
                    {/* Priority indicator */}

                    <div
                      className={`absolute bottom-0 left-0 top-0 w-[2px] ${config.dot} opacity-60`}
                    />

                    <div className="flex items-center gap-3">
                      {/* Priority icon */}

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.bg} ${config.border}`}
                      >
                        <PriorityIcon
                          className={`h-3.5 w-3.5 ${config.text}`}
                        />
                      </div>

                      {/* Main */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium text-white">
                            {revision.title}
                          </p>

                          {revision.topic && (
                            <span className="hidden shrink-0 rounded-md border border-white/[0.06] bg-white/[0.025] px-1.5 py-0.5 text-[10px] text-zinc-300 sm:inline">
                              {revision.topic}
                            </span>
                          )}
                        </div>

                        <div className="mt-1.5 flex items-center gap-3">
                          <span
                            className={`text-[10px] font-bold tracking-wider ${config.text}`}
                          >
                            {config.label}
                          </span>

                          <span className="text-[11px] font-medium text-zinc-200">
                            Confidence {confidence}%
                          </span>

                          <span className="hidden text-[11px] font-medium text-zinc-300 sm:inline">
                            Revision {progress}/8
                          </span>
                        </div>
                      </div>

                      {/* Progress */}

                      <div className="hidden w-16 shrink-0 sm:block">
                        <div className="mb-1 flex justify-between text-[10px] font-medium text-zinc-300">
                          <span>PROGRESS</span>
                          <span>{progress}/8</span>
                        </div>

                        <div className="flex gap-0.5">
                          {Array.from({ length: 8 }).map(
                            (_, i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all ${
                                  i < progress
                                    ? "bg-blue-400/70"
                                    : i === progress
                                      ? "bg-blue-400/25"
                                      : "bg-white/[0.06]"
                                }`}
                              />
                            )
                          )}
                        </div>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-zinc-300" />
                    </div>

                    {/* Confidence bar */}

                    <div className="mt-2.5 ml-11 h-[2px] overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500/60 to-cyan-400/60 transition-all duration-1000"
                        style={{
                          width: `${confidence}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* More */}

              {remaining > 0 && (
                <div className="flex items-center justify-center py-1">
                  <span className="text-xs font-medium text-zinc-300">
                    +{remaining} more revision
                    {remaining > 1 ? "s" : ""} waiting
                  </span>
                </div>
              )}

              {revisions.length === 0 && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 text-center">
                  <AlertTriangle className="mx-auto h-5 w-5 text-zinc-500" />

                  <p className="mt-2 text-sm text-zinc-300">
                    Revision data is currently unavailable.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ───────────────── CTA ───────────────── */}

          <div className="mt-5 border-t border-white/[0.06] bg-black/20 px-6 py-5 sm:px-7">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400/80" />

              <p className="text-xs font-medium text-zinc-300">
                Complete your revisions to unlock new problems.
              </p>
            </div>

            <Button
              className="group relative h-11 w-full overflow-hidden border-0 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 font-semibold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20"
              onClick={onStartRevision}
            >
              {/* Button shine */}

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center">
                <Brain className="mr-2 h-4 w-4" />

                Start Revision Mode

                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-400">
              <Sparkles className="h-3 w-3" />

              Spaced repetition is keeping your knowledge fresh
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}

      <style>
        {`
          @keyframes revisionGateItemIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

/* ───────────────────────────────────────────── */
/* MINI STAT */
/* ───────────────────────────────────────────── */

function MiniStat({
  icon,
  label,
  value,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  danger?: boolean;
}) {
  return (
    <div className="group rounded-xl border border-white/[0.055] bg-white/[0.02] px-3 py-2.5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.035]">
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-md ${
            danger
              ? "bg-red-400/[0.08] text-red-300"
              : "bg-blue-400/[0.07] text-blue-300"
          }`}
        >
          <span className="[&>svg]:h-3 [&>svg]:w-3">
            {icon}
          </span>
        </span>

        <div className="min-w-0">
          <div
            className={`text-sm font-bold ${
              danger ? "text-red-300" : "text-white"
            }`}
          >
            {value}
          </div>

          <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-300">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}