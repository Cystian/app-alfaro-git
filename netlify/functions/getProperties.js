const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    const {
      location = [],
      status = [],
      title = [],
    } = JSON.parse(event.body || "{}");

    // 🔹 Verificar si realmente vinieron filtros
    const hasFilters =
      (location && location.length > 0) ||
      (status && status.length > 0) ||
      (title && title.length > 0);

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 
        (ARRAY_LENGTH($1::text[], 1) IS NULL OR location = ANY($1))
        AND (ARRAY_LENGTH($2::text[], 1) IS NULL OR status = ANY($2))
        AND (ARRAY_LENGTH($3::text[], 1) IS NULL OR title = ANY($3))
      ORDER BY RANDOM()
    `;

    const params = [
      location.length > 0 ? location : null,
      status.length > 0 ? status : null,
      title.length > 0 ? title : null,
    ];

    // 🔹 Si no hay filtros → limitar a 10
    if (!hasFilters) {
      query += " LIMIT 10";
    }

    const result = await pool.query(query, params);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("Error en búsqueda:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades" }),
    };
  }
};
