/* eslint-disable prettier/prettier */

import {
    CheckCircle2,
    Clock3,
    ArrowRight,
    Flame,
    Sparkles,
    Activity,
} from "lucide-react";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Props {
    dashboard: any;
}

const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
        case "easy":
            return "text-emerald-300 bg-emerald-400/10 border-emerald-400/25";

        case "medium":
            return "text-amber-300 bg-amber-400/10 border-amber-400/25";

        case "hard":
            return "text-rose-300 bg-rose-400/10 border-rose-400/25";

        default:
            return "text-white bg-white/[0.05] border-white/10";
    }
};

export function RecentActivity({ dashboard }: Props) {
    if (!dashboard) return null;

    const activities = dashboard.recentActivity ?? [];
    const visibleActivities = activities.slice(0, 8);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group/card
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/[0.13]
                bg-[#080808]
                p-6
                shadow-[0_24px_80px_rgba(0,0,0,0.45)]
                transition-all
                duration-500
                hover:border-white/[0.20]
            "
        >
            {/* =====================================================
                AMBIENT BACKGROUND
            ===================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-80
                    w-80
                    rounded-full
                    bg-violet-600/[0.10]
                    blur-[120px]
                "
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-32
                    h-72
                    w-72
                    rounded-full
                    bg-blue-500/[0.055]
                    blur-[110px]
                "
                animate={{
                    x: [-10, 25, -10],
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* =====================================================
                SUBTLE MOVING GRID
            ===================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -inset-20
                    opacity-[0.025]
                    [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                    [background-size:36px_36px]
                "
                animate={{
                    x: [0, 36],
                    y: [0, 36],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* =====================================================
                TOP BORDER LIGHT
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-[10%]
                    right-[10%]
                    top-0
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                "
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative z-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-4
                    "
                >
                    <div>

                        {/* TITLE ROW */}

                        <div className="flex items-center gap-2.5">

                            <motion.div
                                animate={{
                                    rotate: [0, -6, 6, 0],
                                    scale: [1, 1.08, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-violet-400/20
                                    bg-violet-500/10
                                "
                            >
                                <Sparkles
                                    size={15}
                                    className="text-violet-300"
                                />
                            </motion.div>

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-[-0.03em]
                                    text-white
                                "
                            >
                                Recent Activity
                            </h2>

                        </div>

                        <p
                            className="
                                mt-2
                                text-sm
                                font-medium
                                text-zinc-300
                            "
                        >
                            Your latest coding progress
                        </p>

                    </div>

                    {/* =================================================
                        RIGHT SIDE STATUS
                    ================================================= */}

                    <div className="flex items-center gap-2">

                        {/* LIVE INDICATOR */}

                        <motion.div
                            whileHover={{
                                scale: 1.04,
                            }}
                            className="
                                hidden
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/[0.12]
                                bg-white/[0.04]
                                px-3
                                py-2
                                sm:flex
                            "
                        >

                            <motion.span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-emerald-400
                                "
                                animate={{
                                    opacity: [0.35, 1, 0.35],
                                    scale: [0.85, 1.15, 0.85],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                }}
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-white
                                "
                            >
                                Active
                            </span>

                        </motion.div>

                        {/* COUNT */}

                        <motion.div
                            whileHover={{
                                y: -2,
                                scale: 1.04,
                            }}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/[0.14]
                                bg-white/[0.045]
                                px-3.5
                                py-2
                                shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                            "
                        >

                            <Activity
                                size={14}
                                className="text-violet-300"
                            />

                            <motion.span
                                key={activities.length}
                                initial={{
                                    opacity: 0,
                                    y: -4,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                className="
                                    text-sm
                                    font-bold
                                    text-white
                                "
                            >
                                {activities.length}
                            </motion.span>

                        </motion.div>

                    </div>
                </div>

                {/* =================================================
                    MOMENTUM STRIP
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.98,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}
                    transition={{
                        delay: 0.15,
                        duration: 0.5,
                    }}
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-orange-400/[0.16]
                        bg-gradient-to-r
                        from-orange-500/[0.08]
                        via-orange-500/[0.035]
                        to-transparent
                        px-4
                        py-3
                    "
                >

                    {/* Animated light */}

                    <motion.div
                        className="
                            pointer-events-none
                            absolute
                            -left-24
                            top-0
                            h-full
                            w-24
                            bg-orange-300/10
                            blur-xl
                        "
                        animate={{
                            x: [-20, 500],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "easeInOut",
                        }}
                    />

                    <div
                        className="
                            relative
                            flex
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <div className="flex items-center gap-3">

                            <motion.div
                                animate={{
                                    scale: [1, 1.08, 1],
                                    rotate: [0, -4, 4, 0],
                                }}
                                transition={{
                                    duration: 2.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-orange-400/20
                                    bg-orange-400/10
                                "
                            >
                                <Flame
                                    size={17}
                                    className="text-orange-300"
                                />
                            </motion.div>

                            <div>
                                <p
                                    className="
                                        text-sm
                                        font-bold
                                        text-white
                                    "
                                >
                                    Keep the momentum
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        font-medium
                                        text-zinc-300
                                    "
                                >
                                    Consistency compounds.
                                </p>
                            </div>

                        </div>

                        <motion.div
                            animate={{
                                opacity: [0.35, 1, 0.35],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-orange-300
                                shadow-[0_0_10px_rgba(251,146,60,0.8)]
                            "
                        />

                    </div>

                </motion.div>

                {/* =================================================
                    ACTIVITY TIMELINE
                ================================================= */}

                <div
                    className="
                        mt-6
                        max-h-[410px]
                        overflow-y-auto
                        pr-1
                        scrollbar-thin
                        scrollbar-track-transparent
                        scrollbar-thumb-white/10
                    "
                >

                    {visibleActivities.length === 0 ? (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                flex
                                min-h-[260px]
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-dashed
                                border-white/[0.12]
                                bg-white/[0.015]
                                text-center
                            "
                        >

                            <div
                                className="
                                    mb-4
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-white/[0.12]
                                    bg-white/[0.04]
                                "
                            >
                                <Clock3
                                    size={23}
                                    className="text-white"
                                />
                            </div>

                            <p
                                className="
                                    text-base
                                    font-bold
                                    text-white
                                "
                            >
                                No activity yet
                            </p>

                            <p
                                className="
                                    mt-1.5
                                    max-w-[220px]
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                "
                            >
                                Solve your first problem and start
                                building your coding streak.
                            </p>

                        </motion.div>

                    ) : (

                        <div className="relative">

                            {/* Timeline line */}

                            <div
                                className="
                                    absolute
                                    bottom-5
                                    left-[19px]
                                    top-5
                                    w-px
                                    bg-gradient-to-b
                                    from-emerald-400/40
                                    via-white/10
                                    to-transparent
                                "
                            />

                            <div className="space-y-2">

                                {visibleActivities.map(
                                    (item: any, index: number) => (

                                        <motion.div
                                            key={`${item.title}-${item.solved_at}-${index}`}
                                            initial={{
                                                opacity: 0,
                                                x: -18,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    0.18 +
                                                    index * 0.065,
                                                duration: 0.45,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1,
                                                ],
                                            }}
                                            whileHover={{
                                                x: 4,
                                            }}
                                            className="
                                                group
                                                relative
                                                rounded-2xl
                                                border
                                                border-transparent
                                                p-2
                                                transition-all
                                                duration-300
                                                hover:border-white/[0.10]
                                                hover:bg-white/[0.035]
                                            "
                                        >

                                            <div
                                                className="
                                                    relative
                                                    flex
                                                    items-center
                                                    gap-3
                                                "
                                            >

                                                {/* =================================================
                                                    TIMELINE ICON
                                                ================================================= */}

                                                <div
                                                    className="
                                                        relative
                                                        z-10
                                                        flex
                                                        h-9
                                                        w-9
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        border
                                                        border-emerald-400/25
                                                        bg-[#090909]
                                                        shadow-[0_0_0_4px_#080808]
                                                    "
                                                >

                                                    <motion.div
                                                        animate={{
                                                            scale: [
                                                                1,
                                                                1.18,
                                                                1,
                                                            ],
                                                            opacity: [
                                                                0.7,
                                                                1,
                                                                0.7,
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration: 2.5,
                                                            repeat: Infinity,
                                                            delay:
                                                                index *
                                                                0.15,
                                                        }}
                                                    >
                                                        <CheckCircle2
                                                            size={17}
                                                            className="
                                                                text-emerald-300
                                                            "
                                                        />
                                                    </motion.div>

                                                </div>

                                                {/* =================================================
                                                    ACTIVITY CONTENT
                                                ================================================= */}

                                                <div
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                        py-1
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            gap-3
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                min-w-0
                                                            "
                                                        >

                                                            <h3
                                                                className="
                                                                    truncate
                                                                    text-sm
                                                                    font-bold
                                                                    text-white
                                                                    transition-colors
                                                                    duration-300
                                                                    group-hover:text-violet-200
                                                                "
                                                            >
                                                                {
                                                                    item.title
                                                                }
                                                            </h3>

                                                            <div
                                                                className="
                                                                    mt-1
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                "
                                                            >

                                                                <span
                                                                    className="
                                                                        truncate
                                                                        text-xs
                                                                        font-semibold
                                                                        text-zinc-300
                                                                    "
                                                                >
                                                                    {
                                                                        item.topic
                                                                    }
                                                                </span>

                                                                <span
                                                                    className="
                                                                        h-1
                                                                        w-1
                                                                        shrink-0
                                                                        rounded-full
                                                                        bg-zinc-500
                                                                    "
                                                                />

                                                                <span
                                                                    className="
                                                                        shrink-0
                                                                        text-xs
                                                                        font-medium
                                                                        text-zinc-400
                                                                    "
                                                                >
                                                                    {formatDistanceToNow(
                                                                        new Date(
                                                                            item.solved_at
                                                                        ),
                                                                        {
                                                                            addSuffix:
                                                                                true,
                                                                        }
                                                                    )}
                                                                </span>

                                                            </div>

                                                        </div>

                                                        {/* DIFFICULTY */}

                                                        <span
                                                            className={`
                                                                shrink-0
                                                                rounded-full
                                                                border
                                                                px-2.5
                                                                py-1
                                                                text-[10px]
                                                                font-bold
                                                                uppercase
                                                                tracking-wide
                                                                ${difficultyColor(
                                                                    item.difficulty
                                                                )}
                                                            `}
                                                        >
                                                            {
                                                                item.difficulty
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                                {/* ARROW */}

                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        x: -5,
                                                    }}
                                                    className="
                                                        hidden
                                                        shrink-0
                                                        sm:block
                                                        opacity-0
                                                        transition-all
                                                        duration-300
                                                        group-hover:translate-x-1
                                                        group-hover:opacity-100
                                                    "
                                                >
                                                    <ArrowRight
                                                        size={15}
                                                        className="
                                                            text-violet-300
                                                        "
                                                    />
                                                </motion.div>

                                            </div>

                                        </motion.div>

                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                {activities.length > 8 && (

                    <motion.button
                        whileHover={{
                            x: 4,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-white/[0.10]
                            bg-white/[0.025]
                            px-3.5
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition-all
                            duration-300
                            hover:border-violet-400/30
                            hover:bg-violet-500/[0.06]
                        "
                    >
                        View complete journey

                        <ArrowRight
                            size={15}
                            className="
                                text-violet-300
                            "
                        />
                    </motion.button>

                )}

            </div>
        </motion.div>
    );
}