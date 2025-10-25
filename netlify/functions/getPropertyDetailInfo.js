const { Pool } = require("pg");

// 🧩 Reutilizamos el pool global (igual que en getPropertyDetails)
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  try {
    const rawId = event.queryStringParameters?.id;
    if (!rawId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Debe indicar el id de la propiedad" }),
      };
    }

    const propertyId = parseInt(rawId, 10);
    if (isNaN(propertyId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
      };
    }

    // 🔹 Consultamos coincidencias en la tabla mas_info
    const infoResult = await pool.query(
      `
      SELECT id, titulo_info, descripcion_info, id_properties
      FROM mas_info
      WHERE id_properties = $1
      ORDER BY id ASC
      `,
      [propertyId]
    );

    // 🔹 Retornar las coincidencias
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(infoResult.rows),
    };
  } catch (error) {
    console.error("❌ ERROR en getMasInfo:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer información adicional",
        error: error.message,
      }),
    };
  }
};