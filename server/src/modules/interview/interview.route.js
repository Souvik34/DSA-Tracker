import express from "express";

import {
  startInterview, sendInterviewMessage
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


export default router;