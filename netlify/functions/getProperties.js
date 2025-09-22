const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event) => {
  try {
    let params = {};
    if (event.httpMethod === "GET") {
      params = event.queryStringParameters || {};
      if (params.location) params.location = params.location.split(",");
      if (params.status) params.status = params.status.split(",");
      if (params.title) params.title = params.title.split(",");
    } else {
      params = JSON.parse(event.body || "{}");
    }

    const location = params.location || [];
    const status = params.status || [];
    const title = params.title || [];

    console.log("📌 Filtros recibidos:", { location, status, title });

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 1=1
    `;

    const queryParams = [];
    let i = 1;

    if (location.length > 0) {
      query += ` AND location ILIKE ANY($${i++})`;
      queryParams.push(location.map(l => `%${l}%`));
    }

    if (status.length > 0) {
      query += ` AND status ILIKE ANY($${i++})`;
      queryParams.push(status.map(s => `%${s}%`));
    }

    if (title.length > 0) {
      query += ` AND title ILIKE ANY($${i++})`;
      queryParams.push(title.map(t => `%${t}%`));
    }

    query += " ORDER BY RANDOM()";

    console.log("📝 Query generada:", query);
    console.log("🔑 Params usados:", queryParams);

    const result = await pool.query(query, queryParams);

    console.log("✅ Resultados encontrados:", result.rows.length);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("❌ Error al buscar propiedades:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades", error: err.message }),
    };
  }
};

