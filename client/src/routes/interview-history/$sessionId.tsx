/* eslint-disable prettier/prettier */

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Code2,
  FileText,
  MessageSquare,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import interviewService from "../../services/interviewService";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/interview-history/$sessionId"
)({
  component: InterviewHistoryDetailPage,
});

function InterviewHistoryDetailPage() {
  console.log("🔥🔥 DETAIL PAGE COMPONENT RENDERED");

  const navigate = useNavigate();

  const { sessionId } = Route.useParams();

  console.log("🔥 SESSION ID:", sessionId);

  const [interview, setInterview] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    console.log("🚀 DETAIL EFFECT STARTED");
    console.log("🚀 SESSION ID:", sessionId);

    const loadInterview = async () => {
      try {
        setLoading(true);

        console.log(
          "📡 Fetching interview history..."
        );

        const response =
          await interviewService.getInterviewHistory();

        console.log(
          "📡 FULL HISTORY RESPONSE:",
          response
        );

        console.log(
          "📡 RESPONSE DATA:",
          response.data
        );

        const history =
          response.data?.data ?? [];

        console.log(
          "📋 HISTORY:",
          history
        );

        console.log(
          "📋 HISTORY LENGTH:",
          history.length
        );

        const selectedInterview =
          history.find(
            (item: any) =>
              String(item.id) ===
              String(sessionId)
          );

        console.log(
          "🎯 SELECTED INTERVIEW:",
          selectedInterview
        );

        if (!selectedInterview) {
          console.error(
            "❌ INTERVIEW NOT FOUND:",
            sessionId
          );

          toast.error(
            "Interview not found."
          );

          navigate({
            to: "/interview-history",
          });

          return;
        }

        console.log(
          "✅ SETTING INTERVIEW:",
          selectedInterview
        );

        setInterview(selectedInterview);
      } catch (error) {
        console.error(
          "❌ Failed to load interview:",
          error
        );

        toast.error(
          "Failed to load interview details."
        );
      } finally {
        console.log(
          "🏁 FINISHED LOADING INTERVIEW"
        );

        setLoading(false);
      }
    };

    loadInterview();
  }, [sessionId, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050608] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />

          <p className="text-sm text-muted-foreground">
            Loading interview...
          </p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return null;
  }

  const question =
    interview.question || {};

  const report =
    interview.report || {};

  const formatDate = (
    date: string | null
  ) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const scoreItems = [
    {
      label: "Overall",
      value: report.overallScore,
      icon: Trophy,
    },
    {
      label: "Problem Solving",
      value: report.problemSolvingScore,
      icon: Target,
    },
    {
      label: "Communication",
      value: report.communicationScore,
      icon: MessageSquare,
    },
    {
      label: "Optimization",
      value: report.optimizationScore,
      icon: Code2,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050608] text-white">
      {/* Background blobs */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/[0.12] blur-[140px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.10] blur-[150px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-indigo-600/[0.08] blur-[140px]" />

      {/* Grid */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
        {/* Top bar */}

        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() =>
              navigate({
                to: "/interview-history",
              })
            }
            className="gap-2 text-muted-foreground hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to History
          </Button>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />

            Completed Interview
          </div>
        </div>

        {/* Header */}

        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {interview.title ||
                  "AI Mock Interview"}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {interview.difficulty}
                </span>

                <span className="text-white/20">
                  •
                </span>

                <span>
                  {interview.language}
                </span>

                {interview.company && (
                  <>
                    <span className="text-white/20">
                      •
                    </span>

                    <span>
                      {interview.company}
                    </span>
                  </>
                )}

                <span className="text-white/20">
                  •
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />

                  {formatDate(
                    interview.endedAt
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Score cards */}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scoreItems.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="border-white/[0.08] bg-white/[0.035] shadow-xl shadow-black/20 backdrop-blur-xl"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>

                      <p className="mt-1 text-2xl font-semibold">
                        {item.value ?? "—"}

                        {item.value != null && (
                          <span className="ml-1 text-sm text-muted-foreground">
                            /100
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <Icon className="h-4 w-4 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}

          <div className="space-y-6">
            {/* Question */}

            <Card className="border-white/[0.08] bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <CardHeader className="border-b border-white/[0.06] px-6 py-5">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-blue-400" />

                  <h2 className="font-semibold">
                    Interview Question
                  </h2>
                </div>
              </CardHeader>

              <CardContent className="px-6 py-6">
                <h3 className="text-lg font-semibold">
                  {question.title ||
                    interview.title ||
                    "Interview Question"}
                </h3>

                {question.description && (
                  <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {question.description}
                  </div>
                )}

                {question.problem && (
                  <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                    {question.problem}
                  </div>
                )}

                {question.constraints &&
                  Array.isArray(
                    question.constraints
                  ) && (
                    <div className="mt-6">
                      <p className="mb-2 text-sm font-medium text-white">
                        Constraints
                      </p>

                      <ul className="space-y-2">
                        {question.constraints.map(
                          (
                            constraint: string,
                            index: number
                          ) => (
                            <li
                              key={index}
                              className="rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 text-xs text-muted-foreground"
                            >
                              {constraint}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>

            {/* Code */}

            <Card className="overflow-hidden border-white/[0.08] bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <CardHeader className="border-b border-white/[0.06] px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-violet-400" />

                    <h2 className="font-semibold">
                      Your Solution
                    </h2>
                  </div>

                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {interview.language}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <pre className="max-h-[650px] overflow-auto bg-[#020305] p-5 text-xs leading-6 text-slate-300">
                  <code>
                    {interview.code ||
                      "// No code was submitted during this interview."}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Right */}

          <div className="space-y-6">
            {/* Final feedback */}

            <Card className="border-white/[0.08] bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-xl">
              <CardHeader className="border-b border-white/[0.06] px-6 py-5">
                <h2 className="font-semibold">
                  Interview Report
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  AI-generated feedback from your interview.
                </p>
              </CardHeader>

              <CardContent className="space-y-6 px-6 py-6">
                {report.finalFeedback && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Overall Feedback
                    </p>

                    <p className="text-sm leading-6 text-slate-300">
                      {report.finalFeedback}
                    </p>
                  </div>
                )}

                {report.strengths && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-emerald-400">
                      Strengths
                    </p>

                    <div className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {report.strengths}
                    </div>
                  </div>
                )}

                {report.weaknesses && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-amber-400">
                      Areas to Improve
                    </p>

                    <div className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {report.weaknesses}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Interview metadata */}

            <Card className="border-white/[0.08] bg-white/[0.035] shadow-xl shadow-black/20 backdrop-blur-xl">
              <CardHeader className="px-6 pb-3 pt-5">
                <h2 className="text-sm font-semibold">
                  Interview Details
                </h2>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Role
                    </span>

                    <span className="text-right">
                      {interview.role ||
                        "SDE-1"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Company
                    </span>

                    <span className="text-right">
                      {interview.company ||
                        "General"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Difficulty
                    </span>

                    <span className="text-right">
                      {interview.difficulty}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Language
                    </span>

                    <span className="text-right uppercase">
                      {interview.language}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Question Type
                    </span>

                    <span className="text-right">
                      {interview.questionStrategy ||
                        "Interview Relevant"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}