
// netlify/functions/getPropertyDinamic.js
import { pool } from "./db.js";

export async function handler(event) {
  let { title = "", location = "", status = "" } = event.queryStringParameters || {};

  try {
    // Convertir los parámetros en arrays (si vienen separados por comas)
    const titleArr = title ? title.split(",").map((t) => t.trim()) : [];
    const locationArr = location ? location.split(",").map((l) => l.trim()) : [];
    const statusArr = status ? status.split(",").map((s) => s.trim()) : [];

    let query = `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area
      FROM properties
      WHERE 1 = 1
    `;
    const queryParams = [];

    // 🔹 Filtros dinámicos según parámetros
    if (titleArr.length) {
      query += ` AND (${titleArr.map(() => `title LIKE ?`).join(" OR ")})`;
      titleArr.forEach((t) => queryParams.push(`%${t}%`));
    }

    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `location LIKE ?`).join(" OR ")})`;
      locationArr.forEach((l) => queryParams.push(`%${l}%`));
    }

    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `status LIKE ?`).join(" OR ")})`;
      statusArr.forEach((s) => queryParams.push(`%${s}%`));
    }

    // 🔹 Orden aleatorio (equivalente a RANDOM() en PostgreSQL)
    query += ` ORDER BY RAND() LIMIT 100`;

    const [rows] = await pool.query(query, queryParams);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.error("❌ Error en getPropertyDinamic (MySQL):", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer propiedades",
        error: err.message,
      }),
    };
  }
}
