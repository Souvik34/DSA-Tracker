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

    socket.on("join-interview", (sessionId) => {
      socket.join(`interview-${sessionId}`);
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