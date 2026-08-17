
/* eslint-disable prettier/prettier */

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import {
    Sparkles,
    ArrowRight,
    Flame,
    Target,
    Sun,
    Sunset,
    Moon,
    Sunrise,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

interface DashboardData {
    stats: {
        solved: number;
        easy: number;
        medium: number;
        hard: number;
        revisionPending: number;
        streak: number;
        longestStreak: number;
    };

    readiness: {
        score: number;
        level: string;
    };

    revision: {
        dueCount: number;
    };
}

interface Props {
    dashboard: DashboardData;
}

export function WelcomeCard({ dashboard }: Props) {
    const user = useAuthStore((s) => s.user);
    const navigate = useNavigate();

    const name = user?.name?.split(" ")[0] ?? "there";

    const hour = new Date().getHours();

    let greeting = "Welcome";
    let GreetingIcon = Sparkles;

    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
        GreetingIcon = Sunrise;
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
        GreetingIcon = Sun;
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
        GreetingIcon = Sunset;
    } else {
        greeting = "Good Night";
        GreetingIcon = Moon;
    }

    const revisionDue = dashboard.revision.dueCount;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                p-8
                md:p-9
            "
            style={{
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            {/* =====================================================
                BACKGROUND GLOW
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
                    bg-violet-600/20
                    blur-[110px]
                "
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.45, 0.65, 0.45],
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
                    h-80
                    w-80
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
          
{/* Animated subtle background grid */}
<motion.div
    className="
        pointer-events-none
        absolute
        -inset-16
        [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        [background-size:32px_32px]
    "
    initial={{
        opacity: 0.015,
    }}
    animate={{
        x: [0, 32],
        y: [0, 32],
        opacity: [0.015, 0.03, 0.015],
    }}
    transition={{
        x: {
            duration: 14,
            repeat: Infinity,
            ease: "linear",
        },
        y: {
            duration: 14,
            repeat: Infinity,
            ease: "linear",
        },
        opacity: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
        },
    }}
/>

            {/* subtle light sweep */}
            <motion.div
                className="
                    pointer-events-none
                    absolute
                    -left-1/2
                    top-0
                    h-full
                    w-1/3
                    rotate-12
                    bg-white/[0.025]
                    blur-2xl
                "
                animate={{
                    x: ["0%", "420%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                }}
            />

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                {/* =================================================
                    LEFT
                ================================================= */}

                <div className="max-w-2xl">

                    {/* Greeting badge */}

                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.5,
                        }}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-violet-300
                        "
                    >
                        <motion.span
                            animate={{
                                rotate: [0, -8, 8, 0],
                                y: [0, -1, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut",
                            }}
                        >
                            <GreetingIcon size={16} />
                        </motion.span>

                        {greeting}
                    </motion.div>

                    {/* Heading */}

                    <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.25,
                            duration: 0.65,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="
                            mt-5
                            text-4xl
                            font-bold
                            tracking-tight
                            text-white
                            md:text-5xl
                        "
                    >
                        {greeting},{" "}

                        <motion.span
                            className="
                                inline-block
                                text-violet-400
                            "
                            animate={{
                                textShadow: [
                                    "0 0 0px rgba(139,92,246,0)",
                                    "0 0 22px rgba(139,92,246,0.25)",
                                    "0 0 0px rgba(139,92,246,0)",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {name}
                        </motion.span>
                    </motion.h1>

                    {/* Description */}

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.35,
                            duration: 0.6,
                        }}
                        className="
                            mt-5
                            max-w-xl
                            text-lg
                            leading-8
                            text-zinc-400
                        "
                    >
                        You've solved{" "}

                        <span className="font-bold text-white">
                            {dashboard.stats.solved}
                        </span>{" "}

                        problems so far. Your current streak is{" "}

                        <span className="font-bold text-orange-400">
                            {dashboard.stats.streak} day
                            {dashboard.stats.streak !== 1 ? "s" : ""}
                        </span>{" "}

                        and your interview readiness is{" "}

                        <span className="font-bold text-violet-400">
                            {dashboard.readiness.level}
                        </span>.
                    </motion.p>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.45,
                            duration: 0.6,
                        }}
                        className="mt-8 flex flex-wrap gap-3"
                    >

                        {/* Resume Practice */}

                        <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    text-white
                                "
                                style={{
                                    background:
                                        "var(--gradient-primary)",
                                    boxShadow:
                                        "var(--shadow-elegant)",
                                }}
                                onClick={() =>
                                    navigate({
                                        to: "/problems",
                                    })
                                }
                            >
                                <motion.span
                                    className="relative z-10 flex items-center"
                                >
                                    Resume Practice

                                    <motion.span
                                        animate={{
                                            x: [0, 3, 0],
                                        }}
                                        transition={{
                                            duration: 1.6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <ArrowRight
                                            className="ml-2"
                                            size={18}
                                        />
                                    </motion.span>
                                </motion.span>

                                {/* hover shine */}

                                <motion.span
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-y-0
                                        -left-10
                                        w-8
                                        rotate-12
                                        bg-white/20
                                        blur-md
                                    "
                                    animate={{
                                        x: ["0%", "500%"],
                                    }}
                                    transition={{
                                        duration: 2.8,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut",
                                    }}
                                />
                            </Button>
                        </motion.div>

                        {/* Revision */}

                        <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button
                                variant="outline"
                                className="
                                    gap-2
                                    border-zinc-700
                                    bg-zinc-900/40
                                    text-zinc-200
                                    transition-all
                                    hover:border-violet-500/40
                                    hover:bg-violet-500/10
                                "
                                onClick={() =>
                                    navigate({
                                        to: "/revisions",
                                    })
                                }
                            >
                                {revisionDue > 0 ? (
                                    <>
                                        <motion.span
                                            animate={{
                                                rotate: [0, -8, 8, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 3,
                                            }}
                                        >
                                            <Target size={16} />
                                        </motion.span>

                                        Today's Revision · {revisionDue} pending
                                    </>
                                ) : (
                                    <>
                                        <motion.span
                                            animate={{
                                                scale: [1, 1.12, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <CheckCircle2 size={16} />
                                        </motion.span>

                                        Today's Revision · Done
                                    </>
                                )}
                            </Button>
                        </motion.div>

                    </motion.div>
                </div>

                {/* =================================================
                    RIGHT STATS
                ================================================= */}

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.35,
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                        grid
                        w-full
                        max-w-md
                        grid-cols-2
                        gap-4
                    "
                >

                    {/* STREAK */}

                    <StatCard
                        icon={Flame}
                        iconClass="text-orange-400"
                        value={dashboard.stats.streak}
                        label="Day Streak"
                        delay={0.1}
                        animateIcon="flame"
                    />

                    {/* READINESS */}

                    <StatCard
                        icon={Target}
                        iconClass="text-violet-400"
                        value={`${dashboard.readiness.score}%`}
                        label="Interview Ready"
                        delay={0.2}
                        animateIcon="target"
                    />

                    {/* EASY */}

                    <StatCard
                        value={dashboard.stats.easy}
                        label="Easy Solved"
                        valueClass="text-green-400"
                        delay={0.3}
                    />

                    {/* MEDIUM */}

                    <StatCard
                        value={dashboard.stats.medium}
                        label="Medium Solved"
                        valueClass="text-yellow-400"
                        delay={0.4}
                    />

                </motion.div>
            </div>
        </motion.div>
    );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    icon: Icon,
    iconClass,
    value,
    label,
    valueClass = "text-white",
    delay = 0,
    animateIcon,
}: {
    icon?: any;
    iconClass?: string;
    value: string | number;
    label: string;
    valueClass?: string;
    delay?: number;
    animateIcon?: "flame" | "target";
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 12,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                delay,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
                y: -4,
                scale: 1.015,
            }}
            className="
                group/stat
                relative
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/60
                p-5
                transition-colors
                duration-300
                hover:border-zinc-700
            "
        >
            {/* Hover glow */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-20
                    w-20
                    rounded-full
                    bg-violet-500/0
                    blur-2xl
                    transition-all
                    duration-500
                    group-hover/stat:bg-violet-500/10
                "
            />

            {Icon && (
                <motion.div
                    animate={
                        animateIcon === "flame"
                            ? {
                                  y: [0, -2, 0],
                                  rotate: [0, -3, 3, 0],
                              }
                            : animateIcon === "target"
                              ? {
                                    scale: [1, 1.06, 1],
                                  }
                              : undefined
                    }
                    transition={
                        animateIcon
                            ? {
                                  duration:
                                      animateIcon === "flame"
                                          ? 2.2
                                          : 2.8,
                                  repeat: Infinity,
                                  repeatDelay: 2,
                                  ease: "easeInOut",
                              }
                            : undefined
                    }
                    className="relative"
                >
                    <Icon
                        className={iconClass}
                        size={26}
                    />
                </motion.div>
            )}

            <motion.div
                className={`relative mt-4 text-3xl font-bold ${valueClass}`}
                whileHover={{ x: 2 }}
            >
                {value}
            </motion.div>

            <div className="relative mt-1 text-sm text-zinc-400">
                {label}
            </div>
        </motion.div>
    );
}
