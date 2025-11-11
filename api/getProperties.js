// api/get-properties.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    const { title = "", location = "", status = "", featured } = req.query || {};

    // Split por comas, limpiar valores vacíos y "todos"
    const titleArr = title
      ? title.split(",").map(t => t.trim()).filter(Boolean).filter(t => t.toLowerCase() !== "todos")
      : [];
    const locationArr = location
      ? location.split(",").map(l => l.trim().toLowerCase()).filter(Boolean).filter(l => l !== "todos")
      : [];
    const statusArr = status
      ? status.split(",").map(s => s.trim().toLowerCase()).filter(Boolean).filter(s => s !== "todos")
      : [];

    let query = `
      SELECT id, title, image, price, location,address, status, bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];

    // Location
    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `LOWER(location) LIKE ?`).join(" OR ")})`;
      locationArr.forEach(l => queryParams.push(`%${l}%`));
    }

    // Status
    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `LOWER(status) LIKE ?`).join(" OR ")})`;
      statusArr.forEach(s => queryParams.push(`%${s}%`));
    }

    // Title
    if (titleArr.length) {
      query += " AND (";
      const titleConditions = titleArr.map(term => {
        // Normaliza guiones largos y normales a espacio
        const cleanTerm = term.toLowerCase().replace(/[–—-]/g, " ");
        const words = cleanTerm.split(" ").filter(Boolean);
        // Usamos OR entre palabras para que coincida cualquiera de ellas
        const wordConditions = words.map(() => "LOWER(title) LIKE ?").join(" OR ");
        words.forEach(w => queryParams.push(`%${w}%`));
        return `(${wordConditions})`;
      });
      query += titleConditions.join(" OR ");
      query += ")";
    }

    // Ordenamiento
    if (featured === "true") {
      query += " ORDER BY created_at DESC";
    } else if (!titleArr.length && !locationArr.length && !statusArr.length) {
      query += " ORDER BY RAND() LIMIT 10";
    } else {
      query += " ORDER BY created_at DESC";
    }

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
