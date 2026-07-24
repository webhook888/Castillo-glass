import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    });
}

async function main() {
  loadEnvFile();

  const config = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  };

  const dbName = process.env.DB_NAME || "bellairlux";
  const schemaPath = path.join(process.cwd(), "scripts", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  const connection = await mysql.createConnection(config);
  await connection.query(schema);
  await connection.end();

  console.log(`MySQL schema initialized for database "${dbName}".`);
}

main().catch((error) => {
  console.error("Database initialization failed:", error.message);
  process.exit(1);
});
