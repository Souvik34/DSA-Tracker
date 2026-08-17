import express from "express";
import passport from "passport";

import {
  signUp,
  signIn,
  signOut,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  googleCallback,

} from "./auth.controller.js";

import { authLimiter } from "../../middlewares/ratelimit.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", authLimiter, signUp);
router.post("/signin", authLimiter, signIn);
router.post("/signout", authLimiter, signOut);
router.post("/refresh", authLimiter, refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:8080/login",
    session: false,
  }),
  googleCallback
);



export default router;