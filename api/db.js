// /db.js
import mysql from "mysql2/promise";

// 🔹 Evita crear múltiples pools en despliegues serverless
let pool;

if (!global._vercel_mysql_pool) {
  global._vercel_mysql_pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // ⏱️ protege de conexiones colgadas
  });
}

pool = global._vercel_mysql_pool;

export { pool };
