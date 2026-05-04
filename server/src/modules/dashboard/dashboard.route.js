import express from "express";
import { getDashboard } from "./dashboard.controller.js";

const router = express.Router();

router.get("/:userId", getDashboard);

export default router;