/* eslint-disable prettier/prettier */

import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "@tanstack/react-router";
import { Code2, ArrowUpRight } from "lucide-react";

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

  const handleGoogleLogin = () => {
    authService.googleLogin();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return;
    }

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
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-foreground">
      {/* Background glow - top left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.65) 0%, rgba(99,102,241,0.25) 35%, transparent 70%)",
        }}
      />

      {/* Background glow - bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -right-40 h-[650px] w-[650px] rounded-full opacity-25 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.65) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)",
        }}
      />

      {/* Center glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[100px]"
        style={{
          background:
            "linear-gradient(135deg, #2563eb, #7c3aed, #06b6d4)",
        }}
      />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative grid min-h-screen lg:grid-cols-2">
        {/* =========================================================
            LEFT BRAND PANEL
        ========================================================== */}

        <div className="relative hidden overflow-hidden border-r border-white/[0.07] lg:block">
          <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              to="/"
              className="group flex w-fit items-center gap-2.5"
            >
              <div
                className="relative grid h-10 w-10 place-items-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
                  boxShadow:
                    "0 0 30px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <Code2 className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold tracking-tight text-white">
                AlgoForge
              </span>
            </Link>

            {/* Main content */}
            <div className="relative max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.07] px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />

                Built for serious engineers
              </div>

              <h2 className="text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-white xl:text-5xl">
                Master DSA.
                <br />

                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Crack the interview.
                </span>
              </h2>

              <p className="mt-5 max-w-md text-[15px] leading-7 text-white/45">
                Curated problems, intelligent revision, daily practice, and an
                AI interview coach designed to make you genuinely
                interview-ready.
              </p>

              {/* Feature cards */}
              <div className="mt-9 grid max-w-lg grid-cols-3 gap-3">
                {[
                  {
                    value: "1200+",
                    label: "Problems",
                  },
                  {
                    value: "AI",
                    label: "Interview Coach",
                  },
                  {
                    value: "Daily",
                    label: "Practice",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-4 backdrop-blur-md transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.04]"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <p className="text-sm font-semibold text-white">
                      {item.value}
                    </p>

                    <p className="mt-1 text-[11px] text-white/35">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom text */}
            <div className="flex items-center gap-3 text-[11px] text-white/25">
              <span>© {new Date().getFullYear()} AlgoForge</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>Build. Practice. Interview.</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT AUTH AREA
        ========================================================== */}

        <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-[410px]">
            {/* Mobile logo */}
            <div className="mb-9 flex items-center gap-2.5 lg:hidden">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #2563eb, #4f46e5, #7c3aed)",
                  boxShadow: "0 0 25px rgba(59,130,246,0.25)",
                }}
              >
                <Code2 className="h-5 w-5" />
              </div>

              <span className="text-sm font-semibold text-white">
                AlgoForge
              </span>
            </div>

            {/* Colorful outline */}
            <div
              className="relative rounded-[26px] p-[1px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.65), rgba(99,102,241,0.3) 35%, rgba(139,92,246,0.55) 70%, rgba(6,182,212,0.3))",
                boxShadow:
                  "0 0 50px rgba(37,99,235,0.08), 0 25px 80px rgba(0,0,0,0.45)",
              }}
            >
              {/* Inner card */}
              <div className="relative overflow-hidden rounded-[25px] border border-white/[0.06] bg-[#090b10]/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
                {/* Top shine */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(96,165,250,0.6), rgba(139,92,246,0.5), transparent)",
                  }}
                />

                {/* Corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-20 blur-[70px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb, #7c3aed)",
                  }}
                />

                <div className="relative">
                  {/* Heading */}
                  <div>
                    <h1 className="text-[27px] font-semibold tracking-[-0.025em] text-white">
                      {title}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {subtitle}
                    </p>
                  </div>

                  {/* Google Login */}
                  <div className="group relative mt-7 rounded-xl p-[1px]">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-xl opacity-60 blur-[1px] transition-all duration-500 group-hover:opacity-100 group-hover:blur-[2px]"
                      style={{
                        background:
                          "linear-gradient(90deg, #4285F4, #8B5CF6, #06B6D4, #4285F4)",
                        backgroundSize: "300% 100%",
                        animation: "googleBorder 5s linear infinite",
                      }}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="relative h-11 w-full overflow-hidden rounded-[11px] border-0 bg-[#0c0f15] text-sm font-medium text-white transition-all duration-300 hover:bg-[#11151d]"
                    >
                      {/* Shimmer */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                      />

                      {/* Google icon */}
                      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.07]">
                        <GoogleIcon />
                      </span>

                      <span className="relative ml-1">
                        Continue with Google
                      </span>

                      <ArrowUpRight className="relative ml-auto h-4 w-4 text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70" />
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.08]" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                      or continue with email
                    </span>

                    <div className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  {/* Form */}
                  <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                  >
                    {/* Name */}
                    {withName && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-xs font-medium text-white/65"
                        >
                          Full name
                        </Label>

                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="h-11 rounded-xl border-white/[0.1] bg-white/[0.035] text-sm text-white placeholder:text-white/20 transition-all focus:border-blue-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                        />
                      </div>
                    )}

                    {/* Email */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium text-white/65"
                      >
                        Email
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 rounded-xl border-white/[0.1] bg-white/[0.035] text-sm text-white placeholder:text-white/20 transition-all focus:border-blue-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-xs font-medium text-white/65"
                      >
                        Password
                      </Label>

                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-11 rounded-xl border-white/[0.1] bg-white/[0.035] text-sm text-white placeholder:text-white/20 transition-all focus:border-blue-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className="relative mt-2 h-11 w-full overflow-hidden rounded-xl border-0 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] disabled:hover:scale-100"
                      style={{
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
                        boxShadow:
                          "0 8px 30px rgba(59,130,246,0.18), inset 0 1px 0 rgba(255,255,255,0.16)",
                      }}
                    >
                      <span className="relative z-10">
                        {loading ? "Please wait…" : submitLabel}
                      </span>

                      <span
                        aria-hidden
                        className="absolute inset-y-0 -left-20 w-20 rotate-12 bg-white/10 blur-md transition-transform duration-700"
                      />
                    </Button>
                  </form>

                  {/* Footer */}
                  <div className="mt-6 text-center text-xs leading-5 text-white/35">
                    {footer}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile bottom */}
            <p className="mt-6 text-center text-[10px] text-white/20 lg:hidden">
              © {new Date().getFullYear()} AlgoForge
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes googleBorder {
          0% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }

          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

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
        d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.21 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52C7.31 7.83 9.46 6.11 12 6.11Z"
      />
    </svg>
  );
}