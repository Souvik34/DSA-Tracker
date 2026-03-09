import pool from "../../db/db.js";

export const getAllProblems = async ({difficulty, topic, page, limit}) => {
    let query = "SELECT * FROM problems WHERE 1=1";
  const values = [];

  if (difficulty) {
    values.push(difficulty);
    query += ` AND difficulty = ANY($${values.length})`;
  }

  if (topic) {
    values.push(topic);
    query += ` AND topic = ANY($${values.length})`;
  }

  const offset = (page - 1) * limit;

  values.push(limit);
  query += ` LIMIT $${values.length}`;

  values.push(offset);
  query += ` OFFSET $${values.length}`;

  const res = await pool.query(query, values);

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