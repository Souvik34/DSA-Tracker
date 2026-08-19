/* eslint-disable prettier/prettier */

import { api } from "@/lib/api";
import { useState } from "react";
import { Bug, Check, Send, X } from "lucide-react";

export function BugReportButton() {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async () => {
  if (!description.trim() || loading) return;

  setLoading(true);
  setError("");

  try {
    await api.post("/auth/feedback/bug", {
      description: description.trim(),
      page: window.location.pathname,
    });

    setSubmitted(true);
    setDescription("");

    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 1800);
  } catch (error) {
    console.error("Bug report error:", error);

    setError(
      "Unable to send the bug report. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* =========================================================
          FLOATING BUG CAPSULE
      ========================================================== */}

      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSubmitted(false);
          setError("");
        }}
        aria-label="Report a bug"
        className="
          group
          fixed
          bottom-7
          right-0
          z-[9999]

          flex
          h-[52px]
          w-[54px]

          items-center
          justify-start

          overflow-hidden

          rounded-l-full
          rounded-r-none

          border
          border-r-0
          border-white/[0.12]

          bg-[#080a10]/95

          pl-[15px]

          text-white

          backdrop-blur-2xl

          transition-all
          duration-500
          ease-out

          hover:w-[165px]

          hover:border-cyan-300/40
          hover:bg-[#0b0e17]/98

          active:scale-[0.98]
        "
        style={{
          boxShadow:
            "0 0 18px rgba(34,211,238,0.18), 0 0 35px rgba(139,92,246,0.12), inset 0 0 18px rgba(255,255,255,0.025)",
        }}
      >
        {/* Neon outer glow */}

        <span
          aria-hidden
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-l-full
            opacity-70
            blur-[2px]
            transition-all
            duration-500
            group-hover:opacity-100
          "
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(34,211,238,0.35), 0 0 18px rgba(34,211,238,0.18), 0 0 32px rgba(168,85,247,0.12)",
          }}
        />

        {/* Animated neon pulse */}

        <span
          aria-hidden
          className="
            pointer-events-none
            absolute
            -inset-1
            rounded-l-full
            opacity-0
            blur-md
            transition-opacity
            duration-500
            group-hover:opacity-100
            animate-[neonPulse_2.4s_ease-in-out_infinite]
          "
          style={{
            background:
              "linear-gradient(90deg, rgba(34,211,238,0.3), rgba(168,85,247,0.25), rgba(236,72,153,0.25))",
          }}
        />

        {/* Icon */}

        <span
          className="
            relative
            z-10
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full

            border
            border-cyan-300/25

            bg-gradient-to-br
            from-cyan-400/15
            via-violet-500/15
            to-pink-500/15

            shadow-[0_0_15px_rgba(34,211,238,0.2)]

            transition-all
            duration-500

            group-hover:rotate-[-12deg]
            group-hover:scale-110
          "
        >
          <Bug
            className="
              h-[18px]
              w-[18px]
              text-cyan-300
              drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]
              transition-colors
              duration-500
              group-hover:text-pink-300
            "
          />
        </span>

        {/* Text */}

        <span
          className="
            relative
            z-10

            ml-2

            max-w-0
            overflow-hidden
            whitespace-nowrap

            text-[13px]
            font-semibold
            tracking-wide

            text-white

            opacity-0

            transition-all
            duration-500
            ease-out

            group-hover:max-w-[100px]
            group-hover:opacity-100
          "
          style={{
            textShadow:
              "0 0 10px rgba(34,211,238,0.35)",
          }}
        >
          Report Bug
        </span>

       

       
      </button>

      {/* =========================================================
          MODAL
      ========================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[10000]
            flex
            items-center
            justify-center
            bg-black/65
            px-4
            backdrop-blur-md
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-[430px]
              overflow-hidden
              rounded-[24px]
              border
              border-white/[0.10]
              bg-[#080a10]
              p-6
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]
            "
            style={{
              boxShadow:
                "0 0 45px rgba(34,211,238,0.08), 0 30px 100px rgba(0,0,0,0.7)",
            }}
          >
            {/* Cyan glow */}

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-cyan-400/[0.12]
                blur-[75px]
              "
            />

            {/* Violet glow */}

            <div
              aria-hidden
              className="
                pointer-events-none
                absolute
                -bottom-24
                -left-20
                h-44
                w-44
                rounded-full
                bg-violet-500/[0.10]
                blur-[70px]
              "
            />

            {/* Close */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                absolute
                right-4
                top-4
                rounded-lg
                p-2
                text-white/50
                transition-all
                hover:bg-white/[0.06]
                hover:text-white
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="relative py-8 text-center">
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
                    border-cyan-300/25
                    bg-cyan-400/[0.08]
                    shadow-[0_0_30px_rgba(34,211,238,0.15)]
                  "
                >
                  <Check className="h-7 w-7 text-cyan-300" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-white">
                  Thanks for reporting it!
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/65">
                  Your report has been received. We'll look into it.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Header */}

                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl

                      border
                      border-cyan-300/20

                      bg-gradient-to-br
                      from-cyan-400/[0.12]
                      to-violet-500/[0.10]

                      shadow-[0_0_20px_rgba(34,211,238,0.1)]
                    "
                  >
                    <Bug
                      className="
                        h-5
                        w-5
                        text-cyan-300
                        drop-shadow-[0_0_7px_rgba(34,211,238,0.7)]
                      "
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Found a bug?
                    </h3>

                    <p className="mt-1 text-[13px] leading-5 text-white/65">
                      Tell us what went wrong and we'll take a look.
                    </p>
                  </div>
                </div>

                {/* Description */}

                <div className="mt-6">
                  <label
                    htmlFor="bug-description"
                    className="
                      text-[13px]
                      font-medium
                      text-white/80
                    "
                  >
                    What happened?
                  </label>

                  <textarea
                    id="bug-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue you encountered..."
                    rows={5}
                    className="
                      mt-2
                      w-full
                      resize-none
                      rounded-xl

                      border
                      border-white/[0.10]

                      bg-white/[0.035]

                      px-4
                      py-3

                      text-sm
                      text-white

                      outline-none

                      placeholder:text-white/40

                      transition-all

                      focus:border-cyan-300/35
                      focus:bg-white/[0.05]
                      focus:ring-2
                      focus:ring-cyan-400/10
                    "
                  />
                </div>

                {error && (
                  <div
                    className="
                      mt-3
                      rounded-xl
                      border
                      border-red-400/20
                      bg-red-500/[0.07]
                      px-3
                      py-2.5
                      text-xs
                      text-red-300
                    "
                  >
                    {error}
                  </div>
                )}

                {/* Page */}

                <div
                  className="
                    mt-3
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-3
                    py-2
                    text-[11px]
                    text-white/45
                  "
                >
                  Page:{" "}
                  <span className="text-white/75">
                    {window.location.pathname}
                  </span>
                </div>

                {/* Submit */}

                <button
                  type="button"
                  disabled={!description.trim() || loading}
                  onClick={handleSubmit}
                  className="
                    mt-5
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl

                    text-sm
                    font-semibold
                    text-white

                    transition-all
                    duration-300

                    disabled:cursor-not-allowed
                    disabled:opacity-40

                    hover:scale-[1.01]
                    active:scale-[0.99]
                  "
                  style={{
                    background:
                      "linear-gradient(135deg,#06b6d4,#4f46e5,#a855f7,#ec4899)",
                    boxShadow:
                      "0 8px 30px rgba(34,211,238,0.15), 0 8px 30px rgba(168,85,247,0.12)",
                  }}
                >
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send bug report
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-white/45">
                  We'll use this information only to investigate the issue.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes neonPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.8;
            transform: scale(1.04);
          }
        }
      `}</style>
    </>
  );
}

export default BugReportButton;

