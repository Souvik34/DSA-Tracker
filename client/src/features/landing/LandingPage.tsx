/* eslint-disable prettier/prettier */



import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Code2,
  Sparkles,
  Brain,
  RotateCcw,
  Video,
  Target,
  Github,
} from "lucide-react";
import bannerImage from "@/assets/images/Banner.png";
import { motion, useScroll, useTransform } from "framer-motion";

/* =========================================================
   DATA
========================================================= */

const features = [
  {
    eyebrow: "INTELLIGENCE",
    title: "Know what to work on next.",
    description:
      "Dykstra studies your solved problems, weak areas, revision history and progress to help you focus on the work that matters most.",
    icon: Brain,
    accent: "from-cyan-400 via-blue-500 to-violet-500",
    image: "/landing/ai-mentor.png",
    align: "left" as const,
  },
  {
    eyebrow: "REVISION",
    title: "Remember before you forget.",
    description:
      "Turn solved problems into a revision system instead of letting them disappear from memory.",
    icon: RotateCcw,
    accent: "from-violet-400 via-fuchsia-500 to-blue-500",
    image: "/landing/revision.png",
    align: "right" as const,
  },
  {
    eyebrow: "INTERVIEWS",
    title: "Practice the interview. Not just the problem.",
    description:
      "Talk through your approach, write code, handle follow-ups and receive structured feedback from an AI interviewer.",
    icon: Video,
    accent: "from-blue-400 via-indigo-500 to-cyan-400",
    image: "/landing/interview.png",
    align: "left" as const,
  },
  {
    eyebrow: "READINESS",
    title: "See how prepared you really are.",
    description:
      "Your progress becomes a picture of interview readiness instead of a collection of disconnected numbers.",
    icon: Target,
    accent: "from-fuchsia-400 via-violet-500 to-blue-500",
    image: "/landing/dashboard.png",
    align: "right" as const,
  },
];

const testimonials = [
  {
    quote:
      "The biggest difference is that Dykstra doesn't just show me what I solved. It helps me understand what I should do next.",
    name: "Beta Developer",
    role: "Early user",
  },
  {
    quote:
      "The combination of revision and interview practice makes the preparation feel like one system instead of ten different tools.",
    name: "Software Engineer",
    role: "Early user",
  },
  {
    quote:
      "I wanted something that tracked progress but still felt like a serious interview product. That's where Dykstra stands out.",
    name: "Developer",
    role: "Early user",
  },
];

const faqs = [
  {
    question: "What is Dykstra?",
    answer:
      "Dykstra is a single workspace for DSA practice, intelligent revision, interview practice and preparation tracking.",
  },
  {
    question: "Is Dykstra only for DSA practice?",
    answer:
      "No. DSA practice is the foundation, but Dykstra is designed to connect problem solving, revision and interview preparation into one workflow.",
  },
  {
    question: "How does intelligent revision work?",
    answer:
      "Dykstra uses your solving activity and revision history to determine what needs attention, so revision becomes continuous instead of something you do only before an interview.",
  },
  {
    question: "Can I practice technical interviews?",
    answer:
      "Yes. Dykstra includes an AI interview experience designed around explanation, coding, optimization and feedback.",
  },
  {
    question: "Will Dykstra track my progress?",
    answer:
      "Yes. Your dashboard brings together solving activity, topic progress, revision state and interview readiness.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: ["Practice", "Revision", "Interviews", "Dashboard"],
  },
  {
    title: "Resources",
    links: ["FAQ", "Documentation", "Roadmap"],
  },
  {
    title: "Connect",
    links: ["GitHub", "Feedback", "Contact"],
  },
];

/* =========================================================
   LANDING PAGE
========================================================= */

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -90],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.14],
    [1, 0],
  );

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, 0.94],
  );

  const nextTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev + 1) % testimonials.length,
    );
  };

  const previousTestimonial = () => {
    setTestimonialIndex(
      (prev) =>
        (prev - 1 + testimonials.length) %
        testimonials.length,
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030408] text-white">
      {/* =====================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute -left-[15%] -top-[15%] h-[650px] w-[650px] rounded-full bg-blue-600/[0.08] blur-[150px]" />

        <div className="absolute -right-[18%] top-[18%] h-[700px] w-[700px] rounded-full bg-violet-600/[0.07] blur-[160px]" />

        <div className="absolute bottom-[5%] left-[25%] h-[450px] w-[450px] rounded-full bg-cyan-500/[0.035] blur-[140px]" />

        <div
          className="
            absolute
            inset-0
            opacity-[0.022]
            [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        {/* Background image / visual */}
      <motion.div
  style={{ y: heroY, scale: heroScale }}
  className="absolute inset-x-0 top-0 h-[820px] overflow-hidden"
>
  {/* =====================================================
      BANNER IMAGE
  ====================================================== */}

{/* =====================================================
    HERO IMAGE
====================================================== */}

<motion.div
  style={{ y: heroY, scale: heroScale }}
  className="
    pointer-events-none
    absolute
    inset-x-0
    top-0
    flex
    h-[850px]
    justify-center
    overflow-hidden
  "
>
  {/* ===================================================
      IMAGE FRAME
  ==================================================== */}

  <motion.div
    initial={{
      opacity: 0,
      y: 18,
      scale: 1.035,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      delay: 1.15,
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      relative
      mt-[-20px]
      h-[790px]
      w-[88%]
      max-w-[1450px]
      overflow-hidden
    "
  >
    {/* =================================================
        BANNER
    ================================================== */}

    <img
      src={bannerImage}
      alt=""
      className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
        object-center
      "
    />

    {/* =================================================
        DEEP BLACK MASK
    ================================================== */}

    <div
      className="
        absolute
        inset-0
        bg-black/[0.1]
      "
    />

    {/* =================================================
        TOP → BOTTOM LIGHT
    ================================================== */}

    <motion.div
      initial={{
        opacity: 0,
        y: "-25%",
      }}
      animate={{
        opacity: [0, 0.9, 0.65],
        y: ["-25%", "5%", "18%"],
      }}
      transition={{
        delay: 1.35,
        duration: 3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        left-0
        top-0
        h-[65%]
        w-full
        bg-gradient-to-b
        from-white/[0.08]
        via-cyan-300/[0.035]
        to-transparent
        blur-[35px]
      "
    />

    {/* =================================================
        CENTER DARKENING
        Keeps typography readable.
    ================================================== */}

    <div
      className="
        absolute
        inset-0
        bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,4,8,.15)_35%,rgba(3,4,8,.70)_78%,#030408_100%)]
      "
    />

    {/* =================================================
        TOP FADE
    ================================================== */}

    <div
      className="
        absolute
        inset-x-0
        top-0
        h-64
        bg-gradient-to-b
        from-[#030408]
        via-[#030408]/55
        to-transparent
      "
    />

    {/* =================================================
        BOTTOM FADE
    ================================================== */}

    <div
      className="
        absolute
        inset-x-0
        bottom-0
        h-72
        bg-gradient-to-t
        from-[#030408]
        via-[#030408]/75
        to-transparent
      "
    />

    {/* =================================================
        SIDE FADES
        Creates the breathing room you wanted.
    ================================================== */}

    <div
      className="
        absolute
        inset-y-0
        left-0
        w-[18%]
        bg-gradient-to-r
        from-[#030408]
        to-transparent
      "
    />

    <div
      className="
        absolute
        inset-y-0
        right-0
        w-[18%]
        bg-gradient-to-l
        from-[#030408]
        to-transparent
      "
    />

    {/* =================================================
        SUBTLE COLOR LIGHT
    ================================================== */}

    <div
      className="
        absolute
        inset-0
        bg-gradient-to-r
        from-cyan-500/[0.025]
        via-transparent
        to-violet-500/[0.04]
        mix-blend-screen
      "
    />

    {/* =================================================
        SLOW LIGHT SWEEP
    ================================================== */}

    <motion.div
      initial={{
        x: "-120%",
        opacity: 0,
      }}
      animate={{
        x: "120%",
        opacity: [0, 0.25, 0],
      }}
      transition={{
        delay: 2.2,
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 5,
      }}
      className="
        absolute
        inset-y-0
        left-0
        w-[28%]
        rotate-[10deg]
        bg-gradient-to-r
        from-transparent
        via-white/[0.045]
        to-transparent
        blur-3xl
      "
    />
  </motion.div>
</motion.div>
  {/* =====================================================
      BLACK MASK
  ====================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-black/[0.52]
    "
  />

  {/* =====================================================
      CENTER DARKENING
  ====================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(circle_at_center,transparent_5%,rgba(3,4,8,.38)_48%,rgba(3,4,8,.92)_100%)]
    "
  />

  {/* =====================================================
      TOP DARKNESS
  ====================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-x-0
      top-0
      h-56
      bg-gradient-to-b
      from-[#030408]/90
      via-[#030408]/35
      to-transparent
    "
  />

  {/* =====================================================
      BOTTOM FADE
  ====================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-x-0
      bottom-0
      h-72
      bg-gradient-to-t
      from-[#030408]
      via-[#030408]/80
      to-transparent
    "
  />

  {/* =====================================================
      SUBTLE COLOR ATMOSPHERE
  ====================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-gradient-to-r
      from-cyan-500/[0.035]
      via-transparent
      to-violet-500/[0.05]
      mix-blend-screen
    "
  />

  {/* =====================================================
      ANIMATED LIGHT SWEEP
  ====================================================== */}

  <motion.div
    className="
      pointer-events-none
      absolute
      -left-[30%]
      top-0
      h-full
      w-[22%]
      rotate-[12deg]
      bg-white/[0.035]
      blur-3xl
    "
    animate={{
      x: ["0%", "620%"],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      repeatDelay: 5,
      ease: "easeInOut",
    }}
  />
</motion.div>

      

        <motion.div
          style={{
            y: heroY,
            opacity: heroOpacity,
          }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        >
          {/* Brand */}
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mx-auto
              mb-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.035]
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_20px_rgba(59,130,246,.35)]">
              <Code2 className="h-3.5 w-3.5 text-white" />
            </span>

            <span className="text-sm font-semibold tracking-tight">
              Dykstra
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[46px]
              font-black
              leading-[0.98]
              tracking-[-0.055em]
              sm:text-[66px]
              md:text-[82px]
              lg:text-[100px]
            "
          >
            One place to
            <br />

            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-blue-400
                to-violet-400
                bg-clip-text
                text-transparent
                [background-size:200%_100%]
                animate-[gradientShift_6s_ease-in-out_infinite]
              "
            >
              become interview ready.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-[16px]
              leading-7
              text-white/70
              sm:text-lg
            "
          >
            Practice DSA, revise intelligently, simulate technical
            interviews and understand exactly where you stand.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.38,
            }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/signup"
              className="
                group
                relative
                flex
                h-12
                items-center
                gap-2
                overflow-hidden
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-600
                to-violet-600
                px-6
                text-sm
                font-bold
                text-white
                shadow-[0_15px_45px_rgba(37,99,235,.24)]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_20px_60px_rgba(59,130,246,.35)]
              "
            >
              <span className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[400px]" />

              <span className="relative">
                Start Preparing
              </span>

              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/login"
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.10]
                bg-white/[0.035]
                px-6
                text-sm
                font-semibold
                text-white/85
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/[0.18]
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              Sign in
            </Link>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.7,
            }}
            className="mt-16 flex items-center justify-center gap-2 text-xs font-medium text-white/35"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-300/60" />
            Built for developers who want to prepare with purpose.
          </motion.div>
        </motion.div>

        {/* bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030408] to-transparent" />
      </section>

      {/* =====================================================
          PRODUCT INTRO
      ====================================================== */}

      <section className="relative px-6 pb-24 pt-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300"
          >
            One system
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              delay: 0.08,
            }}
            className="mt-3 text-4xl font-black tracking-tight sm:text-5xl"
          >
            Everything connected.
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              delay: 0.16,
            }}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/65"
          >
            Your preparation should not live in separate tools,
            spreadsheets and tabs.
          </motion.p>
        </div>

        {/* Dashboard screenshot */}
        <ScreenshotFrame
          src="/landing/dashboard.png"
          alt="Dykstra dashboard"
          className="mx-auto mt-14 max-w-6xl"
        />
      </section>

      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="space-y-28 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          {features.map((feature, index) => (
            <FeatureSection
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}

      <section className="px-6 py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
              Early feedback
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Built with developers, not around them.
            </h2>
          </div>

          <motion.div
            key={testimonialIndex}
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              relative
              mx-auto
              mt-12
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.09]
              bg-white/[0.025]
              p-8
              text-center
              shadow-[0_30px_100px_rgba(0,0,0,.35)]
              backdrop-blur-xl
              sm:p-12
            "
          >
            <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-violet-500/15">
              <Sparkles className="h-5 w-5 text-violet-300" />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-2xl font-semibold leading-relaxed tracking-tight text-white sm:text-3xl">
              “{testimonials[testimonialIndex].quote}”
            </p>

            <div className="mt-7">
              <p className="text-sm font-semibold text-white">
                {testimonials[testimonialIndex].name}
              </p>

              <p className="mt-1 text-xs text-white/45">
                {testimonials[testimonialIndex].role}
              </p>
            </div>
          </motion.div>

          <div className="mt-7 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={previousTestimonial}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] text-white/60 transition hover:bg-white/[0.06] hover:text-white"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>

            <div className="flex items-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTestimonialIndex(index)}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${
                      index === testimonialIndex
                        ? "w-8 bg-violet-400"
                        : "w-2 bg-white/20"
                    }
                  `}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] text-white/60 transition hover:bg-white/[0.06] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            Replace these placeholders with real user feedback before launch.
          </p>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Questions
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Frequently asked.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((faq, index) => {
              const active = activeFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveFaq(
                        active ? null : index,
                      )
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-5
                      py-6
                      text-left
                    "
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`
                        h-5
                        w-5
                        shrink-0
                        text-white/45
                        transition-transform
                        duration-300
                        ${
                          active
                            ? "rotate-180 text-cyan-300"
                            : ""
                        }
                      `}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: active ? "auto" : 0,
                      opacity: active ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-sm leading-7 text-white/60 sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden px-6 py-28">
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.10] blur-[140px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
              Your next step
            </p>

            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] sm:text-6xl">
              Your next interview
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                starts here.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60">
              Build the habits, skills and confidence that show up
              when the interview actually begins.
            </p>

            <Link
              to="/signup"
              className="
                group
                mt-9
                inline-flex
                h-12
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-600
                to-violet-600
                px-7
                text-sm
                font-bold
                text-white
                shadow-[0_15px_50px_rgba(59,130,246,.25)]
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Start with Dykstra

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/[0.07] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500">
                  <Code2 className="h-4.5 w-4.5 text-white" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Dykstra
                  </p>

                  <p className="text-[11px] text-white/35">
                    Interview preparation, connected.
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">
                Practice. Revise. Interview. Improve.
              </p>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                  {column.title}
                </p>

                <div className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm text-white/40 transition hover:text-white"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Dykstra
            </span>

            <span>
              Built for developers preparing for what comes next.
            </span>
          </div>
        </div>
      </footer>

      {/* =====================================================
          LOCAL ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </main>
  );
}

/* =========================================================
   FEATURE SECTION
========================================================= */

function FeatureSection({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;

  const textBlock = (
    <motion.div
      initial={{
        opacity: 0,
        x: feature.align === "left" ? -35 : 35,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex items-center"
    >
      <div className="max-w-xl">
        <div
          className={`
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.09]
            bg-white/[0.03]
            px-3
            py-1.5
            text-[10px]
            font-bold
            tracking-[0.2em]
            text-white/60
          `}
        >
          <Icon className="h-3.5 w-3.5 text-cyan-300" />
          {feature.eyebrow}
        </div>

        <h3 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
          {feature.title}
        </h3>

        <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );

  const visualBlock = (
    <motion.div
      initial={{
        opacity: 0,
        x: feature.align === "left" ? 35 : -35,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ScreenshotFrame
        src={feature.image}
        alt={feature.title}
      />
    </motion.div>
  );

  return (
    <div
      className={`
        grid
        gap-14
        lg:grid-cols-2
        lg:items-center
        ${index > 0 ? "pt-10" : ""}
      `}
    >
      {feature.align === "left" ? (
        <>
          {textBlock}
          {visualBlock}
        </>
      ) : (
        <>
          {visualBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

/* =========================================================
   SCREENSHOT FRAME
========================================================= */

function ScreenshotFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-white/[0.09]
        bg-[#090b11]
        shadow-[0_35px_100px_rgba(0,0,0,.45)]
        ${className}
      `}
    >
      {/* top chrome */}
      <div className="flex h-10 items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.025] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.07]" />
      </div>

      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="block w-full object-cover"
          loading="lazy"
        />

        {/* dark glass fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030408] via-[#030408]/55 to-transparent" />

        {/* violet atmospheric edge */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[80px]" />
      </div>
    </div>
  );
}