import {
    createInterviewSessionRepo,
    insertInterviewMessageRepo,
    getInterviewSessionRepo,
    getInterviewMessagesRepo,
    createInterviewFeedbackRepo,
    endInterviewSessionRepo,
    updateInterviewPhaseRepo,
    updateCodeSnapshotRepo,
    recordInterruptRepo,
    resetInterruptRepo
} from "./interview.repository.js";


import { generateStructuredQuestion } from "./questionGenerator.ai.js";

import { evaluateCode } from "./codeEvaluation.service.js";

import { generateInterviewFeedback } from "./interview.ai.js";

import {
    detectSubmissionType,
    analyzeCodeProgress,
    SubmissionType
} from "./codeDetector.js";

import {
    shouldInterrupt,
    getInterruptReason
} from "./interviewDecisionEngine.js";

import {
    InterviewPhase,
    decideNextPhase
} from "./interviewStateMachine.js";

import {
    generateInterviewerResponse
} from "./interviewer.ai.js";

export const startInterviewService = async ({
    userId,
    type,
    difficulty,
    language
}) => {

    const rawQuestion =
        await generateStructuredQuestion({
            difficulty,
            language
        });
console.log(rawQuestion);
    let question;

 try {

    const cleaned = rawQuestion
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    const jsonString = cleaned.substring(start, end + 1);

    question = JSON.parse(jsonString);

    const starter =
        question.starterCode ||
        question.starter_code ||
        {};

    question.starterCode =
        typeof starter === "string"
            ? starter
            : starter[language] || "";

    delete question.optimal_solution;
    delete question.solution;
    delete question.answer;

} catch (err) {

    console.error("RAW RESPONSE:\n", rawQuestion);
    console.error("PARSE ERROR:", err);
    throw err;

}
    const session =
        await createInterviewSessionRepo({

            userId,

            type,

            difficulty,

            language,

            title: question.title,

            currentQuestion:
                JSON.stringify(question)

        });

    await updateInterviewPhaseRepo(

        session.id,

        InterviewPhase.UNDERSTANDING

    );

    // await insertInterviewMessageRepo({

    //     sessionId: session.id,

    //     sender: "ai",

    //     message:
    //         question.interviewGuide
    //             .openingQuestion

    // });
await insertInterviewMessageRepo({
    sessionId: session.id,
    sender: "ai",
    message:
        question.interviewGuide?.openingQuestion ||
        "Let's begin. Can you explain the problem in your own words?"
});
   const responseQuestion = {
    ...question
};

delete responseQuestion.hiddenTestCases;
delete responseQuestion.interviewGuide;
delete responseQuestion.expectedConcepts;
delete responseQuestion.expectedComplexity;

return {

    session: {
        id: session.id,
        status: session.status,
        phase: InterviewPhase.UNDERSTANDING
    },

    firstQuestion: responseQuestion

};
};


export const sendInterviewMessageService = async ({
    sessionId,
    message
}) => {

    const session =
        await getInterviewSessionRepo(sessionId);

    if (!session) {
        throw new Error(
            "Interview session not found."
        );
    }

    // Save user message
    await insertInterviewMessageRepo({

        sessionId,

        sender: "user",

        message

    });

    // Load interview package
    let interviewPackage;

    try {

        interviewPackage = JSON.parse(
            session.current_question
        );

    } catch (err) {

        throw new Error(
            "Interview package corrupted."
        );

    }

    // Entire conversation
    const conversation =
        await getInterviewMessagesRepo(
            sessionId
        );

    //--------------------------------------------------
    // Detect whether candidate sent code
    //--------------------------------------------------

    const submissionType =
        detectSubmissionType(message);

    const codeDetected =
        submissionType === SubmissionType.CODE;

    let evaluation = null;

    let codeAnalysis = null;

    //--------------------------------------------------
    // Judge0 Evaluation
    //--------------------------------------------------

    if (
        codeDetected &&
        session.type === "DSA"
    ) {

        codeAnalysis =
            analyzeCodeProgress({

                previousCode:
                    session.last_code || "",

                currentCode:
                    message,

                interviewGuide:
                    interviewPackage.interviewGuide

            });

        const testCases = [

            ...(interviewPackage.visibleTestCases || []),

            ...(interviewPackage.hiddenTestCases || [])

        ];

        evaluation =
            await evaluateCode({

                language:
                    session.language,

                code:
                    message,

                testCases

            });

        await updateCodeSnapshotRepo({

            sessionId,

            code: message

        });

    }

    //--------------------------------------------------
    // Decide Interview Phase
    //--------------------------------------------------

    const nextPhase =
        decideNextPhase({

            currentPhase:
                session.phase,

            evaluation,

            codeDetected,

            approachAccepted:
                !codeDetected

        });

    if (
        nextPhase !== session.phase
    ) {

        await updateInterviewPhaseRepo(

            sessionId,

            nextPhase

        );

        await resetInterruptRepo(
            sessionId
        );

    }

    //--------------------------------------------------
    // Decide whether interviewer should interrupt
    //--------------------------------------------------

    const interrupt =
        shouldInterrupt({

            phase:
                nextPhase,

            evaluation,

            interruptionCount:
                session.interruption_count,

            codeAnalysis,

            lastInterruptAtVersion:
                session.last_interrupt_at_version,

            currentCodeVersion:
                session.code_version +
                (codeDetected ? 1 : 0)

        });

    let aiReply = null;

    //--------------------------------------------------
    // Decide interrupt reason
    //--------------------------------------------------

    let interruptReason = null;

    if (interrupt) {

        interruptReason =
            getInterruptReason({

                phase:
                    nextPhase,

                evaluation,

                codeAnalysis

            });
            //--------------------------------------------------
// Generate interviewer response
//--------------------------------------------------

if (interrupt) {

    const rawResponse =
        await generateInterviewerResponse({

            phase: nextPhase,

            interviewGuide:
                interviewPackage.interviewGuide,

            expectedConcepts:
                interviewPackage.expectedConcepts,

            conversation,

            candidateMessage: message,

            evaluation,

            interruptReason

        });

    try {

        const cleaned =
            rawResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        const parsed =
            JSON.parse(cleaned);

        aiReply =
            parsed.reply;

    } catch (err) {

        console.error(
            "Interviewer response parse failed",
            rawResponse
        );

        aiReply =
            "Can you explain your reasoning behind this step?";
    }

    //--------------------------------------------------
    // Record interruption
    //--------------------------------------------------

    await recordInterruptRepo({

        sessionId,

        codeVersion:
            session.code_version +
            (codeDetected ? 1 : 0)

    });

}
else {

    aiReply =
        "Continue.";

}

//--------------------------------------------------
// Save AI message
//--------------------------------------------------

await insertInterviewMessageRepo({

    sessionId,

    sender: "ai",

    message: aiReply

});

//--------------------------------------------------
// Return
//--------------------------------------------------

return {

    aiReply,

    phase: nextPhase,

    evaluation,

    codeAnalysis,

    interrupted: interrupt

};

};

    }
    
export const endInterviewService = async (sessionId) => {

    const session =
        await getInterviewSessionRepo(sessionId);

    if (!session) {
        throw new Error("Interview session not found");
    }

    const conversation =
        await getInterviewMessagesRepo(sessionId);

    let interviewPackage = {};

    try {

        interviewPackage =
            JSON.parse(session.current_question);

    } catch (err) {

        console.error(
            "Interview package parse failed",
            err
        );

    }

    const rawFeedback =
        await generateInterviewFeedback({

            type: session.type,

            difficulty: session.difficulty,

            conversation,

            expectedConcepts:
                interviewPackage.expectedConcepts || [],

            expectedComplexity:
                interviewPackage.expectedComplexity || {},

            interviewGuide:
                interviewPackage.interviewGuide || {}

        });

    let feedback;

    try {

        const cleaned =
            rawFeedback
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        feedback =
            JSON.parse(cleaned);

    } catch (err) {

        console.error(
            "Feedback Parse Error",
            rawFeedback
        );

        feedback = {

            overallScore: 0,

            communicationScore: 0,

            problemSolvingScore: 0,

            optimizationScore: 0,

            strengths: [
                "Could not evaluate"
            ],

            weaknesses: [
                "Parsing failed"
            ],

            finalFeedback:
                "Interview feedback generation failed."

        };

    }

    await createInterviewFeedbackRepo({

        sessionId,

        overallScore:
            feedback.overallScore,

        communicationScore:
            feedback.communicationScore,

        problemSolvingScore:
            feedback.problemSolvingScore,

        optimizationScore:
            feedback.optimizationScore,

        strengths:
            Array.isArray(feedback.strengths)
                ? feedback.strengths.join("\n")
                : feedback.strengths,

        weaknesses:
            Array.isArray(feedback.weaknesses)
                ? feedback.weaknesses.join("\n")
                : feedback.weaknesses,

        finalFeedback:
            feedback.finalFeedback

    });

    await endInterviewSessionRepo(
        sessionId
    );

    return feedback;

};
