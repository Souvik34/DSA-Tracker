import express from "express";
import { getUserProgress } from "./progress.controller.js";

const router = express.Router();

router.get("/:userId", getUserProgress);

export default router;