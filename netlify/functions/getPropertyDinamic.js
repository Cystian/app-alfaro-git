const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  // Extraemos los filtros de queryStringParameters
  const { title = "", location = "", status = "" } = event.queryStringParameters || {};

  // Convertimos valores separados por comas en arrays
  const titleArr = title.split(",").map(t => t.trim()).filter(Boolean);
  const locationArr = location.split(",").map(l => l.trim()).filter(Boolean);
  const statusArr = status.split(",").map(s => s.trim()).filter(Boolean);

  // Construimos condiciones dinámicas
  const conditions = [];
  const values = [];
  let paramIndex = 1;

  if (titleArr.length) {
    conditions.push(`(${titleArr.map(_ => `title ILIKE '%' || $${paramIndex++} || '%'`).join(" OR ")})`);
    values.push(...titleArr);
  }
  if (locationArr.length) {
    conditions.push(`(${locationArr.map(_ => `location ILIKE '%' || $${paramIndex++} || '%'`).join(" OR ")})`);
    values.push(...locationArr);
  }
  if (statusArr.length) {
    conditions.push(`(${statusArr.map(_ => `status ILIKE '%' || $${paramIndex++} || '%'`).join(" OR ")})`);
    values.push(...statusArr);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const result = await pool.query(`
      SELECT id, title, image, price, location, status, modality, type
      FROM properties
      ${whereClause}
      ORDER BY RANDOM()
      LIMIT 20;
    `, values);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("❌ Error en getPropertyDinamic:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades" }),
    };
  }
};
