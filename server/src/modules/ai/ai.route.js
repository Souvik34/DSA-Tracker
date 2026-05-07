import express from "express";
import {
  getAIDashboard,
} from "./ai.controller.js";
const router = express.Router();

router.get(
  "/dashboard/:userId",
  getAIDashboard
);
export default router;