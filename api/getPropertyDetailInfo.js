// api/getPropertyDetailInfo.js
import { pool } from "./db.js"; // ajusta la ruta según tu estructura

export default async function handler(req, res) {
  // 🔹 Manejo CORS para requests desde cualquier origen
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // preflight request
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Debe indicar el id de la propiedad" });
    }

    const propertyId = parseInt(id, 10);
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Id inválido, debe ser un número" });
    }

    // 🔹 Consulta MySQL
    const [rows] = await pool.query(
      `
      SELECT id, titulo_info, descripcion_info, id_properties
      FROM mas_info
      WHERE id_properties = ?
      ORDER BY id ASC
      `,
      [propertyId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("❌ ERROR en getMasInfo:", error);
    return res.status(500).json({
      message: "Error al traer información adicional",
      error: error.message,
    });
  }
}
