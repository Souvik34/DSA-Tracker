import express from "express";
import {
  getDueRevisions,
  markRevisionDone,
  getAllRevisions,
} from "./revision.controller.js";

const router = express.Router();



router.get("/due/:userId", getDueRevisions);
router.post("/complete/:userId", markRevisionDone);
router.get("/all/:userId", getAllRevisions);

export default router;