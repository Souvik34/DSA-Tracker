/* eslint-disable prettier/prettier */

import { motion } from "framer-motion";
import {
    TrendingUp,
    Trophy,
    CircleCheckBig,
    AlertCircle
} from "lucide-react";

interface Props {
    title: string;
    score: number;
}

export default function ScoreCard({
    title,
    score
}: Props) {

    const percent = Math.min(Math.max(score, 0), 100);

    let color = "#22c55e";
    let badge = "Excellent";
    let bg = "from-emerald-500/20 to-emerald-700/10";

    if (score < 90) {
        color = "#3b82f6";
        badge = "Good";
        bg = "from-blue-500/20 to-blue-700/10";
    }

    if (score < 75) {
        color = "#facc15";
        badge = "Average";
        bg = "from-yellow-500/20 to-yellow-700/10";
    }

    if (score < 60) {
        color = "#ef4444";
        badge = "Needs Work";
        bg = "from-red-500/20 to-red-700/10";
    }

    const radius = 44;
    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        (percent / 100) * circumference;

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 25
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: .45
            }}

            whileHover={{
                y: -6,
                scale: 1.02
            }}

            className={`
            relative
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            bg-gradient-to-br
            ${bg}
            backdrop-blur-xl
            p-6
            shadow-xl
        `}
        >

            <div className="absolute right-5 top-5">

                <TrendingUp
                    className="text-violet-400"
                    size={20}
                />

            </div>

            <p
                className="
                text-zinc-400
                uppercase
                tracking-widest
                text-xs
            "
            >

                {title}

            </p>

            <div
                className="
                mt-6
                flex
                items-center
                justify-between
            "
            >

                <div>

                    <motion.h2

                        initial={{
                            opacity: 0
                        }}

                        animate={{
                            opacity: 1
                        }}

                        className="
                        text-5xl
                        font-black
                        leading-none
                    "
                    >

                        {score}

                    </motion.h2>

                    <p
                        className="
                        mt-3
                        text-sm
                        font-semibold
                    "
                        style={{
                            color
                        }}
                    >

                        {badge}

                    </p>

                </div>

                <div className="relative">

                    <svg
                        width="110"
                        height="110"
                    >

                        <circle

                            cx="55"

                            cy="55"

                            r={radius}

                            stroke="#27272a"

                            strokeWidth="9"

                            fill="none"

                        />

                        <motion.circle

                            cx="55"

                            cy="55"

                            r={radius}

                            stroke={color}

                            strokeWidth="9"

                            fill="none"

                            strokeLinecap="round"

                            strokeDasharray={circumference}

                            initial={{
                                strokeDashoffset: circumference
                            }}

                            animate={{
                                strokeDashoffset: offset
                            }}

                            transition={{
                                duration: 1.2
                            }}

                            transform="rotate(-90 55 55)"

                        />

                    </svg>

                    <div
                        className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        text-xl
                        font-bold
                    "
                    >

                        {percent}%

                    </div>

                </div>

            </div>

            <div
                className="
                mt-7
                flex
                items-center
                justify-between
                border-t
                border-zinc-800
                pt-4
            "
            >

                <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-zinc-400
                    text-sm
                "
                >

                    {

                        score >= 90 ?

                            <Trophy
                                size={16}
                                className="text-yellow-400"
                            />

                            :

                            score >= 70 ?

                                <CircleCheckBig
                                    size={16}
                                    className="text-green-400"
                                />

                                :

                                <AlertCircle
                                    size={16}
                                    className="text-orange-400"
                                />

                    }

                    Performance

                </div>

                <span
                    className="
                    text-xs
                    text-zinc-500
                "
                >

                    AI Evaluation

                </span>

            </div>

        </motion.div>

    );

}