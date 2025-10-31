// netlify/functions/getNoticias.js
import { pool } from "./db.js";

export async function handler(event) {
  try {
    const rawId = event.queryStringParameters?.id;

    // 🔹 Si mandan ID → traer noticia específica
    if (rawId) {
      const noticiaId = parseInt(rawId, 10);

      if (isNaN(noticiaId)) {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
        };
      }

      const [rows] = await pool.execute(
        `
        SELECT id, titulo, descripcion, imagen, fecha, link
        FROM noticias
        WHERE id = ?
        `,
        [noticiaId]
      );

      if (rows.length === 0) {
        return {
          statusCode: 404,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Noticia no encontrada" }),
        };
      }

      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(rows[0]),
      };
    }

    // 🔹 Si NO mandan ID → devolver todas las noticias
    const [rows] = await pool.execute(
      `
      SELECT id, titulo, descripcion, imagen, fecha, link
      FROM noticias
      ORDER BY fecha DESC
      `
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error("❌ ERROR en getNoticias:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Error al traer noticias",
        error: error.message,
      }),
    };
  }
}

