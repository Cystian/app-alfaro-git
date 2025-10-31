import { pool } from "./db.js";

export async function handler(event) {
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

    // 🔹 Consulta adaptada a MySQL
    const [rows] = await pool.query(
      `
      SELECT id, titulo_info, descripcion_info, id_properties
      FROM mas_info
      WHERE id_properties = ?
      ORDER BY id ASC
      `,
      [propertyId]
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(rows),
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
}
