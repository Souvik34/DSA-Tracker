import { sendBugReportEmail } from "../../../utils/email.utils.js";

export const reportBug = async (req, res, next) => {
  try {
    const { description, page } = req.body;

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Bug description is required",
      });
    }

    await sendBugReportEmail({
      description: description.trim(),
      page: page || "Unknown page",
    });

    res.status(200).json({
      message: "Bug report sent successfully",
    });
  } catch (error) {
    next(error);
  }
};