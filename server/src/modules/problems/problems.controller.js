import { success } from "zod";
import * as problemService from "./problems.service.js";
import { solveQueue } from "../../queues/solve.queue.js";
import { getDueRevisionsService } from "../revision/revision.service.js";
export const getAllProblems = async (req, res) => {
  try {
    const {
      difficulty,
      topic,
      ids,
      page = 1,
      limit = 50,
    } = req.query;

    const problems = await problemService.getAllProblems({
      page: Number(page),
      limit: Number(limit),
      difficulty: difficulty ? difficulty.split(",") : [],
      topic: topic ? topic.split(",") : [],
      ids: ids ? ids.split(",").map(Number) : [],
    });

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      data: problems,
    });
  } catch (err) {
    console.error("getAllProblems ERROR:", err);

    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
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
    console.error(" getProblemById ERROR:", err);
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
   const userId = req.user.id;
    const { problemId, difficulty, timeTaken } = req.body;
    console.log("CONTROLLER DATA", {
      userId,
      problemId,
      difficulty,
      timeTaken
    });
    const dueRevisions = await getDueRevisionsService(userId);

if (dueRevisions.length > 0) {
  return res.status(403).json({
    success: false,
    blocked: true,
    message: "Complete your due revisions before solving new problems.",
    revisions: dueRevisions.length,
  });
}
  // const { problemId, difficulty, timeTaken } = req.body;

    if (!problemId || !difficulty) {
  return res.status(400).json({
    success: false,
    message: "Invalid input",
  });
}
const attempt =
await problemService.completeProblemAttempt(
userId,
problemId
);


if(!attempt){

return res.status(400).json({

success:false,

message:
"Start the problem before marking solved"

});

}
  
const job = await solveQueue.add(
  "solve-job",
  { userId, problemId, difficulty, timeTaken },
  {
    jobId: `${userId}-${problemId}`,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: 100,
  }
);

res.status(200).json({
  success: true,
  message: "Solve event queued",
  jobId: job.id,
});
  

  }catch (err) {
  console.error("MARK SOLVED CONTROLLER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
}
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await problemService.getProgress(userId);

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = Number(req.params.id);

    await problemService.addBookmark(userId, problemId);

    res.status(200).json({
      success: true,
      message: "Bookmarked",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = Number(req.params.id);

    await problemService.removeBookmark(userId, problemId);

    res.status(200).json({
      success: true,
      message: "Bookmark removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookmarks =
      await problemService.getBookmarks(userId);

    res.status(200).json({
      success: true,
      bookmarks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const saveNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = Number(req.params.id);

    const { notes } = req.body;

    await problemService.saveNotes(
      userId,
      problemId,
      notes
    );

    res.status(200).json({
      success: true,
      message: "Notes saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const notes = await problemService.getNotes(userId);

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProblemNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const problemId = Number(req.params.id);

    const notes =
      await problemService.getProblemNotes(
        userId,
        problemId
      );

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const startProblem = async(req,res)=>{

try{

const userId=req.user.id;
const problemId=Number(req.params.id);


const data =
await problemService.startProblemAttempt(
userId,
problemId
);


if(data.blocked){

return res.status(403).json({

success:false,

message:
"Complete your current problem first"

});

}


res.json({

success:true,
attempt:data.attempt

});


}catch(err){

res.status(500).json({
message:err.message
});

}

};