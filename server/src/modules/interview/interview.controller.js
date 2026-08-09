import {
  startInterviewService,
} from "./interview.service.js";

import {
  sendInterviewMessageService, getInterviewByIdService,
} from "./interview.service.js";
import { getInterviewReportService } from "./interview.service.js";
import {
  endInterviewService,
} from "./interview.service.js";

export const startInterview = async (
  req,
  res
) => {

  try {

const {
    type,
    difficulty,
    language,
    company,
    role,
    questionStrategy
} = req.body;

const userId = req.user.id;



    const data =
      await startInterviewService({
          userId,
    type,
    difficulty,
    language,
    company,
    role,
    questionStrategy
      });



    res.status(201).json({
      success: true,
      data,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const sendInterviewMessage =
  async (req, res) => {

    try {

    const {
    sessionId,
    message,
    code,
    isSubmission,
} = req.body;



      if (!sessionId || !message) {
        return res.status(400).json({
          success: false,
          message:
            "sessionId and message required",
        });
      }
const userId = req.user.id;
const data =
    await sendInterviewMessageService({
        sessionId,
        userId,
        message,
        code,
        isSubmission,
    });
console.log("RETURNING TO FRONTEND");
console.dir(data, { depth: null });

res.json({
    success: true,
    data,
});

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
};
export const endInterview = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "sessionId required",
            });
        }

       const userId = req.user.id;

const feedback =
    await endInterviewService({
        sessionId,
        userId
    });
        return res.json({
            success: true,
            feedback,
        });

    } catch (err) {
        console.error(err);

        if (err.code === "INTERVIEW_ALREADY_COMPLETED") {
            return res.status(409).json({
                success: false,
                code: "INTERVIEW_ALREADY_COMPLETED",
                message: "Interview has already been completed.",
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getInterviewReport = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const report = await getInterviewReportService(sessionId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error("Get interview report error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview report"
        });
    }
};

export const getInterviewById = async (req, res) => {
      try {

        const sessionId = req.params.sessionId;
        const userId = req.user.id;
console.log("SESSION ID:", sessionId);
console.log("AUTH USER ID:", userId);
        const result =
            await getInterviewByIdService({
                sessionId,
                userId
            });

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (err) {
        console.error(err);

        if (err.code === "INTERVIEW_ALREADY_COMPLETED") {
            return res.status(409).json({
                success: false,
                code: "INTERVIEW_ALREADY_COMPLETED",
                message: "This interview has already been completed.",
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};