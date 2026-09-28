// netlify/functions/lib/db.js
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "cp206.hpservidor.com",
  user: "inmobi16_puma",
  password: "C@ntaloop0200714018",
  database: "inmobi16_prueba01",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 100, // puedes ajustar según tráfico
  queueLimit: 0
});
