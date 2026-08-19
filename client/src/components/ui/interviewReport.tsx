/* eslint-disable prettier/prettier */

import { useEffect, useMemo, useState } from "react";
import {
    useNavigate,
    useParams,
} from "@tanstack/react-router";

import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    MessageSquareText,
    RotateCcw,
    ShieldCheck,
    Target,
    Trophy,
    Zap,
    TrendingUp,
    Brain,
    Lightbulb,
} from "lucide-react";

import { motion } from "framer-motion";

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

interface ReadinessConfig {
    label: ReadinessLevel;
    description: string;
    gradient: string;
    textGradient: string;
    border: string;
    glow: string;
    icon: typeof Trophy;
}

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
            console.error(
                "Failed to load interview report:",
                err
            );
        } finally {
            setLoading(false);
        }
    };

    const readiness = useMemo<ReadinessConfig>(() => {
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
                label: "Strong Pass",
                description:
                    "Your performance shows strong interview readiness across the evaluated areas.",
                gradient:
                    "from-violet-500 via-fuchsia-400 to-cyan-400",
                textGradient:
                    "from-violet-300 via-fuchsia-300 to-cyan-300",
                border:
                    "border-violet-400/25",
                glow:
                    "bg-violet-500/20",
                icon: Trophy,
            };
        }

        if (score >= 3) {
            return {
                label: "Pass",
                description:
                    "You demonstrated a solid foundation. A few targeted improvements can make your performance more consistent.",
                gradient:
                    "from-blue-500 via-violet-500 to-cyan-400",
                textGradient:
                    "from-blue-300 via-violet-300 to-cyan-300",
                border:
                    "border-blue-400/25",
                glow:
                    "bg-blue-500/20",
                icon: ShieldCheck,
            };
        }

        if (score >= 2) {
            return {
                label: "Borderline",
                description:
                    "You showed potential, but several interview fundamentals still need focused practice.",
                gradient:
                    "from-amber-400 via-orange-400 to-red-400",
                textGradient:
                    "from-amber-300 via-orange-300 to-red-300",
                border:
                    "border-orange-400/25",
                glow:
                    "bg-orange-500/20",
                icon: Target,
            };
        }

        return {
            label: "Needs Work",
            description:
                "This interview exposed important areas that should be strengthened before relying on this performance level.",
            gradient:
                "from-orange-500 via-red-500 to-rose-500",
            textGradient:
                "from-orange-300 via-red-300 to-rose-300",
            border:
                "border-red-400/25",
            glow:
                "bg-red-500/20",
            icon: AlertTriangle,
        };
    }, [report?.overallScore]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050507] text-white">
                <div className="text-center">
                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="mx-auto mb-6 h-11 w-11 rounded-full border-2 border-white/10 border-t-violet-400"
                    />

                    <p className="text-lg font-semibold text-white">
                        Generating interview analysis
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                        Evaluating your performance...
                    </p>
                </div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#050507] text-white">
                <div className="text-center">
                    <AlertTriangle
                        size={46}
                        className="mx-auto mb-5 text-red-400"
                    />

                    <h2 className="text-2xl font-bold">
                        Report not found
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400">
                        We couldn't load the interview analysis.
                    </p>

                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const ReadinessIcon =
        readiness.icon;

    const clampScore = (score: number) =>
        Math.min(
            Math.max(
                Number(score) || 0,
                0
            ),
            5
        );

    const overallPercent = Math.round(
        (clampScore(
            report.overallScore
        ) /
            5) *
            100
    );

    const metrics = [
        {
            label: "Problem Solving",
            score:
                report.problemSolvingScore,
            icon: Brain,
        },
        {
            label: "Communication",
            score:
                report.communicationScore,
            icon: MessageSquareText,
        },
        {
            label: "Optimization",
            score:
                report.optimizationScore,
            icon: TrendingUp,
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050507] text-white">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.12, 1],
                        opacity: [
                            0.35,
                            0.55,
                            0.35,
                        ],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[150px]"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [
                            0.2,
                            0.35,
                            0.2,
                        ],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[160px]"
                />

                <div
                    className="absolute inset-0 opacity-[0.018]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px,transparent 1px)",
                        backgroundSize:
                            "56px 56px",
                    }}
                />
            </div>

            {/* =====================================================
                PAGE
            ===================================================== */}

            <div className="relative mx-auto max-w-[1400px] px-5 py-6 sm:px-8 lg:px-10 lg:py-9">

                {/* =================================================
                    NAV
                ================================================= */}

                <motion.header
                    initial={{
                        opacity: 0,
                        y: -10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-8 flex items-center justify-between"
                >
                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="group flex items-center gap-2.5 text-sm font-medium text-zinc-300 transition hover:text-white"
                    >
                        <ArrowLeft
                            size={18}
                            className="transition-transform group-hover:-translate-x-1"
                        />

                        Back to Dashboard
                    </button>

                    <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-xs font-semibold text-zinc-300 sm:flex">
                        <Zap
                            size={14}
                            className="text-violet-400"
                        />

                        AI Interview Analysis
                    </div>
                </motion.header>

                {/* =================================================
                    HERO
                ================================================= */}

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
                        duration: 0.7,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="relative mb-8 overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#09090c]"
                >
                    {/* Hero ambient glow */}

                    <div
                        className={`pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full blur-[140px] ${readiness.glow}`}
                    />

                    <div className="relative grid gap-10 p-7 sm:p-9 lg:grid-cols-[1fr_380px] lg:p-11">

                        {/* Hero copy */}

                        <div className="flex flex-col justify-center">
                            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-300">
                                <span className="relative flex h-2 w-2">
                                    <motion.span
                                        animate={{
                                            scale: [
                                                1,
                                                1.8,
                                                1,
                                            ],
                                            opacity: [
                                                1,
                                                0,
                                                1,
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="absolute inset-0 rounded-full bg-violet-400"
                                    />

                                    <span className="relative h-2 w-2 rounded-full bg-violet-400" />
                                </span>

                                Interview Complete
                            </div>

                            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
                                Your Interview
                                <span className="block bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                                    Performance Report
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base font-medium leading-7 text-zinc-300 sm:text-lg">
                                A detailed AI evaluation of
                                how you approached the
                                problem, communicated your
                                reasoning and optimized your
                                solution.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <InfoPill
                                    icon={CheckCircle2}
                                    text={`${report.strengths.length} strengths identified`}
                                />

                                <InfoPill
                                    icon={Target}
                                    text={`${report.weaknesses.length} areas to improve`}
                                />
                            </div>
                        </div>

                        {/* Readiness */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                x: 15,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: 0.2,
                                duration: 0.65,
                            }}
                            className={`relative overflow-hidden rounded-[28px] border ${readiness.border} bg-white/[0.025] p-7 backdrop-blur-xl`}
                        >
                            <div
                                className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full blur-[80px] ${readiness.glow}`}
                            />

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
                                        Interview Readiness
                                    </span>

                                    <ReadinessIcon
                                        size={20}
                                        className="text-violet-300"
                                    />
                                </div>

                                {/* Circular score */}

                                <div className="relative mx-auto mt-8 flex h-52 w-52 items-center justify-center">
                                    <div className="absolute inset-0 rounded-full border border-white/[0.06]" />

                                    <motion.div
                                        initial={{
                                            rotate: -90,
                                        }}
                                        animate={{
                                            rotate:
                                                -90 +
                                                overallPercent *
                                                    3.6,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.3,
                                            ease: [
                                                0.22,
                                                1,
                                                0.36,
                                                1,
                                            ],
                                        }}
                                        className={`absolute inset-2 rounded-full bg-gradient-to-r ${readiness.gradient}`}
                                        style={{
                                            mask:
                                                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                            maskComposite:
                                                "exclude",
                                            padding:
                                                "5px",
                                        }}
                                    />

                                    <div className="absolute inset-[14px] rounded-full bg-[#09090c]" />

                                    <div className="relative text-center">
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.7,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                delay: 0.45,
                                                duration: 0.5,
                                            }}
                                            className={`bg-gradient-to-r ${readiness.textGradient} bg-clip-text text-6xl font-black tracking-[-0.05em] text-transparent`}
                                        >
                                            {overallPercent}
                                            <span className="text-3xl">
                                                %
                                            </span>
                                        </motion.div>

                                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
                                            Overall
                                        </p>
                                    </div>
                                </div>

                                <h2
                                    className={`mt-5 bg-gradient-to-r ${readiness.textGradient} bg-clip-text text-center text-3xl font-black text-transparent`}
                                >
                                    {readiness.label}
                                </h2>

                                <p className="mt-3 text-center text-sm font-medium leading-6 text-zinc-300">
                                    {readiness.description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* =================================================
                    PERFORMANCE ANALYSIS
                ================================================= */}

                <section className="mb-8">
                    <div className="mb-5 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                                Performance Analysis
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Where you performed
                            </h2>

                            <p className="mt-2 text-sm font-medium text-zinc-300">
                                Breakdown of the capabilities evaluated during the interview.
                            </p>
                        </div>

                        <div className="hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-xs font-semibold text-zinc-300 sm:block">
                            Score scale&nbsp; 0 — 5
                        </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">

                        {/* Main performance chart */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="rounded-[28px] border border-white/[0.08] bg-[#09090c] p-6 sm:p-7"
                        >
                            <div className="mb-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-400/[0.07]">
                                        <TrendingUp
                                            size={19}
                                            className="text-violet-300"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            Capability Breakdown
                                        </h3>

                                        <p className="mt-0.5 text-xs font-medium text-zinc-400">
                                            AI evaluation by category
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs font-bold text-zinc-400">
                                    / 5
                                </span>
                            </div>

                            <div className="space-y-7">
                                {metrics.map(
                                    (
                                        metric,
                                        index
                                    ) => {
                                        const score =
                                            clampScore(
                                                metric.score
                                            );

                                        const percentage =
                                            (score /
                                                5) *
                                            100;

                                        const Icon =
                                            metric.icon;

                                        return (
                                            <motion.div
                                                key={
                                                    metric.label
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    x: -12,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay:
                                                        0.1 +
                                                        index *
                                                            0.08,
                                                }}
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-2.5">
                                                        <Icon
                                                            size={
                                                                16
                                                            }
                                                            className="text-violet-300"
                                                        />

                                                        <span className="text-sm font-bold text-zinc-200">
                                                            {
                                                                metric.label
                                                            }
                                                        </span>
                                                    </div>

                                                    <span className="text-lg font-black text-white">
                                                        {score.toFixed(
                                                            1
                                                        )}
                                                        <span className="ml-1 text-xs font-semibold text-zinc-400">
                                                            /5
                                                        </span>
                                                    </span>
                                                </div>

                                                <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.06]">
                                                    <motion.div
                                                        initial={{
                                                            width: 0,
                                                        }}
                                                        animate={{
                                                            width: `${percentage}%`,
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            delay:
                                                                0.2 +
                                                                index *
                                                                    0.1,
                                                            ease: [
                                                                0.22,
                                                                1,
                                                                0.36,
                                                                1,
                                                            ],
                                                        }}
                                                        className="relative h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-400 to-cyan-400"
                                                    >
                                                        <motion.div
                                                            animate={{
                                                                x: [
                                                                    "-100%",
                                                                    "300%",
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 2.4,
                                                                repeat: Infinity,
                                                                repeatDelay: 3,
                                                                ease: "easeInOut",
                                                            }}
                                                            className="absolute inset-y-0 w-16 bg-white/30 blur-md"
                                                        />
                                                    </motion.div>
                                                </div>

                                                <div className="mt-2 flex justify-between text-[10px] font-medium text-zinc-400">
                                                    <span>
                                                        Developing
                                                    </span>

                                                    <span>
                                                        Strong
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    }
                                )}
                            </div>
                        </motion.div>

                        {/* Score insight */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.15,
                            }}
                            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.08] via-[#09090c] to-cyan-500/[0.04] p-7"
                        >
                            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

                            <div className="relative">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08]">
                                    <Lightbulb
                                        size={21}
                                        className="text-violet-300"
                                    />
                                </div>

                                <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-violet-400">
                                    Overall Assessment
                                </p>

                                <h3 className="mt-3 text-3xl font-black leading-tight text-white">
                                    {readiness.label}
                                </h3>

                                <p className="mt-4 text-sm font-medium leading-7 text-zinc-300">
                                    {readiness.description}
                                </p>

                                <div className="mt-7 border-t border-white/[0.07] pt-6">
                                    <div className="flex items-end justify-between">
                                        <span className="text-sm font-semibold text-zinc-300">
                                            Overall score
                                        </span>

                                        <span className="text-3xl font-black text-white">
                                            {clampScore(
                                                report.overallScore
                                            ).toFixed(
                                                1
                                            )}
                                            <span className="ml-1 text-sm text-zinc-400">
                                                / 5
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* =================================================
                    STRENGTHS / WEAKNESSES
                ================================================= */}

                <section className="grid gap-5 lg:grid-cols-2">

                    <AnalysisCard
                        type="strength"
                        title="What you did well"
                        subtitle="Signals that worked in your favor"
                        items={
                            report.strengths
                        }
                    />

                    <AnalysisCard
                        type="weakness"
                        title="What to improve"
                        subtitle="Areas that held your performance back"
                        items={
                            report.weaknesses
                        }
                    />
                </section>

                {/* =================================================
                    FINAL AI FEEDBACK
                ================================================= */}

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
                    className="relative mt-5 overflow-hidden rounded-[30px] border border-violet-400/15 bg-[#09090c]"
                >
                    <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-[110px]" />

                    <div className="relative p-7 sm:p-9">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/[0.08]">
                                <MessageSquareText
                                    size={22}
                                    className="text-violet-300"
                                />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                                    AI Summary
                                </p>

                                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                                    Final Feedback
                                </h2>
                            </div>
                        </div>

                        <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/30 p-6 sm:p-8">
                            <p className="text-base font-medium leading-8 text-zinc-200 sm:text-lg">
                                {report.finalFeedback}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* =================================================
                    ACTIONS
                ================================================= */}

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={() =>
                            navigate({
                                to: "/dashboard",
                            })
                        }
                        className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-6 py-3.5 text-sm font-bold text-zinc-300 transition hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white"
                    >
                        <ArrowLeft
                            size={17}
                        />

                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate({
                                to: "/interviews",
                            })
                        }
                        className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-600/20 transition hover:-translate-y-0.5"
                    >
                        <RotateCcw
                            size={17}
                            className="transition-transform group-hover:-rotate-45"
                        />

                        Practice Again
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   INFO PILL
========================================================= */

function InfoPill({
    icon: Icon,
    text,
}: {
    icon: typeof CheckCircle2;
    text: string;
}) {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5">
            <Icon
                size={15}
                className="text-violet-300"
            />

            <span className="text-xs font-semibold text-zinc-300">
                {text}
            </span>
        </div>
    );
}

/* =========================================================
   ANALYSIS CARD
========================================================= */

function AnalysisCard({
    type,
    title,
    subtitle,
    items,
}: {
    type:
        | "strength"
        | "weakness";
    title: string;
    subtitle: string;
    items: string[];
}) {
    const isStrength =
        type === "strength";

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.55,
            }}
            className={`relative overflow-hidden rounded-[28px] border bg-[#09090c] p-6 sm:p-7 ${
                isStrength
                    ? "border-violet-400/15"
                    : "border-orange-400/15"
            }`}
        >
            <div
                className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-[80px] ${
                    isStrength
                        ? "bg-violet-500/10"
                        : "bg-orange-500/[0.07]"
                }`}
            />

            <div className="relative">
                <div className="flex items-start gap-4">
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
                            isStrength
                                ? "border-violet-400/20 bg-violet-400/[0.08]"
                                : "border-orange-400/20 bg-orange-400/[0.08]"
                        }`}
                    >
                        {isStrength ? (
                            <CheckCircle2
                                size={22}
                                className="text-violet-300"
                            />
                        ) : (
                            <AlertTriangle
                                size={22}
                                className="text-orange-300"
                            />
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-black text-white">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-zinc-400">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="mt-7 space-y-3">
                    {items.length > 0 ? (
                        items.map(
                            (
                                item,
                                index
                            ) => (
                                <motion.div
                                    key={`${item}-${index}`}
                                    initial={{
                                        opacity: 0,
                                        x: isStrength
                                            ? -10
                                            : 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        delay:
                                            index *
                                            0.06,
                                    }}
                                    className={`group rounded-2xl border bg-black/30 p-4 transition ${
                                        isStrength
                                            ? "border-white/[0.06] hover:border-violet-400/20"
                                            : "border-white/[0.06] hover:border-orange-400/20"
                                    }`}
                                >
                                    <div className="flex gap-3">
                                        <span
                                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                                                isStrength
                                                    ? "bg-violet-400"
                                                    : "bg-orange-400"
                                            }`}
                                        />

                                        <p className="text-sm font-medium leading-7 text-zinc-200 sm:text-[15px]">
                                            {item}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        )
                    ) : (
                        <div className="rounded-2xl border border-white/[0.06] bg-black/30 p-5">
                            <p className="text-sm font-medium text-zinc-400">
                                {isStrength
                                    ? "No specific strengths were identified."
                                    : "No major improvement areas were identified."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}