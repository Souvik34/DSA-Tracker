/* eslint-disable prettier/prettier */

import {
    Binary,
    GitBranch,
    Network,
    Layers,
    CheckCircle2,
    Brain,
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
    "#22c55e",
    "#f59e0b",
    "#3b82f6",
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
        dashboard.strongTopics.map((t: any, index: number) => ({
            topic: t.topic,
            solved: Number(t.solved),
            icon:
                ICONS[t.topic.toLowerCase()] ??
                Layers,
            tint:
                COLORS[index % COLORS.length],
        }));

    const totalSolved =
        dashboard.stats.solved || 1;

    return (

<div
className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-6
"
>

{cards.map((card, index) => {

const pct = Math.round(
(card.solved / totalSolved) * 100
);

const level =
pct >= 35
? "Master"

: pct >= 20
? "Strong"

: pct >= 10
? "Growing"

: "Needs Practice";

const isWeak =
dashboard.weakTopic?.toLowerCase() ===
card.topic.toLowerCase();

return (

<motion.div

key={card.topic}

initial={{
opacity:0,
y:20,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:.45,
delay:index*.08,
}}

whileHover={{
scale:1.04,
rotateX:4,
rotateY:-4,
}}

className="
relative
overflow-hidden
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-6
cursor-pointer
transition-all
"

>

{/* Glow */}

<div

className="
absolute
right-0
top-0
h-40
w-40
rounded-full
blur-[80px]
opacity-20
"

style={{
background:card.tint,
}}

/>

{/* AI Badge */}

{isWeak && (

<div
className="
absolute
right-4
top-4
rounded-full
bg-red-500/15
border
border-red-500/20
px-3
py-1
text-[10px]
font-bold
text-red-400
flex
items-center
gap-1
"
>

<Brain size={11}/>

AI Focus

</div>

)}

<div
className="
relative
flex
justify-between
items-center
"
>

<div

className="
h-12
w-12
rounded-2xl
flex
items-center
justify-center
"

style={{
background:`${card.tint}25`,
}}

>

<card.icon

size={22}

style={{
color:card.tint,
}}

/>

</div>

<div
className="
rounded-full
border
border-zinc-700
bg-zinc-900
px-3
py-1
text-xs
font-bold
text-zinc-300
"
>

#{index+1}

</div>

</div>

<h2
className="
mt-6
capitalize
text-xl
font-bold
"
>

{card.topic}

</h2>

<div
className="
mt-3
flex
items-center
gap-2
text-zinc-400
"
>

<CheckCircle2
size={16}
style={{
color:card.tint,
}}
/>

<span>

{card.solved} Problems Solved

</span>

</div>

{/* Progress */}

<div
className="
mt-6
h-3
overflow-hidden
rounded-full
bg-zinc-800
"
>

<motion.div

initial={{
width:0,
}}

animate={{
width:`${pct}%`,
}}

transition={{
duration:1.2,
ease:"easeOut",
}}

className="
h-full
rounded-full
"

style={{
background:card.tint,
}}

/>

</div>

<div
className="
mt-3
flex
justify-between
items-center
"
>

<p
className="
text-sm
font-semibold
"
style={{
color:card.tint,
}}
>

{level}

</p>

<p
className="
text-xs
font-medium
text-zinc-500
"
>

{pct}% of solved

</p>

</div>

</motion.div>

);

})}

</div>

    );

}