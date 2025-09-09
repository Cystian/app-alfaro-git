const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  let { title = "", location = "", status = "" } = event.queryStringParameters || {};

  try {
    // Convertir los parámetros en arrays si vienen separados por coma
    const titleArr = title ? title.split(",") : [];
    const locationArr = location ? location.split(",") : [];
    const statusArr = status ? status.split(",") : [];

    const result = await pool.query(
      `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area
      FROM properties
      WHERE (
        $1::text[] IS NULL OR EXISTS (
          SELECT 1 FROM unnest($1::text[]) t WHERE title ILIKE '%' || t || '%'
        )
      )
      AND (
        $2::text[] IS NULL OR EXISTS (
          SELECT 1 FROM unnest($2::text[]) l WHERE location ILIKE '%' || l || '%'
        )
      )
      AND (
        $3::text[] IS NULL OR EXISTS (
          SELECT 1 FROM unnest($3::text[]) s WHERE status ILIKE '%' || s || '%'
        )
      )
      ORDER BY RANDOM()
      LIMIT 100;
      `,
      [
        titleArr.length ? titleArr : null,
        locationArr.length ? locationArr : null,
        statusArr.length ? statusArr : null,
      ]
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
