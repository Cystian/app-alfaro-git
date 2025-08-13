import { Client } from 'pg';

export async function handler() {
  console.log("Usando cadena de conexión:", process.env.NEON_DB_URL);

  if (!process.env.NEON_DB_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Variable NEON_DB_URL no definida" }),
    };
  }

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: {
      require: true,
      rejectUnauthorized: false, // evita errores con certificados
    },
  });

  try {
    await client.connect();
    console.log("✅ Conexión exitosa a Neon");

    // Aquí podrías hacer un SELECT de prueba si quieres
    const res = await client.query('SELECT NOW()');
    
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        mensaje: "Conexión exitosa con Neon",
        horaServidor: res.rows[0].now
      }),
    };
  } catch (error) {
    console.error("❌ Error detalle:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al conectar a Neon",
        detalle: error.message,
      }),
    };
  }
}
