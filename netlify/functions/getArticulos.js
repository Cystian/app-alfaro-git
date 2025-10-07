// functions/getArticulos.js
const { Pool } = require("pg");

// 🔹 Configuración del pool de conexiones a la BD
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL, // URL de la BD en .env en Netlify
  ssl: { rejectUnauthorized: false }, // para Neon/Postgres en Netlify
});

exports.handler = async (event, context) => {
  try {
    const rawId = event.queryStringParameters?.id;

    // 🔹 Si mandan ID → traer artículo específico
    if (rawId) {
      const articuloId = parseInt(rawId, 10);
      if (isNaN(articuloId)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
        };
      }

      const result = await pool.query(
        `
        SELECT id, titulo, descripcion, imagen, fecha, link
        FROM articulos
        WHERE id = $1
        `,
        [articuloId]
      );

      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Artículo no encontrado" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0]),
      };
    }

    // 🔹 Si NO mandan ID → devolver todos los artículos
    const result = await pool.query(
      `
      SELECT id, titulo, descripcion, imagen, fecha, link
      FROM articulos
      ORDER BY fecha DESC
      `
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("ERROR en getArticulos:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer artículos",
        error: error.message,
      }),
    };
  }
};
