/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
    CheckCircle2,
    AlertTriangle,
    MessageSquareText
} from "lucide-react";
import ScoreCard from "@/components/ui/scoreCard";
import { interviewService } from "@/services/interviewService";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
interface Report {
    overallScore: number;
    communicationScore: number;
    problemSolvingScore: number;
    optimizationScore: number;

    strengths: string[];
    weaknesses: string[];

    finalFeedback: string;
}

export default function InterviewReport() {
    
    const { sessionId } = useParams({
        from: "/interview/$sessionId/report",
    });
    const navigate = useNavigate();
   
    
    const [report, setReport] =
        useState<Report | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadReport();
    }, [sessionId]);

    const loadReport = async () => {

        try {

            const res =
                await interviewService.getInterviewReport(
                    sessionId!
                );

            // Backend returns:
            // {
            //   success:true,
            //   feedback:{...}
            // }
setReport({
    overallScore: res.data.overall_score,
    communicationScore: res.data.communication_score,
    problemSolvingScore: res.data.problem_solving_score,
    optimizationScore: res.data.optimization_score,

    strengths: Array.isArray(res.data.strengths)
        ? res.data.strengths
        : [res.data.strengths],

    weaknesses: Array.isArray(res.data.weaknesses)
        ? res.data.weaknesses
        : [res.data.weaknesses],

    finalFeedback: res.data.final_feedback
});
   } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div
                className="
                h-screen
                bg-black
                text-white
                flex
                items-center
                justify-center
            "
            >

                Generating Report...

            </div>

        );

    }

    if (!report) {

        return (

            <div
                className="
                h-screen
                bg-black
                text-white
                flex
                items-center
                justify-center
            "
            >

                Report not found

            </div>

        );

    }

return (
  <div className="min-h-screen bg-black text-white">
    <div className="max-w-7xl mx-auto px-8 py-10">

    
     {/* HEADER */}

<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

    <div>

        <motion.h1

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: .5 }}

            className="
            text-5xl
            font-black
            tracking-tight
        "

        >

            Interview Performance Report

        </motion.h1>

        <p
            className="
            mt-3
            text-lg
            text-zinc-400
        "
        >

            AI Generated Technical Evaluation

        </p>

    </div>





    {/* Readiness Indicator */}

    <motion.div

        initial={{
            opacity:0,
            scale:.8
        }}

        animate={{
            opacity:1,
            scale:1
        }}

        transition={{
            duration:.5
        }}

        className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-emerald-500/20
        bg-emerald-500/10
        px-6
        py-4
    "

    >

        <span
            className="
            relative
            flex
            h-4
            w-4
        "
        >

            <span
                className="
                absolute
                inline-flex
                h-full
                w-full
                rounded-full
                bg-emerald-400
                opacity-75
                animate-ping
            "
            />

            <span
                className="
                relative
                inline-flex
                h-4
                w-4
                rounded-full
                bg-emerald-400
            "
            />

        </span>

        <div>

            <p
                className="
                text-sm
                text-zinc-400
            "
            >

                Interview Readiness

            </p>

            <h3
                className="
                text-xl
                font-bold
                text-emerald-400
            "
            >

                Strong Pass

            </h3>

        </div>

    </motion.div>







    <div className="flex gap-3">

        <button

            onClick={() =>
                navigate({
                    to: "/dashboard",
                })
            }

            className="
            rounded-xl
            border
            border-zinc-700
            px-6
            py-3
            hover:border-violet-500
            transition
        "

        >

            Dashboard

        </button>

        <button

            onClick={() =>
                navigate({
                    to: "/interview",
                })
            }

            className="
            rounded-xl
            bg-violet-600
            px-6
            py-3
            hover:bg-violet-500
            transition
        "

        >

            Practice Again

        </button>

    </div>

</div>

      {/* SCORE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <ScoreCard
          title="Overall"
          score={report.overallScore}
        />

        <ScoreCard
          title="Problem Solving"
          score={report.problemSolvingScore}
        />

        <ScoreCard
          title="Communication"
          score={report.communicationScore}
        />

        <ScoreCard
          title="Optimization"
          score={report.optimizationScore}
        />
      </div>

      {/* DETAILS */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Strengths */}
        <div
          className="
            rounded-3xl
            border
            border-emerald-700/30
            bg-zinc-950
            p-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-emerald-500/20
                flex
                items-center
                justify-center
              "
            >
              <CheckCircle2
                size={22}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Strengths
              </h2>

              <p className="text-zinc-500 text-sm">
                Areas where you performed well
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {report.strengths.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  gap-3
                  items-start
                  rounded-xl
                  bg-zinc-900
                  p-4
                "
              >
                <CheckCircle2
                  size={18}
                  className="
                    text-emerald-400
                    mt-1
                    shrink-0
                  "
                />

                <p className="leading-7 text-zinc-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div
          className="
            rounded-3xl
            border
            border-amber-700/30
            bg-zinc-950
            p-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-amber-500/20
                flex
                items-center
                justify-center
              "
            >
              <AlertTriangle
                size={22}
                className="text-amber-400"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Areas to Improve
              </h2>

              <p className="text-zinc-500 text-sm">
                Suggestions for future interviews
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {report.weaknesses.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  gap-3
                  items-start
                  rounded-xl
                  bg-zinc-900
                  p-4
                "
              >
                <AlertTriangle
                  size={18}
                  className="
                    text-amber-400
                    mt-1
                    shrink-0
                  "
                />

                <p className="leading-7 text-zinc-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL FEEDBACK */}
      <div
        className="
          mt-10
          rounded-3xl
          border
          border-violet-700/30
          bg-gradient-to-r
          from-zinc-950
          to-violet-950/30
          p-8
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-violet-600/20
              flex
              items-center
              justify-center
            "
          >
            <MessageSquareText
              size={24}
              className="text-violet-400"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Final Feedback
            </h2>

            <p className="text-zinc-500">
              Overall AI Interview Summary
            </p>
          </div>
        </div>

        <div
          className="
            mt-6
            rounded-2xl
            bg-zinc-900/70
            border
            border-zinc-800
            p-6
          "
        >
          <p
            className="
              leading-8
              text-lg
              text-zinc-300
            "
          >
            {report.finalFeedback}
          </p>
        </div>
      </div>

    </div>
  </div>
);
}