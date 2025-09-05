const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  console.log("queryStringParameters:", event.queryStringParameters);

  // Solo estos filtros por ahora
  const { title = "", location = "", status = "" } =
    event.queryStringParameters || {};

  try {
    const result = await pool.query(
      `
      SELECT id, title, image, price, location, status, modality, type
      FROM properties
      WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
        AND ($2 = '' OR location ILIKE '%' || $2 || '%')
        AND ($3 = '' OR status ILIKE '%' || $3 || '%')
      ORDER BY RANDOM()
      LIMIT 20;
    `,
      [title, location, status]
    );

    console.log("result.rows:", result.rows);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows), // siempre un array
    };
  } catch (err) {
    console.error("❌ Error en getPropertyDinamic:", err.stack);
    return {
      statusCode: 200, // 👈 para que frontend no rompa
      body: JSON.stringify([]), // devuelve array vacío en vez de error
    };
  }
};


