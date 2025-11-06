import { pool } from "./db.js"; // ajusta la ruta si tu db.js está fuera de /api

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    // 🔹 Si mandan ID → traer un asesor específico
    if (id) {
      const asesorId = parseInt(id, 10);

      if (isNaN(asesorId)) {
        return res.status(400)
          .setHeader("Access-Control-Allow-Origin", "*")
          .json({ message: "Id inválido, debe ser un número" });
      }

      const [rows] = await pool.execute(
        `
        SELECT 
          id, img_asesores, name_asesores, face_asesores, wasap_asesores,
          insta_asesores, tiktok_asesores, linkedin_asesores
        FROM asesores
        WHERE id = ?
        `,
        [asesorId]
      );

      if (rows.length === 0) {
        return res.status(404)
          .setHeader("Access-Control-Allow-Origin", "*")
          .json({ message: "Asesor no encontrado" });
      }

      return res.status(200)
        .setHeader("Access-Control-Allow-Origin", "*")
        .json(rows[0]);
    }

    // 🔹 Si NO mandan ID → devolver todos los asesores
    const [rows] = await pool.execute(`
      SELECT 
        id, img_asesores, name_asesores, face_asesores, wasap_asesores,
        insta_asesores, tiktok_asesores, linkedin_asesores
      FROM asesores
      ORDER BY id ASC
    `);

    return res.status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json(rows);

  } catch (error) {
    console.error("❌ ERROR en getAsesores:", error);

    return res.status(500)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({
        message: "Error al traer asesores",
        error: error.message,
      });
  }
}
