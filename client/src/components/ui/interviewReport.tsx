/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";

import ScoreCard from "@/components/ui/scoreCard";
import { interviewService } from "@/services/interviewService";

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

        <div
            className="
            min-h-screen
            bg-black
            text-white
            p-8
        "
        >

            <h1
                className="
                text-3xl
                font-bold
            "
            >
                🎉 Interview Completed
            </h1>

            <p
                className="
                text-gray-400
                mt-2
            "
            >
                AI Generated Performance Report
            </p>

            {/* Scores */}

            <div
                className="
                grid
                grid-cols-4
                gap-5
                mt-8
            "
            >

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

            {/* Strengths & Weaknesses */}

            <div
                className="
                grid
                grid-cols-2
                gap-6
                mt-10
            "
            >

                <div
                    className="
                    bg-gray-900
                    rounded-xl
                    p-5
                "
                >

                    <h2
                        className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                    >
                        Strengths
                    </h2>

                    {

                        report.strengths.map(

                            (item, index) => (

                                <p
                                    key={index}
                                    className="
                                    text-green-400
                                    mb-2
                                "
                                >

                                    ✓ {item}

                                </p>

                            )

                        )

                    }

                </div>

                <div
                    className="
                    bg-gray-900
                    rounded-xl
                    p-5
                "
                >

                    <h2
                        className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                    >
                        Weaknesses
                    </h2>

                    {

                        report.weaknesses.map(

                            (item, index) => (

                                <p
                                    key={index}
                                    className="
                                    text-yellow-400
                                    mb-2
                                "
                                >

                                    → {item}

                                </p>

                            )

                        )

                    }

                </div>

            </div>

            {/* Final Feedback */}

            <div
                className="
                mt-8
                bg-violet-900
                rounded-xl
                p-6
            "
            >

                <h2
                    className="
                    text-xl
                    font-semibold
                "
                >
                    Final Feedback
                </h2>

                <p
                    className="
                    mt-4
                    leading-7
                    text-lg
                "
                >
                    {report.finalFeedback}
                </p>

            </div>

        </div>

    );

}