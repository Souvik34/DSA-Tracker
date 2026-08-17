/* eslint-disable prettier/prettier */

import {
    CheckCircle2,
    Clock3,
    ArrowRight,
    Flame,
    Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Props {
    dashboard: any;
}

const difficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
        case "easy":
            return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";

        case "medium":
            return "text-amber-400 bg-amber-400/10 border-amber-400/20";

        case "hard":
            return "text-rose-400 bg-rose-400/10 border-rose-400/20";

        default:
            return "text-zinc-400 bg-zinc-800 border-zinc-700";
    }
};

export function RecentActivity({ dashboard }: Props) {
    if (!dashboard) return null;

    const activities = dashboard.recentActivity ?? [];
    const visibleActivities = activities.slice(0, 8);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group/card
                relative
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800/80
                bg-zinc-950
                p-6
                shadow-2xl
                shadow-black/20
            "
        >
            {/* =====================================================
                AMBIENT GLOW
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    h-80
                    w-80
                    rounded-full
                    bg-violet-600/10
                    blur-[110px]
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-32
                    h-72
                    w-72
                    rounded-full
                    bg-cyan-500/[0.035]
                    blur-[100px]
                "
            />

            {/* =====================================================
                SUBTLE ANIMATED GRID
            ===================================================== */}

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -inset-16
                    opacity-[0.018]
                    [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                    [background-size:32px_32px]
                "
                animate={{
                    x: [0, 32],
                    y: [0, 32],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative z-10">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-start justify-between">

                    <div>

                        <div className="flex items-center gap-2">

                            <motion.div
                                animate={{
                                    rotate: [0, -4, 4, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Sparkles
                                    size={15}
                                    className="text-violet-400"
                                />
                            </motion.div>

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    tracking-tight
                                    text-white
                                "
                            >
                                Recent Activity
                            </h2>

                        </div>

                        <p
                            className="
                                mt-1.5
                                text-sm
                                text-zinc-500
                            "
                        >
                            Your coding journey
                        </p>

                    </div>

                    {/* Activity count */}

                    <motion.div
                        whileHover={{
                            scale: 1.04,
                        }}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-zinc-800
                            bg-zinc-900/70
                            px-3
                            py-2
                            text-xs
                            text-zinc-400
                            backdrop-blur-sm
                        "
                    >

                        <Clock3
                            size={14}
                            className="text-zinc-500"
                        />

                        <span>
                            {activities.length}
                        </span>

                    </motion.div>

                </div>

                {/* =================================================
                    STREAK BANNER
                ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
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
                        border-orange-500/10
                        bg-orange-500/[0.035]
                        px-4
                        py-3.5
                    "
                >

                    {/* Moving glow */}

                    <motion.div
                        className="
                            pointer-events-none
                            absolute
                            -left-20
                            top-0
                            h-full
                            w-32
                            bg-orange-400/10
                            blur-2xl
                        "
                        animate={{
                            x: [-30, 420],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut",
                        }}
                    />

                    <div
                        className="
                            relative
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <div className="flex items-center gap-3">

                            <motion.div
                                animate={{
                                    scale: [1, 1.08, 1],
                                    rotate: [0, -5, 5, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-orange-500/20
                                    bg-orange-500/10
                                "
                            >

                                <Flame
                                    size={19}
                                    className="text-orange-400"
                                />

                            </motion.div>

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-white
                                    "
                                >
                                    Keep the momentum
                                </p>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-zinc-500
                                    "
                                >
                                    Solve consistently to improve
                                </p>

                            </div>

                        </div>

                        <motion.div
                            animate={{
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-orange-400
                            "
                        />

                    </div>

                </motion.div>

                {/* =================================================
                    ACTIVITY LIST
                ================================================= */}

                <div
                    className="
                        mt-6
                        max-h-[390px]
                        space-y-3
                        overflow-y-auto
                        pr-1
                        scrollbar-thin
                        scrollbar-track-transparent
                        scrollbar-thumb-zinc-800
                    "
                >

                    {visibleActivities.length === 0 ? (

                        <div
                            className="
                                rounded-2xl
                                border
                                border-dashed
                                border-zinc-800
                                py-12
                                text-center
                                text-sm
                                text-zinc-500
                            "
                        >
                            No problems solved yet
                        </div>

                    ) : (

                        visibleActivities.map(
                            (item: any, index: number) => (

                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        x: -15,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    transition={{
                                        delay: 0.2 + index * 0.06,
                                        duration: 0.45,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    whileHover={{
                                        x: 3,
                                    }}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-zinc-800/80
                                        bg-zinc-900/30
                                        p-4
                                        transition-all
                                        duration-300
                                        hover:border-violet-500/25
                                        hover:bg-zinc-900/70
                                    "
                                >

                                    {/* Hover glow */}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            -right-16
                                            -top-16
                                            h-32
                                            w-32
                                            rounded-full
                                            bg-violet-500/0
                                            blur-3xl
                                            transition-all
                                            duration-500
                                            group-hover:bg-violet-500/10
                                        "
                                    />

                                    <div
                                        className="
                                            relative
                                            flex
                                            items-center
                                            gap-4
                                        "
                                    >

                                        {/* =================================================
                                            CHECK ICON
                                        ================================================= */}

                                        <motion.div
                                            whileHover={{
                                                scale: 1.08,
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
                                                border-emerald-500/20
                                                bg-emerald-500/10
                                            "
                                        >

                                            <motion.div
                                                className="
                                                    absolute
                                                    inset-0
                                                    rounded-xl
                                                    border
                                                    border-emerald-400/20
                                                "
                                                animate={{
                                                    opacity: [0, 0.5, 0],
                                                    scale: [0.8, 1.2],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    delay: index * 0.2,
                                                }}
                                            />

                                            <CheckCircle2
                                                size={18}
                                                className="
                                                    relative
                                                    text-emerald-400
                                                "
                                            />

                                        </motion.div>

                                        {/* =================================================
                                            DETAILS
                                        ================================================= */}

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
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

                                                <div className="min-w-0">

                                                    <h3
                                                        className="
                                                            truncate
                                                            text-sm
                                                            font-medium
                                                            text-white
                                                            transition-colors
                                                            duration-300
                                                            group-hover:text-violet-300
                                                        "
                                                    >
                                                        {item.title}
                                                    </h3>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            text-zinc-500
                                                        "
                                                    >
                                                        {item.topic}
                                                    </p>

                                                </div>

                                                <span
                                                    className={`
                                                        shrink-0
                                                        rounded-full
                                                        border
                                                        px-2.5
                                                        py-1
                                                        text-[11px]
                                                        font-medium
                                                        ${difficultyColor(
                                                            item.difficulty
                                                        )}
                                                    `}
                                                >
                                                    {item.difficulty}
                                                </span>

                                            </div>

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-xs
                                                    text-zinc-500
                                                "
                                            >

                                                <span>
                                                    Solved{" "}
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            item.solved_at
                                                        ),
                                                        {
                                                            addSuffix: true,
                                                        }
                                                    )}
                                                </span>

                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        x: -4,
                                                    }}
                                                    whileHover={{
                                                        opacity: 1,
                                                    }}
                                                    className="
                                                        opacity-0
                                                        transition-opacity
                                                        duration-200
                                                        group-hover:opacity-100
                                                    "
                                                >
                                                    <ArrowRight
                                                        size={14}
                                                        className="
                                                            text-violet-400
                                                        "
                                                    />
                                                </motion.div>

                                            </div>

                                        </div>

                                    </div>

                                </motion.div>

                            )
                        )

                    )}

                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}

                {activities.length > 8 && (

                    <motion.button
                        whileHover={{
                            x: 3,
                        }}
                        className="
                            mt-5
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-zinc-500
                            transition-colors
                            hover:text-violet-400
                        "
                    >

                        View complete journey

                        <ArrowRight size={15} />

                    </motion.button>

                )}

            </div>

        </motion.div>
    );
}