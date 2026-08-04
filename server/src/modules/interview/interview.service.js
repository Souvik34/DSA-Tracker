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
    markOptimizationCompletedRepo,
    resetInterruptRepo
} from "./interview.repository.js";
import { getIO } from "../../socket.js";

import { getInterviewReportRepo } from "./interview.repository.js";
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


export const getInterviewReportService = async (sessionId) => {

    const report = await getInterviewReportRepo(sessionId);

    return report;
};
export const startInterviewService = async ({
    userId,
    type,
    difficulty,
    language
}) => {
 console.log("1. Starting interview");
    const rawQuestion =
        await generateStructuredQuestion({
            difficulty,
            language
        });
        const questionText =
    typeof rawQuestion === "string"
        ? rawQuestion
        : JSON.stringify(rawQuestion);
        console.log("2. Question generated");
console.log(rawQuestion);
let question;

try {
    
    const cleaned = questionText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    
    const jsonString = cleaned.substring(start, end + 1);
    
    question = JSON.parse(jsonString);
console.log("3. Parsed question");
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
        console.log("4. Session created", session.id);

    await updateInterviewPhaseRepo(

        session.id,

        InterviewPhase.UNDERSTANDING

    );

  
   const responseQuestion = {
    ...question
};

delete responseQuestion.hiddenTestCases;
delete responseQuestion.interviewGuide;
delete responseQuestion.expectedConcepts;
delete responseQuestion.expectedComplexity;
console.log("5. Returning response");
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
    message,
    code
}) => {

    console.log(">>> sendInterviewMessageService called");
    const session =
        await getInterviewSessionRepo(sessionId);
        const isInterviewStart =
    message === "__INTERVIEW_START__";

    if (!session) {
        throw new Error(
            "Interview session not found."
        );
    }
       if (session.phase === InterviewPhase.FINISHED) {

        return {
            aiReply:
                "The interview has concluded and my evaluation has already been submitted. Thank you for your time and best of luck.",
            phase: InterviewPhase.FINISHED,
            evaluation: null,
            codeAnalysis: null,
            interrupted: false
        };
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
if (isInterviewStart) {

    const openingMessage = `
Hi, I'm Antonio and I'll be your interviewer today.

We'll spend around 45 minutes together.

Let's begin.

Could you briefly introduce yourself?
`;

    await insertInterviewMessageRepo({
    sessionId,
    sender: "ai",
    message: openingMessage
});

const io = getIO();

io.to(`interview-${sessionId}`).emit(
    "interviewer-message",
    {
        message: openingMessage,
        phase: session.phase,
        evaluation: null
    }
);

return {
    aiReply: openingMessage,
    phase: session.phase,
    evaluation: null,
    codeAnalysis: null,
    interrupted: false
};
    return {

        aiReply: openingMessage,

        phase: session.phase,

        evaluation: null,

        codeAnalysis: null,

        interrupted: false

    };

}
    //--------------------------------------------------
    // Detect whether candidate sent code
    //--------------------------------------------------
console.log("=================================");
console.log("Candidate message:");
console.log(message);
console.log("Editor code:");
console.log(code);
const candidateContent =
    code?.trim()
        ? code
        : message;

const submissionType =
    detectSubmissionType(candidateContent);

console.log("Submission type:", submissionType);

const codeDetected =
    submissionType === SubmissionType.CODE;

console.log("Code detected:", codeDetected);
console.log("=================================");

    let evaluation = null;

    let codeAnalysis = null;

    //--------------------------------------------------
    // Judge0 Evaluation
    //--------------------------------------------------

    if (
        codeDetected &&
        session.type === "DSA"
    ) {
        console.log("Entered CODE analysis block");

        codeAnalysis =
            analyzeCodeProgress({

                previousCode:
                    session.last_code || "",

                currentCode: candidateContent,

                interviewGuide:
                    interviewPackage.interviewGuide

            });

        const testCases = [

            ...(interviewPackage.visibleTestCases || []),

            ...(interviewPackage.hiddenTestCases || [])

        ];

console.time("Judge0");

evaluation = await evaluateCode({
    language: session.language,
    code: candidateContent,
    testCases,
    problem: interviewPackage
});
console.log("========== JUDGE0 ==========");
console.log("Passed:", evaluation.passed);
console.log("Failed:", evaluation.failed);
console.log("Total:", evaluation.total);
console.log("============================");
console.timeEnd("Judge0");

            console.log("========== EVALUATION ==========");
console.dir(evaluation, {depth:null});
console.log("================================");

        await updateCodeSnapshotRepo({

            sessionId,

          code: candidateContent

        });

    }

    //--------------------------------------------------
    // Decide Interview Phase
    //--------------------------------------------------
let optimizationCompleted =
    session.optimization_completed;

if (
    session.phase === InterviewPhase.OPTIMIZATION &&
    !optimizationCompleted &&
    !codeDetected &&
    message.trim().length > 20
) {
    await markOptimizationCompletedRepo(sessionId);

    optimizationCompleted = true;
}

const nextPhase =
    decideNextPhase({

        currentPhase:
            session.phase,

        evaluation,

        codeDetected,

        approachAccepted:
            !codeDetected,

        optimizationCompleted

    });
    console.log("========== PHASE ==========");
console.log("Current:", session.phase);
console.log("Next:", nextPhase);
console.log("===========================");
console.log("Phase before:", session.phase);
console.log("Evaluation failed:", evaluation?.failed);
console.log("Next phase:", nextPhase);

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
            phase: nextPhase,
            evaluation,
            codeAnalysis
        });

    await recordInterruptRepo({
        sessionId,
        codeVersion:
            session.code_version +
            (codeDetected ? 1 : 0)
    });

}

// OUTSIDE the if
let rawResponse = null;
if (interrupt || !codeDetected) {
   console.time("AI");

rawResponse = await generateInterviewerResponse({
    phase: nextPhase,
    interviewGuide: interviewPackage.interviewGuide,
    expectedConcepts: interviewPackage.expectedConcepts,
    conversation,
    candidateMessage: message,
    candidateCode:
    codeDetected
        ? candidateContent
        : session.last_code || null,
    evaluation,
    codeAnalysis,
    interruptReason,
    interactionType: codeDetected ? "CODE_SUBMIT" : "CHAT",
    optimizationCompleted:
    session.optimization_completed ||
    (
        session.phase === InterviewPhase.OPTIMIZATION &&
        !codeDetected &&
        message.trim().length > 20
    ),
});

console.timeEnd("AI");
}
try {

    let parsed;

    if (typeof rawResponse === "string") {

        const cleaned = rawResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {

            parsed = JSON.parse(cleaned);

            aiReply = parsed.reply;
      
            if (parsed.optimizationCompleted) {
console.log("ENTERED OPTIMIZATION CHECK");
console.log("phase =", session.phase);
console.log("optimization_completed =", session.optimization_completed);
console.log("message =", message);
    await markOptimizationCompletedRepo(sessionId);

console.log("Marked optimization completed");
    await endInterviewService(sessionId);

 await endInterviewService(sessionId);

return {
    interviewEnded: true,
    aiReply,
    phase: InterviewPhase.FINISHED,
    evaluation,
    codeAnalysis,
    interrupted: false
};

}

            if (!aiReply) {
                throw new Error("Missing reply");
            }

        } catch {

            // Gemini returned plain text instead of JSON.
            // Use it directly.
            aiReply = cleaned;
        }

    } else {

        aiReply = rawResponse.reply;

        if (!aiReply) {
            throw new Error("Missing reply");
        }
    }

    await insertInterviewMessageRepo({
        sessionId,
        sender: "ai",
        message: aiReply
    });

} catch (err) {

    console.error(
        "Interviewer response parse failed:",
        err
    );

    console.error(
        "Raw AI response:",
        rawResponse
    );

    aiReply =
        "Can you explain your reasoning behind this step?";
}
            //--------------------------------------------------
// Generate interviewer response
//--------------------------------------------------


//--------------------------------------------------
// Save AI message
//--------------------------------------------------


const io = getIO();

io.to(`interview-${sessionId}`).emit(
    "interviewer-message",
    {
        message: aiReply,
        phase: nextPhase,
        evaluation,
    }
);

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

    await updateInterviewPhaseRepo(
    sessionId,
    InterviewPhase.FINISHED
);
    await endInterviewSessionRepo(
        sessionId
    );

    return feedback;

};


export const getInterviewByIdService = async (sessionId) => {
    const session = await getInterviewSessionRepo(sessionId);

    if (!session) {
        throw new Error("Interview session not found");
    }

    const question = JSON.parse(session.current_question);

    delete question.hiddenTestCases;
    delete question.interviewGuide;
    delete question.expectedConcepts;
    delete question.expectedComplexity;

    return {
        session: {
            id: session.id,
            language: session.language,
            difficulty: session.difficulty,
            phase: session.phase,
            status: session.status,
        },
        firstQuestion: question,
    };
};

export const realtimeCodeUpdateService = async ({
    sessionId,
    code
}) => {

    try
    {
  console.log("======== REALTIME SERVICE START ========");

    const session = await getInterviewSessionRepo(sessionId);

    if (!session) {
        return;
    }

    console.log("Current phase:", session.phase);

    const interviewPackage =
        JSON.parse(session.current_question);

    const codeAnalysis =
        analyzeCodeProgress({

            previousCode:
                session.last_code || "",

            currentCode: code,

            interviewGuide:
                interviewPackage.interviewGuide

        });

    console.log("Code Analysis:");
    console.dir(codeAnalysis, { depth: null });

    const saveSnapshot = async () => {

        await updateCodeSnapshotRepo({
            sessionId,
            code
        });

    };

    /*
    ======================================
    Nothing changed
    ======================================
    */

    if (!codeAnalysis.changed) {
        return;
    }

    /*
    ======================================
    AUTO MOVE APPROACH -> CODING
    ======================================
    */

    if (
        session.phase === InterviewPhase.APPROACH &&
        codeAnalysis.changed
    ) {

        const updated =
            await updateInterviewPhaseRepo(
                sessionId,
                InterviewPhase.CODING
            );

        session.phase = updated.phase;

        console.log(" Phase switched -> CODING");
        console.log("Phase after switch:", session.phase);
        console.log("I AM HERE 111111111");
    }

    /*
    ======================================
    Ignore until coding phase
    ======================================
    */

    if (session.phase !== InterviewPhase.CODING) {

        await saveSnapshot();

        return;
    }

    /*
    ======================================
    Ignore insignificant edits
    ======================================
    */

   if (
    codeAnalysis.addedLines < 3 &&
    !codeAnalysis.returnAdded
) {

    await saveSnapshot();

    return;

}

    /*
    ======================================
    Should interrupt?
    ======================================
    */
   console.log("Calling shouldInterrupt...");

    const interrupt =
        shouldInterrupt({

            phase: session.phase,

            evaluation: null,

            interruptionCount:
                session.interruption_count,

            codeAnalysis,

            lastInterruptAtVersion:
                session.last_interrupt_at_version,

            currentCodeVersion:
                session.code_version + 1

        });
console.log("Interrupt =", interrupt);

    if (!interrupt) {

        await saveSnapshot();

        return;
    }

    /*
    ======================================
    Record interrupt
    ======================================
    */

    await recordInterruptRepo({

        sessionId,

        codeVersion:
            session.code_version + 1

    });

    const conversation =
        await getInterviewMessagesRepo(sessionId);

    const interruptReason =
        getInterruptReason({

            phase: session.phase,

            evaluation: null,

            codeAnalysis

        });

    /*
    ======================================
    Generate AI response
    ======================================
    */
console.log("Calling Gemini...");

    const rawResponse =
        await generateInterviewerResponse({

            phase: session.phase,

            interviewGuide:
                interviewPackage.interviewGuide,

            expectedConcepts:
                interviewPackage.expectedConcepts,

            conversation,

            candidateMessage: "",

            candidateCode: code,

            evaluation: null,

            codeAnalysis,

            interruptReason,

            interactionType: "CODE_INTERRUPT"

        });

        console.log("Gemini replied.");
        console.log(rawResponse);
    let aiReply;

  try {

    if (typeof rawResponse === "string") {

        const cleaned = rawResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        try {

            const parsed = JSON.parse(cleaned);

            aiReply = parsed.reply;

            if (!aiReply) {
                throw new Error();
            }

        } catch {

            aiReply = cleaned;
        }

    } else {

        aiReply = rawResponse.reply;

        if (!aiReply) {
            throw new Error();
        }

    }

} catch {

    aiReply =
        "Can you explain what you just changed?";

}

    /*
    ======================================
    Save AI message
    ======================================
    */

    await insertInterviewMessageRepo({

        sessionId,

        sender: "ai",

        message: aiReply

    });

    /*
    ======================================
    Save latest code snapshot
    ======================================
    */

    await saveSnapshot();

    /*
    ======================================
    Emit socket event
    ======================================
    */
   console.log("Emitting interviewer-message...");
console.log(aiReply);

    getIO()
        .to(`interview-${sessionId}`)
        .emit(
            "interviewer-message",
            {
                message: aiReply,
                phase: session.phase,
                evaluation: null
            }
        );

    console.log("Realtime Analysis:");
    console.dir(codeAnalysis, {
        depth: null
    });
    }

     catch (err) {
        console.error("REALTIME ERROR:");
        console.error(err);
    }
  

};