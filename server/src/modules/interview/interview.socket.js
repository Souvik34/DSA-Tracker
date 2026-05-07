import {
  sendInterviewMessageService,
} from "./interview.service.js";

import {
  getIO,
} from "../../socket.js";



export const registerInterviewSockets =
  (socket) => {

    socket.on(
      "interview-message",

      async (payload) => {

        try {

          const {
            sessionId,
            message,
          } = payload;



          const result =
            await sendInterviewMessageService({
              sessionId,
              message,
            });



          getIO()
            .to(
              `interview-${sessionId}`
            )
            .emit(
              "ai-response",
              result
            );

        } catch (err) {

          socket.emit(
            "interview-error",
            {
              message: err.message,
            }
          );
        }
      }
    );
};