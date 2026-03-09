import * as problemService from "./problems.service.js";

export const getAllProblems = async (req, res) => {
    try{
        const problems = await problemService.getAllProblems();
        res.status(200).json(problems);

    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const getProblemById = async (req, res) => {
    try{
        const { id } = req.params;
        const problem = await problemService.getProblemById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json(problem);
    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const createProblem = async (req, res) => {
    try{
        const problem = await problemService.createProblem(req.body);
        res.status(201).json(problem);
    }   
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }   
};