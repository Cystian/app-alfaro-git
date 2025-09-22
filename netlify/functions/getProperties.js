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

    // Normalizamos: si vienen como string separados por coma → los pasamos a array
    const parseToArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return val.split(",").map((v) => v.trim());
    };

    const locations = parseToArray(params.location);
    const statuses = parseToArray(params.status);
    const titles = parseToArray(params.title);

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 1 = 1
    `;

    const queryParams = [];
    let i = 1;

    // Filtro por distrito
    if (locations.length > 0) {
      query += ` AND location = ANY($${i++})`;
      queryParams.push(locations);
    }

    // Filtro por modalidad (Alquiler/Venta/etc)
    if (statuses.length > 0) {
      query += ` AND (`;
      query += statuses.map((_, idx) => `status ILIKE $${i + idx}`).join(" OR ");
      query += `)`;
      queryParams.push(...statuses.map((s) => `%${s}%`));
      i += statuses.length;
    }

    // Filtro por tipo de propiedad (Departamento, Casa, etc)
    if (titles.length > 0) {
      query += ` AND (`;
      query += titles.map((_, idx) => `title ILIKE $${i + idx}`).join(" OR ");
      query += `)`;
      queryParams.push(...titles.map((t) => `%${t}%`));
      i += titles.length;
    }

    query += " ORDER BY RANDOM()";

    const result = await pool.query(query, queryParams);

    // Debug prints 👇
    console.log("➡️ Query ejecutada:", query);
    console.log("➡️ Parámetros:", queryParams);
    console.log("✅ Resultados encontrados:", result.rows.length);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error("❌ Error al buscar propiedades:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer propiedades",
        error: err.message,
      }),
    };
  }
};
