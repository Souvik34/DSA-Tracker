import {
  startInterviewService,
} from "./interview.service.js";

import {
  sendInterviewMessageService,
} from "./interview.service.js";

import {
  endInterviewService,
} from "./interview.service.js";

export const startInterview = async (
  req,
  res
) => {

  try {

    const {
      userId,
      type,
      difficulty,
      language,
    } = req.body;



    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId required",
      });
    }



    const data =
      await startInterviewService({
        userId,
        type,
        difficulty,
        language,
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
      } = req.body;



      if (!sessionId || !message) {
        return res.status(400).json({
          success: false,
          message:
            "sessionId and message required",
        });
      }



      const data =
        await sendInterviewMessageService({
          sessionId,
          message,
        });



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

export const endInterview =
  async (req, res) => {

    try {

      const { sessionId } =
        req.body;



      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message:
            "sessionId required",
        });
      }



      const feedback =
        await endInterviewService(
          sessionId
        );



      res.json({
        success: true,
        feedback,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
};