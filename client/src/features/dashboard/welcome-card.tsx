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
} from "lucide-react";

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

    const name =
        user?.name?.split(" ")[0] ?? "there";
        const hour = new Date().getHours();

let greeting = "Welcome";
let GreetingIcon = Sparkles;

if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
    GreetingIcon = Sunrise;
}
else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
    GreetingIcon = Sun;
}
else if (hour >= 17 && hour < 21) {
    greeting = "Good Evening";
    GreetingIcon = Sunset;
}
else {
    greeting = "Good Night";
    GreetingIcon = Moon;
}

    return (
        <div
            className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-zinc-800
            p-8
            "
            style={{
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            {/* Background Glow */}
            <div
                className="
                absolute
                inset-0
                opacity-50
                pointer-events-none
                "
                style={{
                    background: "var(--gradient-glow)",
                }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                {/* LEFT */}
                <div className="max-w-2xl">

                <div
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

<GreetingIcon
size={16}
/>

{greeting}

</div>
<h1 className="text-5xl font-bold tracking-tight">

{greeting},

<span className="text-violet-400">

{" "}

{name}

</span>

</h1>

                    <p
                        className="
                        mt-5
                        text-lg
                        text-zinc-400
                        leading-8
                        "
                    >
                        You've solved

                        <span className="font-bold text-white">
                            {" "}
                            {dashboard.stats.solved}
                        </span>

                        {" "}problems so far.

                        Your current streak is

                        <span className="font-bold text-orange-400">
                            {" "}
                            {dashboard.stats.streak} day
                        </span>

                        {" "}and your interview readiness is

                        <span className="font-bold text-violet-400">
                            {" "}
                            {dashboard.readiness.level}
                        </span>.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">

                        <Button
                            className="text-white"
                            style={{
                                background: "var(--gradient-primary)",
                                boxShadow: "var(--shadow-elegant)",
                            }}
                        >
                            Resume Practice

                            <ArrowRight
                                className="ml-2"
                                size={18}
                            />

                        </Button>

                        <Button variant="outline">

                            Revision (
                            {dashboard.revision.dueCount}
                            )

                        </Button>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">

                    <div className="rounded-2xl bg-zinc-900/60 p-5 border border-zinc-800">

                        <Flame
                            className="text-orange-400"
                            size={26}
                        />

                        <div className="mt-4 text-3xl font-bold">

                            {dashboard.stats.streak}

                        </div>

                        <div className="text-sm text-zinc-400">

                            Day Streak

                        </div>

                    </div>

                    <div className="rounded-2xl bg-zinc-900/60 p-5 border border-zinc-800">

                        <Target
                            className="text-violet-400"
                            size={26}
                        />

                        <div className="mt-4 text-3xl font-bold">

                            {dashboard.readiness.score}%

                        </div>

                        <div className="text-sm text-zinc-400">

                            Interview Ready

                        </div>

                    </div>

                    <div className="rounded-2xl bg-zinc-900/60 p-5 border border-zinc-800">

                        <div className="text-3xl font-bold text-green-400">

                            {dashboard.stats.easy}

                        </div>

                        <div className="text-sm text-zinc-400">

                            Easy Solved

                        </div>

                    </div>

                    <div className="rounded-2xl bg-zinc-900/60 p-5 border border-zinc-800">

                        <div className="text-3xl font-bold text-yellow-400">

                            {dashboard.stats.medium}

                        </div>

                        <div className="text-sm text-zinc-400">

                            Medium Solved

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}