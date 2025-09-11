import { Client } from 'pg';

export async function handler(event) {
  console.log("Valor NEON_DB_URL:", process.env.NEON_DB_URL);

  if (!process.env.NEON_DB_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Variable NEON_DB_URL no definida" }),
    };
  }

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // 📌 Filtros recibidos desde el frontend
    const filters = JSON.parse(event.body || "{}");
    const { distritos, modalidades, tipos, priceMin, priceMax } = filters;

    let whereClauses = [];
    let values = [];
    let idx = 1;

    if (distritos && distritos.length > 0) {
      whereClauses.push(`location = ANY($${idx++})`);
      values.push(distritos);
    }
    if (modalidades && modalidades.length > 0) {
      whereClauses.push(`status = ANY($${idx++})`);
      values.push(modalidades);
    }
    if (tipos && tipos.length > 0) {
      whereClauses.push(`title = ANY($${idx++})`);
      values.push(tipos);
    }
    if (priceMin !== undefined && priceMax !== undefined) {
      whereClauses.push(`price BETWEEN $${idx++} AND $${idx++}`);
      values.push(priceMin, priceMax);
    }

    const query = `
      SELECT id, title, image, price, location, status
      FROM properties
      ${whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : ""}
      ORDER BY price ASC
    `;

    console.log("📌 Query generado:", query);
    console.log("📌 Valores:", values);

    const result = await client.query(query, values);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };

  } catch (error) {
    console.error("Error detalle:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al conectar o consultar en Neon",
        detalle: error.message,
      }),
    };
  }
}

