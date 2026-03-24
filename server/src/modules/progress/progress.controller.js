import { getUserProgressService } from "./progress.service.js";

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await getUserProgressService(userId);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};