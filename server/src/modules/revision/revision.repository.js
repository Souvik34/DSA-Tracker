export const getDueRevisionsRepo = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM revision_queue
     WHERE user_id = $1
     AND next_revision_date <= CURRENT_DATE`,
    [userId]
  );

  return result.rows;
};