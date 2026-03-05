import express from "express";
import passport from "passport";

import { signUp, signIn, signOut,  refreshAccessToken, forgotPassword, resetPassword} from "./auth.controller.js";
import { authLimiter } from "../../middlewares/ratelimit.js";
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
  })
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.send("Google login successful ");
  }
);


export default router;