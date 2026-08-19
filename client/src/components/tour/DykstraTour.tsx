/* eslint-disable prettier/prettier */

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import {
    ArrowLeft,
    ArrowRight,
    Check,
    Sparkles,
    X,
    Target,
    Brain,
    MessageSquare,
    Activity,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

interface DykstraTourProps {
    open: boolean;
    onClose: () => void;
}

const TOUR_STEPS: TourStep[] = [
    {
        id: "welcome",
        title: "Welcome to Dykstra",
        description:
            "Your DSA practice, revision and interview preparation — connected in one place.",
        icon: Sparkles,
    },
    {
        id: "mentor",
        title: "Your AI Mentor",
        description:
            "Dykstra analyses your progress and helps you decide what deserves your attention next.",
        icon: Brain,
    },
    {
        id: "readiness",
        title: "Interview Readiness",
        description:
            "Track how prepared you are across the skills that actually matter in technical interviews.",
        icon: Target,
    },
    {
        id: "activity",
        title: "Your Coding Journey",
        description:
            "Your recent activity and DSA progress stay visible so you always know where you stand.",
        icon: Activity,
    },
    {
        id: "finish",
        title: "Ready to Improve?",
        description:
            "Solve problems, revise intelligently, practice interviews and use your feedback to get better.",
        icon: MessageSquare,
    },
];

export default function DykstraTour({
    open,
    onClose,
}: DykstraTourProps) {
    const [step, setStep] = useState(0);

    const currentStep = TOUR_STEPS[step];

    const isFirst = step === 0;

    const isLast =
        step === TOUR_STEPS.length - 1;

    /*
     * =========================================================
     * RESET TOUR WHEN OPENED
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        setStep(0);
    }, [open]);

    /*
     * =========================================================
     * LOCK PAGE WHILE TOUR IS OPEN
     * =========================================================
     *
     * The dashboard underneath cannot:
     *
     * - scroll
     * - click
     * - use keyboard scrolling
     * - touch scroll
     *
     * Only the tour card remains interactive.
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const preventWheel = (
            event: WheelEvent
        ) => {
            event.preventDefault();
        };

        const preventTouch = (
            event: TouchEvent
        ) => {
            event.preventDefault();
        };

        const preventKeyboardScroll = (
            event: KeyboardEvent
        ) => {
            const scrollKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " ",
            ];

            /*
             * Do not block Escape.
             * Do not block keyboard controls
             * when they are handled by the tour.
             */
            if (
                scrollKeys.includes(
                    event.key
                )
            ) {
                event.preventDefault();
            }
        };

        window.addEventListener(
            "wheel",
            preventWheel,
            {
                passive: false,
            }
        );

        window.addEventListener(
            "touchmove",
            preventTouch,
            {
                passive: false,
            }
        );

        window.addEventListener(
            "keydown",
            preventKeyboardScroll
        );

        return () => {
            window.removeEventListener(
                "wheel",
                preventWheel
            );

            window.removeEventListener(
                "touchmove",
                preventTouch
            );

            window.removeEventListener(
                "keydown",
                preventKeyboardScroll
            );
        };
    }, [open]);

    /*
     * =========================================================
     * KEYBOARD CONTROLS
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (
                event.key === "ArrowRight" &&
                !isLast
            ) {
                setStep(
                    (prev) => prev + 1
                );
                return;
            }

            if (
                event.key === "ArrowLeft" &&
                !isFirst
            ) {
                setStep(
                    (prev) => prev - 1
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        open,
        isFirst,
        isLast,
        onClose,
    ]);

    /*
     * =========================================================
     * NEXT
     * =========================================================
     */

    const nextStep = () => {
        if (isLast) {
            onClose();
            return;
        }

        setStep(
            (prev) => prev + 1
        );
    };

    /*
     * =========================================================
     * PREVIOUS
     * =========================================================
     */

    const previousStep = () => {
        if (isFirst) {
            return;
        }

        setStep(
            (prev) => prev - 1
        );
    };

    /*
     * =========================================================
     * CLOSED
     * =========================================================
     */

    if (!open) {
        return null;
    }

    const Icon =
        currentStep.icon;

    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <div
            className="
                fixed
                inset-0
                z-[99999]
                select-none
            "
        >
            {/* =================================================
                BACKDROP
            ================================================= */}

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                className="
                    absolute
                    inset-0
                    bg-black/75
                    backdrop-blur-[1.5px]
                "
            />

            {/* =================================================
                TOUR CARD
                =================================================
                
                IMPORTANT:
                - fixed to top
                - does NOT follow anything
                - does NOT move with dashboard
                - dashboard stays locked
            ================================================= */}

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.id}
                    initial={{
                        opacity: 0,
                        y: -12,
                        scale: 0.97,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                    }}
                    transition={{
                        duration: 0.28,
                        ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                        ],
                    }}
                    className="
                        absolute
                        left-1/2
                        top-8
                        w-[calc(100%-32px)]
                        max-w-[560px]
                        -translate-x-1/2
                        overflow-hidden
                        rounded-[26px]
                        border
                        border-white/[0.1]
                        bg-[#09090b]/[0.98]
                        shadow-[0_30px_100px_rgba(0,0,0,0.8)]
                    "
                >
                    {/* =================================================
                        DECORATIVE GLOWS
                    ================================================= */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -right-24
                            -top-24
                            h-64
                            w-64
                            rounded-full
                            bg-violet-600/10
                            blur-[90px]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            -bottom-24
                            -left-24
                            h-52
                            w-52
                            rounded-full
                            bg-blue-600/[0.06]
                            blur-[80px]
                        "
                    />

                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div
                        className="
                            relative
                            p-7
                        "
                    >

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div
                            className="
                                flex
                                items-start
                                justify-between
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                {/* ICON */}

                                <motion.div
                                    animate={{
                                        scale: [
                                            1,
                                            1.04,
                                            1,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-violet-500/20
                                        bg-violet-500/10
                                        shadow-[0_0_30px_rgba(139,92,246,0.08)]
                                    "
                                >
                                    <Icon
                                        size={21}
                                        className="
                                            text-violet-300
                                        "
                                    />
                                </motion.div>

                                {/* TITLE */}

                                <div>

                                    <div
                                        className="
                                            text-[9px]
                                            font-bold
                                            uppercase
                                            tracking-[0.22em]
                                            text-violet-400
                                        "
                                    >
                                        Dykstra Tour
                                    </div>

                                    <h2
                                        className="
                                            mt-1
                                            text-lg
                                            font-bold
                                            tracking-tight
                                            text-white
                                        "
                                    >
                                        {
                                            currentStep.title
                                        }
                                    </h2>

                                </div>

                            </div>

                            {/* CLOSE */}

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    rounded-lg
                                    p-1.5
                                    text-zinc-600
                                    transition-all
                                    duration-200
                                    hover:bg-white/[0.06]
                                    hover:text-white
                                "
                            >
                                <X
                                    size={16}
                                />
                            </button>

                        </div>

                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        <p
                            className="
                                mt-6
                                max-w-[480px]
                                text-sm
                                font-medium
                                leading-6
                                text-zinc-400
                            "
                        >
                            {
                                currentStep.description
                            }
                        </p>

                        {/* =================================================
                            PROGRESS
                        ================================================= */}

                        <div
                            className="
                                mt-7
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                "
                            >
                                {TOUR_STEPS.map(
                                    (
                                        _,
                                        index
                                    ) => (
                                        <motion.div
                                            key={
                                                index
                                            }
                                            animate={{
                                                width:
                                                    index ===
                                                    step
                                                        ? 24
                                                        : 6,
                                            }}
                                            transition={{
                                                duration:
                                                    0.25,
                                            }}
                                            className={`
                                                h-1.5
                                                rounded-full
                                                ${
                                                    index <=
                                                    step
                                                        ? "bg-violet-500"
                                                        : "bg-zinc-800"
                                                }
                                            `}
                                        />
                                    )
                                )}
                            </div>

                            <span
                                className="
                                    text-[10px]
                                    font-semibold
                                    tracking-wide
                                    text-zinc-600
                                "
                            >
                                {step + 1} /{" "}
                                {
                                    TOUR_STEPS.length
                                }
                            </span>

                        </div>

                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div
                            className="
                                mt-7
                                flex
                                items-center
                                justify-between
                            "
                        >

                            {/* SKIP */}

                            <button
                                type="button"
                                onClick={onClose}
                                className="
                                    text-xs
                                    font-medium
                                    text-zinc-600
                                    transition-colors
                                    hover:text-zinc-300
                                "
                            >
                                Skip tour
                            </button>

                            {/* RIGHT BUTTONS */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                {/* PREVIOUS */}

                                {!isFirst && (
                                    <button
                                        type="button"
                                        onClick={
                                            previousStep
                                        }
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-white/[0.08]
                                            bg-white/[0.03]
                                            text-zinc-400
                                            transition-all
                                            duration-200
                                            hover:bg-white/[0.07]
                                            hover:text-white
                                        "
                                    >
                                        <ArrowLeft
                                            size={
                                                16
                                            }
                                        />
                                    </button>
                                )}

                                {/* NEXT */}

                                <button
                                    type="button"
                                    onClick={
                                        nextStep
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-violet-600
                                        px-4
                                        py-2.5
                                        text-xs
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-violet-600/20
                                        transition-all
                                        duration-200
                                        hover:bg-violet-500
                                        hover:shadow-violet-500/30
                                        active:scale-[0.98]
                                    "
                                >
                                    {isLast
                                        ? "Get Started"
                                        : "Next"}

                                    {isLast ? (
                                        <Check
                                            size={
                                                15
                                            }
                                        />
                                    ) : (
                                        <ArrowRight
                                            size={
                                                15
                                            }
                                        />
                                    )}
                                </button>

                            </div>

                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}