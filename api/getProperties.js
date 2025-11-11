// api/get-properties.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    const { title = "", location = "", status = "", featured } = req.query || {};

    // 🔹 Normalización: minúsculas, sin espacios sobrantes
    const keyword = title.trim().toLowerCase();
    const locationArr = location ? location.split(",").map(l => l.trim()) : [];
    const statusArr = status ? status.split(",").map(s => s.trim()) : [];

    let query = `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];

    // 🔹 Filtro por palabra clave general (ej: "terreno")
    if (keyword) {
      query += ` AND LOWER(title) LIKE ?`;
      queryParams.push(`%${keyword}%`);
    }

    // 🔹 Filtro por ubicación
    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `LOWER(location) LIKE ?`).join(" OR ")})`;
      locationArr.forEach(l => queryParams.push(`%${l.toLowerCase()}%`));
    }

    // 🔹 Filtro por estado
    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `LOWER(status) LIKE ?`).join(" OR ")})`;
      statusArr.forEach(s => queryParams.push(`%${s.toLowerCase()}%`));
    }

    // 🔹 Orden lógico de resultados
    if (featured === "true") {
      query += ` ORDER BY created_at DESC`;
    } else if (!keyword && !locationArr.length && !statusArr.length) {
      query += " ORDER BY RAND() LIMIT 10";
    } else {
      query += " ORDER BY created_at DESC";
    }

    // 🔹 Ejecutar consulta
    const [rows] = await pool.query(query, queryParams);
    return res.status(200).json(rows);

  } catch (err) {
    console.error("❌ Error al traer propiedades:", err);
    return res.status(500).json({
      message: "Error al traer propiedades",
      error: err.message,
    });
  }
}