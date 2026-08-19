/* eslint-disable prettier/prettier */

import {
    Binary,
    GitBranch,
    Network,
    Layers,
    CheckCircle2,
    Brain,
    TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

import type { LucideIcon } from "lucide-react";

interface TopicCard {
    topic: string;
    solved: number;
    icon: LucideIcon;
    tint: string;
}

const ICONS: Record<string, LucideIcon> = {
    array: Layers,
    "binary search": Binary,
    "two pointers": Network,
    stack: GitBranch,
    graph: Network,
    tree: Network,
    dp: GitBranch,
};

const COLORS = [
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
];

interface ProgressCardsProps {
    dashboard: any;
}

export function ProgressCards({
    dashboard,
}: ProgressCardsProps) {
    if (!dashboard) return null;

    const cards: TopicCard[] =
        dashboard.strongTopics
            ?.slice(0, 6)
            .map((t: any, index: number) => ({
                topic: t.topic,
                solved: Number(t.solved),
                icon:
                    ICONS[t.topic?.toLowerCase()] ??
                    Layers,
                tint:
                    COLORS[index % COLORS.length],
            })) ?? [];

    const totalSolved =
        Number(dashboard.stats?.solved) || 1;

    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 18,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.11]
                bg-zinc-950/90
                shadow-[0_20px_70px_rgba(0,0,0,0.28)]
            "
        >
            {/* TOP EDGE LIGHT */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                "
            />

            {/* AMBIENT GLOW */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-72
                    w-72
                    rounded-full
                    bg-violet-600/[0.055]
                    blur-[100px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-32
                    h-64
                    w-64
                    rounded-full
                    bg-blue-500/[0.035]
                    blur-[100px]
                "
            />

            {/* CONTENT */}

            <div className="relative z-10 p-5">

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/[0.09]
                        pb-4
                    "
                >

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-violet-400/20
                                bg-violet-500/10
                            "
                        >
                            <TrendingUp
                                size={17}
                                className="text-violet-400"
                            />
                        </div>

                        <div>

                            <h2
                                className="
                                    text-[15px]
                                    font-semibold
                                    tracking-tight
                                    text-white
                                "
                            >
                                Topic Progress
                            </h2>

                            <p
                                className="
                                    mt-0.5
                                    text-[11px]
                                    text-zinc-500
                                "
                            >
                                Your strongest areas
                            </p>

                        </div>

                    </div>

                    <div
                        className="
                            rounded-full
                            border
                            border-white/[0.10]
                            bg-white/[0.035]
                            px-2.5
                            py-1
                            text-[10px]
                            font-medium
                            text-zinc-400
                        "
                    >
                        {cards.length} topics
                    </div>

                </div>

                {/* TOPICS */}

                <div
                    className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-2.5
                        sm:grid-cols-2
                    "
                >

                    {cards.map((card, index) => {

                        const pct = Math.min(
                            Math.round(
                                (card.solved /
                                    totalSolved) *
                                    100
                            ),
                            100
                        );

                        const level =
                            pct >= 35
                                ? "Master"
                                : pct >= 20
                                  ? "Strong"
                                  : pct >= 10
                                    ? "Growing"
                                    : "Practice";

                        const isWeak =
                            dashboard.weakTopic
                                ?.toLowerCase() ===
                            card.topic?.toLowerCase();

                        return (
                            <motion.div
                                key={card.topic}
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay:
                                        index * 0.06,
                                    duration: 0.4,
                                }}
                                whileHover={{
                                    y: -2,
                                }}
                                className="
                                    group/topic
                                    relative
                                    overflow-hidden
                                    rounded-xl
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.018]
                                    p-3.5
                                    transition-all
                                    duration-300
                                    hover:border-white/[0.16]
                                    hover:bg-white/[0.035]
                                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.22)]
                                "
                            >

                                {/* TOPIC GLOW */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -right-10
                                        -top-10
                                        h-24
                                        w-24
                                        rounded-full
                                        opacity-0
                                        blur-3xl
                                        transition-opacity
                                        duration-500
                                        group-hover/topic:opacity-30
                                    "
                                    style={{
                                        background:
                                            card.tint,
                                    }}
                                />

                                <div
                                    className="
                                        relative
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    {/* ICON */}

                                    <motion.div
                                        whileHover={{
                                            scale: 1.08,
                                            rotate: 4,
                                        }}
                                        className="
                                            relative
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                        "
                                        style={{
                                            borderColor:
                                                `${card.tint}35`,
                                            background:
                                                `${card.tint}12`,
                                        }}
                                    >

                                        <div
                                            className="
                                                absolute
                                                inset-[-4px]
                                                rounded-xl
                                                border
                                                opacity-0
                                                transition-all
                                                duration-300
                                                group-hover/topic:inset-[-2px]
                                                group-hover/topic:opacity-100
                                            "
                                            style={{
                                                borderColor:
                                                    `${card.tint}25`,
                                            }}
                                        />

                                        <card.icon
                                            size={18}
                                            style={{
                                                color:
                                                    card.tint,
                                            }}
                                        />

                                    </motion.div>

                                    {/* INFO */}

                                    <div className="min-w-0 flex-1">

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-2
                                            "
                                        >

                                            <p
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-semibold
                                                    capitalize
                                                    text-white
                                                "
                                            >
                                                {card.topic}
                                            </p>

                                            {isWeak && (
                                                <span
                                                    className="
                                                        flex
                                                        shrink-0
                                                        items-center
                                                        gap-1
                                                        rounded-full
                                                        border
                                                        border-red-400/15
                                                        bg-red-400/[0.07]
                                                        px-1.5
                                                        py-0.5
                                                        text-[8px]
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        text-red-400
                                                    "
                                                >
                                                    <Brain
                                                        size={9}
                                                    />
                                                    Focus
                                                </span>
                                            )}

                                        </div>

                                        <div
                                            className="
                                                mt-1
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <span
                                                className="
                                                    text-[11px]
                                                    text-zinc-500
                                                "
                                            >
                                                {card.solved} solved
                                            </span>

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-medium
                                                "
                                                style={{
                                                    color:
                                                        card.tint,
                                                }}
                                            >
                                                {level}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* PROGRESS */}

                                <div className="mt-3">

                                    <div
                                        className="
                                            h-1
                                            overflow-hidden
                                            rounded-full
                                            bg-white/[0.06]
                                        "
                                    >

                                        <motion.div
                                            initial={{
                                                width: 0,
                                            }}
                                            animate={{
                                                width: `${pct}%`,
                                            }}
                                            transition={{
                                                duration: 1,
                                                delay:
                                                    0.15 +
                                                    index *
                                                        0.08,
                                                ease: "easeOut",
                                            }}
                                            className="relative h-full rounded-full"
                                            style={{
                                                background:
                                                    card.tint,
                                            }}
                                        >

                                            <motion.div
                                                animate={{
                                                    x: [
                                                        "-100%",
                                                        "200%",
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat:
                                                        Infinity,
                                                    repeatDelay: 3,
                                                    ease: "linear",
                                                }}
                                                className="
                                                    absolute
                                                    inset-y-0
                                                    w-1/2
                                                    bg-white/30
                                                    blur-sm
                                                "
                                            />

                                        </motion.div>

                                    </div>

                                </div>

                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </motion.section>
    );
}