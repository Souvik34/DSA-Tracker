/* eslint-disable prettier/prettier */

import { motion } from "framer-motion";
import {
    TrendingUp,
    Trophy,
    CircleCheckBig,
    AlertCircle,
    ShieldAlert,
} from "lucide-react";

interface Props {
    title: string;
    score: number;
}

export default function ScoreCard({
    title,
    score,
}: Props) {
    const safeScore = Math.min(Math.max(Number(score) || 0, 0), 5);

    const percent = Math.round((safeScore / 5) * 100);

    let color = "#ef4444";
    let badge = "Needs Work";
    let badgeIcon = <AlertCircle size={16} />;
    let gradient =
        "from-red-500/[0.12] via-zinc-950 to-black";
    let glow = "shadow-red-500/10";

    if (safeScore >= 4) {
        color = "#22c55e";
        badge = "Strong";
        badgeIcon = <Trophy size={16} />;
        gradient =
            "from-emerald-500/[0.14] via-zinc-950 to-black";
        glow = "shadow-emerald-500/10";
    } else if (safeScore >= 3) {
        color = "#3b82f6";
        badge = "Good";
        badgeIcon = <CircleCheckBig size={16} />;
        gradient =
            "from-blue-500/[0.14] via-zinc-950 to-black";
        glow = "shadow-blue-500/10";
    } else if (safeScore >= 2) {
        color = "#f59e0b";
        badge = "Borderline";
        badgeIcon = <ShieldAlert size={16} />;
        gradient =
            "from-amber-500/[0.14] via-zinc-950 to-black";
        glow = "shadow-amber-500/10";
    }

    const radius = 46;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (percent / 100) * circumference;

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
            whileHover={{
                y: -5,
            }}
            transition={{
                duration: 0.45,
            }}
            className={`
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-zinc-800/80
                bg-gradient-to-br
                ${gradient}
                p-6
                shadow-2xl
                ${glow}
                backdrop-blur-xl
            `}
        >
            {/* Ambient glow */}
            <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-20"
                style={{
                    backgroundColor: color,
                }}
            />

            {/* Top line */}
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        {title}
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                        AI Evaluation
                    </p>
                </div>

                <div
                    className="rounded-xl border border-zinc-800 bg-black/40 p-2"
                >
                    <TrendingUp
                        size={17}
                        className="text-violet-400"
                    />
                </div>
            </div>

            {/* Main score */}
            <div className="relative mt-7 flex items-center justify-between gap-5">
                <div>
                    <div className="flex items-baseline gap-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-5xl font-black tracking-tight text-white"
                        >
                            {safeScore}
                        </motion.span>

                        <span className="text-sm font-semibold text-zinc-600">
                            / 5
                        </span>
                    </div>

                    <div
                        className="mt-3 flex items-center gap-2 text-sm font-semibold"
                        style={{
                            color,
                        }}
                    >
                        {badgeIcon}
                        {badge}
                    </div>
                </div>

                {/* Circular score */}
                <div className="relative shrink-0">
                    <svg
                        width="116"
                        height="116"
                        viewBox="0 0 116 116"
                        className="-rotate-90"
                    >
                        <circle
                            cx="58"
                            cy="58"
                            r={radius}
                            stroke="#27272a"
                            strokeWidth="8"
                            fill="none"
                        />

                        <motion.circle
                            cx="58"
                            cy="58"
                            r={radius}
                            stroke={color}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{
                                strokeDashoffset: circumference,
                            }}
                            animate={{
                                strokeDashoffset: offset,
                            }}
                            transition={{
                                duration: 1.1,
                                ease: "easeOut",
                            }}
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-white">
                            {percent}%
                        </span>

                        <span className="text-[9px] uppercase tracking-widest text-zinc-600">
                            score
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom metric */}
            <div className="relative mt-7 border-t border-zinc-800/80 pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                        Performance
                    </span>

                    <span
                        className="text-xs font-semibold"
                        style={{
                            color,
                        }}
                    >
                        {percent}/100
                    </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-900">
                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: `${percent}%`,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                        }}
                        className="h-full rounded-full"
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 12px ${color}`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}