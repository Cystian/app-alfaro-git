const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    const { location, status, title } = JSON.parse(event.body || "{}");

    // Normalizar los filtros → siempre como array
    const loc = location && location.length ? location : [];
    const stat = status && status.length ? status : [];
    const titl = title && title.length ? title : [];

    console.log("📌 Filtros recibidos:", { loc, stat, titl });

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE (array_length($1::text[], 1) IS NULL OR location = ANY($1))
        AND (array_length($2::text[], 1) IS NULL OR status = ANY($2))
        AND (array_length($3::text[], 1) IS NULL OR title = ANY($3))
      ORDER BY RANDOM()
    `;

    const params = [loc.length ? loc : null, stat.length ? stat : null, titl.length ? titl : null];

    // Si no hay filtros → limitar resultados
    if (!loc.length && !stat.length && !titl.length) {
      query += " LIMIT 10";
    }

    console.log("📌 Query:", query);
    console.log("📌 Params:", params);

    const result = await pool.query(query, params);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("❌ Error en búsqueda:", err.message);
    console.error("Stack:", err.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades", error: err.message }),
    };
  }
};
