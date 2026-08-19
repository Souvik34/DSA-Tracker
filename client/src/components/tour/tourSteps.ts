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
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

interface TourStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    target?: string;
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
        target: "tour-ai-mentor",
    },

    {
        id: "readiness",
        title: "Interview Readiness",
        description:
            "Track how prepared you are across the skills that actually matter in technical interviews.",
        icon: Target,
        target: "tour-interview-readiness",
    },

    {
        id: "activity",
        title: "Your Coding Journey",
        description:
            "Your recent activity and DSA progress stay visible so you always know where you stand.",
        icon: Activity,
        target: "tour-activity",
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
    const [targetRect, setTargetRect] =
        useState<DOMRect | null>(null);

    const scrollParentRef =
        useRef<HTMLElement | null>(null);

    const animationFrameRef =
        useRef<number | null>(null);

    const currentStep = TOUR_STEPS[step];

    const isFirst = step === 0;
    const isLast =
        step === TOUR_STEPS.length - 1;

    /*
     * =========================================================
     * FIND TARGET
     * =========================================================
     */

    const getTarget = useCallback(
        (tourStep: TourStep = currentStep) => {
            if (!tourStep.target) {
                return null;
            }

            return document.querySelector(
                `[data-tour="${tourStep.target}"]`,
            ) as HTMLElement | null;
        },
        [currentStep],
    );

    /*
     * =========================================================
     * FIND ACTUAL SCROLL CONTAINER
     * =========================================================
     */

    const getScrollParent = (
        element: HTMLElement,
    ): HTMLElement | null => {
        let parent =
            element.parentElement;

        while (parent) {
            const style =
                window.getComputedStyle(
                    parent,
                );

            const canScroll =
                /(auto|scroll)/.test(
                    style.overflowY,
                );

            if (
                canScroll &&
                parent.scrollHeight >
                    parent.clientHeight
            ) {
                return parent;
            }

            parent =
                parent.parentElement;
        }

        return null;
    };

    /*
     * =========================================================
     * UPDATE SPOTLIGHT
     * =========================================================
     */

    const updateTarget = useCallback(() => {
        const target = getTarget();

        if (!target) {
            setTargetRect(null);
            return;
        }

        setTargetRect(
            target.getBoundingClientRect(),
        );
    }, [getTarget]);

    /*
     * =========================================================
     * SCROLL TARGET
     * =========================================================
     */

    const scrollToTarget = useCallback(
        (target: HTMLElement) => {
            const rect =
                target.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight;

            const scrollParent =
                getScrollParent(target);

            scrollParentRef.current =
                scrollParent;

            /*
             * Desired position:
             * target center ≈ viewport center
             */

            const targetCenter =
                rect.top +
                rect.height / 2;

            const viewportCenter =
                viewportHeight / 2;

            const difference =
                targetCenter -
                viewportCenter;

            /*
             * Already centered.
             */

            if (Math.abs(difference) < 30) {
                updateTarget();
                return;
            }

            /*
             * If dashboard has its own
             * scroll container, scroll THAT.
             */

            if (scrollParent) {
                scrollParent.scrollTo({
                    top:
                        scrollParent.scrollTop +
                        difference,
                    behavior: "smooth",
                });
            } else {
                /*
                 * Fallback to window.
                 */

                window.scrollTo({
                    top:
                        window.scrollY +
                        difference,
                    behavior: "smooth",
                });
            }

            /*
             * Follow movement.
             */

            if (
                animationFrameRef.current
            ) {
                cancelAnimationFrame(
                    animationFrameRef.current,
                );
            }

            const follow = () => {
                updateTarget();

                animationFrameRef.current =
                    requestAnimationFrame(
                        follow,
                    );
            };

            animationFrameRef.current =
                requestAnimationFrame(
                    follow,
                );

            window.setTimeout(() => {
                if (
                    animationFrameRef.current
                ) {
                    cancelAnimationFrame(
                        animationFrameRef.current,
                    );

                    animationFrameRef.current =
                        null;
                }

                updateTarget();
            }, 700);
        },
        [updateTarget],
    );

    /*
     * =========================================================
     * MOVE TO STEP
     * =========================================================
     */

    const moveToStep = useCallback(
        (nextStep: number) => {
            if (
                nextStep < 0 ||
                nextStep >=
                    TOUR_STEPS.length
            ) {
                return;
            }

            /*
             * Change React state FIRST.
             *
             * This is important.
             */

            setStep(nextStep);

            const nextTarget =
                getTarget(
                    TOUR_STEPS[nextStep],
                );

            /*
             * Welcome / Finish
             */

            if (!nextTarget) {
                setTargetRect(null);
                return;
            }

            /*
             * Wait for React to render the
             * new step and then scroll.
             */

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scrollToTarget(
                        nextTarget,
                    );
                });
            });
        },
        [getTarget, scrollToTarget],
    );

    /*
     * =========================================================
     * INITIALIZE
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        setStep(0);
        setTargetRect(null);

        const timer =
            window.setTimeout(() => {
                const target =
                    getTarget(
                        TOUR_STEPS[0],
                    );

                if (target) {
                    scrollToTarget(target);
                }
            }, 150);

        return () =>
            window.clearTimeout(timer);
    }, [
        open,
        getTarget,
        scrollToTarget,
    ]);

    /*
     * =========================================================
     * LISTEN TO ACTUAL SCROLL CONTAINER
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const scrollParent =
            scrollParentRef.current;

        if (scrollParent) {
            scrollParent.addEventListener(
                "scroll",
                updateTarget,
                {
                    passive: true,
                },
            );
        }

        window.addEventListener(
            "scroll",
            updateTarget,
            {
                passive: true,
            },
        );

        window.addEventListener(
            "resize",
            updateTarget,
        );

        return () => {
            if (scrollParent) {
                scrollParent.removeEventListener(
                    "scroll",
                    updateTarget,
                );
            }

            window.removeEventListener(
                "scroll",
                updateTarget,
            );

            window.removeEventListener(
                "resize",
                updateTarget,
            );
        };
    }, [open, updateTarget]);

    /*
     * =========================================================
     * BLOCK USER SCROLL
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const preventWheel = (
            event: WheelEvent,
        ) => {
            event.preventDefault();
        };

        const preventTouch = (
            event: TouchEvent,
        ) => {
            event.preventDefault();
        };

        const preventKeyboardScroll = (
            event: KeyboardEvent,
        ) => {
            const keys = [
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End",
                " ",
            ];

            if (keys.includes(event.key)) {
                event.preventDefault();
            }
        };

        window.addEventListener(
            "wheel",
            preventWheel,
            {
                passive: false,
            },
        );

        window.addEventListener(
            "touchmove",
            preventTouch,
            {
                passive: false,
            },
        );

        window.addEventListener(
            "keydown",
            preventKeyboardScroll,
        );

        return () => {
            window.removeEventListener(
                "wheel",
                preventWheel,
            );

            window.removeEventListener(
                "touchmove",
                preventTouch,
            );

            window.removeEventListener(
                "keydown",
                preventKeyboardScroll,
            );
        };
    }, [open]);

    /*
     * =========================================================
     * KEYBOARD NAVIGATION
     * =========================================================
     */

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (
                event.key ===
                    "ArrowRight" &&
                !isLast
            ) {
                moveToStep(step + 1);
            }

            if (
                event.key ===
                    "ArrowLeft" &&
                !isFirst
            ) {
                moveToStep(step - 1);
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
    }, [
        open,
        step,
        isFirst,
        isLast,
        moveToStep,
        onClose,
    ]);

    /*
     * =========================================================
     * CLEANUP
     * =========================================================
     */

    useEffect(() => {
        return () => {
            if (
                animationFrameRef.current
            ) {
                cancelAnimationFrame(
                    animationFrameRef.current,
                );
            }
        };
    }, []);

    if (!open) {
        return null;
    }

    const Icon =
        currentStep.icon;

    const padding = 10;

    const spotlight =
        targetRect
            ? {
                  top:
                      targetRect.top -
                      padding,

                  left:
                      targetRect.left -
                      padding,

                  width:
                      targetRect.width +
                      padding * 2,

                  height:
                      targetRect.height +
                      padding * 2,
              }
            : null;

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
                z-[2147483647]
                pointer-events-auto
                select-none
            "
        >
            {/* BACKDROP */}

            <div
                className="
                    absolute
                    inset-0
                    bg-black/75
                    backdrop-blur-[2px]
                "
            />

            {/* SPOTLIGHT */}

            <AnimatePresence>
                {spotlight && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            top:
                                spotlight.top,
                            left:
                                spotlight.left,
                            width:
                                spotlight.width,
                            height:
                                spotlight.height,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}
                        className="
                            pointer-events-none
                            fixed
                            rounded-2xl
                            border
                            border-violet-400/80
                            shadow-[0_0_0_9999px_rgba(0,0,0,0.72),0_0_55px_rgba(139,92,246,0.4)]
                        "
                    >
                        <motion.div
                            animate={{
                                opacity: [
                                    0.2,
                                    0.65,
                                    0.2,
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat:
                                    Infinity,
                            }}
                            className="
                                absolute
                                inset-0
                                rounded-2xl
                                border
                                border-violet-300/50
                            "
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CARD */}

            <motion.div
                key={currentStep.id}
                initial={{
                    opacity: 0,
                    y: 15,
                    scale: 0.97,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.3,
                }}
                className="
                    absolute
                    bottom-7
                    left-1/2
                    w-[calc(100%-32px)]
                    max-w-[560px]
                    -translate-x-1/2
                    overflow-hidden
                    rounded-[26px]
                    border
                    border-white/[0.1]
                    bg-[#09090b]/[0.98]
                    shadow-[0_30px_100px_rgba(0,0,0,0.8)]
                    backdrop-blur-2xl
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-56
                        w-56
                        rounded-full
                        bg-violet-600/20
                        blur-[90px]
                    "
                />

                <div className="relative p-6">
                    {/* HEADER */}

                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                "
                            >
                                <Icon
                                    size={20}
                                    className="text-violet-300"
                                />
                            </div>

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
                                        text-white
                                    "
                                >
                                    {
                                        currentStep.title
                                    }
                                </h2>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="
                                rounded-lg
                                p-1.5
                                text-zinc-500
                                hover:bg-white/[0.06]
                                hover:text-white
                            "
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* DESCRIPTION */}

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={
                                currentStep.id
                            }
                            initial={{
                                opacity: 0,
                                y: 5,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                mt-5
                                text-sm
                                leading-6
                                text-zinc-400
                            "
                        >
                            {
                                currentStep.description
                            }
                        </motion.p>
                    </AnimatePresence>

                    {/* PROGRESS */}

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            {TOUR_STEPS.map(
                                (_, index) => (
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
                                ),
                            )}
                        </div>

                        <span className="text-[10px] text-zinc-600">
                            {step + 1} /{" "}
                            {
                                TOUR_STEPS.length
                            }
                        </span>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex items-center justify-between">
                        <button
                            onClick={onClose}
                            className="
                                text-xs
                                text-zinc-600
                                hover:text-zinc-300
                            "
                        >
                            Skip tour
                        </button>

                        <div className="flex gap-2">
                            {!isFirst && (
                                <button
                                    onClick={() =>
                                        moveToStep(
                                            step -
                                                1,
                                        )
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

                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                onClick={() => {
                                    if (
                                        isLast
                                    ) {
                                        onClose();
                                        return;
                                    }

                                    moveToStep(
                                        step +
                                            1,
                                    );
                                }}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-violet-600
                                    px-5
                                    py-2.5
                                    text-xs
                                    font-bold
                                    text-white
                                    shadow-lg
                                    shadow-violet-600/20
                                    hover:bg-violet-500
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
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}