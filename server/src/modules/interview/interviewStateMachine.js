export const InterviewPhase = {

    UNDERSTANDING: "UNDERSTANDING",

    APPROACH: "APPROACH",

    CODING: "CODING",

    DEBUGGING: "DEBUGGING",

    OPTIMIZATION: "OPTIMIZATION",

    FINISHED: "FINISHED"

};

export const decideNextPhase = ({
    currentPhase,
    evaluation,
    codeDetected,
    approachAccepted,
    optimizationCompleted = false
}) => {

    switch (currentPhase) {

        case InterviewPhase.UNDERSTANDING:

            if (approachAccepted) {
                return InterviewPhase.APPROACH;
            }

            return InterviewPhase.UNDERSTANDING;

        case InterviewPhase.APPROACH:

            if (codeDetected) {
                return InterviewPhase.CODING;
            }

            return InterviewPhase.APPROACH;

        case InterviewPhase.CODING:

            if (!evaluation) {
                return InterviewPhase.CODING;
            }

            if (evaluation.failed > 0) {
                return InterviewPhase.DEBUGGING;
            }

            return InterviewPhase.OPTIMIZATION;

        case InterviewPhase.DEBUGGING:

            if (
                evaluation &&
                evaluation.failed === 0
            ) {
                return InterviewPhase.OPTIMIZATION;
            }

            return InterviewPhase.DEBUGGING;

  case InterviewPhase.OPTIMIZATION:

    if (optimizationCompleted) {
        return InterviewPhase.FINISHED;
    }

    return InterviewPhase.OPTIMIZATION;
}

};