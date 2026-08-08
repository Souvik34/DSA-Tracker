import {
  syncLeetCodeActivityService,
} from "./leetcode.service.js";

export const syncLeetCodeActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { problems } = req.body;

    if (!Array.isArray(problems)) {
      return res.status(400).json({
        success: false,
        message: "problems must be an array",
      });
    }

    const result =
      await syncLeetCodeActivityService(
        userId,
        problems
      );

    return res.status(200).json({
      success: true,
      message: "LeetCode activity synced",
      data: result,
    });

  } catch (err) {
    console.error(
      "LEETCODE SYNC ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};