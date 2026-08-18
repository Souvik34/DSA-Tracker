import express from "express";

import { protect } from "../../../middlewares/auth.middleware.js";

import {
  syncLeetCodeActivity,
  validateLeetCodeProfile,
  connectLeetCodeProfile,
  getLeetCodeProfile,
} from "./leetcode.controller.js";


const router = express.Router();


/* -------------------------------------------------------
   VALIDATE PROFILE
------------------------------------------------------- */

router.post(
  "/validate",
  protect,
  validateLeetCodeProfile
);


/* -------------------------------------------------------
   CONNECT PROFILE
------------------------------------------------------- */

router.post(
  "/connect",
  protect,
  connectLeetCodeProfile
);


/* -------------------------------------------------------
   SYNC ACTIVITY
------------------------------------------------------- */

router.post(
  "/sync",
  protect,
  syncLeetCodeActivity
);

router.get(
  "/profile",
  protect,
  getLeetCodeProfile
);


export default router;