import { Client } from 'pg';

export async function handler(event, context) {
  console.log("Valor NEON_DB_URL:", process.env.NEON_DB_URL);

  const dbUrl = process.env.NEON_DB_URL;

  if (!dbUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Variable NEON_DB_URL no definida" }),
    };
  }

  const client = new Client({
    connectionString: dbUrl.replace('&channel_binding=require', ''),
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Aquí podrías hacer una consulta de prueba:
    const res = await client.query('SELECT NOW() AS fecha_servidor');

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Conexión exitosa con Neon", resultado: res.rows }),
    };
  } catch (error) {
    console.error("Error detalle:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al conectar a Neon", detalle: error.message }),
    };
  }
}

