/* eslint-disable prettier/prettier */

import {
    BrainCircuit,
    Sparkles,
    Activity,
    TrendingDown,
    Target,
    ArrowUpRight,
    Zap,
} from "lucide-react";

import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { DashboardData } from "@/types/dashboard";

interface Props {
    dashboard: DashboardData | null;
}

export default function AIMentorCard({
    dashboard,
}: Props) {
    const navigate = useNavigate();

    if (!dashboard) return null;

    const recommendation = dashboard.recommendation ?? {};
    const ai = dashboard.aiAdvice ?? {};
    const focus = dashboard.profile?.focusTopic ?? {};

    const confidence =
        focus?.confidence ??
        recommendation?.confidence ??
        0;

    const focusType =
        focus?.type === "coverage_gap"
            ? "Coverage Gap"
            : focus?.type === "weakness"
                ? "Weak Topic"
                : "Healthy Topic";

 const mentorProblems =
    dashboard.mentorProblems ?? [];

const mentorPlan =
    dashboard.mentorPlan ?? {};

const completedProblemIds =
    mentorPlan.completedProblemIds ?? [];

    const isMentorCompleted = (problemId: number) =>
    completedProblemIds.includes(problemId);

    const staggerContainer = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 18,
        },
        show: {
            opacity: 1,
            y: 0,
        },
    };

    const openRoadmap = (problemId?: number) => {
    const ids = mentorProblems
        .map((problem) => problem.id)
        .join(",");

    if (!ids) return;

    navigate({
        to: "/problems",
        search: {
            source: "roadmap",
            ids,
            problemId: problemId
                ? String(problemId)
                : undefined,
        },
    });
};

    return (
        <motion.section
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="
                relative
                mt-8
                overflow-hidden
                rounded-[28px]
                border
                border-zinc-800/80
                bg-zinc-950
                shadow-2xl
                shadow-black/30
            "
        >
            {/* ------------------------------------------------ */}
            {/* BACKGROUND EFFECTS */}
            {/* ------------------------------------------------ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-96
                    w-96
                    rounded-full
                    bg-violet-600/15
                    blur-[130px]
                "
            />

            <motion.div
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    -left-32
                    bottom-0
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.025]
                    [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                    [background-size:32px_32px]
                "
            />

            <div className="relative p-6 md:p-8">

                {/* ================================================= */}
                {/* HERO */}
                {/* ================================================= */}

                <motion.div
                    variants={fadeUp}
                    className="
                        rounded-3xl
                        border
                        border-zinc-800
                        bg-zinc-900/50
                        p-6
                        md:p-7
                    "
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        <div className="max-w-3xl">

                            {/* Badge */}

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-violet-300
                                "
                            >
                                <BrainCircuit
                                    size={15}
                                    className="text-violet-400"
                                />

                                Interview Intelligence

                                <span
                                    className="
                                        h-1
                                        w-1
                                        rounded-full
                                        bg-violet-400
                                    "
                                />

                                AI Mentor
                            </div>

                            {/* Headline */}

                            <motion.h2
                                variants={fadeUp}
                                className="
                                    mt-5
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    md:text-4xl
                                "
                            >
                                {ai?.headline ||
                                    recommendation?.title ||
                                    "Your AI Mentor"}
                            </motion.h2>

                            {/* Insight */}

                            <motion.p
                                variants={fadeUp}
                                className="
                                    mt-3
                                    max-w-2xl
                                    text-base
                                    leading-7
                                    text-zinc-400
                                    md:text-lg
                                "
                            >
                                {ai?.insight ||
                                    recommendation?.summary ||
                                    "Your personalized preparation guidance will appear here."}
                            </motion.p>

                        </div>

                        {/* Live analysis */}

                        <motion.div
                            variants={fadeUp}
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-2
                                self-start
                                rounded-full
                                border
                                border-emerald-500/20
                                bg-emerald-500/5
                                px-3
                                py-2
                                text-xs
                                font-medium
                                text-emerald-300
                            "
                        >
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="
                                        absolute
                                        inline-flex
                                        h-full
                                        w-full
                                        animate-ping
                                        rounded-full
                                        bg-emerald-400
                                        opacity-60
                                    "
                                />

                                <span
                                    className="
                                        relative
                                        inline-flex
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-emerald-400
                                    "
                                />
                            </span>

                            Live Analysis
                        </motion.div>

                    </div>
                </motion.div>

                {/* ================================================= */}
                {/* METRICS */}
                {/* ================================================= */}

                <motion.div
                    variants={staggerContainer}
                    className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-4
                        md:grid-cols-3
                    "
                >

                    {/* Focus */}

                    <motion.div
                        variants={fadeUp}
                        whileHover={{
                            y: -4,
                            borderColor: "rgba(139,92,246,0.35)",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-zinc-800
                            bg-zinc-900/50
                            p-5
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    grid
                                    h-10
                                    w-10
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                "
                            >
                                <Sparkles
                                    size={18}
                                    className="text-violet-400"
                                />
                            </div>

                            <div className="min-w-0">

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.18em]
                                        text-zinc-500
                                    "
                                >
                                    Focus Area
                                </p>

                                <p
                                    className="
                                        mt-1
                                        truncate
                                        text-sm
                                        font-semibold
                                        capitalize
                                        text-white
                                    "
                                >
                                    {recommendation?.priority ||
                                        focus?.topic ||
                                        "—"}
                                </p>

                            </div>

                        </div>
                    </motion.div>

                    {/* Confidence */}

                    <motion.div
                        variants={fadeUp}
                        whileHover={{
                            y: -4,
                            borderColor: "rgba(16,185,129,0.35)",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-zinc-800
                            bg-zinc-900/50
                            p-5
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    grid
                                    h-10
                                    w-10
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    border
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                "
                            >
                                <Activity
                                    size={18}
                                    className="text-emerald-400"
                                />
                            </div>

                            <div className="flex-1">

                                <div className="flex items-center justify-between">

                                    <p
                                        className="
                                            text-[10px]
                                            font-medium
                                            uppercase
                                            tracking-[0.18em]
                                            text-zinc-500
                                        "
                                    >
                                        Confidence
                                    </p>

                                    <span className="text-sm font-bold text-white">
                                        {confidence}%
                                    </span>

                                </div>

                                <div
                                    className="
                                        mt-2
                                        h-1.5
                                        overflow-hidden
                                        rounded-full
                                        bg-zinc-800
                                    "
                                >
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${Math.min(
                                                Math.max(confidence, 0),
                                                100
                                            )}%`,
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.5,
                                            ease: "easeOut",
                                        }}
                                        className="
                                            h-full
                                            rounded-full
                                            bg-gradient-to-r
                                            from-emerald-500
                                            to-cyan-400
                                        "
                                    />
                                </div>

                            </div>

                        </div>
                    </motion.div>

                    {/* Signal type */}

                    <motion.div
                        variants={fadeUp}
                        whileHover={{
                            y: -4,
                            borderColor: "rgba(34,211,238,0.35)",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        className="
                            rounded-2xl
                            border
                            border-zinc-800
                            bg-zinc-900/50
                            p-5
                        "
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    grid
                                    h-10
                                    w-10
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    border
                                    border-cyan-500/20
                                    bg-cyan-500/10
                                "
                            >
                                <Zap
                                    size={18}
                                    className="text-cyan-400"
                                />
                            </div>

                            <div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.18em]
                                        text-zinc-500
                                    "
                                >
                                    Detected Signal
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >
                                    {focusType}
                                </p>

                            </div>

                        </div>
                    </motion.div>

                </motion.div>

                {/* ================================================= */}
                {/* DETECTED SIGNAL */}
                {/* ================================================= */}

                <motion.div
                    variants={fadeUp}
                    className="
                        mt-4
                        rounded-3xl
                        border
                        border-zinc-800
                        bg-zinc-900/50
                        p-6
                        md:p-7
                    "
                >

                    <div className="flex items-start gap-4">

                        <div
                            className="
                                grid
                                h-11
                                w-11
                                shrink-0
                                place-items-center
                                rounded-xl
                                border
                                border-violet-500/20
                                bg-violet-500/10
                            "
                        >
                            <TrendingDown
                                size={20}
                                className="text-violet-400"
                            />
                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-lg font-semibold text-white">
                                    Detected Signal
                                </h3>

                                <span
                                    className="
                                        rounded-full
                                        bg-violet-500/10
                                        px-2
                                        py-1
                                        text-[10px]
                                        font-medium
                                        text-violet-300
                                    "
                                >
                                    AI Insight
                                </span>

                            </div>

                            <p className="mt-1 text-sm text-zinc-500">
                                Why your mentor selected this focus area
                            </p>

                        </div>

                    </div>

                    <motion.div
                        whileHover={{
                            backgroundColor: "rgba(24,24,27,0.8)",
                        }}
                        className="
                            mt-5
                            rounded-2xl
                            border
                            border-zinc-800/80
                            bg-zinc-950/50
                            p-5
                        "
                    >
                        <p
                            className="
                                text-sm
                                leading-7
                                text-zinc-300
                                md:text-base
                            "
                        >
                            {ai?.reason ||
                                "Your current performance data indicates this is an area worth focusing on."}
                        </p>
                    </motion.div>

                </motion.div>

                {/* ================================================= */}
                {/* RECOMMENDED PROBLEMS */}
                {/* ================================================= */}

                <motion.div
                    variants={fadeUp}
                    className="
                        mt-4
                        rounded-3xl
                        border
                        border-zinc-800
                        bg-zinc-900/50
                        p-6
                        md:p-7
                    "
                >

                    {/* Section header */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    grid
                                    h-11
                                    w-11
                                    shrink-0
                                    place-items-center
                                    rounded-xl
                                    border
                                    border-cyan-500/20
                                    bg-cyan-500/10
                                "
                            >
                                <Target
                                    size={20}
                                    className="text-cyan-400"
                                />
                            </div>

                            <div>

                                <h3 className="text-lg font-semibold text-white">
                                    Recommended Next Steps
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Problems selected from your current focus area
                                </p>

                            </div>

                        </div>

                        {mentorProblems.length > 0 && (
                            <span
                                className="
                                    self-start
                                    rounded-full
                                    border
                                    border-zinc-700
                                    bg-zinc-950
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-zinc-400
                                "
                            >
                                {mentorProblems.length}{" "}
                                {mentorProblems.length === 1
                                    ? "problem"
                                    : "problems"}
                            </span>
                        )}

                    </div>

                    {/* Problems */}

                    <motion.div
                        variants={staggerContainer}
                        className="mt-6 grid gap-3"
                    >

                        {mentorProblems.length > 0 ? (

                            mentorProblems.map((problem, index) => {
                                const completed =
        isMentorCompleted(problem.id);
return(
                                <motion.div
                                    key={problem.id}
                                    variants={fadeUp}
                                    whileHover={{
                                        y: -3,
                                        scale: 1.005,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="
                                        group
                                        flex
                                        flex-col
                                        gap-4
                                        rounded-2xl
                                        border
                                        border-zinc-800
                                        bg-zinc-950/60
                                        p-4
                                        transition-colors
                                        hover:border-violet-500/30
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                        sm:p-5
                                    "
                                >

                                    <div className="flex min-w-0 items-center gap-4">

                                        {/* Number */}

                                       <div
    className={`
        grid
        h-10
        w-10
        shrink-0
        place-items-center
        rounded-xl
        border
        ${
            completed
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-800 bg-zinc-900 text-violet-400"
        }
        text-xs
        font-bold
    `}
>
    {completed
        ? "✓"
        : String(index + 1).padStart(2, "0")}
</div>

                                        {/* Problem info */}

                                        <div className="min-w-0">

                                            <h4
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-semibold
                                                    text-white
                                                "
                                            >
                                                {problem.title}
                                            </h4>
                                             {completed && (
        <span
            className="
                shrink-0
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-2
                py-0.5
                text-[10px]
                font-medium
                text-emerald-400
            "
        >
            Completed
        </span>
    )}


                                            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">

                                                <span
                                                    className="
                                                        capitalize
                                                        text-zinc-500
                                                    "
                                                >
                                                    {problem.topic}
                                                </span>

                                                <span className="text-zinc-700">
                                                    •
                                                </span>

                                                <span
                                                    className="
                                                        capitalize
                                                        text-zinc-400
                                                    "
                                                >
                                                    {problem.difficulty}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* Solve button */}

                                  <button
    type="button"
    onClick={() => openRoadmap(problem.id)}
                                        className="
                                            inline-flex
                                            shrink-0
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            border
                                            border-violet-500/20
                                            bg-violet-600/90
                                            px-4
                                            py-2.5
                                            text-xs
                                            font-semibold
                                            text-white
                                            shadow-lg
                                            shadow-violet-900/20
                                            transition-all
                                            duration-200
                                            hover:bg-violet-500
                                            hover:shadow-violet-500/20
                                            active:scale-95
                                        "
                                    >
                                        {completed ? "Practice Again" : "Solve"}

                                        <ArrowUpRight
                                            size={15}
                                            className="
                                                transition-transform
                                                duration-200
                                                group-hover:translate-x-0.5
                                                group-hover:-translate-y-0.5
                                            "
                                        />
                                    </button>

                                </motion.div>

                                );
                            })

                        ) : (

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-zinc-800
                                    bg-zinc-950/40
                                    p-8
                                    text-center
                                "
                            >
                                <Target
                                    size={22}
                                    className="mx-auto text-zinc-700"
                                />

                                <p className="mt-3 text-sm text-zinc-500">
                                    No recommended problems available right now.
                                </p>
                            </div>

                        )}

                    </motion.div>

                    {/* View roadmap */}

                    {mentorProblems.length > 0 && (
                        <motion.button
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={openRoadmap}
                            className="
                                mt-5
                                inline-flex
                                items-center
                                gap-2
                                text-xs
                                font-medium
                                text-violet-400
                                transition-colors
                                hover:text-violet-300
                            "
                        >
                            View all recommended problems

                            <ArrowUpRight size={14} />
                        </motion.button>
                    )}

                </motion.div>

            </div>
        </motion.section>
    );
}