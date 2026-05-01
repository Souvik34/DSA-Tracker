import { success } from "zod";
import * as problemService from "./problems.service.js";

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
