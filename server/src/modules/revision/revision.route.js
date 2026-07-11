import express from "express";
import {
  getDueRevisions,
  markRevisionDone,
  getAllRevisions,
  addRevision
} from "./revision.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/due", protect, getDueRevisions);
router.post("/complete/:problemId", protect, markRevisionDone);
router.get("/all", protect, getAllRevisions);
router.post("/:problemId", protect, addRevision);

export default router;