import { Server } from "socket.io";
import {
  registerInterviewSockets,
} from "./modules/interview/interview.socket.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  registerInterviewSockets(socket);

 socket.on("join-interview", async (sessionId) => {

  console.log("Joined interview:", sessionId);

  socket.join(`interview-${sessionId}`);

  try {

    const result =
      await sendInterviewMessageService({
        sessionId,
        message: "__INTERVIEW_START__",
        code: ""
      });

    getIO()
      .to(`interview-${sessionId}`)
      .emit(
    "interviewer-message",
    {
        message: result.aiReply,
        phase: result.phase,
        evaluation: result.evaluation
    }
);  

  } catch (err) {

    socket.emit("interview-error", {
      message: err.message,
    });

  }

});

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  return io;
};