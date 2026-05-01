import { getUserProgressService } from "./progress.service.js";

export const getUserProgress = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

if (!userId) {
  return res.status(400).json({
    success: false,
    message: "Invalid userId"
  });
}
    const data = await getUserProgressService(userId);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
   res.status(500).json({
  success: false,
  message: "Internal Server Error"
});
  }
};