/* eslint-disable prettier/prettier */

import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Mail,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authService } from "./auth-service";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      console.error("Forgot password error:", err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
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
        <div
          className="
            absolute
            -left-[15%]
            -top-[20%]
            h-[620px]
            w-[620px]
            rounded-full
            bg-blue-600/[0.14]
            blur-[140px]
            animate-[floatGlow_12s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute
            -bottom-[20%]
            -right-[15%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-violet-600/[0.13]
            blur-[150px]
            animate-[floatGlowReverse_15s_ease-in-out_infinite]
          "
        />

        <div
          className="
            absolute
            left-[45%]
            top-[35%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-cyan-500/[0.035]
            blur-[120px]
            animate-[pulseGlow_8s_ease-in-out_infinite]
          "
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
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
          }}
        />

        {/* Particles */}
        <div className="absolute left-[18%] top-[22%] h-1 w-1 rounded-full bg-blue-300/60 shadow-[0_0_12px_rgba(96,165,250,0.8)] animate-[particleOne_7s_ease-in-out_infinite]" />

        <div className="absolute left-[72%] top-[18%] h-1 w-1 rounded-full bg-violet-300/50 shadow-[0_0_12px_rgba(167,139,250,0.7)] animate-[particleTwo_9s_ease-in-out_infinite]" />

        <div className="absolute right-[20%] bottom-[25%] h-1 w-1 rounded-full bg-cyan-300/50 shadow-[0_0_12px_rgba(103,232,249,0.7)] animate-[particleThree_8s_ease-in-out_infinite]" />
      </div>

      {/* =========================================================
          MAIN
      ========================================================== */}

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-[430px]">
          {/* Logo */}

          <div className="mb-8 flex justify-center">
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              <div
                className="
                  relative
                  grid
                  h-11
                  w-11
                  place-items-center
                  overflow-hidden
                  rounded-xl
                  transition-all
                  duration-500
                  group-hover:scale-105
                  group-hover:rotate-2
                "
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
                  boxShadow:
                    "0 0 35px rgba(59,130,246,0.25)",
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

              <div className="text-left">
                <div className="text-[15px] font-semibold">
                  AlgoForge
                </div>

                <div className="text-xs text-white/35">
                  DSA Prep Suite
                </div>
              </div>
            </Link>
          </div>

          {/* Card */}

          <div
            className="relative rounded-[28px] p-[1px]"
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
                p-7
                shadow-2xl
                backdrop-blur-2xl
                sm:p-9
              "
            >
              {/* Ambient glow */}

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

              {/* Top line */}

              <div
                aria-hidden
                className="
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
                {!success ? (
                  <>
                    {/* Heading */}

                    <div>
                      <div
                        className="
                          mb-5
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-blue-400/15
                          bg-blue-500/[0.07]
                        "
                      >
                        <Mail className="h-5 w-5 text-blue-400" />
                      </div>

                      <h1 className="text-[29px] font-semibold tracking-[-0.035em]">
                        Forgot your password?
                      </h1>

                      <p className="mt-2.5 text-[14px] leading-6 text-white/45">
                        Enter your email and we'll send you a
                        secure link to reset your password.
                      </p>
                    </div>

                    {/* Form */}

                    <form
                      className="mt-7 space-y-5"
                      onSubmit={handleSubmit}
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-[13px] font-medium text-white/65"
                        >
                          Email address
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

                      {error && (
                        <div className="rounded-xl border border-red-400/15 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="
                          group
                          relative
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
                          active:scale-[0.99]
                          disabled:cursor-not-allowed
                          disabled:opacity-60
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
                            translate-x-[-100%]
                            bg-gradient-to-r
                            from-transparent
                            via-white/[0.13]
                            to-transparent
                            transition-transform
                            duration-700
                            group-hover:translate-x-[100%]
                          "
                        />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                              Sending link…
                            </>
                          ) : (
                            <>
                              Send reset link
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </span>
                      </Button>
                    </form>
                  </>
                ) : (
                  /* =====================================================
                     SUCCESS
                  ====================================================== */

                  <div className="py-5 text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-emerald-400/20
                        bg-emerald-500/[0.08]
                        shadow-[0_0_35px_rgba(16,185,129,0.08)]
                      "
                    >
                      <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                    </div>

                    <h1 className="mt-6 text-[27px] font-semibold tracking-[-0.03em]">
                      Check your email
                    </h1>

                    <p className="mx-auto mt-3 max-w-[330px] text-[14px] leading-6 text-white/45">
                      If an account exists for{" "}
                      <span className="text-white/70">
                        {email}
                      </span>
                      , we've sent you a password reset link.
                    </p>

                    <div className="mt-7 rounded-xl border border-blue-400/10 bg-blue-500/[0.04] px-4 py-3 text-left text-xs leading-5 text-white/35">
                      The reset link will expire after 15
                      minutes for your security.
                    </div>
                  </div>
                )}

                {/* Back */}

                <div className="mt-7 border-t border-white/[0.06] pt-6 text-center">
                  <Link
                    to="/login"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-[13px]
                      font-medium
                      text-white/40
                      transition-colors
                      hover:text-white
                    "
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/20">
            Secure account recovery · AlgoForge
          </p>
        </div>
      </div>

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

export default ForgotPassword;