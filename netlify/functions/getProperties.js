const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    // 🔹 Parsear filtros desde el body
    const {
      location = [],
      status = [],
      title = [],
      priceMin,
      priceMax,
      limit, // opcional
    } = JSON.parse(event.body || "{}");

    // 🔹 Definir valores por defecto SOLO si no se tocaron
    const minPrice = typeof priceMin === "number" ? priceMin : 0;
    const maxPrice = typeof priceMax === "number" ? priceMax : 400000;

    // 🔹 Construir query base con filtros
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

    // 🔹 Aplicar limit solo si viene como parámetro (ej. reel destacado)
    if (limit) {
      query += " LIMIT $6";
      params.push(limit);
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

