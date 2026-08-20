/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Code2,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";

import {
  submitReview,
  getApprovedReviews,
  type SubmitReviewPayload,
} from "@/services/feedbackService";

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

/* =========================================================
   TYPES
========================================================= */

type Review = {
  id?: string | number;
  name: string;
  role?: string;
  rating: number;
  review: string;
};

/* =========================================================
   PAGE
========================================================= */

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const MAX_LENGTH = 1000;

  const activeRating = hoverRating || rating;

  const ratingLabels: Record<number, string> = {
    1: "Not great",
    2: "Could be better",
    3: "It's okay",
    4: "Really good",
    5: "Absolutely love it",
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async () => {
    if (!rating) {
      setError(
        "Please select a star rating. Your rating is required before you can submit.",
      );
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name so we know who the feedback is from.");
      return;
    }

    if (!feedback.trim()) {
      setError("Please tell us a little about your experience.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload: SubmitReviewPayload = {
        name: name.trim(),
        role: role.trim() || undefined,
        rating,
        review: feedback.trim(),
      };

      await submitReview(payload);

      setSuccess(true);
    } catch (err) {
      console.error("Review submission failed:", err);

      setError(
        "Something went wrong while sending your review. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030408] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        {/* BLUE GLOW */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-[180px]
            -top-[180px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-blue-600/[0.08]
            blur-[150px]
          "
        />

        {/* VIOLET GLOW */}

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-[200px]
            top-[20%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-violet-600/[0.07]
            blur-[160px]
          "
        />

        {/* CYAN GLOW */}

        <div
          className="
            absolute
            bottom-[-200px]
            left-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.035]
            blur-[150px]
          "
        />

        {/* GRID */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        {/* VIGNETTE */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,4,8,.45)_100%)]
          "
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="relative z-20 px-6 pt-7">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-white/55
              transition
              hover:text-white
            "
          >
            <ArrowLeft
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />

            Back to Dykstra
          </Link>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-3
              py-1.5
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-violet-500
              "
            >
              <Code2 className="h-3.5 w-3.5" />
            </div>

            <span className="text-xs font-bold">Dykstra</span>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 px-6 pb-24 pt-16 sm:pt-24">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="feedback-form"
                initial={{
                  opacity: 0,
                  y: 25,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* =================================================
                    TITLE
                ================================================== */}

                <div className="text-center">
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.15,
                      duration: 0.5,
                    }}
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-violet-400/20
                      bg-gradient-to-br
                      from-cyan-400/[0.12]
                      via-blue-500/[0.10]
                      to-violet-500/[0.14]
                      shadow-[0_0_45px_rgba(139,92,246,.12)]
                    "
                  >
                    <MessageSquare className="h-6 w-6 text-violet-300" />
                  </motion.div>

                  <p
                    className="
                      mt-7
                      text-sm
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-violet-300
                    "
                  >
                    We'd love to hear from you
                  </p>

                  <h1
                    className="
                      mt-3
                      text-4xl
                      font-black
                      tracking-[-0.04em]
                      sm:text-5xl
                    "
                  >
                    Tell us what you think.
                  </h1>

                  <p
                    className="
                      mx-auto
                      mt-5
                      max-w-xl
                      text-lg
                      leading-8
                      text-white/65
                      sm:text-xl
                    "
                  >
                    Your feedback helps us make Dykstra better for every
                    developer preparing for their next interview.
                  </p>
                </div>

                {/* =================================================
                    CARD
                ================================================== */}

                <div
                  className="
                    relative
                    mt-12
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.09]
                    bg-[#080a10]/80
                    p-6
                    shadow-[0_35px_120px_rgba(0,0,0,.45)]
                    backdrop-blur-2xl
                    sm:p-9
                  "
                >
                  <div
                    className="
                      absolute
                      left-1/2
                      top-0
                      h-px
                      w-2/3
                      -translate-x-1/2
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400/60
                      to-transparent
                    "
                  />

                  {/* =================================================
                      NAME
                  ================================================== */}

                  <div>
                    <h2 className="text-base font-bold">
                      About you
                    </h2>

                    <p className="mt-1 text-sm text-white/50">
                      Tell us who you are.
                    </p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <User
                          className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-white/25
                          "
                        />

                        <input
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                          }}
                          placeholder="Your name"
                          className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-black/20
                            pl-11
                            pr-4
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-white/25
                            transition-all
                            focus:border-violet-400/35
                            focus:bg-white/[0.025]
                            focus:shadow-[0_0_35px_rgba(139,92,246,.07)]
                          "
                        />
                      </div>

                      <input
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          setError("");
                        }}
                        placeholder="Role (optional)"
                        className="
                          h-12
                          w-full
                          rounded-xl
                          border
                          border-white/[0.08]
                          bg-black/20
                          px-4
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-white/25
                          transition-all
                          focus:border-violet-400/35
                          focus:bg-white/[0.025]
                          focus:shadow-[0_0_35px_rgba(139,92,246,.07)]
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      RATING
                  ================================================== */}

                  <div className="mt-9">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-base font-bold">
                          How would you rate Dykstra?
                        </h2>

                        <p className="mt-1 text-sm text-white/50">
                          A star rating is required.
                        </p>
                      </div>

                      {rating === 0 && (
                        <motion.span
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="
                            rounded-full
                            border
                            border-amber-400/20
                            bg-amber-400/[0.07]
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-amber-300
                          "
                        >
                          Required
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= activeRating;

                        return (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => {
                              setRating(star);
                              setError("");
                            }}
                            onMouseEnter={() =>
                              setHoverRating(star)
                            }
                            onMouseLeave={() =>
                              setHoverRating(0)
                            }
                            whileHover={{
                              scale: 1.15,
                              rotate: -4,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            className="
                              relative
                              flex
                              h-12
                              w-12
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              transition-colors
                              hover:border-violet-400/25
                              hover:bg-violet-400/[0.06]
                            "
                            aria-label={`${star} star${
                              star > 1 ? "s" : ""
                            }`}
                          >
                            <Star
                              className={`
                                h-6
                                w-6
                                transition-all
                                duration-200
                                ${
                                  active
                                    ? "fill-amber-300 text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,.35)]"
                                    : "text-white/20"
                                }
                              `}
                            />
                          </motion.button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeRating > 0 && (
                        <motion.p
                          key={activeRating}
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                          }}
                          className="
                            mt-3
                            text-sm
                            font-medium
                            text-amber-300/80
                          "
                        >
                          {ratingLabels[activeRating]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* =================================================
                      REVIEW
                  ================================================== */}

                  <div className="mt-9">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold">
                          Tell us more
                        </h2>

                        <p className="mt-1 text-sm text-white/50">
                          What worked? What should we improve?
                        </p>
                      </div>

                      <span className="text-xs text-white/30">
                        {feedback.length}/{MAX_LENGTH}
                      </span>
                    </div>

                    <div className="relative mt-4">
                      <textarea
                        value={feedback}
                        onChange={(e) => {
                          if (
                            e.target.value.length <=
                            MAX_LENGTH
                          ) {
                            setFeedback(e.target.value);
                            setError("");
                          }
                        }}
                        placeholder="Share your experience with Dykstra..."
                        rows={6}
                        className="
                          w-full
                          resize-none
                          rounded-2xl
                          border
                          border-white/[0.08]
                          bg-black/20
                          px-4
                          py-4
                          text-sm
                          leading-7
                          text-white
                          outline-none
                          placeholder:text-white/25
                          transition-all
                          duration-300
                          focus:border-violet-400/35
                          focus:bg-white/[0.025]
                          focus:shadow-[0_0_35px_rgba(139,92,246,.07)]
                        "
                      />

                      <Sparkles
                        className="
                          pointer-events-none
                          absolute
                          right-4
                          top-4
                          h-4
                          w-4
                          text-violet-400/30
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      ERROR
                  ================================================== */}

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        className="
                          mt-5
                          rounded-xl
                          border
                          border-red-400/15
                          bg-red-400/[0.05]
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-red-300
                        "
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* =================================================
                      SUBMIT
                  ================================================== */}

                  <div className="mt-7 flex flex-col gap-3">
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={
                        submitting ||
                        rating === 0 ||
                        !name.trim() ||
                        !feedback.trim()
                      }
                      whileHover={
                        !submitting &&
                        rating > 0 &&
                        name.trim() &&
                        feedback.trim()
                          ? {
                              scale: 1.01,
                            }
                          : {}
                      }
                      whileTap={
                        !submitting &&
                        rating > 0 &&
                        name.trim() &&
                        feedback.trim()
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                      className={`
                        group
                        relative
                        flex
                        h-13
                        w-full
                        items-center
                        justify-center
                        gap-2.5
                        overflow-hidden
                        rounded-xl
                        text-sm
                        font-bold
                        transition-all
                        duration-300
                        ${
                          rating > 0 &&
                          name.trim() &&
                          feedback.trim() &&
                          !submitting
                            ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-[0_15px_50px_rgba(59,130,246,.25)] hover:shadow-[0_20px_65px_rgba(59,130,246,.35)]"
                            : "cursor-not-allowed bg-white/[0.05] text-white/25"
                        }
                      `}
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="
                              h-4
                              w-4
                              rounded-full
                              border-2
                              border-white/30
                              border-t-white
                            "
                          />

                          Sending review...
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={
                              rating > 0 &&
                              name.trim() &&
                              feedback.trim()
                                ? {
                                    x: [0, 2, 0],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.4,
                              repeat: Infinity,
                            }}
                          >
                            <Send className="h-4 w-4" />
                          </motion.span>

                          Send review
                        </>
                      )}
                    </motion.button>

                    {/* =================================================
                        DISABLED EXPLANATION
                    ================================================== */}

                    {!rating && (
                      <p className="text-center text-sm text-white/35">
                        ⭐ Select a star rating to enable submission.
                      </p>
                    )}

                    {rating > 0 && !name.trim() && (
                      <p className="text-center text-sm text-white/35">
                        Enter your name to enable submission.
                      </p>
                    )}

                    {rating > 0 &&
                      name.trim() &&
                      !feedback.trim() && (
                        <p className="text-center text-sm text-white/35">
                          Write a review to enable submission.
                        </p>
                      )}
                  </div>
                </div>

                {/* =================================================
                    TRUST MESSAGE
                ================================================== */}

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    text-white/40
                  "
                >
                  <ThumbsUp className="h-4 w-4" />

                  <span>
                    Every piece of feedback helps shape Dykstra.
                  </span>
                </div>
              </motion.div>
            ) : (
              /* =================================================
                  SUCCESS STATE
              ================================================= */

              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/[0.09]
                  bg-[#080a10]/80
                  px-6
                  py-16
                  text-center
                  shadow-[0_35px_120px_rgba(0,0,0,.45)]
                  backdrop-blur-2xl
                  sm:px-12
                "
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.35, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    left-1/2
                    top-10
                    h-40
                    w-40
                    -translate-x-1/2
                    rounded-full
                    bg-cyan-400/20
                    blur-[70px]
                  "
                />

                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -20,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="
                    relative
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400
                    via-blue-500
                    to-violet-500
                    shadow-[0_0_45px_rgba(59,130,246,.25)]
                  "
                >
                  <Check className="h-8 w-8 text-white" />
                </motion.div>

                <h2
                  className="
                    relative
                    mt-8
                    text-3xl
                    font-black
                    tracking-tight
                    sm:text-4xl
                  "
                >
                  Thanks for the feedback.
                </h2>

                <p
                  className="
                    relative
                    mx-auto
                    mt-4
                    max-w-md
                    text-lg
                    leading-8
                    text-white/55
                  "
                >
                  Your review has been submitted successfully.
                  It may appear on Dykstra after it has been reviewed.
                </p>

                <div className="relative mt-9">
                  <Link
                    to="/"
                    className="
                      inline-flex
                      h-11
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-white/[0.1]
                      bg-white/[0.04]
                      px-5
                      text-sm
                      font-semibold
                      text-white/80
                      transition
                      hover:bg-white/[0.08]
                      hover:text-white
                    "
                  >
                    <ArrowLeft className="h-4 w-4" />

                    Back to Dykstra
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/[0.06] px-6 py-8">
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-3
            text-sm
            text-white/30
            sm:flex-row
          "
        >
          <span>
            © {new Date().getFullYear()} Dykstra
          </span>

          <span>
            Built for developers preparing for what comes next.
          </span>
        </div>
      </footer>
    </main>
  );
}