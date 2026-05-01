import {
  getDueRevisionsService,
  markRevisionDoneService,
  getAllRevisionsService,
} from "./revision.service.js";

export const getDueRevisions = async (req, res) => {
  try {
   const userId = Number(req.params.userId);

if (!userId || isNaN(userId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid userId"
  });
}

    const revisions = await getDueRevisionsService(userId);

    res.json({
      success: true,
      blocked: revisions.length > 0,
      revisions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markRevisionDone = async (req, res) => {
  try {
const userId = Number(req.params.userId);

if (!userId || isNaN(userId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid userId"
  });
}
    const problemId = Number(req.params.problemId);
    if (!problemId || isNaN(problemId)) {
  return res.status(400).json({
    success: false,
    message: "problemId is required"
  });
}

    const result = await markRevisionDoneService(userId, problemId);

    res.json({
      success: true,
      message: "Revision updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRevisions = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

if (!userId || isNaN(userId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid userId"
  });
}

    const revisions = await getAllRevisionsService(userId);

    res.json({
      success: true,
      revisions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};