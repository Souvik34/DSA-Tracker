import express from "express";
import { getAllProblems,getProblemById, createProblem, getProgress} from "./problems.controller.js";
import { markProblemSolved } from "./problems.controller.js";
import { revisionMiddleware } from "../../middlewares/revision.middleware.js";
import { protect } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", getAllProblems);

router.get(
  "/progress",
  protect,
  getProgress
);
router.get("/:id", getProblemById);
router.post("/", createProblem);
router.post(
  "/solve",
  protect,
  revisionMiddleware,
  markProblemSolved
);
export default router;