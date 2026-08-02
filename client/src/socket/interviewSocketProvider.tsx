/* eslint-disable prettier/prettier */
import {
    createContext,
    useContext,
    useEffect,
    ReactNode,
} from "react";

import { socket } from "./socket";

interface Props {
    children: ReactNode;
}

interface InterviewSocketContextType {

  joinInterview: (sessionId: string) => Promise<void>;
    leaveInterview: () => void;

}

const InterviewSocketContext =
createContext<InterviewSocketContextType | null>(null);

export function InterviewSocketProvider({
    children,
}: Props) {

    useEffect(() => {

        socket.connect();

        socket.on("connect", () => {

            console.log("Connected:", socket.id);

        });

        socket.on("disconnect", () => {

            console.log(" Disconnected");

        });

        return () => {

            socket.off("connect");
            socket.off("disconnect");

            socket.disconnect();

        };

    }, []);

   const joinInterview = async (sessionId: string) => {

    socket.emit(
        "join-interview",
        sessionId
    );

    socket.emit(
        "interview-message",
        {
            sessionId,
            message: "__INTERVIEW_START__"
        }
    );

};

    const leaveInterview = () => {

        socket.disconnect();

        socket.connect();

    };

    return (

        <InterviewSocketContext.Provider
            value={{
                joinInterview,
                leaveInterview,
            }}
        >

            {children}

        </InterviewSocketContext.Provider>

    );

}

export const useInterviewSocket = () => {

    return useContext(
        InterviewSocketContext
    );

};