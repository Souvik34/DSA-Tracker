import express from "express";

import { protect } from "../../../middlewares/auth.middleware.js";
import {
  syncLeetCodeActivity,
} from "./leetcode.controller.js";

const router = express.Router();

router.post(
  "/sync",
  protect,
  syncLeetCodeActivity
);

export default router;