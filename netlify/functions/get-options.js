import { Client } from 'pg';

export async function handler() {
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
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Conexión exitosa con Neon" }),
    };
  } catch (error) {
    console.error("Error detalle:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al conectar a Neon", detalle: error.message }),
    };
  }
}

