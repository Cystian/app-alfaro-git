const { Pool } = require("pg");

// Reutilizar el pool de conexiones
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL, // 👈 en tu .env en Netlify
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  try {
    const rawId = event.queryStringParameters?.id;

    // 🔹 Si mandan ID → traer un asesor específico
    if (rawId) {
      const asesorId = parseInt(rawId, 10);
      if (isNaN(asesorId)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
        };
      }

      const result = await pool.query(
        `
        SELECT id, img_asesores, name_asesores, face_asesores, wasap_asesores
        FROM asesores
        WHERE id = $1
        `,
        [asesorId]
      );

      if (result.rows.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Asesor no encontrado" }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0]),
      };
    }

    // 🔹 Si NO mandan ID → devolver todos los asesores
    const result = await pool.query(
      `
      SELECT id, img_asesores, name_asesores, face_asesores, wasap_asesores
      FROM asesores
      ORDER BY id ASC
      `
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("ERROR en getAsesores:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer asesores",
        error: error.message,
      }),
    };
  }
};
