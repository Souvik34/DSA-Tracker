import redisClient from "../../config/redis.js";

export const getAIDashboard = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const cacheKey = `ai:dashboard:${userId}`;

    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log("AI DASHBOARD CACHE HIT");

      return res.json({
        success: true,
        insights: cached,
        cached: true,
      });
    }

    console.log("AI DASHBOARD CACHE MISS");

    const dashboardData =
      await getDashboardService(userId);

    const insights =
      await generateDashboardInsights(
        dashboardData
      );

    await redisClient.setEx(
      cacheKey,
      600,
      insights
    );

    res.json({
      success: true,
      cached: false,
      insights,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};