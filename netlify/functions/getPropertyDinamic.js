const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  const {
    title = "",
    location = "",
    modality = "",
    type = "",
    status = "",
  } = event.queryStringParameters || {};

  try {
    const result = await pool.query(
      `
      SELECT id, title, image, price, location, status, modality, type
      FROM properties
      WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
        AND ($2 = '' OR location ILIKE '%' || $2 || '%')
        AND ($3 = '' OR modality ILIKE '%' || $3 || '%')
        AND ($4 = '' OR type ILIKE '%' || $4 || '%')
        AND ($5 = '' OR status ILIKE '%' || $5 || '%')
      ORDER BY RANDOM()
      LIMIT 20;
      `,
      [title, location, modality, type, status]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(Array.isArray(result.rows) ? result.rows : []),
    };
  } catch (err) {
    console.error("❌ Error en getPropertyDinamic:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades" }),
    };
  }
};


