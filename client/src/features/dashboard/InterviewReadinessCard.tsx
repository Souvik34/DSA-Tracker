/* eslint-disable prettier/prettier */

import {
    BrainCircuit,
    Sparkles,
    ArrowRight,
    Circle,
    X,
    Target,
    BookOpen,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

interface Props {
    dashboard: any;
}

export default function InterviewReadinessCard({
    dashboard,
}: Props) {

    const [showRoadmap, setShowRoadmap] = useState(false);

    const score =
        dashboard?.readiness?.score ?? 0;

    const level =
        dashboard?.readiness?.level ?? "Beginner";

    const weak =
    dashboard?.profile?.focusTopic?.topic ??
    dashboard?.weakTopic ??
    "None";


    const solved =
        dashboard?.stats?.solved ?? 0;
        const aiAdvice =
    dashboard?.aiAdvice;

const roadmap =
    aiAdvice?.roadmap ?? [];

    const color =
        score >= 80
            ? "text-green-400"
            : score >= 60
            ? "text-yellow-400"
            : "text-red-400";

    /*
    ==========================================
    LOCK PAGE SCROLL WHEN MODAL IS OPEN
    ==========================================
    */

    useEffect(() => {

        if (!showRoadmap) {
            return;
        }

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                originalOverflow;
        };

    }, [showRoadmap]);


    /*
    ==========================================
    PERSONALIZED ROADMAP
    ==========================================
    */

   


    /*
    ==========================================
    CLOSE MODAL
    ==========================================
    */

    const closeRoadmap = () => {
        setShowRoadmap(false);
    };


    /*
    ==========================================
    ROADMAP MODAL
    ==========================================
    */

    const roadmapModal = showRoadmap
        ? createPortal(
            <div
                className="
                    fixed
                    inset-0
                    z-[99999]
                    flex
                    items-center
                    justify-center
                    p-4
                "
                onClick={closeRoadmap}
            >

                {/* Backdrop */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-black/75
                        backdrop-blur-md
                    "
                />


                {/* Modal */}

                <div
                    className="
                        relative
                        z-10
                        flex
                        max-h-[88vh]
                        w-full
                        max-w-3xl
                        flex-col
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-zinc-950
                        shadow-2xl
                        shadow-black/60
                    "
                    onClick={(event) =>
                        event.stopPropagation()
                    }
                >

                    {/* HEADER */}

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            border-b
                            border-white/10
                            px-7
                            py-6
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-violet-400
                                "
                            >
                                <Sparkles className="h-4 w-4" />

                                AI Career Roadmap
                            </div>

                          <h2
    className="
        mt-2
        text-2xl
        font-bold
        tracking-tight
    "
>
    {aiAdvice?.headline ?? "Your Interview Preparation Plan"}
</h2>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-zinc-400
                                "
                            >
                                Personalized from your current DSA activity.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={closeRoadmap}
                            className="
                                rounded-lg
                                p-2
                                text-zinc-400
                                transition
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <X className="h-5 w-5" />
                        </button>

                    </div>


                    {/* CURRENT DATA */}

                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-4
                            border-b
                            border-white/10
                            px-7
                            py-5
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    text-zinc-500
                                "
                            >
                                Readiness
                            </p>

                            <p
                                className={`
                                    mt-1
                                    text-2xl
                                    font-bold
                                    ${color}
                                `}
                            >
                                {score}%
                            </p>

                        </div>


                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    text-zinc-500
                                "
                            >
                                Level
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                "
                            >
                                {level}
                            </p>

                        </div>


                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    uppercase
                                    tracking-wider
                                    text-zinc-500
                                "
                            >
                                Problems Solved
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                "
                            >
                                {solved}
                            </p>

                        </div>

                    </div>


                    {/* ROADMAP CONTENT */}

                    <div
                        className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            px-7
                            py-6
                        "
                    >

                        <div className="space-y-6">

                          {roadmap.map((item: string, index: number) => (

    <div
        key={index}
        className="relative flex gap-4"
    >

        {/* CONNECTOR */}

        {index !== roadmap.length - 1 && (
            <div
                className="
                    absolute
                    left-5
                    top-12
                    h-[calc(100%+24px)]
                    w-px
                    bg-white/10
                "
            />
        )}

        {/* DAY ICON */}

        <div
            className="
                relative
                z-10
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-violet-500/30
                bg-violet-500/10
            "
        >
            <span className="text-sm font-semibold text-violet-400">
                {index + 1}
            </span>
        </div>

        {/* ROADMAP ITEM */}

        <div
            className="
                flex-1
                rounded-xl
                border
                border-white/10
                bg-white/[0.025]
                p-5
                transition
                hover:border-violet-500/20
                hover:bg-violet-500/[0.03]
            "
        >

            <p
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-violet-400
                "
            >
                Day {index + 1}
            </p>

            <p
                className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-zinc-300
                "
            >
                {item}
            </p>

        </div>

    </div>

))}

                        </div>


                        {/* OUTCOME */}

                        <div
                            className="
                                mt-6
                                rounded-xl
                                border
                                border-violet-500/20
                                bg-violet-500/[0.04]
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <CheckCircle2
                                    className="
                                        h-5
                                        w-5
                                        text-violet-400
                                    "
                                />

                                <h3 className="font-semibold">
                                Mentor Tip
                                </h3>

                            </div>

                            <p
    className="
        mt-2
        text-sm
        leading-relaxed
        text-zinc-400
    "
>
    {aiAdvice?.tip}
</p>
                        </div>

                    </div>


                    {/* FOOTER */}

                    <div
                        className="
                            border-t
                            border-white/10
                            px-7
                            py-4
                        "
                    >

                        <Button
                            className="
                                h-11
                                w-full
                                bg-violet-600
                                text-sm
                                font-semibold
                                hover:bg-violet-500
                            "
                            onClick={closeRoadmap}
                        >
                            Start Preparing
                        </Button>

                    </div>

                </div>

            </div>,

            document.body
        )
        : null;


    return (
        <>
            {/* ========================================
                INTERVIEW READINESS CARD
            ======================================== */}

            <div>

                {/* HEADER */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-violet-400
                    "
                >

                    <BrainCircuit className="h-5 w-5" />

                    <span className="text-base font-semibold">
                        AI Interview Analysis
                    </span>

                </div>

<h2
    className="
        mt-2
        text-2xl
        font-bold
        tracking-tight
    "
>
    {aiAdvice?.headline ?? "Interview Readiness"}
</h2>

                <p
                    className="
                        mt-2
                        text-base
                        leading-relaxed
                        text-muted-foreground
                    "
                >
                    AI analysed your solving pattern,
                    revision history, difficulty balance and
                    practice consistency.
                </p>


                <div
                    className="
                        mt-7
                        grid
                        grid-cols-1
                        gap-8
                        md:grid-cols-2
                    "
                >

                    {/* LEFT */}

                    <div>

                        <div
                            className="
                                flex
                                items-end
                                gap-2
                            "
                        >

                            <span
                                className={`
                                    text-7xl
                                    font-bold
                                    tracking-tight
                                    ${color}
                                `}
                            >
                                {score}
                            </span>

                            <span
                                className="
                                    mb-3
                                    text-3xl
                                    font-medium
                                    text-zinc-500
                                "
                            >
                                %
                            </span>

                        </div>


                        <p
                            className={`
                                mt-2
                                text-base
                                font-semibold
                                ${color}
                            `}
                        >
                            {level}
                        </p>


                        <div
                            className="
                                mt-6
                                grid
                                grid-cols-1
                                gap-4
                                sm:grid-cols-2
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-sm
                                        text-muted-foreground
                                    "
                                >
                                    Problems Solved
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-2xl
                                        font-bold
                                    "
                                >
                                    {solved}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT */}

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <Sparkles
                                className="
                                    h-5
                                    w-5
                                    text-violet-400
                                "
                            />

                            <span className="text-base font-semibold">
                                AI Recommendation
                            </span>

                        </div>


                     <p
    className="
        mt-4
        text-base
        leading-7
        text-muted-foreground
    "
>
    {aiAdvice?.insight}
</p>
  <p
        className="
            mt-3
            text-sm
            leading-relaxed
            text-zinc-400
        "
    >
        {aiAdvice?.reason}
    </p>


                     <div className="mt-6">

    <p
        className="
            text-sm
            font-semibold
            text-muted-foreground
        "
    >
        Interview Tip
    </p>

    <p
        className="
            mt-3
            text-sm
            leading-relaxed
            text-zinc-400
        "
    >
        {aiAdvice?.tip}
    </p>

</div>

                    </div>

                </div>


                {/* BUTTON */}

                <Button
                    className="
                        mt-9
                        h-12
                        w-full
                        bg-violet-600
                        text-base
                        font-semibold
                        hover:bg-violet-500
                    "
                    onClick={() =>
                        setShowRoadmap(true)
                    }
                >

                    View AI Career Roadmap

                    <ArrowRight
                        className="
                            ml-2
                            h-4
                            w-4
                        "
                    />

                </Button>

            </div>


            {roadmapModal}

        </>
    );
}