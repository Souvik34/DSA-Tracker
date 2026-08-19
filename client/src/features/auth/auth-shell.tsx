/* eslint-disable prettier/prettier */

import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authService } from "./auth-service";

interface AuthShellProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  submitLabel: string;
  withName?: boolean;

  onSubmit: (values: {
    name?: string;
    email: string;
    password: string;
  }) => Promise<void> | void;
}

export function AuthShell({
  title,
  subtitle,
  footer,
  submitLabel,
  withName = false,
  onSubmit,
}: AuthShellProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    if (loading) return;
    authService.googleLogin();
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await onSubmit({
        name: withName ? name : undefined,
        email,
        password,
      });
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      {/* =========================================================
          ANIMATED BACKGROUND
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Blue glow */}
        <div
          className="
            absolute
            -left-[18%]
            -top-[18%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-blue-600/[0.13]
            blur-[140px]
            animate-[floatGlow_12s_ease-in-out_infinite]
          "
        />

        {/* Violet glow */}
        <div
          className="
            absolute
            -bottom-[22%]
            -right-[15%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-violet-600/[0.12]
            blur-[150px]
            animate-[floatGlowReverse_15s_ease-in-out_infinite]
          "
        />

        {/* Cyan glow */}
        <div
          className="
            absolute
            left-[42%]
            top-[35%]
            h-[280px]
            w-[280px]
            rounded-full
            bg-cyan-500/[0.035]
            blur-[120px]
            animate-[pulseGlow_8s_ease-in-out_infinite]
          "
        />

        {/* Fine grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        {/* Floating particles */}
        <div className="absolute left-[14%] top-[22%] h-1 w-1 rounded-full bg-blue-300/60 shadow-[0_0_12px_rgba(96,165,250,0.8)] animate-[particleOne_7s_ease-in-out_infinite]" />

        <div className="absolute left-[42%] top-[15%] h-1 w-1 rounded-full bg-violet-300/50 shadow-[0_0_12px_rgba(167,139,250,0.7)] animate-[particleTwo_9s_ease-in-out_infinite]" />

        <div className="absolute right-[20%] top-[32%] h-1 w-1 rounded-full bg-cyan-300/50 shadow-[0_0_12px_rgba(103,232,249,0.7)] animate-[particleThree_8s_ease-in-out_infinite]" />

        <div className="absolute right-[32%] bottom-[24%] h-1 w-1 rounded-full bg-blue-300/40 shadow-[0_0_12px_rgba(96,165,250,0.7)] animate-[particleOne_10s_ease-in-out_infinite]" />
      </div>

      {/* =========================================================
          MAIN
      ========================================================== */}

      <div className="relative grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* =======================================================
            LEFT PANEL
        ======================================================== */}

        <div className="relative hidden overflow-hidden border-r border-white/[0.06] lg:block">
          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            {/* LOGO */}

            <Link
              to="/"
              className="
                group
                flex
                w-fit
                items-center
                gap-3
              "
            >
              <div
                className="
                  relative
                  grid
                  h-10
                  w-10
                  place-items-center
                  overflow-hidden
                  rounded-xl
                  text-white
                  transition-all
                  duration-500
                  group-hover:scale-105
                  group-hover:rotate-2
                "
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                  boxShadow:
                    "0 0 35px rgba(59,130,246,0.22)",
                }}
              >
                <Code2 className="relative z-10 h-5 w-5" />

                <span
                  className="
                    absolute
                    inset-0
                    translate-x-[-120%]
                    bg-gradient-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-[120%]
                  "
                />
              </div>

              <div>
                <div className="text-[15px] font-semibold tracking-tight">
                  AlgoForge
                </div>

                <div className="mt-0.5 text-xs text-white/35">
                  DSA Prep Suite
                </div>
              </div>
            </Link>

            {/* MAIN COPY */}

            <div className="relative max-w-xl">
              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-400/15
                  bg-blue-500/[0.05]
                  px-3.5
                  py-2
                  text-xs
                  font-medium
                  text-blue-300/90
                  backdrop-blur-md
                "
              >
                <Sparkles className="h-3.5 w-3.5" />

                Built for serious interview prep
              </div>

              <h2
                className="
                  text-4xl
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white
                  xl:text-[54px]
                "
              >
                Practice smarter.
                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-blue-400
                    via-indigo-400
                    to-violet-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Interview stronger.
                </span>
              </h2>

              <p
                className="
                  mt-6
                  max-w-md
                  text-[16px]
                  leading-7
                  text-white/45
                "
              >
                Solve problems, build consistency, revise at
                the right time, and sharpen your interview
                skills with intelligent feedback.
              </p>

              {/* SMALL FEATURES */}

              <div className="mt-8 space-y-3">
                {[
                  "Intelligent DSA revision",
                  "AI-powered interview practice",
                  "Progress built around your weak areas",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-white/55
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
                        border
                        border-blue-400/15
                        bg-blue-500/[0.07]
                      "
                    >
                      <Check
                        className="h-3.5 w-3.5 text-blue-400"
                      />
                    </div>

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM */}

            <div className="text-xs text-white/25">
              Built for consistency, not cramming.
            </div>
          </div>
        </div>

        {/* =======================================================
            RIGHT AUTH
        ======================================================== */}

        <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <div className="w-full max-w-[430px]">
            {/* MOBILE LOGO */}

            <div className="mb-8 flex items-center justify-center lg:hidden">
              <Link
                to="/"
                className="group flex items-center gap-3"
              >
                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-xl
                    text-white
                    shadow-[0_0_30px_rgba(59,130,246,0.2)]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                  }}
                >
                  <Code2 className="h-5 w-5" />
                </div>

                <span className="text-[15px] font-semibold">
                  AlgoForge
                </span>
              </Link>
            </div>

            {/* CARD GLOW */}

            <div
              className="
                relative
                rounded-[28px]
                p-[1px]
              "
              style={{
                background:
                  "linear-gradient(135deg,rgba(59,130,246,0.45),rgba(255,255,255,0.07),rgba(139,92,246,0.4))",
                boxShadow:
                  "0 30px 100px rgba(0,0,0,0.55)",
              }}
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[27px]
                  border
                  border-white/[0.07]
                  bg-[#080a0f]/95
                  p-6
                  shadow-2xl
                  backdrop-blur-2xl
                  sm:p-8
                "
              >
                {/* CARD AMBIENT GLOW */}

                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-52
                    w-52
                    rounded-full
                    bg-blue-500/[0.10]
                    blur-[80px]
                  "
                />

                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-24
                    h-48
                    w-48
                    rounded-full
                    bg-violet-500/[0.08]
                    blur-[70px]
                  "
                />

                {/* TOP LINE */}

                <div
                  aria-hidden
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-px
                    w-2/3
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-blue-400/60
                    to-transparent
                  "
                />

                <div className="relative">
                  {/* HEADING */}

                  <div>
                    <h1
                      className="
                        text-[29px]
                        font-semibold
                        tracking-[-0.035em]
                        text-white
                      "
                    >
                      {title}
                    </h1>

                    <p
                      className="
                        mt-2.5
                        text-[14px]
                        leading-6
                        text-white/45
                      "
                    >
                      {subtitle}
                    </p>
                  </div>

                  {/* GOOGLE */}

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="
                      group
                      relative
                      mt-7
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-3
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/[0.1]
                      bg-white/[0.025]
                      text-sm
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:border-white/[0.18]
                      hover:bg-white/[0.05]
                      hover:shadow-[0_10px_35px_rgba(0,0,0,0.25)]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {/* hover shimmer */}

                    <span
                      aria-hidden
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-[-60%]
                        w-[35%]
                        -skew-x-12
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.08]
                        to-transparent
                        transition-all
                        duration-700
                        group-hover:left-[120%]
                      "
                    />

                    {/* clean google icon */}

                    <span
                      className="
                        relative
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                      "
                    >
                      <GoogleIcon />
                    </span>

                    <span className="relative">
                      Continue with Google
                    </span>

                    <ArrowRight
                      className="
                        relative
                        ml-auto
                        mr-1
                        h-4
                        w-4
                        text-white/25
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-white/60
                      "
                    />
                  </button>

                  {/* DIVIDER */}

                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.07]" />

                    <span className="text-[11px] font-medium text-white/25">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-white/[0.07]" />
                  </div>

                  {/* FORM */}

                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                  >
                    {/* NAME */}

                    {withName && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="
                            text-[13px]
                            font-medium
                            text-white/65
                          "
                        >
                          Full name
                        </Label>

                        <div className="group relative">
                          <UserRound
                            className="
                              pointer-events-none
                              absolute
                              left-3.5
                              top-1/2
                              z-10
                              h-4
                              w-4
                              -translate-y-1/2
                              text-white/25
                              transition-colors
                              group-focus-within:text-blue-400
                            "
                          />

                          <Input
                            id="name"
                            value={name}
                            onChange={(e) =>
                              setName(e.target.value)
                            }
                            placeholder="Your name"
                            required
                            className="
                              h-12
                              rounded-xl
                              border-white/[0.09]
                              bg-white/[0.025]
                              pl-10
                              text-[14px]
                              text-white
                              placeholder:text-white/20
                              transition-all
                              focus:border-blue-400/40
                              focus:bg-white/[0.045]
                              focus:ring-2
                              focus:ring-blue-500/10
                            "
                          />
                        </div>
                      </div>
                    )}

                    {/* EMAIL */}

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="
                          text-[13px]
                          font-medium
                          text-white/65
                        "
                      >
                        Email
                      </Label>

                      <div className="group relative">
                        <Mail
                          className="
                            pointer-events-none
                            absolute
                            left-3.5
                            top-1/2
                            z-10
                            h-4
                            w-4
                            -translate-y-1/2
                            text-white/25
                            transition-colors
                            group-focus-within:text-blue-400
                          "
                        />

                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) =>
                            setEmail(e.target.value)
                          }
                          required
                          className="
                            h-12
                            rounded-xl
                            border-white/[0.09]
                            bg-white/[0.025]
                            pl-10
                            text-[14px]
                            text-white
                            placeholder:text-white/20
                            transition-all
                            focus:border-blue-400/40
                            focus:bg-white/[0.045]
                            focus:ring-2
                            focus:ring-blue-500/10
                          "
                        />
                      </div>
                    </div>

                    {/* PASSWORD */}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="
                            text-[13px]
                            font-medium
                            text-white/65
                          "
                        >
                          Password
                        </Label>

                        <Link
                          to="/forgot-password"
                          className="
                            text-[12px]
                            font-medium
                            text-blue-400
                            transition-colors
                            hover:text-blue-300
                          "
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="group relative">
                        <LockKeyhole
                          className="
                            pointer-events-none
                            absolute
                            left-3.5
                            top-1/2
                            z-10
                            h-4
                            w-4
                            -translate-y-1/2
                            text-white/25
                            transition-colors
                            group-focus-within:text-blue-400
                          "
                        />

                        <Input
                          id="password"
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                          required
                          minLength={6}
                          className="
                            h-12
                            rounded-xl
                            border-white/[0.09]
                            bg-white/[0.025]
                            pl-10
                            pr-11
                            text-[14px]
                            text-white
                            placeholder:text-white/20
                            transition-all
                            focus:border-blue-400/40
                            focus:bg-white/[0.045]
                            focus:ring-2
                            focus:ring-blue-500/10
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (prev) => !prev,
                            )
                          }
                          className="
                            absolute
                            right-3
                            top-1/2
                            flex
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-md
                            p-1
                            text-white/25
                            transition-colors
                            hover:text-white/65
                          "
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* SUBMIT */}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="
                        group
                        relative
                        mt-3
                        h-12
                        w-full
                        overflow-hidden
                        rounded-xl
                        border-0
                        text-[14px]
                        font-semibold
                        text-white
                        shadow-[0_10px_30px_rgba(59,130,246,0.16)]
                        transition-all
                        duration-300
                        hover:scale-[1.01]
                        hover:shadow-[0_15px_40px_rgba(59,130,246,0.24)]
                        active:scale-[0.99]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        disabled:hover:scale-100
                      "
                      style={{
                        background:
                          "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-transparent
                          via-white/[0.13]
                          to-transparent
                          translate-x-[-100%]
                          transition-transform
                          duration-700
                          group-hover:translate-x-[100%]
                        "
                      />

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <span
                              className="
                                h-4
                                w-4
                                animate-spin
                                rounded-full
                                border-2
                                border-white/30
                                border-t-white
                              "
                            />

                            Please wait…
                          </>
                        ) : (
                          <>
                            {submitLabel}

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>

                  {/* FOOTER */}

                  <div
                    className="
                      mt-6
                      text-center
                      text-[13px]
                      leading-6
                      text-white/35
                    "
                  >
                    {footer}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE BOTTOM */}

            <div className="mt-6 text-center text-[11px] text-white/20 lg:hidden">
              AlgoForge
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          ANIMATIONS
      ========================================================== */}

      <style>{`
        @keyframes floatGlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(35px, 25px, 0) scale(1.08);
          }
        }

        @keyframes floatGlowReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(-30px, -25px, 0) scale(1.06);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.9);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }

        @keyframes particleOne {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate3d(35px, -25px, 0);
            opacity: 0.8;
          }
        }

        @keyframes particleTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }

          50% {
            transform: translate3d(-25px, 35px, 0);
            opacity: 0.7;
          }
        }

        @keyframes particleThree {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate3d(25px, 20px, 0);
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  );
}

/* =============================================================
   CLEAN GOOGLE ICON
============================================================= */

function GoogleIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.4Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.86A5.86 5.86 0 0 1 6.23 12c0-.65.11-1.28.31-1.86V7.62H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.38l3.24-2.52Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.21 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52 3.24 2.52C7.31 7.83 9.46 6.11 12 6.11Z"
      />
    </svg>
  );
}