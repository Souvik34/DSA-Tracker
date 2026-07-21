/* eslint-disable prettier/prettier */
export interface AIResponse {

    phase:
        | "UNDERSTANDING"
        | "APPROACH"
        | "CODING"
        | "DEBUGGING"
        | "OPTIMIZATION"
        | "FINISHED";

    message: string;

    score?: {
        correctness: number;
        communication: number;
        optimization: number;
    };
}

export interface InterviewMessage {

    role:
        | "INTERVIEWER"
        | "CANDIDATE";

    content: string;
}