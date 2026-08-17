/* eslint-disable prettier/prettier */

import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";

import interviewService from "../services/interviewService";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ScreenLoader } from "@/components/ui/screenLoader";

export const Route = createFileRoute("/interviews")({
  component: InterviewsPage,
});

function InterviewsPage() {
  const navigate = useNavigate();

  const [difficulty, setDifficulty] = useState("Medium");
  const [language, setLanguage] = useState("java");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("SDE-1");
  const [questionStrategy, setQuestionStrategy] =
    useState("RELEVANT");

  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await interviewService.startAISession({
        type: "DSA",
        difficulty,
        language,
        company: company.trim() || null,
        role,
        questionStrategy,
      });

      const sessionId = res.data.session.id;

      toast.success("Interview Started!");

      navigate({
        to: `/workspace/${sessionId}`,
      });
    } catch (err: any) {
      console.error("START INTERVIEW ERROR:", err);

      if (err?.response?.status === 429) {
        toast.error(
          err?.response?.data?.message ||
            "You've reached your daily interview limit."
        );
        return;
      }

      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * IMPORTANT:
   * When AI is generating the interview, completely replace
   * the page with the custom ScreenLoader.
   *
   * No button is rendered during loading.
   */
  if (loading) {
    return <ScreenLoader text="Preparing interview" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030507] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      {/* Large blue glow - top left */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          -top-40
          h-[520px]
          w-[520px]
          rounded-full
          bg-blue-600/[0.12]
          blur-[140px]
        "
      />

      {/* Violet glow - top right */}
      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-[5%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-violet-600/[0.10]
          blur-[150px]
        "
      />

      {/* Blue glow - bottom */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-250px]
          left-[25%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/[0.07]
          blur-[150px]
        "
      />

      {/* Violet secondary glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[10%]
          right-[10%]
          h-[250px]
          w-[250px]
          rounded-full
          bg-violet-500/[0.06]
          blur-[100px]
        "
      />

      {/* Very subtle radial texture */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
        "
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.07), transparent 35%)",
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 py-7 md:px-8">

        {/* ===================================================
            TOP BAR
        ==================================================== */}

        <div className="mb-10 flex items-center justify-between">

          {/* Back to dashboard */}
          <Button
            variant="ghost"
            onClick={() => navigate({ to: "/dashboard" })}
            className="
              gap-2
              text-muted-foreground
              transition-all
              hover:bg-white/[0.05]
              hover:text-white
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* AI badge */}
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-400/10
              bg-white/[0.035]
              px-3
              py-1.5
              text-xs
              text-muted-foreground
              backdrop-blur-md
            "
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            AI Interview
          </div>
        </div>

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-9 text-center">

          <div
            className="
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              border
              border-blue-400/15
              bg-blue-500/[0.08]
              shadow-[0_0_40px_rgba(59,130,246,0.08)]
            "
          >
            <Sparkles className="h-6 w-6 text-blue-400" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            AI Mock Interview
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            Configure your interview and practice like you're sitting
            across from a real interviewer.
          </p>
        </div>

        {/* ===================================================
            MAIN CARD
        ==================================================== */}

        <Card
          className="
            mx-auto
            w-full
            max-w-2xl
            overflow-hidden
            border-white/[0.08]
            bg-[#080a0f]/80
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
          "
        >

          <CardHeader
            className="
              border-b
              border-white/[0.07]
              bg-white/[0.015]
              px-6
              py-5
            "
          >
            <h2 className="text-base font-semibold">
              Interview configuration
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Customize the interview based on your target role.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6">

            {/* Difficulty + Language */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Difficulty
                </label>

                <Select
                  value={difficulty}
                  onValueChange={setDifficulty}
                >
                  <SelectTrigger
                    className="
                      border-white/[0.08]
                      bg-white/[0.025]
                      transition
                      hover:bg-white/[0.04]
                    "
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Easy">
                      Easy
                    </SelectItem>

                    <SelectItem value="Medium">
                      Medium
                    </SelectItem>

                    <SelectItem value="Hard">
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Programming Language
                </label>

                <Select
                  value={language}
                  onValueChange={setLanguage}
                >
                  <SelectTrigger
                    className="
                      border-white/[0.08]
                      bg-white/[0.025]
                      transition
                      hover:bg-white/[0.04]
                    "
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="java">
                      Java
                    </SelectItem>

                    <SelectItem value="cpp">
                      C++
                    </SelectItem>

                    <SelectItem value="python">
                      Python
                    </SelectItem>

                    <SelectItem value="javascript">
                      JavaScript
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Company */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Target Company
              </label>

              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Microsoft, Google, Amazon"
                className="
                  h-10
                  w-full
                  rounded-md
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-3
                  text-sm
                  outline-none
                  transition
                  placeholder:text-muted-foreground/50
                  focus:border-blue-500/50
                  focus:ring-1
                  focus:ring-blue-500/20
                "
              />

              <p className="mt-2 text-xs text-muted-foreground">
                Optional. Leave blank for a general software engineering
                interview.
              </p>
            </div>

            {/* Role */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Target Role
              </label>

              <Select
                value={role}
                onValueChange={setRole}
              >
                <SelectTrigger
                  className="
                    border-white/[0.08]
                    bg-white/[0.025]
                  "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="SDE-1">
                    SDE-1
                  </SelectItem>

                  <SelectItem value="SDE-2">
                    SDE-2
                  </SelectItem>

                  <SelectItem value="Senior Software Engineer">
                    Senior Software Engineer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question strategy */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Question Type
              </label>

              <Select
                value={questionStrategy}
                onValueChange={setQuestionStrategy}
              >
                <SelectTrigger
                  className="
                    border-white/[0.08]
                    bg-white/[0.025]
                  "
                >
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="RELEVANT">
                    Interview Relevant
                  </SelectItem>

                  <SelectItem value="PYQ">
                    Reported Interview Question
                  </SelectItem>

                  <SelectItem value="UNSEEN">
                    Unseen Question
                  </SelectItem>

                  <SelectItem value="MIXED">
                    Mixed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI information */}

            <div
              className="
                rounded-xl
                border
                border-blue-400/10
                bg-blue-500/[0.035]
                p-4
              "
            >
              <div className="flex gap-3">

                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                <div>
                  <p className="text-sm font-medium">
                    AI-powered interview
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your interviewer will adapt follow-up questions
                    based on your approach, code, and responses.
                  </p>
                </div>

              </div>
            </div>

            {/* =================================================
                START BUTTON
            ================================================== */}

            <Button
              className="
                h-11
                w-full
                border-0
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-violet-600
                font-medium
                shadow-lg
                shadow-blue-950/30
                transition-all
                hover:scale-[1.005]
                hover:from-blue-500
                hover:via-blue-400
                hover:to-violet-500
              "
              size="lg"
              onClick={startInterview}
              disabled={loading}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Interview
            </Button>

            {/* Daily limit */}

            <p className="text-center text-[11px] text-muted-foreground">
              Free users can start up to{" "}
              <span className="font-medium text-white/70">
                3 AI interviews
              </span>{" "}
              per day.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}