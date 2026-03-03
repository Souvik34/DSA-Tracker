import express from "express";
import { signUp, signIn, signOut,  refreshAccessToken} from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/refresh", refreshAccessToken);

export default router;