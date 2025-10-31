// netlify/functions/get-redes.js
import { pool } from "./db.js";

export async function handler() {
  try {
    const [rows] = await pool.execute("SELECT * FROM redes_sociales ORDER BY id ASC");

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("❌ Error MySQL redes_sociales:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al conectar a la BD", detalle: error.message }),
    };
  }
}

