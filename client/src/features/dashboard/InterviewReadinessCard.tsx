/* eslint-disable prettier/prettier */

import {
    BrainCircuit,
    Sparkles,
    ArrowRight,
    Circle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    dashboard: any;
}

export default function InterviewReadinessCard({
    dashboard,
}: Props) {

    const score =
        dashboard?.readiness?.score ?? 0;

    const level =
        dashboard?.readiness?.level ?? "Beginner";

    const weak =
        dashboard?.weakTopic ?? "None";

    const solved =
        dashboard?.stats?.solved ?? 0;

    const revision =
        dashboard?.stats?.revisionPending ?? 0;

    const color =
        score >= 80
            ? "text-green-400"

            : score >= 60
            ? "text-yellow-400"

            : "text-red-400";

    const bg =
        score >= 80
            ? "bg-green-400"

            : score >= 60
            ? "bg-yellow-400"

            : "bg-red-400";

    return (

<div
className="
relative
overflow-hidden
rounded-3xl
border
border-zinc-800
bg-zinc-950
mt-8
"
>

<div
className="
absolute
right-0
top-0
h-96
w-96
rounded-full
bg-violet-700/20
blur-[120px]
"
/>

<div
className="
absolute
left-0
bottom-0
h-72
w-72
rounded-full
bg-cyan-500/10
blur-[100px]
"
/>

<div className="relative p-8">

<div className="flex justify-between items-start">

<div>

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
text-violet-300
font-medium
"
>

<BrainCircuit size={16}/>

AI Interview Analysis

</div>

<h2
className="
mt-6
text-4xl
font-bold
"
>

Interview Readiness

</h2>

<p
className="
mt-2
text-zinc-400
text-lg
"
>

AI analysed your solving pattern,
revision history,
difficulty balance and practice consistency.

</p>

</div>

<div
className="
flex
items-center
gap-3
rounded-full
border
border-zinc-700
px-5
py-3
"
>

<div
className={`
h-3
w-3
rounded-full
animate-pulse
${bg}
`}
/>

<p
className={`
font-semibold
${color}
`}
>

{level}

</p>

</div>

</div>

<div className="mt-10 grid lg:grid-cols-2 gap-10">

{/* LEFT */}

<div>

<div className="flex items-end gap-3">

<h1
className={`
text-8xl
font-black
${color}
`}
>

{score}

</h1>

<span
className="
text-3xl
text-zinc-500
mb-3
"
>

%

</span>

</div>

<div
className="
mt-6
h-5
rounded-full
bg-zinc-800
overflow-hidden
"
>

<div
className="
h-full
rounded-full
bg-gradient-to-r
from-red-500
via-yellow-400
to-green-500
transition-all
duration-1000
"
style={{
width: `${score}%`
}}
/>

</div>

<div
className="
mt-8
grid
grid-cols-2
gap-5
"
>

<div
className="
rounded-2xl
border
border-zinc-800
bg-zinc-900/60
p-5
"
>

<p
className="
text-zinc-500
text-sm
"
>

Problems Solved

</p>

<p
className="
text-4xl
font-bold
mt-2
"
>

{solved}

</p>

</div>

<div
className="
rounded-2xl
border
border-zinc-800
bg-zinc-900/60
p-5
"
>

<p
className="
text-zinc-500
text-sm
"
>

Pending Revision

</p>

<p
className="
text-4xl
font-bold
mt-2
"
>

{revision}

</p>

</div>

</div>

</div>

{/* RIGHT */}

<div>

<div
className="
rounded-3xl
border
border-violet-600/20
bg-violet-500/5
p-6
"
>

<div className="flex gap-3">

<Sparkles
className="
text-violet-400
mt-1
"
/>

<div>

<h3
className="
text-2xl
font-bold
"
>

AI Recommendation

</h3>

<p
className="
mt-4
leading-8
text-zinc-300
"
>

Your weakest topic is

<span className="font-bold text-violet-400">

{" "}
{weak}

</span>

.

Complete

<b> 3-5 more questions </b>

from this topic and clear all
pending revisions to rapidly improve your interview readiness.

</p>

</div>

</div>

</div>

<div
className="
mt-6
rounded-3xl
border
border-zinc-800
bg-zinc-900/50
p-6
"
>

<h3
className="
text-xl
font-bold
mb-5
"
>

Expected Outcome

</h3>

<div className="space-y-4">

<div className="flex gap-3">

<Circle
fill="currentColor"
size={10}
className="text-green-400 mt-2"
/>

<p>

Strong understanding of DSA fundamentals

</p>

</div>

<div className="flex gap-3">

<Circle
fill="currentColor"
size={10}
className="text-yellow-400 mt-2"
/>

<p>

Needs improvement in

<b>

{" "}
{weak}

</b>

</p>

</div>

<div className="flex gap-3">

<Circle
fill="currentColor"
size={10}
className="text-violet-400 mt-2"
/>

<p>

Estimated readiness improvement:
+15% after next revision cycle.

</p>

</div>

</div>

<Button
className="
w-full
mt-8
h-12
text-base
bg-violet-600
hover:bg-violet-500
"
>

View AI Career Roadmap

<ArrowRight
className="ml-2"
size={18}
/>

</Button>

</div>

</div>

</div>

</div>

</div>

    );

}