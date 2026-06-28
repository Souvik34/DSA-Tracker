import express from "express";
import {
  getDueRevisions,
  markRevisionDone,
  getAllRevisions,
} from "./revision.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/due", protect, getDueRevisions);
router.post("/complete/:problemId", protect, markRevisionDone);
router.get("/all", protect, getAllRevisions);

export default router;