import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.execute("SELECT * FROM redes_sociales ORDER BY id ASC");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(rows);

  } catch (error) {
    console.error("❌ Error MySQL redes_sociales:", error);
    res.status(500).json({
      error: "Error al conectar a la BD",
      detalle: error.message,
    });
  }
}
