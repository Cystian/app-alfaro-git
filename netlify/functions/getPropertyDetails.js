// netlify/functions/getPropertyDetails.js
const { Pool } = require("pg");

// Pool global para reutilizar conexiones
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

    // 🔹 Traer propiedad principal (con lat/long)
    const propertyResult = await pool.query(
      `
      SELECT id, title, image, price, location, status, 
             bedrooms, bathrooms, area, description,
             latitude, longitude
      FROM properties
      WHERE id = $1
      `,
      [propertyId]
    );

    if (propertyResult.rows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Propiedad no encontrada" }),
      };
    }

    const property = propertyResult.rows[0];

    // 🔹 Traer subpropiedades (con text_content)
    const subPropsResult = await pool.query(
      `
      SELECT id, property_id, content, image, "order", text_content
      FROM sub_properties
      WHERE property_id = $1
      ORDER BY "order" ASC
      `,
      [propertyId]
    );
    const subProperties = subPropsResult.rows;

    // 🔹 Respuesta final (sin flyerData)
    return {
      statusCode: 200,
      body: JSON.stringify({
        property,
        subProperties,
      }),
    };
  } catch (error) {
    console.error("ERROR en getPropertyDetails:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer detalles de la propiedad",
        error: error.message,
      }),
    };
  }
};
