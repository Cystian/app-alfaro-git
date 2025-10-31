// netlify/functions/getArticulos.js
import { pool } from "./db.js";

export async function handler(event) {
  try {
    const rawId = event.queryStringParameters?.id;

    // 🔹 Si mandan ID → traer artículo específico
    if (rawId) {
      const articuloId = parseInt(rawId, 10);

      if (isNaN(articuloId)) {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
        };
      }

      const [rows] = await pool.execute(
        `
        SELECT id, titulo, descripcion, imagen, fecha, link
        FROM articulos
        WHERE id = ?
        `,
        [articuloId]
      );

      if (rows.length === 0) {
        return {
          statusCode: 404,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Artículo no encontrado" }),
        };
      }

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(rows[0]),
      };
    }

    // 🔹 Si NO mandan ID → devolver todos los artículos
    const [rows] = await pool.execute(
      `
      SELECT id, titulo, descripcion, imagen, fecha, link
      FROM articulos
      ORDER BY fecha DESC
      `
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("❌ ERROR en getArticulos:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Error al traer artículos",
        error: error.message,
      }),
    };
  }
}
