const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    // 🔹 Parsear filtros desde el body
    const { location = [], status = [], title = [], priceMin = 0, priceMax = 400000 } = JSON.parse(event.body || "{}");

    // 🔹 Construir query con filtros
    const result = await pool.query(
      `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 
        ($1::text[] IS NULL OR location = ANY($1))
        AND ($2::text[] IS NULL OR status = ANY($2))
        AND ($3::text[] IS NULL OR title = ANY($3))
        AND price BETWEEN $4 AND $5
      ORDER BY RANDOM()
      LIMIT 10
      `,
      [
        location.length > 0 ? location : null,
        status.length > 0 ? status : null,
        title.length > 0 ? title : null,
        priceMin,
        priceMax,
      ]
    );

    return { statusCode: 200, body: JSON.stringify(result.rows) };
  } catch (err) {
    console.error("Error en búsqueda:", err);
    return { statusCode: 500, body: JSON.stringify({ message: "Error al traer propiedades" }) };
  }
};
