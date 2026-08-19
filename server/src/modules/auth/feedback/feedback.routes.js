import express from "express";
import { reportBug } from "./feedback.controller.js";

const router = express.Router();

router.post("/bug", reportBug);

export default router;