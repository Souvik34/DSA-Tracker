import {
  syncLeetCodeActivityService,
  validateLeetCodeProfileService,
  connectLeetCodeProfileService,
    getLeetCodeProfileService,
} from "./leetcode.service.js";


/* -------------------------------------------------------
   VALIDATE LEETCODE PROFILE
------------------------------------------------------- */

export const validateLeetCodeProfile =
  async (req, res) => {

    try {

      const { username } =
        req.body;


      if (
        typeof username !== "string" ||
        !username.trim()
      ) {

        return res.status(400).json({
          success: false,
          message:
            "LeetCode username is required",
        });

      }


      const result =
        await validateLeetCodeProfileService(
          username
        );


      return res.status(200).json({

        success: true,

        data: result,

      });

    } catch (err) {

      console.error(
        "LEETCODE VALIDATION ERROR:",
        err
      );


      return res.status(500).json({

        success: false,

        message:
          "Unable to validate LeetCode profile",

      });

    }
  };


/* -------------------------------------------------------
   CONNECT LEETCODE PROFILE
------------------------------------------------------- */

export const connectLeetCodeProfile =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const { username } =
        req.body;


      if (
        typeof username !== "string" ||
        !username.trim()
      ) {

        return res.status(400).json({

          success: false,

          message:
            "LeetCode username is required",

        });

      }


      const result =
        await connectLeetCodeProfileService(
          userId,
          username
        );


      return res.status(200).json({

        success: true,

        message:
          "LeetCode profile connected successfully",

        data: result,

      });

    } catch (err) {

      console.error(
        "LEETCODE CONNECTION ERROR:",
        err
      );


      return res.status(500).json({

        success: false,

        message:
          err.message ||
          "Unable to connect LeetCode profile",

      });

    }
  };


/* -------------------------------------------------------
   SYNC LEETCODE ACTIVITY
------------------------------------------------------- */

export const syncLeetCodeActivity =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const { problems } =
        req.body;


      if (!Array.isArray(problems)) {

        return res.status(400).json({

          success: false,

          message:
            "problems must be an array",

        });

      }


      const result =
        await syncLeetCodeActivityService(
          userId,
          problems
        );


      return res.status(200).json({

        success: true,

        message:
          "LeetCode activity synced",

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

  /* -------------------------------------------------------
   GET LEETCODE PROFILE
------------------------------------------------------- */

export const getLeetCodeProfile =
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const result =
        await getLeetCodeProfileService(
          userId
        );

      return res.status(200).json({

        success: true,

        data: result,

      });

    } catch (err) {

      console.error(
        "LEETCODE PROFILE FETCH ERROR:",
        err
      );

      return res.status(500).json({

        success: false,

        message:
          err.message ||
          "Unable to fetch LeetCode profile",

      });

    }
  };