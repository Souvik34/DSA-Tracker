/* eslint-disable prettier/prettier */


import {
    BrainCircuit,
    Sparkles,
    ArrowRight,
    X,
    Target,
    CheckCircle2,
    TrendingUp,
    ShieldCheck,
    Zap,
    Rocket,
} from "lucide-react";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface Props {
    dashboard: any;
}

export default function InterviewReadinessCard({
    dashboard,
}: Props) {
    const [showRoadmap, setShowRoadmap] = useState(false);

    const navigate = useNavigate();

    const score = dashboard?.readiness?.score ?? 0;
    const level = dashboard?.readiness?.level ?? "Beginner";

    const solved = dashboard?.stats?.solved ?? 0;

    const aiAdvice = dashboard?.aiAdvice;
    const mentorProblems = dashboard?.mentorProblems ?? [];
const [launching, setLaunching] = useState(false);
    const roadmap = aiAdvice?.roadmap ?? [];

    const color =
        score >= 80
            ? "text-emerald-400"
            : score >= 60
                ? "text-amber-400"
                : "text-red-400";

    const ringColor =
        score >= 80
            ? "stroke-emerald-400"
            : score >= 60
                ? "stroke-amber-400"
                : "stroke-red-400";

    const circumference = 2 * Math.PI * 48;
    const progress = circumference - (score / 100) * circumference;

    useEffect(() => {
        if (!showRoadmap) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [showRoadmap]);
//   const [launching, setLaunching] = useState(false);

const handleRoadmapClick = () => {
  setLaunching(true);

  setTimeout(() => {
    setShowRoadmap(true);
    setLaunching(false);
  }, 700);
};

    const startRoadmap = () => {
        const ids = mentorProblems
            .map((problem: any) => Number(problem.id))
            .join(",");

        navigate({
            to: "/problems",
            search: {
                source: "roadmap",
                ids,
            },
        });
    };

    return (
        <>
            {/* =====================================================
                MAIN CARD
            ===================================================== */}

            <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                }}
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
                {/* Background effects */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-32
                        -top-32
                        h-80
                        w-80
                        rounded-full
                        bg-violet-600/15
                        blur-[110px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-40
                        -left-32
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

                <div className="relative p-6 md:p-8 lg:p-10">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                        <div className="max-w-2xl">

                            <motion.div
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
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
                                    font-semibold
                                    tracking-wide
                                    text-violet-300
                                "
                            >
                                <BrainCircuit className="h-3.5 w-3.5" />

                                AI Interview Analysis
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.16 }}
                                className="
                                    mt-5
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-white
                                    md:text-3xl
                                "
                            >
                                {aiAdvice?.headline ?? "Interview Readiness"}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22 }}
                                className="
                                    mt-3
                                    max-w-xl
                                    text-sm
                                    leading-6
                                    text-zinc-400
                                    md:text-base
                                "
                            >
                                AI analysis of your solving patterns,
                                revision history, difficulty balance and
                                practice consistency.
                            </motion.p>

                        </div>

                        {/* Analysis status */}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25 }}
                            className="
                                flex
                                w-fit
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-emerald-500/20
                                bg-emerald-500/5
                                px-3
                                py-1.5
                                text-xs
                                font-medium
                                text-emerald-300
                            "
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    animate-ping
                                    rounded-full
                                    bg-emerald-400
                                    opacity-60
                                />

                                <span className="
                                    relative
                                    inline-flex
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-emerald-400
                                />
                            </span>

                            Analysis active
                        </motion.div>

                    </div>

                    {/* =================================================
                        MAIN METRICS
                    ================================================= */}

                    <div className="
                        mt-8
                        grid
                        gap-4
                        lg:grid-cols-[260px_1fr]
                    ">

                        {/* READINESS SCORE */}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="
                                relative
                                flex
                                flex-col
                                items-center
                                justify-center
                                rounded-3xl
                                border
                                border-zinc-800
                                bg-zinc-900/50
                                p-6
                            "
                        >

                            <div className="relative h-32 w-32">

                                <svg
                                    className="h-full w-full -rotate-90"
                                    viewBox="0 0 112 112"
                                >
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r="48"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="7"
                                        className="text-zinc-800"
                                    />

                                    <motion.circle
                                        cx="56"
                                        cy="56"
                                        r="48"
                                        fill="none"
                                        strokeWidth="7"
                                        strokeLinecap="round"
                                        className={ringColor}
                                        stroke="currentColor"
                                        strokeDasharray={circumference}
                                        initial={{
                                            strokeDashoffset: circumference,
                                        }}
                                        animate={{
                                            strokeDashoffset: progress,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            delay: 0.35,
                                            ease: "easeOut",
                                        }}
                                    />
                                </svg>

                                <div className="
                                    absolute
                                    inset-0
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                ">
                                    <span
                                        className={`
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            ${color}
                                        `}
                                    >
                                        {score}
                                    </span>

                                    <span className="text-xs text-zinc-500">
                                        / 100
                                    </span>
                                </div>

                            </div>

                            <div className="mt-4 text-center">

                                <p className={`text-sm font-semibold ${color}`}>
                                    {level}
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-zinc-500
                                ">
                                    Interview readiness
                                </p>

                            </div>

                        </motion.div>

                        {/* AI INSIGHT */}

                        <motion.div
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                            className="
                                rounded-3xl
                                border
                                border-zinc-800
                                bg-zinc-900/50
                                p-6
                                md:p-7
                            "
                        >

                            <div className="flex items-start gap-4">

                                <div className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                ">
                                    <Sparkles
                                        className="h-5 w-5 text-violet-400"
                                    />
                                </div>

                                <div className="min-w-0">

                                    <p className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.18em]
                                        text-violet-300
                                    ">
                                        AI recommendation
                                    </p>

                                    <p className="
                                        mt-3
                                        text-base
                                        font-medium
                                        leading-7
                                        text-zinc-200
                                    ">
                                        {aiAdvice?.insight ??
                                            "Keep solving consistently and strengthen your weaker areas."}
                                    </p>

                                </div>

                            </div>

                            {/* Signal */}

                            <div className="
                                mt-6
                                rounded-2xl
                                border
                                border-zinc-800
                                bg-zinc-950/50
                                p-4
                            ">

                                <div className="flex items-center gap-2">

                                    <Target className="
                                        h-4
                                        w-4
                                        text-cyan-400
                                    " />

                                    <span className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-zinc-500
                                    ">
                                        Detected signal
                                    </span>

                                </div>

                                <p className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-zinc-400
                                ">
                                    {aiAdvice?.reason ??
                                        "Your recent solving activity is being analyzed to identify the best next step."}
                                </p>

                            </div>

                        </motion.div>

                    </div>

                    {/* =================================================
                        QUICK STATS
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="
                            mt-4
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-3
                        "
                    >

                        <Metric
                            icon={CheckCircle2}
                            label="Problems solved"
                            value={solved}
                        />

                        <Metric
                            icon={TrendingUp}
                            label="Current level"
                            value={level}
                        />

                        <Metric
                            icon={ShieldCheck}
                            label="Readiness score"
                            value={`${score}%`}
                        />

                    </motion.div>

                    {/* =================================================
                        TIP
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="
                            mt-4
                            flex
                            items-start
                            gap-4
                            rounded-2xl
                            border
                            border-violet-500/15
                            bg-violet-500/[0.045]
                            p-5
                        "
                    >

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-500/10
                        ">
                            <Zap className="h-4 w-4 text-violet-400" />
                        </div>

                        <div>

                            <p className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-violet-300
                            ">
                                Interview tip
                            </p>

                            <p className="
                                mt-1.5
                                text-sm
                                leading-6
                                text-zinc-400
                            ">
                                {aiAdvice?.tip ??
                                    "Define your approach clearly before writing code."}
                            </p>

                        </div>

                    </motion.div>

                    {/* =================================================
                        CTA
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                    >

    <Button
  className="
    relative
    mt-6
    h-12
    w-full
    overflow-hidden
    rounded-xl
    bg-violet-600
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-violet-600/10
    transition-all
    duration-300
    hover:bg-violet-500
    hover:shadow-violet-600/20
  "
  onClick={handleRoadmapClick}
  disabled={launching}
>
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    initial={false}
    animate={
      launching
        ? { x: "110%" }
        : { x: 0 }
    }
    transition={{
      duration: 0.7,
      ease: [0.85, 0.05, 1, 1],
    }}
  >
    <Sparkles className="mr-2 h-4 w-4" />
    View AI preparation roadmap
    <ArrowRight className="ml-2 h-4 w-4" />
  </motion.div>
</Button>
                    </motion.div>

                </div>

            </motion.section>


            {/* =====================================================
                ROADMAP MODAL
            ===================================================== */}

            {createPortal(
                <AnimatePresence>
                    {showRoadmap && (
                        <motion.div
                            className="
                                fixed
                                inset-0
                                z-[99999]
                                flex
                                items-center
                                justify-center
                                p-4
                            "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRoadmap(false)}
                        >

                            {/* BACKDROP */}

                            <div className="
                                absolute
                                inset-0
                                bg-black/80
                                backdrop-blur-md
                            " />

                            {/* MODAL */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 24,
                                    scale: 0.97,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 16,
                                    scale: 0.98,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                                className="
                                    relative
                                    z-10
                                    flex
                                    max-h-[88vh]
                                    w-full
                                    max-w-3xl
                                    flex-col
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-zinc-800
                                    bg-zinc-950
                                    shadow-2xl
                                    shadow-black/60
                                "
                            >

                                {/* HEADER */}

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    border-b
                                    border-zinc-800
                                    p-6
                                    md:p-7
                                ">

                                    <div className="pr-6">

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            text-violet-400
                                        ">
                                            <Sparkles className="h-4 w-4" />

                                            AI preparation roadmap
                                        </div>

                                        <h2 className="
                                            mt-3
                                            text-xl
                                            font-bold
                                            tracking-tight
                                            text-white
                                            md:text-2xl
                                        ">
                                            {aiAdvice?.headline ??
                                                "Your Interview Preparation Plan"}
                                        </h2>

                                        <p className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-zinc-400
                                        ">
                                            A focused sequence generated from
                                            your current interview profile.
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowRoadmap(false)
                                        }
                                        className="
                                            rounded-xl
                                            border
                                            border-zinc-800
                                            p-2
                                            text-zinc-500
                                            transition
                                            hover:border-zinc-700
                                            hover:bg-zinc-900
                                            hover:text-white
                                        "
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                </div>

                                {/* STATS */}

                                <div className="
                                    grid
                                    grid-cols-3
                                    border-b
                                    border-zinc-800
                                ">

                                    <ModalStat
                                        label="Readiness"
                                        value={`${score}%`}
                                        className={color}
                                    />

                                    <ModalStat
                                        label="Level"
                                        value={level}
                                    />

                                    <ModalStat
                                        label="Solved"
                                        value={solved}
                                    />

                                </div>

                                {/* ROADMAP */}

                                <div className="
                                    min-h-0
                                    flex-1
                                    overflow-y-auto
                                    p-6
                                    md:p-7
                                ">

                                    <div className="space-y-3">

                                        {roadmap.map(
                                            (
                                                item: string,
                                                index: number
                                            ) => (
                                                <motion.div
                                                    key={index}
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
                                                            0.08 * index,
                                                    }}
                                                    className="
                                                        group
                                                        flex
                                                        gap-4
                                                        rounded-2xl
                                                        border
                                                        border-zinc-800
                                                        bg-zinc-900/40
                                                        p-4
                                                        transition-all
                                                        duration-300
                                                        hover:border-violet-500/30
                                                        hover:bg-violet-500/[0.04]
                                                    "
                                                >

                                                    <div className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        border
                                                        border-violet-500/20
                                                        bg-violet-500/10
                                                        text-xs
                                                        font-bold
                                                        text-violet-400
                                                    ">
                                                        {index + 1}
                                                    </div>

                                                    <div className="pt-1">

                                                        <p className="
                                                            text-sm
                                                            leading-6
                                                            text-zinc-300
                                                        ">
                                                            {item}
                                                        </p>

                                                    </div>

                                                </motion.div>
                                            )
                                        )}

                                    </div>

                                    {/* TIP */}

                                    <div className="
                                        mt-5
                                        rounded-2xl
                                        border
                                        border-violet-500/20
                                        bg-violet-500/[0.045]
                                        p-5
                                    ">

                                        <div className="
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <CheckCircle2 className="
                                                h-4
                                                w-4
                                                text-violet-400
                                            " />

                                            <span className="
                                                text-sm
                                                font-semibold
                                                text-white
                                            ">
                                                Mentor tip
                                            </span>

                                        </div>

                                        <p className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-zinc-400
                                        ">
                                            {aiAdvice?.tip}
                                        </p>

                                    </div>

                                </div>

                                {/* FOOTER */}

                                <div className="
                                    border-t
                                    border-zinc-800
                                    p-5
                                ">

                                    <Button
                                        className="
                                            group
                                            h-11
                                            w-full
                                            rounded-xl
                                            bg-violet-600
                                            font-semibold
                                            text-white
                                            transition-all
                                            hover:bg-violet-500
                                        "
                                        onClick={startRoadmap}
                                    >
                                        Start preparation

                                        <ArrowRight className="
                                            ml-2
                                            h-4
                                            w-4
                                            transition-transform
                                            group-hover:translate-x-1
                                        " />
                                    </Button>

                                </div>

                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

        </>
    );
}


/* =========================================================
   SMALL METRIC COMPONENT
========================================================= */

function Metric({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) {
    return (
        <motion.div
            whileHover={{
                y: -2,
            }}
            transition={{
                duration: 0.2,
            }}
            className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/50
                p-4
            "
        >

            <div className="
                flex
                items-center
                gap-3
            ">

                <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-zinc-800
                ">
                    <Icon className="
                        h-4
                        w-4
                        text-zinc-400
                    " />
                </div>

                <div className="min-w-0">

                    <p className="
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-zinc-500
                    ">
                        {label}
                    </p>

                    <p className="
                        mt-0.5
                        truncate
                        text-sm
                        font-semibold
                        text-white
                    ">
                        {value}
                    </p>

                </div>

            </div>

        </motion.div>
    );
}


/* =========================================================
   MODAL STAT
========================================================= */

function ModalStat({
    label,
    value,
    className = "text-white",
}: {
    label: string;
    value: string | number;
    className?: string;
}) {
    return (
        <div className="
            border-r
            border-zinc-800
            p-4
            last:border-r-0
        ">

            <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-zinc-500
            ">
                {label}
            </p>

            <p className={`
                mt-1
                text-lg
                font-bold
                ${className}
            `}>
                {value}
            </p>

        </div>
    );
}