// functions/getArticulos.js
const { Pool } = require("pg");

// Reutilizar el pool de conexiones
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL, // 👈 tu .env en Netlify
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  try {
    const rawId = event.queryStringParameters?.id;

    // 🔹 Si mandan ID → traer noticia específica
    if (rawId) {
      const noticiaId = parseInt(rawId, 10);
      if (isNaN(noticiaId)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
        };
      }

      const result = await pool.query(
        `
        SELECT id, titulo, descripcion, imagen, fecha, link
        FROM noticias
        WHERE id = $1
        `,
        [noticiaId]
      );

      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Noticia no encontrada" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0]),
      };
    }

    // 🔹 Si NO mandan ID → devolver todas las noticias
    const result = await pool.query(
      `
      SELECT id, titulo, descripcion, imagen, fecha, link
      FROM noticias
      ORDER BY fecha DESC
      `
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("ERROR en getNoticias:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer noticias",
        error: error.message,
      }),
    };
  }
};
