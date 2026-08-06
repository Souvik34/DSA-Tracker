/* eslint-disable prettier/prettier */
import {
    BrainCircuit,
    Sparkles,

} from "lucide-react";
import {
    Activity,
    TrendingDown,
    Target,
    ExternalLink,
    Flame,
} from "lucide-react";

import { motion } from "framer-motion";

import { DashboardData } from "@/types/dashboard";

interface Props {
    dashboard: DashboardData | null;
}

export default function AIMentorCard({
    dashboard,
}: Props) {

    if (!dashboard) return null;

   const recommendation =
dashboard.recommendation ?? {};

const ai =
dashboard.aiAdvice ?? {};

const focus =
dashboard.profile?.focusTopic ?? {};
    console.log("Dashboard", dashboard);
console.log("AI", dashboard?.aiAdvice);
console.log("Recommendation", dashboard?.recommendation);
console.log("Profile", dashboard?.profile);

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 24,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}

            className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-zinc-800
            bg-zinc-950
            mt-8
            shadow-2xl
            shadow-black/40
            "
        >

            {/* Animated background glow */}

            <div
                className="
                absolute
                -right-20
                -top-20
                h-72
                w-72
                rounded-full
                bg-violet-600/20
                blur-[120px]
                animate-pulse
                "
            />

            <div
                className="
                absolute
                -left-20
                bottom-0
                h-64
                w-64
                rounded-full
                bg-cyan-500/10
                blur-[100px]
                "
            />

            {/* Subtle grid overlay */}

            <div
                className="
                absolute
                inset-0
                opacity-[0.04]
                [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
                [background-size:32px_32px]
                "
            />

            <div className="relative p-8">

                {/* Top Row */}

                <div className="flex items-start justify-between gap-4 flex-wrap">

                    <div>

                        <motion.div

                            initial={{
                                opacity: 0,
                                x: -12,
                            }}

                            animate={{
                                opacity: 1,
                                x: 0,
                            }}

                            transition={{
                                delay: 0.1,
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
                            text-violet-300
                            text-sm
                            font-medium
                            backdrop-blur-sm
                            "
                        >

                            <BrainCircuit size={16}/>

                            Interview Intelligence

                        </motion.div>

                        <motion.h2

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
                            }}

                            className="
                            mt-6
                            text-4xl
                            md:text-5xl
                            font-black
                            tracking-tight
                            text-white
                            leading-tight
                            "
                        >

                            {ai?.headline || recommendation?.title}

                        </motion.h2>

                        <motion.p

                            initial={{
                                opacity: 0,
                                y: 10,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            transition={{
                                delay: 0.22,
                            }}

                            className="
                            mt-4
                            max-w-2xl
                            text-lg
                            md:text-xl
                            text-zinc-300
                            leading-relaxed
                            "
                        >

                            {ai?.insight || recommendation?.summary}

                        </motion.p>

                    </div>

                    {/* Live chip */}

                    <motion.div

                        initial={{
                            opacity: 0,
                            scale: 0.9,
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}

                        transition={{
                            delay: 0.25,
                        }}

                        className="
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-zinc-700
                        bg-zinc-900/80
                        px-4
                        py-2
                        text-sm
                        text-zinc-300
                        backdrop-blur-sm
                        "
                    >

                        <span className="relative flex h-2.5 w-2.5">

                            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"/>

                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"/>

                        </span>

                        Live Analysis

                    </motion.div>
                   

                </div>

                {/* Signal + Confidence Row */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 16,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        delay: 0.35,
                    }}

                    className="
                    mt-8
                    flex
                    flex-wrap
                    items-center
                    gap-3
                    "
                >

                    <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-violet-500/10
                        px-4
                        py-3
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-violet-400/40
                        hover:bg-violet-500/15
                        hover:shadow-lg
                        hover:shadow-violet-500/10
                        "
                    >

                        <Sparkles className="text-violet-300" size={18}/>

                        <div>

                            <p className="text-[11px] uppercase tracking-[0.18em] text-violet-200/80">

                                Focus Area

                            </p>

                            <p className="text-sm font-semibold text-white capitalize">

                                {recommendation?.priority}

                            </p>

                        </div>

                    </div>

                    <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-2xl
                        border
                        border-zinc-700
                        bg-zinc-900/80
                        px-4
                        py-3
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-zinc-500
                        hover:bg-zinc-900
                        "
                    >

                        <Activity className="text-emerald-300" size={18}/>

                        <div>

                            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400">

                                Confidence

                            </p>

                            <p className="text-sm font-semibold text-white">

                                {focus?.confidence ?? recommendation?.confidence ?? 0}%

                            </p>

                        </div>

                    </div>

                    <div
                        className="
                        inline-flex
                        items-center
                        rounded-2xl
                        border
                        border-zinc-700
                        bg-zinc-900/80
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-zinc-200
                        capitalize
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-zinc-500
                        hover:bg-zinc-900
                        "
                    >

                        {focus?.type === "coverage_gap"
                            ? "Coverage Gap"
                            : focus?.type === "weakness"
                            ? "Weak Topic"
                            : "Healthy Topic"
                        }

                    </div>

                </motion.div>

                
                <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.45 }}
    className="mt-10"
>

    <div className="flex items-center gap-3">

        <div
            className="
            h-12
            w-12
            rounded-2xl
            border
            border-violet-500/20
            bg-violet-500/10
            flex
            items-center
            justify-center
            "
        >

            <TrendingDown
                size={20}
                className="text-violet-400"
            />

        </div>

        <div>

            <h3 className="text-2xl font-bold text-white">
                Detected Signal
            </h3>

            <p className="text-zinc-500">
                Why the AI selected this recommendation
            </p>

        </div>

    </div>

    <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="
        mt-6
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/50
        p-6
        backdrop-blur-xl
        "
    >

        <p
            className="
            text-lg
            leading-8
            text-zinc-300
            "
        >
            {ai?.reason}
        </p>

    </motion.div>

</motion.div>
<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:0.6
}}

className="mt-10"

>

<div className="flex items-center gap-3">


<div
className="
h-12
w-12
rounded-2xl
border
border-cyan-500/20
bg-cyan-500/10
flex
items-center
justify-center
"
>

<Target
size={20}
className="text-cyan-400"
/>

</div>


<div>

<h3 className="text-2xl font-bold">

Recommended Next Steps

</h3>


<p className="text-zinc-500">

AI selected problems from your weakness area

</p>


</div>


</div>


<div className="mt-6 grid gap-4">


{
dashboard.mentorProblems?.map(
(problem,index)=>(


<motion.div

key={problem.id}

whileHover={{
y:-4
}}

className="
flex
items-center
justify-between
rounded-2xl
border
border-zinc-800
bg-zinc-900/60
p-5
hover:border-violet-500/40
transition-all
"

>


<div>


<div className="flex gap-3 items-center">


<span
className="
text-xs
text-violet-400
uppercase
"
>

#{index+1}

</span>


<h4 className="font-semibold text-white">

{problem.title}

</h4>


</div>


<p
className="
mt-2
text-sm
text-zinc-500
capitalize
"
>

{problem.topic} • {problem.difficulty}

</p>


</div>


<a

href={problem.question_link}

target="_blank"

className="
flex
items-center
gap-2
rounded-xl
bg-violet-600
px-4
py-2
text-sm
font-semibold
hover:bg-violet-500
transition
"

>

Solve

<ExternalLink size={15}/>

</a>


</motion.div>


))

}


</div>


</motion.div>
            
            </div>

        </motion.div>

        

    );
    

}