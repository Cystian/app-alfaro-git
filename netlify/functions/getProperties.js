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

    // --- Normalizar arrays
    const locArr = Array.isArray(location) ? location.filter(Boolean) : [];
    const statusArr = Array.isArray(status) ? status.filter(Boolean) : [];
    const titleArr = Array.isArray(title) ? title.filter(Boolean) : [];

    // --- Parseo numérico seguro (acepta strings numéricas)
    const parsedMin = priceMin !== undefined && priceMin !== null ? Number(priceMin) : undefined;
    const parsedMax = priceMax !== undefined && priceMax !== null ? Number(priceMax) : undefined;

    const hasPriceFilter =
      Number.isFinite(parsedMin) || Number.isFinite(parsedMax);

    // valores por defecto solo si existen (para usar en condiciones individuales)
    const minValue = Number.isFinite(parsedMin) ? parsedMin : 0;
    const maxValue = Number.isFinite(parsedMax) ? parsedMax : 4000000; // alto por si solo hay min

    // --- Saber si hay filtros en general
    const hasFilters =
      locArr.length > 0 || statusArr.length > 0 || titleArr.length > 0 || hasPriceFilter;

    // --- Construir WHERE dinámico y params
    const whereClauses = [];
    const params = [];

    // 1) location
    params.push(locArr.length > 0 ? locArr : null);
    whereClauses.push("($1::text[] IS NULL OR location = ANY($1))");

    // 2) status
    params.push(statusArr.length > 0 ? statusArr : null);
    whereClauses.push("($2::text[] IS NULL OR status = ANY($2))");

    // 3) title
    params.push(titleArr.length > 0 ? titleArr : null);
    whereClauses.push("($3::text[] IS NULL OR title = ANY($3))");

    // 4) precios — agregar solo si el front realmente envió algo
    if (hasPriceFilter) {
      // next param index:
      const nextIndex = params.length + 1;
      // Si ambos min y max están presentes:
      if (Number.isFinite(parsedMin) && Number.isFinite(parsedMax)) {
        params.push(minValue, maxValue);
        whereClauses.push(`price BETWEEN $${nextIndex} AND $${nextIndex + 1}`);
      } else if (Number.isFinite(parsedMin)) {
        params.push(minValue);
        whereClauses.push(`price >= $${nextIndex}`);
      } else if (Number.isFinite(parsedMax)) {
        params.push(maxValue);
        whereClauses.push(`price <= $${nextIndex}`);
      }
    }

    // --- Armado final de query
    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE ${whereClauses.join(" AND ")}
    `;

    if (!hasFilters) {
      query += " ORDER BY RANDOM() LIMIT 10";
    } else {
      query += " ORDER BY price ASC";
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
