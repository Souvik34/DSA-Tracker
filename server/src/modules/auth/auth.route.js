import express from "express";
import passport from "passport";

import { signUp, signIn, signOut,  refreshAccessToken} from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/refresh", refreshAccessToken);

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