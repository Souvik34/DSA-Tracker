/* eslint-disable prettier/prettier */

import { api } from "@/lib/api";

export interface InterviewSession {
    id: string;
    status: string;
    phase: string;
}

export interface StartSessionPayload {
    type: string;
    difficulty: string;
    language: string;
}

export const aiInterviewService = {

    async startSession(payload: StartSessionPayload) {

        const { data } =
            await api.post(
                "/interview/start",
                payload
            );

        return data;

    },

    async sendMessage(
    sessionId: string,
    message: string,
    code?: string
){

        const { data } =
await api.post("/interview/message",{
    sessionId,
    message,
    code
});

        return data;

    },

    async getInterviewState(
        sessionId: string
    ) {

        const { data } =
            await api.get(
                `/interview/${sessionId}`
            );

        return data;

    },

    async endSession(
        sessionId: string
    ) {

        const { data } =
            await api.post(
                "/interview/end",
                {
                    sessionId
                }
            );

        return data;

    }

};