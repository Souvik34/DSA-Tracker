import fs from "fs";
import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";
// import fs from "fs";

dotenv.config();

const filePath = path.resolve(process.cwd(), "scripts/problems.json");

const raw = fs.readFileSync(filePath, "utf-8");
const problems = JSON.parse(raw);

console.log("📦 JSON file loaded successfully");
console.log("📊 Total problems in JSON:", problems.length);
console.log("🔍 First item sample:", problems[0]);
console.log("🔍 Last item sample:", problems[problems.length - 1]);

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function seed() {
  try {
    await client.connect();

    console.log("Connected");

    await client.query("BEGIN");

    // optional (ONLY if you want fresh DB)
    // await client.query("DELETE FROM problems");

    const values = problems
      .map(
        (_, i) =>
          `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`
      )
      .join(",");

    const params = problems.flatMap(p => [
      p.title,
      p.question_link,
      p.difficulty,
      p.topic,
      p.tags,
      p.platform,
    ]);

 await client.query(
  `
  INSERT INTO problems
  (title, question_link, difficulty, topic, tags, platform)
  VALUES ${values}
  ON CONFLICT (question_link) DO NOTHING
  `,
  params
);

    await client.query("COMMIT");

    console.log(`Inserted ${problems.length} problems`);

    await client.end();
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  }
}

seed();