// netlify/functions/getPropertyDetails.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  const { property_id } = event.queryStringParameters || {};

  if (!property_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "property_id es requerido" }),
    };
  }

  try {
    // Obtener subpropiedades
    const subPropsResult = await pool.query(
      `
      SELECT id, property_id, flyer_id, content, image, "order", create_at, update_at
      FROM sub_properties
      WHERE property_id = $1
      ORDER BY "order" ASC
      `,
      [property_id]
    );

    // Obtener información del flyer
    const flyerIds = subPropsResult.rows
      .map((sub) => sub.flyer_id)
      .filter((id) => id !== null);

    let flyers = [];
    if (flyerIds.length > 0) {
      const flyersResult = await pool.query(
        `
        SELECT id, texto_flyer, created_at, updated_at
        FROM flyer
        WHERE id = ANY($1::int[])
        `,
        [flyerIds]
      );
      flyers = flyersResult.rows;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        subProperties: subPropsResult.rows,
        flyers,
      }),
    };
  } catch (err) {
    console.error("Error en getPropertyDetails:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer detalles de la propiedad" }),
    };
  }
};
