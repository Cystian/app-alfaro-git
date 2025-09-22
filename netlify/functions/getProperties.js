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
    } else {
      params = JSON.parse(event.body || "{}");
    }

    const location = params.location || "";
    const status = params.status || "";
    const title = params.title || "";

    // Construir query con ILIKE para permitir coincidencias parciales
    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 1 = 1
    `;

    const queryParams = [];
    let i = 1;

    if (location) {
      query += ` AND location ILIKE $${i++}`;
      queryParams.push(`%${location}%`);
    }

    if (status) {
      query += ` AND status ILIKE $${i++}`;
      queryParams.push(`%${status}%`);
    }

    if (title) {
      query += ` AND title ILIKE $${i++}`;
      queryParams.push(`%${title}%`);
    }

    query += " ORDER BY RANDOM()";

    const result = await pool.query(query, queryParams);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("Error al buscar departamentos en Chao:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer propiedades", error: err.message }),
    };
  }
};

