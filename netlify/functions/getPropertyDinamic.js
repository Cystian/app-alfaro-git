const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  const { title = "", location = "", status = "" } = event.queryStringParameters || {};

  try {
    const result = await pool.query(
      `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area
      FROM properties
      WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
        AND ($2 = '' OR location ILIKE '%' || $2 || '%')
        AND ($3 = '' OR status ILIKE '%' || $3 || '%')
      ORDER BY RANDOM()
      LIMIT 20;
      `,
      [title, location, status]
    );

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
