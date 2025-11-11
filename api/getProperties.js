// api/get-properties.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    const { title = "", location = "", status = "", featured } = req.query || {};

    // 🔹 Normalización y segmentación de filtros
    const locationArr = location ? location.split(",").map((l) => l.trim()).filter(Boolean) : [];
    const statusArr = status ? status.split(",").map((s) => s.trim()).filter(Boolean) : [];

    let query = `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];

    // 🔹 Filtro por ubicación
    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `LOWER(location) LIKE ?`).join(" OR ")})`;
      locationArr.forEach((l) => queryParams.push(`%${l.toLowerCase()}%`));
    }

    // 🔹 Filtro por estado
    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `LOWER(status) LIKE ?`).join(" OR ")})`;
      statusArr.forEach((s) => queryParams.push(`%${s.toLowerCase()}%`));
    }

    // 🔹 Filtro por palabra clave en título (contextual y seguro)
    const keyword = title?.trim().toLowerCase();
    if (keyword && keyword.length > 0) {
      query += ` AND LOWER(title) LIKE ?`;
      queryParams.push(`%${keyword}%`);
    }

    // 🔹 Orden lógico de resultados
    if (featured === "true") {
      query += ` ORDER BY created_at DESC`;
    } else if (!keyword && !locationArr.length && !statusArr.length) {
      query += " ORDER BY RAND() LIMIT 10";
    } else {
      query += " ORDER BY created_at DESC";
    }

    // 🔹 Ejecución de la consulta
    const [rows] = await pool.query(query, queryParams);

    // Opcional: depuración en consola del servidor
    console.log("🔍 Query ejecutada:", query);
    console.log("📦 Parámetros:", queryParams);
    console.log("📤 Filas devueltas:", rows.length);

    return res.status(200).json(rows);

  } catch (err) {
    console.error("❌ Error al traer propiedades:", err);
    return res.status(500).json({
      message: "Error al traer propiedades",
      error: err.message,
    });
  }
}