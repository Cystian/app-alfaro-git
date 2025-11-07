// api/getNoticias.js
import { pool } from "./db.js"; // ajusta la ruta según tu estructura de carpetas

export default async function handler(req, res) {
  try {
    const rawId = req.query.id;

    // 🔹 Si mandan ID → traer noticia específica
    if (rawId) {
      const noticiaId = parseInt(rawId, 10);

      if (isNaN(noticiaId)) {
        return res.status(400).json({ message: "Id inválido, debe ser un número" });
      }

      const [rows] = await pool.execute(
        `
        SELECT id, titulo, descripcion, imagen, fecha, link
        FROM noticias
        WHERE id = ?
        `,
        [noticiaId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Noticia no encontrada" });
      }

      return res
        .status(200)
        .setHeader("Access-Control-Allow-Origin", "*")
        .json(rows[0]);
    }

    // 🔹 Si NO mandan ID → devolver todas las noticias
    const [rows] = await pool.execute(
      `
      SELECT id, titulo, descripcion, imagen, fecha, link
      FROM noticias
      ORDER BY fecha DESC
      `
    );

    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json(rows);

  } catch (error) {
    console.error("❌ ERROR en getNoticias:", error);

    return res.status(500).json({
      message: "Error al traer noticias",
      error: error.message,
    });
  }
}
