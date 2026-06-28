import express from "express";
import { getAllProblems,getProblemById, createProblem} from "./problems.controller.js";
import { markProblemSolved } from "./problems.controller.js";
import { revisionMiddleware } from "../../middlewares/revision.middleware.js";
const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem);
router.post(
  "/solve/:userId",
  revisionMiddleware,
  markProblemSolved
);
export default router;