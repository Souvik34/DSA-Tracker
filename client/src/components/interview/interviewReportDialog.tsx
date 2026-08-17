/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Code2,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import interviewService from "@/services/interviewService";
import { Button } from "@/components/ui/button";

interface InterviewReportDialogProps {
  sessionId: string;
  open: boolean;
  onClose: () => void;
  session?: {
    title?: string;
    company?: string | null;
    role?: string;
    difficulty?: string;
    language?: string;
    created_at?: string;
  };
  question?: string | object;
  code?: string;
}

interface Report {
  overall_score?: number;
  communication_score?: number;
  problem_solving_score?: number;
  optimization_score?: number;
  strengths?: string | string[];
  weaknesses?: string | string[];
  final_feedback?: string;
}

export function InterviewReportDialog({
  sessionId,
  open,
  onClose,
  session,
  question,
  code,
}: InterviewReportDialogProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !sessionId) return;

    const loadReport = async () => {
      setLoading(true);

      try {
        const res =
          await interviewService.getInterviewReport(sessionId);

        setReport(
          res?.data?.data ??
            res?.data?.report ??
            res?.data ??
            null
        );
      } catch (error) {
        console.error("Failed to load interview report:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [open, sessionId]);

  if (!open) return null;

  const formatList = (value?: string | string[]) => {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const getQuestionText = () => {
    if (!question) return "";

    if (typeof question === "string") {
      try {
        const parsed = JSON.parse(question);

        return (
          parsed.description ||
          parsed.problem ||
          parsed.statement ||
          parsed.title ||
          question
        );
      } catch {
        return question;
      }
    }

    return (
      question.description ||
      question.problem ||
      question.statement ||
      ""
    );
  };

  const strengths = formatList(report?.strengths);
  const weaknesses = formatList(report?.weaknesses);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#08090d] shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <Sparkles className="h-4 w-4 text-violet-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Interview Report
                </h2>

                <p className="text-xs text-white/45">
                  Read-only interview summary
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          <div className="space-y-6 p-6">
            {/* Interview metadata */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {session?.title || "AI Mock Interview"}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {session?.company && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                        {session.company}
                      </span>
                    )}

                    {session?.role && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                        {session.role}
                      </span>
                    )}

                    {session?.difficulty && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                        {session.difficulty}
                      </span>
                    )}

                    {session?.language && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60">
                        {session.language}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs uppercase tracking-wider text-white/35">
                    Overall
                  </p>

                  <p className="text-4xl font-bold text-white">
                    {report?.overall_score ?? "--"}
                    <span className="text-lg text-white/30">
                      /100
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />

                  <p className="text-sm text-white/45">
                    Loading interview report...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Question */}
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-violet-400" />

                    <h3 className="font-semibold text-white">
                      Interview Question
                    </h3>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-black/30 p-5">
                    <p className="whitespace-pre-wrap text-sm leading-7 text-white/70">
                      {getQuestionText() ||
                        "Question data unavailable."}
                    </p>
                  </div>
                </section>

                {/* Code */}
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-blue-400" />

                    <h3 className="font-semibold text-white">
                      Your Code
                    </h3>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#050608]">
                    <div className="border-b border-white/[0.06] px-4 py-2">
                      <span className="text-xs text-white/35">
                        Read-only
                      </span>
                    </div>

                    <pre className="max-h-[450px] overflow-auto p-5 text-sm leading-6 text-white/70">
                      <code>
                        {code ||
                          "// No code was submitted during this interview."}
                      </code>
                    </pre>
                  </div>
                </section>

                {/* Scores */}
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-400" />

                    <h3 className="font-semibold text-white">
                      Performance
                    </h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <ScoreCard
                      title="Overall"
                      score={report?.overall_score}
                    />

                    <ScoreCard
                      title="Problem Solving"
                      score={report?.problem_solving_score}
                    />

                    <ScoreCard
                      title="Communication"
                      score={report?.communication_score}
                    />

                    <ScoreCard
                      title="Optimization"
                      score={report?.optimization_score}
                    />
                  </div>
                </section>

                {/* Strengths / weaknesses */}
                <div className="grid gap-4 md:grid-cols-2">
                  <section className="rounded-xl border border-emerald-400/10 bg-emerald-500/[0.035] p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                      <h3 className="font-semibold text-white">
                        Strengths
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {strengths.length > 0 ? (
                        strengths.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-2 text-sm leading-6 text-white/65"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                            <span>{item}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-white/40">
                          No strengths recorded.
                        </p>
                      )}
                    </div>
                  </section>

                  <section className="rounded-xl border border-red-400/10 bg-red-500/[0.035] p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-red-400" />

                      <h3 className="font-semibold text-white">
                        Areas to Improve
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {weaknesses.length > 0 ? (
                        weaknesses.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-2 text-sm leading-6 text-white/65"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

                            <span>{item}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-white/40">
                          No weaknesses recorded.
                        </p>
                      )}
                    </div>
                  </section>
                </div>

                {/* Final feedback */}
                <section className="rounded-xl border border-violet-400/10 bg-violet-500/[0.035] p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-400" />

                    <h3 className="font-semibold text-white">
                      Final Feedback
                    </h3>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-white/65">
                    {report?.final_feedback ||
                      "No final feedback available."}
                  </p>
                </section>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-white/[0.08] px-6 py-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.07]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  title,
  score,
}: {
  title: string;
  score?: number;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
      <p className="text-xs text-white/40">{title}</p>

      <p className="mt-1 text-2xl font-bold text-white">
        {score ?? "--"}
        {score !== undefined && (
          <span className="text-sm text-white/30">
            /100
          </span>
        )}
      </p>
    </div>
  );
}