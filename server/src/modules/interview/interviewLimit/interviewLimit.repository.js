import pool from "../../../db/db.js";

export const getInterviewLimitRepo = async (userId) => {

    const { rows } = await pool.query(
        `
        SELECT
            user_id,
            used,
            daily_limit,
            window_started_at
        FROM interview_limits
        WHERE user_id = $1
        `,
        [userId]
    );

    return rows[0] || null;
};


export const createInterviewLimitRepo = async (userId) => {

    const { rows } = await pool.query(
        `
        INSERT INTO interview_limits
        (
            user_id,
            used,
            daily_limit,
            window_started_at
        )
        VALUES ($1, 1, 3, NOW())

        RETURNING
            user_id,
            used,
            daily_limit,
            window_started_at
        `,
        [userId]
    );

    return rows[0];
};


export const incrementInterviewLimitRepo = async (userId) => {

    const { rows } = await pool.query(
        `
        UPDATE interview_limits
        SET used = used + 1

        WHERE user_id = $1

        RETURNING
            user_id,
            used,
            daily_limit,
            window_started_at
        `,
        [userId]
    );

    return rows[0] || null;
};


export const resetInterviewLimitRepo = async (userId) => {

    const { rows } = await pool.query(
        `
        UPDATE interview_limits
        SET
            used = 1,
            daily_limit = 3,
            window_started_at = NOW()

        WHERE user_id = $1

        RETURNING
            user_id,
            used,
            daily_limit,
            window_started_at
        `,
        [userId]
    );

    return rows[0] || null;
};