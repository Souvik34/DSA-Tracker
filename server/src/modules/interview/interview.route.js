import express from "express";
import {protect} from "../../middlewares/auth.middleware.js";
import {
  startInterview,
  sendInterviewMessage,
  endInterview, getInterviewById, getInterviewReport,    getInterviewHistory,
} from "./interview.controller.js";
import { getInterviewLimit } from "./interviewLimit/interviewLimit.controller.js";
import { interviewLimitMiddleware } from "../../middlewares/interviewLimit.middleware.js";
const router = express.Router();
router.get(
    "/limit",
    protect,
    getInterviewLimit
);

router.post(
    "/start",
    protect,
    interviewLimitMiddleware,
    startInterview
);

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