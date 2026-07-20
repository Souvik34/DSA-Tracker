import express from "express";
import {protect} from "../../middlewares/auth.middleware.js";
import {
  startInterview,
  sendInterviewMessage,
  endInterview, getInterviewById
} from "./interview.controller.js";

const router = express.Router();
router.get("/:id", protect,getInterviewById);
router.post("/start", protect, startInterview);
router.post("/message", protect, sendInterviewMessage);
router.post("/end", protect, endInterview);

export default router;