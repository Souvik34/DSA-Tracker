import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import pool from "./src/db/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

startServer();