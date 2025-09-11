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
      priceMin,
      priceMax,
    } = JSON.parse(event.body || "{}");

    // 🔹 Definir valores por defecto SOLO si no se tocaron
    const minPrice = typeof priceMin === "number" ? priceMin : 0;
    const maxPrice = typeof priceMax === "number" ? priceMax : 400000;

    // 🔹 Verificar si realmente vinieron filtros
    const hasFilters =
      location.length > 0 || status.length > 0 || title.length > 0 || priceMin !== undefined || priceMax !== undefined;

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 
        ($1::text[] IS NULL OR location = ANY($1))
        AND ($2::text[] IS NULL OR status = ANY($2))
        AND ($3::text[] IS NULL OR title = ANY($3))
        AND price BETWEEN $4 AND $5
      ORDER BY RANDOM()
    `;

    const params = [
      location.length > 0 ? location : null,
      status.length > 0 ? status : null,
      title.length > 0 ? title : null,
      minPrice,
      maxPrice,
    ];

    // 🔹 Si no hay filtros → limitar a 10 (destacados)
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
