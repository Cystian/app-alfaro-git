import { Client } from 'pg';

export async function handler() {
  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: 'Conexión exitosa con Neon' }),
    };
  } catch (error) {
    // Log detallado del error
    console.error('Error detalle completo:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al conectar a Neon',
        detalle: error.message,
        stack: error.stack,
        name: error.name,
      }),
    };
  }
}
