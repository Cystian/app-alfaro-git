exports.handler = async (event) => {
  try {
    let location = [];
    let status = [];
    let title = [];

    if (event.httpMethod === "GET") {
      // Leer de query params
      const qs = event.queryStringParameters || {};
      location = qs.location ? [qs.location] : [];
      status = qs.status ? [qs.status] : [];
      title = qs.title ? [qs.title] : [];
    } else {
      // Leer de body JSON (POST)
      const body = JSON.parse(event.body || "{}");
      location = body.location || [];
      status = body.status || [];
      title = body.title || [];
    }

    const hasFilters =
      location.length > 0 || status.length > 0 || title.length > 0;

    let query = `
      SELECT id, title, image, price, location, status
      FROM properties
      WHERE 
        (ARRAY_LENGTH($1::text[], 1) IS NULL OR location = ANY($1))
        AND (ARRAY_LENGTH($2::text[], 1) IS NULL OR status = ANY($2))
        AND (ARRAY_LENGTH($3::text[], 1) IS NULL OR title = ANY($3))
      ORDER BY RANDOM()
    `;

    const params = [
      location.length > 0 ? location : null,
      status.length > 0 ? status : null,
      title.length > 0 ? title : null,
    ];

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
