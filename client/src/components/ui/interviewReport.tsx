/* eslint-disable prettier/prettier */

import { useEffect, useMemo, useState } from "react";
import {
    useNavigate,
    useParams,
} from "@tanstack/react-router";

import {
    CheckCircle2,
    AlertTriangle,
    MessageSquareText,
    Trophy,
    ArrowLeft,
    RotateCcw,
    ShieldCheck,
    Zap,
    Target,
} from "lucide-react";

import { motion } from "framer-motion";

import ScoreCard from "@/components/ui/scoreCard";
import { interviewService } from "@/services/interviewService";

interface Report {
    overallScore: number;
    communicationScore: number;
    problemSolvingScore: number;
    optimizationScore: number;

    strengths: string[];
    weaknesses: string[];

    finalFeedback: string;
}

type ReadinessLevel =
    | "Strong Pass"
    | "Pass"
    | "Borderline"
    | "Needs Work";

export default function InterviewReport() {
    const { sessionId } = useParams({
        from: "/interview/$sessionId/report",
    });

    const navigate = useNavigate();

    const [report, setReport] =
        useState<Report | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadReport();
    }, [sessionId]);

    const loadReport = async () => {
        try {
            const res =
                await interviewService.getInterviewReport(
                    sessionId!
                );

            const normalizeList = (
                value: unknown
            ): string[] => {
                if (Array.isArray(value)) {
                    return value.flatMap((item) =>
                        String(item)
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                    );
                }

                return String(value ?? "")
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean);
            };

            setReport({
                overallScore:
                    Number(
                        res.data.overall_score
                    ) || 0,

                communicationScore:
                    Number(
                        res.data.communication_score
                    ) || 0,

                problemSolvingScore:
                    Number(
                        res.data.problem_solving_score
                    ) || 0,

                optimizationScore:
                    Number(
                        res.data.optimization_score
                    ) || 0,

                strengths:
                    normalizeList(
                        res.data.strengths
                    ),

                weaknesses:
                    normalizeList(
                        res.data.weaknesses
                    ),

                finalFeedback:
                    res.data.final_feedback ||
                    "No final feedback was generated.",
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /*
     * IMPORTANT:
     *
     * Backend score = 0 to 5.
     *
     * 4+  -> Strong Pass
     * 3+  -> Pass
     * 2+  -> Borderline
     * <2  -> Needs Work
     */
    const readiness = useMemo(() => {
        const score = Math.min(
            Math.max(
                Number(
                    report?.overallScore
                ) || 0,
                0
            ),
            5
        );

        if (score >= 4) {
            return {
                label: "Strong Pass" as ReadinessLevel,
                description:
                    "You demonstrated strong interview readiness across the evaluated areas.",
                color: "#22c55e",
                icon: Trophy,
            };
        }

        if (score >= 3) {
            return {
                label: "Pass" as ReadinessLevel,
                description:
                    "You demonstrated a solid interview foundation, with some areas still worth improving.",
                color: "#3b82f6",
                icon: ShieldCheck,
            };
        }

        if (score >= 2) {
            return {
                label: "Borderline" as ReadinessLevel,
                description:
                    "Your performance shows potential, but important interview skills still need improvement.",
                color: "#f59e0b",
                icon: Target,
            };
        }

        return {
            label: "Needs Work" as ReadinessLevel,
            description:
                "This interview exposed significant areas that should be improved before relying on this performance level.",
            color: "#ef4444",
            icon: AlertTriangle,
        };
    }, [report?.overallScore]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-zinc-800 border-t-violet-500" />

                    <p className="text-sm font-semibold text-zinc-300">
                        Generating AI interview analysis...
                    </p>

                    <p className="mt-2 text-xs text-zinc-600">
                        Evaluating your performance
                    </p>
                </div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <AlertTriangle
                        size={40}
                        className="mx-auto mb-4 text-red-400"
                    />

                    <h2 className="text-xl font-bold">
                        Report not found
                    </h2>

                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const ReadinessIcon =
        readiness.icon;

    const overallPercent = Math.round(
        (Math.min(
            Math.max(
                report.overallScore,
                0
            ),
            5
        ) /
            5) *
            100
    );

    return (
        <div className="min-h-screen overflow-hidden bg-black text-white">

            {/* Background atmosphere */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute left-[10%] top-[5%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[140px]" />

                <div className="absolute right-[5%] top-[30%] h-[350px] w-[350px] rounded-full bg-blue-600/[0.07] blur-[140px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize:
                            "60px 60px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">

                {/* TOP NAV */}
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    className="mb-10 flex items-center justify-between"
                >
                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="group flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                        <ArrowLeft
                            size={17}
                            className="transition group-hover:-translate-x-1"
                        />

                        Back to Dashboard
                    </button>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
                        <Zap
                            size={14}
                            className="text-violet-400"
                        />

                        AI Interview Analysis
                    </div>
                </motion.div>

                {/* HERO */}
                <motion.section
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.55,
                    }}
                    className="relative mb-10 overflow-hidden rounded-[34px] border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-black to-violet-950/20 p-7 lg:p-10"
                >
                    {/* Hero glow */}
                    <div
                        className="absolute -right-32 -top-32 h-80 w-80 rounded-full blur-[100px] opacity-20"
                        style={{
                            backgroundColor:
                                readiness.color,
                        }}
                    />

                    <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400" />

                                Interview Complete
                            </div>

                            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                                Interview Performance
                                <span className="block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                                    Report
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
                                Your AI-generated evaluation
                                across problem solving,
                                communication and
                                optimization.
                            </p>
                        </div>

                        {/* READINESS */}
                        <div
                            className="relative min-w-[260px] rounded-[28px] border p-6"
                            style={{
                                borderColor:
                                    `${readiness.color}33`,
                                background:
                                    `linear-gradient(145deg, ${readiness.color}12, rgba(0,0,0,.4))`,
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    Interview Readiness
                                </span>

                                <ReadinessIcon
                                    size={18}
                                    style={{
                                        color: readiness.color,
                                    }}
                                />
                            </div>

                            <div className="mt-6 flex items-end gap-3">
                                <span
                                    className="text-5xl font-black"
                                    style={{
                                        color: readiness.color,
                                    }}
                                >
                                    {overallPercent}%
                                </span>

                                <span className="mb-2 text-xs text-zinc-600">
                                    overall
                                </span>
                            </div>

                            <h2
                                className="mt-2 text-2xl font-black"
                                style={{
                                    color: readiness.color,
                                }}
                            >
                                {readiness.label}
                            </h2>

                            <p className="mt-3 text-xs leading-5 text-zinc-500">
                                {readiness.description}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* SCORE MATRIX */}
                <section className="mb-10">
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                Performance Matrix
                            </p>

                            <h2 className="mt-1 text-2xl font-black">
                                Evaluation Breakdown
                            </h2>
                        </div>

                        <span className="hidden text-xs text-zinc-600 sm:block">
                            Scale: 0 — 5
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        <ScoreCard
                            title="Overall"
                            score={
                                report.overallScore
                            }
                        />

                        <ScoreCard
                            title="Problem Solving"
                            score={
                                report.problemSolvingScore
                            }
                        />

                        <ScoreCard
                            title="Communication"
                            score={
                                report.communicationScore
                            }
                        />

                        <ScoreCard
                            title="Optimization"
                            score={
                                report.optimizationScore
                            }
                        />
                    </div>
                </section>

                {/* STRENGTHS + WEAKNESSES */}
                <section className="grid gap-6 lg:grid-cols-2">

                    {/* STRENGTHS */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.15,
                        }}
                        className="rounded-[30px] border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.06] to-black p-7"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                                <CheckCircle2
                                    size={21}
                                    className="text-emerald-400"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-black">
                                    Strengths
                                </h2>

                                <p className="mt-1 text-xs text-zinc-600">
                                    What went well
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 space-y-3">
                            {report.strengths.length >
                            0 ? (
                                report.strengths.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <motion.div
                                            key={
                                                index
                                            }
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    0.2 +
                                                    index *
                                                        0.05,
                                            }}
                                            className="group flex gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/80 p-4 transition hover:border-emerald-500/20"
                                        >
                                            <CheckCircle2
                                                size={
                                                    17
                                                }
                                                className="mt-0.5 shrink-0 text-emerald-400"
                                            />

                                            <p className="text-sm leading-6 text-zinc-400">
                                                {
                                                    item
                                                }
                                            </p>
                                        </motion.div>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-zinc-600">
                                    No strengths were
                                    identified.
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* WEAKNESSES */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            delay: 0.15,
                        }}
                        className="rounded-[30px] border border-red-500/15 bg-gradient-to-br from-red-500/[0.055] to-black p-7"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                                <AlertTriangle
                                    size={21}
                                    className="text-red-400"
                                />
                            </div>

                            <div>
                                <h2 className="text-xl font-black">
                                    Areas to Improve
                                </h2>

                                <p className="mt-1 text-xs text-zinc-600">
                                    What held your score back
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 space-y-3">
                            {report.weaknesses.length >
                            0 ? (
                                report.weaknesses.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <motion.div
                                            key={
                                                index
                                            }
                                            initial={{
                                                opacity: 0,
                                                x: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    0.2 +
                                                    index *
                                                        0.05,
                                            }}
                                            className="flex gap-3 rounded-2xl border border-zinc-900 bg-zinc-950/80 p-4 transition hover:border-red-500/20"
                                        >
                                            <AlertTriangle
                                                size={
                                                    17
                                                }
                                                className="mt-0.5 shrink-0 text-red-400"
                                            />

                                            <p className="text-sm leading-6 text-zinc-400">
                                                {
                                                    item
                                                }
                                            </p>
                                        </motion.div>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-zinc-600">
                                    No major weaknesses
                                    were identified.
                                </p>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* FINAL FEEDBACK */}
                <motion.section
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.25,
                    }}
                    className="relative mt-6 overflow-hidden rounded-[30px] border border-violet-500/20 bg-gradient-to-br from-violet-950/25 via-zinc-950 to-black p-7 lg:p-8"
                >
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-[80px]" />

                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                            <MessageSquareText
                                size={22}
                                className="text-violet-400"
                            />
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                                AI Summary
                            </p>

                            <h2 className="mt-1 text-2xl font-black">
                                Final Feedback
                            </h2>
                        </div>
                    </div>

                    <div className="relative mt-6 rounded-2xl border border-zinc-800/80 bg-black/40 p-6">
                        <p className="text-base leading-8 text-zinc-400">
                            {report.finalFeedback}
                        </p>
                    </div>
                </motion.section>

                {/* ACTIONS */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-400 transition hover:border-zinc-700 hover:text-white"
                    >
                        <ArrowLeft size={16} />

                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate({
                                to: "/interviews",
                            })
                        }
                        className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
                    >
                        <RotateCcw size={16} />

                        Practice Again
                    </button>
                </div>
            </div>
        </div>
    );
}