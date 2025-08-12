import { Client } from 'pg';

export async function handler() {
   console.log("Valor NEON_DB_URL:", process.env.NEON_DB_URL);

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false } // Mantén esto para Neon
  });

  try {
    await client.connect();
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: 'Conexión exitosa con Neon' }),
    };
  } catch (error) {
    console.error('Error en conexión:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a Neon', detalle: error.message }),
    };
  }
}

