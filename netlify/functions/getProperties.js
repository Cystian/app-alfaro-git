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
      limit, // opcional (para propiedades destacadas)
    } = JSON.parse(event.body || "{}");

    // 🔹 Definir valores por defecto SOLO si no se tocaron
    const minPrice = typeof priceMin === "number" ? priceMin : 0;
    const maxPrice = typeof priceMax === "number" ? priceMax : 400000;

    // 🔹 Construir query base
    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 
        location = ANY($1)
        AND status = ANY($2)
        AND title = ANY($3)
        AND price BETWEEN $4 AND $5
      ORDER BY RANDOM()
    `;

    const params = [location, status, title, minPrice, maxPrice];

    // 🔹 Si viene "limit", lo aplicamos (solo propiedades destacadas)
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
