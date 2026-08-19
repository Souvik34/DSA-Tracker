import {
  insertLeetCodeActivityRepo,
  upsertLeetCodeConnectionRepo,
  upsertLeetCodeProfileRepo,
  upsertLeetCodeStatsRepo,
  upsertLeetCodeCalendarRepo,
  upsertLeetCodeBadgesRepo,
    getLeetCodeProfileRepo,
} from "./leetcode.repository.js";

/* -------------------------------------------------------
   LEETCODE GRAPHQL
------------------------------------------------------- */

const LEETCODE_GRAPHQL_URL =
  "https://leetcode.com/graphql";


/* -------------------------------------------------------
   GRAPHQL HELPER
------------------------------------------------------- */

const leetCodeGraphQL = async (
  query,
  variables
) => {

  const response = await fetch(
    LEETCODE_GRAPHQL_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "User-Agent":
          "Dykstra/1.0",

        "Referer":
          "https://leetcode.com/",
      },

      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );


  if (!response.ok) {

    throw new Error(
      `LeetCode request failed with status ${response.status}`
    );

  }


  const result =
    await response.json();


  if (result.errors?.length) {

    console.error(
      "LEETCODE GRAPHQL ERROR:",
      result.errors
    );

    throw new Error(
      result.errors[0]?.message ||
      "Unable to fetch LeetCode data"
    );

  }


  return result.data;
};


/* -------------------------------------------------------
   VALIDATE LEETCODE PROFILE
------------------------------------------------------- */

export const validateLeetCodeProfileService =
  async (username) => {

    if (!username) {
      throw new Error(
        "LeetCode username is required"
      );
    }


    const cleanUsername =
      username
        .trim()
        .replace(/^@/, "");


    if (!cleanUsername) {
      throw new Error(
        "LeetCode username is required"
      );
    }


    const query = `
      query userProfile(
        $username: String!
      ) {

        matchedUser(
          username: $username
        ) {

          username

          profile {
            userAvatar
            realName
            ranking
            reputation
            starRating
          }

          submitStatsGlobal {

            acSubmissionNum {
              difficulty
              count
              submissions
            }

            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;


    const data =
      await leetCodeGraphQL(
        query,
        {
          username: cleanUsername,
        }
      );


    const matchedUser =
      data?.matchedUser;


    if (!matchedUser) {

      return {
        valid: false,
        username: cleanUsername,
      };

    }


    const accepted =
      matchedUser.submitStatsGlobal
        ?.acSubmissionNum || [];


    const totalSubmissions =
      matchedUser.submitStatsGlobal
        ?.totalSubmissionNum || [];


    const getCount =
      (difficulty) => {

        const item =
          accepted.find(
            (entry) =>
              entry.difficulty === difficulty
          );

        return item?.count ?? 0;
      };


    const getSubmissions =
      (difficulty) => {

        const item =
          totalSubmissions.find(
            (entry) =>
              entry.difficulty === difficulty
          );

        return item?.submissions ?? 0;
      };


    const totalSolved =
      getCount("All");


    const easySolved =
      getCount("Easy");


    const mediumSolved =
      getCount("Medium");


    const hardSolved =
      getCount("Hard");


    const totalSubmissionCount =
      getSubmissions("All");


    const acceptanceRate =
      totalSubmissionCount > 0
        ? Number(
            (
              (totalSolved /
                totalSubmissionCount) *
              100
            ).toFixed(2)
          )
        : 0;


    return {

      valid: true,

      username:
        matchedUser.username,

      profileUrl:
        `https://leetcode.com/u/${matchedUser.username}`,

      avatar:
        matchedUser.profile?.userAvatar ??
        null,

      realName:
        matchedUser.profile?.realName ??
        null,

      ranking:
        matchedUser.profile?.ranking ??
        null,

      reputation:
        matchedUser.profile?.reputation ??
        null,

      starRating:
        matchedUser.profile?.starRating ??
        null,

      stats: {

        totalSolved,

        easySolved,

        mediumSolved,

        hardSolved,

        totalSubmissions:
          totalSubmissionCount,

        acceptanceRate,

      },

    };
  };


/* -------------------------------------------------------
   CONNECT LEETCODE PROFILE
------------------------------------------------------- */

export const connectLeetCodeProfileService =
  async (
    userId,
    username
  ) => {

    if (!userId) {

      throw new Error(
        "Valid userId is required"
      );

    }


    const profile =
      await validateLeetCodeProfileService(
        username
      );
const calendar =
  await fetchLeetCodeCalendar(
    profile.username
  );

const badges =
  await fetchLeetCodeBadges(
    profile.username
  );

const contestRating =
  await fetchLeetCodeContestRating(
    profile.username
  );

await upsertLeetCodeBadgesRepo(
  userId,
  badges
);
  await upsertLeetCodeCalendarRepo(
  userId,
  calendar?.submissionCalendar
);

 if (!profile.valid) {

      throw new Error(
        "LeetCode profile not found"
      );

    }


    /* ---------------------------------------------------
       SAVE CONNECTION
    --------------------------------------------------- */

    await upsertLeetCodeConnectionRepo(
      userId,
      profile.username
    );


    /* ---------------------------------------------------
       SAVE PROFILE
    --------------------------------------------------- */

    await upsertLeetCodeProfileRepo(
      userId,
      {
        avatar:
          profile.avatar,

        realName:
          profile.realName,

        ranking:
          profile.ranking,

        reputation:
          profile.reputation,

        starRating:
          profile.starRating,
      }
    );


    /* ---------------------------------------------------
       SAVE STATS
    --------------------------------------------------- */

    await upsertLeetCodeStatsRepo(
      userId,
      {
        ...profile.stats,

        contestRating,
      }
    );


    return profile;
  };


/* -------------------------------------------------------
   SYNC LEETCODE ACTIVITY
------------------------------------------------------- */

export const syncLeetCodeActivityService =
  async (
    userId,
    problems
  ) => {

    if (!userId) {

      throw new Error(
        "Valid userId is required"
      );

    }


    if (!Array.isArray(problems)) {

      throw new Error(
        "Problems must be an array"
      );

    }


    for (const problem of problems) {

      if (
        !problem.problemTitle ||
        !problem.problemSlug
      ) {
        continue;
      }


      await insertLeetCodeActivityRepo(
        userId,
        problem
      );

    }


    return {
      synced:
        problems.length,
    };
  };

  /* -------------------------------------------------------
   FETCH LEETCODE CALENDAR
------------------------------------------------------- */

const fetchLeetCodeCalendar = async (username) => {
  const query = `
    query userProfileCalendar(
      $username: String!
      $year: Int
    ) {
      matchedUser(
        username: $username
      ) {
        userCalendar(
          year: $year
        ) {
          activeYears
          streak
          totalActiveDays
          dccBadges {
            timestamp
            badge {
              name
              icon
            }
          }
          submissionCalendar
        }
      }
    }
  `;

  const currentYear = new Date().getFullYear();

  const data = await leetCodeGraphQL(
    query,
    {
      username,
      year: currentYear,
    }
  );

  const calendar =
    data?.matchedUser?.userCalendar;

  if (!calendar) {
    return null;
  }

  let submissionCalendar = {};

  try {
    submissionCalendar =
      JSON.parse(
        calendar.submissionCalendar || "{}"
      );
  } catch (error) {
    console.error(
      "LEETCODE CALENDAR PARSE ERROR:",
      error
    );
  }

  return {
    activeYears:
      calendar.activeYears || [],

    streak:
      calendar.streak || 0,

    totalActiveDays:
      calendar.totalActiveDays || 0,

    submissionCalendar,
  };
};

/* -------------------------------------------------------
   FETCH LEETCODE BADGES
------------------------------------------------------- */

const fetchLeetCodeBadges = async (username) => {
  const query = `
    query userBadges(
      $username: String!
    ) {
      matchedUser(
        username: $username
      ) {
        badges {
          name
          icon
          creationDate
        }
      }
    }
  `;

  const data = await leetCodeGraphQL(
    query,
    {
      username,
    }
  );

  return (
    data?.matchedUser?.badges || []
  );
};

/* -------------------------------------------------------
   FETCH LEETCODE CONTEST RATING
------------------------------------------------------- */

const fetchLeetCodeContestRating = async (username) => {
  const query = `
    query userContestRanking(
      $username: String!
    ) {
      userContestRanking(
        username: $username
      ) {
        rating
      }
    }
  `;

  const data = await leetCodeGraphQL(
    query,
    {
      username,
    }
  );

  return (
    data?.userContestRanking?.rating ?? null
  );
};

/* -------------------------------------------------------
   GET CONNECTED LEETCODE PROFILE
------------------------------------------------------- */

export const getLeetCodeProfileService =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "Valid userId is required"
      );
    }

    return await getLeetCodeProfileRepo(
      userId
    );
  };