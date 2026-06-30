import { getDueRevisionsService } from "../modules/revision/revision.service.js";

export const revisionMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const dueRevisions = await getDueRevisionsService(userId);

    if (dueRevisions.length >= 2) {
      return res.status(403).json({
        success: false,
        blocked: true,
        message:
          "You have pending revisions. Complete them before solving new problems.",
        totalDue: dueRevisions.length,
        revisions: dueRevisions,
      });
    }

    next();
  } catch (err) {
    console.error("Revision Middleware:", err);

    return res.status(500).json({
      success: false,
      message: "Revision check failed",
    });
  }
};