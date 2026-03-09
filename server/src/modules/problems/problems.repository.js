import pool from "../../db/db.js";

export const getAllProblems = async () => {
  const res = await pool.query("SELECT * FROM problems ORDER BY created_at DESC");
    return res.rows;
};

export const getProblemById = async (id) => {
  const res = await pool.query("SELECT * FROM problems WHERE id = $1", [id]);
  return res.rows[0];
};

export const createProblem = async ({
  title,
  question_link,
  difficulty,
  topic,
  tags,
  platform
}) => {
    const res = await pool.query(`INSERT INTO problems (title, question_link, difficulty, topic, tags, platform) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, question_link, difficulty, topic, tags, platform]);
    return res.rows[0];
}