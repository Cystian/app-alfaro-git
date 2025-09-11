import { Client } from "pg";

export async function handler() {
  console.log("Valor NEON_DB_URL:", process.env.NEON_DB_URL);

  if (!process.env.NEON_DB_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Variable NEON_DB_URL no definida",
      }),
    };
  }

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const [distritosResult, modalidadesResult, tiposResult] = await Promise.all([
      client.query("SELECT nombre FROM distritos ORDER BY nombre ASC"),
      client.query("SELECT nombre FROM modalidades ORDER BY nombre ASC"),
      client.query("SELECT nombre FROM tipos ORDER BY nombre ASC"),
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        distritos: distritosResult.rows.map((row) => row.nombre),
        modalidades: modalidadesResult.rows.map((row) => row.nombre),
        tipos: tiposResult.rows.map((row) => row.nombre),
      }),
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
  } finally {
    await client.end().catch((endError) =>
      console.error("Error cerrando conexión:", endError)
    );
  }
}


