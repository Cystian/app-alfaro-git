import { Client } from 'pg';

export async function handler() {
  const client = new Client({
    connectionString: process.env.NEON_DB_URL, // Se lee de Netlify
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query("SELECT 'Conexion OK' AS estado;");
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Conexión exitosa", resultado: res.rows })
    };
  } catch (error) {
    console.error("Error de conexión:", error);
    return { statusCode: 500, body: "Error al conectar a Neon" };
  }
}
