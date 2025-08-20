// netlify/functions/getPropertyDetails.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  const propertyId = event.queryStringParameters?.id;

  if (!propertyId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Falta el parámetro id" }),
    };
  }

  try {
    // 🔹 Consulta principal de la propiedad
    const propertyRes = await pool.query(
      `
      SELECT id, title, image, price, location, status, bedrooms, bathrooms, area, description
      FROM properties
      WHERE id = $1
      LIMIT 1
      `,
      [propertyId]
    );

    if (propertyRes.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Propiedad no encontrada" }),
      };
    }

    const property = propertyRes.rows[0];

    // 🔹 Consulta de subpropiedades
    const subPropsRes = await pool.query(
      `
      SELECT id, property_id, flyer_id, content, image, "order", created_at, updated_at
      FROM sub_properties
      WHERE property_id = $1
      ORDER BY "order" ASC
      `,
      [propertyId]
    );
    const sub_properties = subPropsRes.rows;

    // 🔹 Consulta de flyer (si existe)
    let flyer = null;
    if (sub_properties.length > 0 && sub_properties[0].flyer_id) {
      const flyerRes = await pool.query(
        `
        SELECT id, texto_flyer, created_at, updated_at
        FROM flyer
        WHERE id = $1
        `,
        [sub_properties[0].flyer_id]
      );
      flyer = flyerRes.rows[0] || null;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...property,
        sub_properties,
        flyer,
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
