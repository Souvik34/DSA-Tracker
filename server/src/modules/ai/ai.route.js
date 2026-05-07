import express from "express";

import {
  getAIInsights,
} from "./ai.controller.js";

const router = express.Router();

router.get(
  "/dashboard/:userId",
  getAIInsights
);

export default router;