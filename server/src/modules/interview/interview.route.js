import express from "express";
import {protect} from "../../middlewares/auth.middleware.js";
import {
  startInterview,
  sendInterviewMessage,
  endInterview, getInterviewById, getInterviewReport,    getInterviewHistory,
} from "./interview.controller.js";

const router = express.Router();
router.post("/start", protect, startInterview);
router.post("/message", protect, sendInterviewMessage);
router.post("/end", protect, endInterview);
router.get(
    "/history",
    protect,
    getInterviewHistory
);
router.get(
  "/report/:sessionId",
  protect,
  getInterviewReport
);
router.get(
  "/:sessionId",
  protect,
  getInterviewById
);

export default router;