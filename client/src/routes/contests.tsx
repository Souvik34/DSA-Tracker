/* eslint-disable prettier/prettier */

import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  Code2,
  Trophy,
  Zap,
} from "lucide-react";

function ContestsPage() {
  return (
    <div
      className="
        relative
        min-h-[calc(100vh-2rem)]
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#050609]
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-[30%]
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-blue-500/[0.045]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -bottom-32
            left-1/2
            h-[300px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-violet-500/[0.025]
            blur-[100px]
          "
        />

        {/* subtle grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:45px_45px]
          "
        />
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative flex min-h-[calc(100vh-2rem)] items-center justify-center px-6 py-16">

        <div className="w-full max-w-5xl">

          {/* =================================================
              TOP LABEL
          ================================================= */}

          <div className="animate-fade-in-up flex justify-center">
            <div
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-blue-400/20
                bg-blue-400/[0.06]
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-300
                shadow-[0_0_30px_-15px_rgba(59,130,246,.8)]
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
              </span>

              Contest Arena
            </div>
          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <div className="mt-7 text-center">

            <h1
              className="
                animate-fade-in-up
                text-4xl
                font-bold
                tracking-[-0.035em]
                text-white
                md:text-5xl
              "
            >
              Compete.
              <span className="text-blue-400"> Improve.</span>
              <br />
              <span className="text-slate-300">
                Repeat.
              </span>
            </h1>

            <p
              className="
                animate-fade-in-up
                mx-auto
                mt-5
                max-w-xl
                text-base
                font-medium
                leading-7
                text-slate-400
                [animation-delay:100ms]
              "
            >
              A dedicated contest hub for tracking upcoming
              programming contests, building consistency, and
              turning competition into progress.
            </p>
          </div>

          {/* =================================================
              CIRCUIT
          ================================================= */}

          <div
            className="
              animate-fade-in-up
              mx-auto
              mt-6
              w-full
              max-w-3xl
              [animation-delay:150ms]
            "
          >
            <div className="coming-soon-circuit">
              <svg
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
              >
                <defs>

                  <linearGradient
                    id="chipGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#20242b"
                    />

                    <stop
                      offset="100%"
                      stopColor="#08090b"
                    />
                  </linearGradient>

                  <linearGradient
                    id="textGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ffffff"
                    />

                    <stop
                      offset="100%"
                      stopColor="#64748b"
                    />
                  </linearGradient>

                  <linearGradient
                    id="pinGradient"
                    x1="1"
                    y1="0"
                    x2="0"
                    y2="0"
                  >
                    <stop
                      offset="0%"
                      stopColor="#d1d5db"
                    />

                    <stop
                      offset="50%"
                      stopColor="#737373"
                    />

                    <stop
                      offset="100%"
                      stopColor="#333333"
                    />
                  </linearGradient>
                </defs>

                {/* LEFT */}

                <path
                  d="M100 100 H200 V210 H326"
                  className="trace-bg"
                />

                <path
                  d="M100 100 H200 V210 H326"
                  className="trace-flow purple"
                />

                <path
                  d="M80 180 H180 V230 H326"
                  className="trace-bg"
                />

                <path
                  d="M80 180 H180 V230 H326"
                  className="trace-flow blue"
                />

                <path
                  d="M60 260 H150 V250 H326"
                  className="trace-bg"
                />

                <path
                  d="M60 260 H150 V250 H326"
                  className="trace-flow yellow"
                />

                <path
                  d="M100 350 H200 V270 H326"
                  className="trace-bg"
                />

                <path
                  d="M100 350 H200 V270 H326"
                  className="trace-flow green"
                />

                {/* RIGHT */}

                <path
                  d="M700 90 H560 V210 H474"
                  className="trace-bg"
                />

                <path
                  d="M700 90 H560 V210 H474"
                  className="trace-flow blue"
                />

                <path
                  d="M740 160 H580 V230 H474"
                  className="trace-bg"
                />

                <path
                  d="M740 160 H580 V230 H474"
                  className="trace-flow green"
                />

                <path
                  d="M720 250 H590 V250 H474"
                  className="trace-bg"
                />

                <path
                  d="M720 250 H590 V250 H474"
                  className="trace-flow red"
                />

                <path
                  d="M680 340 H570 V270 H474"
                  className="trace-bg"
                />

                <path
                  d="M680 340 H570 V270 H474"
                  className="trace-flow yellow"
                />

                {/* CHIP */}

                <rect
                  x="330"
                  y="190"
                  width="140"
                  height="100"
                  rx="20"
                  ry="20"
                  fill="url(#chipGradient)"
                  stroke="#30343b"
                  strokeWidth="3"
                  filter="drop-shadow(0 0 18px rgba(59,130,246,.18))"
                />

                {/* LEFT PINS */}

                {[205, 225, 245, 265].map((y) => (
                  <rect
                    key={`left-${y}`}
                    x="322"
                    y={y}
                    width="8"
                    height="10"
                    fill="url(#pinGradient)"
                    rx="2"
                  />
                ))}

                {/* RIGHT PINS */}

                {[205, 225, 245, 265].map((y) => (
                  <rect
                    key={`right-${y}`}
                    x="470"
                    y={y}
                    width="8"
                    height="10"
                    fill="url(#pinGradient)"
                    rx="2"
                  />
                ))}

                {/* CENTER TEXT */}

                <text
                  x="400"
                  y="240"
                  fontFamily="Quicksand, sans-serif"
                  fontSize="20"
                  fontWeight="700"
                  fill="url(#textGradient)"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  letterSpacing="1.2"
                >
                  SOON
                </text>

                {/* NODES */}

                <circle
                  cx="100"
                  cy="100"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="80"
                  cy="180"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="60"
                  cy="260"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="100"
                  cy="350"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="700"
                  cy="90"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="740"
                  cy="160"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="720"
                  cy="250"
                  r="5"
                  fill="#050505"
                />

                <circle
                  cx="680"
                  cy="340"
                  r="5"
                  fill="#050505"
                />
              </svg>
            </div>
          </div>

          {/* =================================================
              PLATFORM CARDS
          ================================================= */}

          <div
            className="
              animate-fade-in-up
              mt-2
              grid
              gap-4
              sm:grid-cols-3
              [animation-delay:250ms]
            "
          >

            {/* LEETCODE */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-orange-400/20
                hover:bg-white/[0.04]
              "
            >
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-orange-500/[0.07]
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:bg-orange-500/[0.13]
                "
              />

              <div className="relative flex items-center gap-3">

                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-xl
                    border
                    border-orange-400/20
                    bg-orange-400/[0.08]
                  "
                >
                  <Code2 className="h-5 w-5 text-orange-400" />
                </div>

                <div>
                  <div className="text-base font-semibold text-white">
                    LeetCode
                  </div>

                  <div className="mt-0.5 text-sm font-medium text-slate-500">
                    Weekly contests
                  </div>
                </div>
              </div>
            </div>

            {/* CODEFORCES */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-blue-400/20
                hover:bg-white/[0.04]
              "
            >
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-blue-500/[0.07]
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:bg-blue-500/[0.13]
                "
              />

              <div className="relative flex items-center gap-3">

                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-xl
                    border
                    border-blue-400/20
                    bg-blue-400/[0.08]
                  "
                >
                  <Trophy className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <div className="text-base font-semibold text-white">
                    Codeforces
                  </div>

                  <div className="mt-0.5 text-sm font-medium text-slate-500">
                    Rated contests
                  </div>
                </div>
              </div>
            </div>

            {/* CALENDAR */}

            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.09]
                bg-white/[0.025]
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-violet-400/20
                hover:bg-white/[0.04]
              "
            >
              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-violet-500/[0.07]
                  blur-2xl
                  transition-all
                  duration-500
                  group-hover:bg-violet-500/[0.13]
                "
              />

              <div className="relative flex items-center gap-3">

                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-xl
                    border
                    border-violet-400/20
                    bg-violet-400/[0.08]
                  "
                >
                  <CalendarDays className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                  <div className="text-base font-semibold text-white">
                    Contest Calendar
                  </div>

                  <div className="mt-0.5 text-sm font-medium text-slate-500">
                    All events in one place
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              BOTTOM STATUS
          ================================================= */}

          <div
            className="
              animate-fade-in-up
              mt-8
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              [animation-delay:350ms]
            "
          >
            <Zap className="h-4 w-4 text-blue-400" />

            <span>
              We're building something worth competing for.
            </span>

            <ChevronRight className="h-4 w-4 opacity-40" />
          </div>

        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/contests")({
  component: ContestsPage,
});