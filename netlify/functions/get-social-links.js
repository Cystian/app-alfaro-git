import { Client } from 'pg';

export async function handler() {
  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const result = await client.query('SELECT * FROM redes_sociales ORDER BY id ASC');
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Error al obtener redes sociales:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al conectar a la BD', detalle: error.message }),
    };
  }
}
