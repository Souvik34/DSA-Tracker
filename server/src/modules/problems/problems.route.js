import express from "express";
import { getAllProblems,getProblemById, createProblem} from "./problem.controller.js";

const router = express.Router();

router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem);

export default router;