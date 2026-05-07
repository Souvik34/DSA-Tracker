import express from "express";

import {
  startInterview, sendInterviewMessage, endInterview
} from "./interview.controller.js";

const router = express.Router();



router.post(
  "/start",
  startInterview
);
router.post(
  "/message",
  sendInterviewMessage
);
router.post(
  "/end",
  endInterview
);

export default router;