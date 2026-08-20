import express from "express";

import {
  reportBug,
  submitReview,
  fetchApprovedReviews,
} from "./feedback.controller.js";

const router = express.Router();

router.post("/bug", reportBug);

router.post("/review", submitReview);

router.get("/reviews", fetchApprovedReviews);

export default router;