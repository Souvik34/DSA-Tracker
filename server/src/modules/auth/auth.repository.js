import pool from '../../db/db.js';

export const findUserByEmail =  async(email) => {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
};

export const createUser = async(name, email, password) => {
    const res  = await pool.query('INSERT INTO users( name, email, password) VALUES($1,$2,$3) RETURNING id, name, email ', [name, email, password]);
    return res.rows[0];
};

export const storeRefreshToken = async (userId, token) => {
  await pool.query(
    "INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)",
    [userId, token]
  );
};

export const deleteRefreshToken = async (refreshToken) => {
  await pool.query(
    "DELETE FROM refresh_tokens WHERE token=$1",
    [refreshToken]
  );
};


export const findRefreshToken = async (refreshToken) => {
  const result = await pool.query(
    "SELECT * FROM refresh_tokens WHERE token=$1",
    [refreshToken]
  );

  return result.rows[0];
};

