import mysql from "mysql2/promise";

// Pool de conexión a tu MySQL
const pool = mysql.createPool({
  host: "cp206.hpservidor.com",
  user: "inmobi16_puma",
  password: "cantaloop204",
  database: "inmobi16_prueba01",
  port: 3306,
});

export async function handler() {
  try {
    // Consulta a MySQL
    const [rows] = await pool.execute("SELECT * FROM redes_sociales ORDER BY id ASC");

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Ajustar a tu dominio en producción
      },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("❌ Error MySQL redes_sociales:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Error al conectar a la BD", detalle: error.message }),
    };
  }
}

