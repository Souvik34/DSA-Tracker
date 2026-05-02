import { success } from "zod";
import * as problemService from "./problems.service.js";
import { solveQueue } from "../../queues/solve.queue.js";
export const getAllProblems = async (req, res) => {
  try {
    const { difficulty, topic, page = 1, limit = 50 } = req.query;
    const problems = await problemService.getAllProblems({
      page: Number(page),
      limit: Number(limit),
  difficulty: difficulty ? difficulty.split(",") : [],
topic: topic ? topic.split(",") : [],
    });
    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      data: problems,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblemById(id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProblem = async (req, res) => {
  try {
    const problem = await problemService.createProblem(req.body);
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const markProblemSolved = async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { problemId, difficulty } = req.body;

    if (!Number.isInteger(userId) || !problemId || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

  
const job = await solveQueue.add(
  "solve-job",
  { userId, problemId, difficulty },
  {
    jobId: `${userId}-${problemId}`,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  }
);

res.status(200).json({
  success: true,
  message: "Solve event queued",
  jobId: job.id,
});
  

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
