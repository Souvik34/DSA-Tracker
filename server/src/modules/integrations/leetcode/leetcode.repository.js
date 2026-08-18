import pool from "../../../db/db.js";

/* -------------------------------------------------------
   LEETCODE CONNECTION
------------------------------------------------------- */

export const upsertLeetCodeConnectionRepo = async (
  userId,
  username
) => {
  const result = await pool.query(
    `
    INSERT INTO leetcode_connection
    (
      user_id,
      username,
      connected_at,
      last_synced_at
    )
    VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

    ON CONFLICT (user_id)
    DO UPDATE SET
      username = EXCLUDED.username,
      last_synced_at = CURRENT_TIMESTAMP

    RETURNING *;
    `,
    [
      userId,
      username,
    ]
  );

  return result.rows[0];
};


/* -------------------------------------------------------
   LEETCODE PROFILE
------------------------------------------------------- */

export const upsertLeetCodeProfileRepo = async (
  userId,
  profile
) => {
  const {
    avatar,
    realName,
    ranking,
    reputation,
    starRating,
  } = profile;

  const result = await pool.query(
    `
    INSERT INTO leetcode_profile
    (
      user_id,
      avatar,
      real_name,
      ranking,
      reputation,
      star_rating,
      updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)

    ON CONFLICT (user_id)
    DO UPDATE SET
      avatar = EXCLUDED.avatar,
      real_name = EXCLUDED.real_name,
      ranking = EXCLUDED.ranking,
      reputation = EXCLUDED.reputation,
      star_rating = EXCLUDED.star_rating,
      updated_at = CURRENT_TIMESTAMP

    RETURNING *;
    `,
    [
      userId,
      avatar,
      realName,
      ranking,
      reputation,
      starRating,
    ]
  );

  return result.rows[0];
};


/* -------------------------------------------------------
   LEETCODE STATS
------------------------------------------------------- */

export const upsertLeetCodeStatsRepo = async (
  userId,
  stats
) => {
  const {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalSubmissions,
    acceptanceRate,
    contestRating,
  } = stats;

  const result = await pool.query(
    `
    INSERT INTO leetcode_stats
    (
      user_id,
      total_solved,
      easy_solved,
      medium_solved,
      hard_solved,
      acceptance_rate,
      contest_rating,
      updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)

    ON CONFLICT (user_id)
    DO UPDATE SET
      total_solved = EXCLUDED.total_solved,
      easy_solved = EXCLUDED.easy_solved,
      medium_solved = EXCLUDED.medium_solved,
      hard_solved = EXCLUDED.hard_solved,
      acceptance_rate = EXCLUDED.acceptance_rate,
      contest_rating = EXCLUDED.contest_rating,
      updated_at = CURRENT_TIMESTAMP

    RETURNING *;
    `,
    [
      userId,
      totalSolved ?? 0,
      easySolved ?? 0,
      mediumSolved ?? 0,
      hardSolved ?? 0,
      acceptanceRate ?? 0,
      contestRating ?? null,
    ]
  );

  return result.rows[0];
};


/* -------------------------------------------------------
   LEETCODE ACTIVITY
------------------------------------------------------- */

export const insertLeetCodeActivityRepo = async (
  userId,
  problem
) => {
  const {
    problemTitle,
    problemSlug,
    difficulty,
    topics,
    solvedAt,
  } = problem;

  await pool.query(
    `
    INSERT INTO leetcode_activity
    (
      user_id,
      problem_title,
      problem_slug,
      difficulty,
      topics,
      solved_at
    )
    VALUES ($1, $2, $3, $4, $5, $6)

    ON CONFLICT (user_id, problem_slug)
    DO UPDATE SET
      problem_title = EXCLUDED.problem_title,
      difficulty = EXCLUDED.difficulty,
      topics = EXCLUDED.topics,
      solved_at = EXCLUDED.solved_at
    `,
    [
      userId,
      problemTitle,
      problemSlug,
      difficulty,
      topics || [],
      solvedAt,
    ]
  );
};

/* -------------------------------------------------------
   LEETCODE CALENDAR
------------------------------------------------------- */

export const upsertLeetCodeCalendarRepo = async (
  userId,
  submissionCalendar
) => {
  if (!submissionCalendar) {
    return;
  }

  const entries =
    Object.entries(submissionCalendar);

  for (const [timestamp, count] of entries) {
    const activityDate =
      new Date(
        Number(timestamp) * 1000
      )
        .toISOString()
        .split("T")[0];

    await pool.query(
      `
      INSERT INTO leetcode_calendar
      (
        user_id,
        activity_date,
        submission_count
      )
      VALUES ($1, $2, $3)

      ON CONFLICT (user_id, activity_date)
      DO UPDATE SET
        submission_count =
          EXCLUDED.submission_count
      `,
      [
        userId,
        activityDate,
        Number(count) || 0,
      ]
    );
  }
};

/* -------------------------------------------------------
   LEETCODE BADGES
------------------------------------------------------- */

export const upsertLeetCodeBadgesRepo = async (
  userId,
  badges
) => {
  if (!Array.isArray(badges)) {
    return;
  }

  for (const badge of badges) {
    if (!badge?.name) {
      continue;
    }

    await pool.query(
      `
      INSERT INTO leetcode_badges
      (
        user_id,
        name,
        icon,
        earned_at
      )
      VALUES ($1, $2, $3, $4)

      ON CONFLICT (user_id, name, earned_at)
      DO UPDATE SET
        icon = EXCLUDED.icon
      `,
      [
        userId,
        badge.name,
        badge.icon || null,
        badge.creationDate || null,
      ]
    );
  }
};
/* -------------------------------------------------------
   GET LEETCODE PROFILE DATA
------------------------------------------------------- */

export const getLeetCodeProfileRepo = async (
  userId
) => {
  const connectionResult = await pool.query(
    `
    SELECT
      username,
      connected_at,
      last_synced_at
    FROM leetcode_connection
    WHERE user_id = $1
    `,
    [userId]
  );

  const profileResult = await pool.query(
    `
    SELECT
      avatar,
      real_name,
      ranking,
      reputation,
      star_rating,
      updated_at
    FROM leetcode_profile
    WHERE user_id = $1
    `,
    [userId]
  );

  const statsResult = await pool.query(
    `
    SELECT
      total_solved,
      easy_solved,
      medium_solved,
      hard_solved,
      acceptance_rate,
      contest_rating,
      updated_at
    FROM leetcode_stats
    WHERE user_id = $1
    `,
    [userId]
  );

  const badgesResult = await pool.query(
    `
    SELECT
      name,
      icon,
      earned_at
    FROM leetcode_badges
    WHERE user_id = $1
    ORDER BY earned_at DESC
    `,
    [userId]
  );

  const calendarResult = await pool.query(
    `
    SELECT
      activity_date,
      submission_count
    FROM leetcode_calendar
    WHERE user_id = $1
    ORDER BY activity_date ASC
    `,
    [userId]
  );

  return {
    connection:
      connectionResult.rows[0] || null,

    profile:
      profileResult.rows[0] || null,

    stats:
      statsResult.rows[0] || null,

    badges:
      badgesResult.rows,

    calendar:
      calendarResult.rows,
  };
};