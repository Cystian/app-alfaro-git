// ✅ Netlify Function: obtiene propiedades desde PostgreSQL
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    let { title = "", location = "", status = "", mode = "" } = event.queryStringParameters || {};

    console.log("Filtros recibidos:", { title, location, status, mode });

    // Arrays de filtros
    const titleArr = title ? title.split(",").map((t) => t.trim()) : [];
    const locationArr = location ? location.split(",").map((l) => l.trim()) : [];
    const statusArr = status ? status.split(",").map((s) => s.trim()) : [];

    let query = `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];
    let i = 1;

    // Filtros dinámicos
    if (locationArr.length) {
      query += ` AND (${locationArr.map(() => `location ILIKE $${i++}`).join(" OR ")})`;
      locationArr.forEach((l) => queryParams.push(`%${l}%`));
    }
    if (statusArr.length) {
      query += ` AND (${statusArr.map(() => `status ILIKE $${i++}`).join(" OR ")})`;
      statusArr.forEach((s) => queryParams.push(`%${s}%`));
    }
    if (titleArr.length) {
      query += ` AND (${titleArr.map(() => `title ILIKE $${i++}`).join(" OR ")})`;
      titleArr.forEach((t) => queryParams.push(`%${t}%`));
    }

    // 🔹 Si es modo destacados → las 6 más recientes
    if (mode === "featured") {
      query += " ORDER BY created_at DESC LIMIT 6";
    } else {
      // 🔹 Si hay búsqueda → todas las propiedades coincidentes, ordenadas por fecha
      if (titleArr.length || locationArr.length || statusArr.length) {
        query += " ORDER BY created_at DESC";
      } else {
        // 🔹 Si no hay búsqueda ni modo especial → devolver todas ordenadas
        query += " ORDER BY created_at DESC";
      }
    }

    console.log("Query generada:", query);
    console.log("Parámetros:", queryParams);

    const result = await pool.query(query, queryParams);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("❌ Error al traer propiedades:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades", error: err.message }),
    };
  }
};
