import pool from "../../../db/db.js";

export const createReview = async ({
  userId,
  name,
  role,
  rating,
  review,
}) => {
  const result = await pool.query(
    `
      INSERT INTO feedback_reviews
      (
        user_id,
        name,
        role,
        rating,
        review
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        name,
        role,
        rating,
        review,
        approved,
        created_at
    `,
    [
      userId,
      name,
      role,
      rating,
      review,
    ],
  );

  return result.rows[0];
};

export const getApprovedReviews = async () => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        role,
        rating,
        review,
        created_at
      FROM feedback_reviews
      WHERE approved = TRUE
      ORDER BY created_at DESC
    `,
  );

  return result.rows;
};