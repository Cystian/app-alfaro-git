import { pool } from "./db.js";

export async function handler(event) {
  try {
    const { title = "", location = "", status = "", featured } = event.queryStringParameters || {};

    const titleArr = title ? title.split(",").map((t) => t.trim()) : [];
    const locationArr = location ? location.split(",").map((l) => l.trim()) : [];
    const statusArr = status ? status.split(",").map((s) => s.trim()) : [];

    let query = `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];

    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `location LIKE ?`).join(" OR ")})`;
      locationArr.forEach((l) => queryParams.push(`%${l}%`));
    }
    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `status LIKE ?`).join(" OR ")})`;
      statusArr.forEach((s) => queryParams.push(`%${s}%`));
    }
    if (titleArr.length) {
      query += ` AND (${titleArr.map(() => `title LIKE ?`).join(" OR ")})`;
      titleArr.forEach((t) => queryParams.push(`%${t}%`));
    }

    if (featured === "true") {
      query += ` ORDER BY created_at DESC`;
    } else if (!titleArr.length && !locationArr.length && !statusArr.length) {
      query += " ORDER BY RAND() LIMIT 10";
    } else {
      query += " ORDER BY created_at DESC";
    }

    const [rows] = await pool.query(query, queryParams);
    return { statusCode: 200, body: JSON.stringify(rows) };

  } catch (err) {
    console.error("❌ Error al traer propiedades:", err);
    return { statusCode: 500, body: JSON.stringify({ message: "Error al traer propiedades", error: err.message }) };
  }
}
