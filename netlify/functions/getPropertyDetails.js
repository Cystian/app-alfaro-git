// netlify/functions/getPropertyDetails.js
const { Pool } = require("pg");

// Pool global para reutilizar conexiones
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  try {
    // Validar que venga el id
    const rawId = event.queryStringParameters?.id;
    if (!rawId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Debe indicar el id de la propiedad" }),
      };
    }

    // Convertir a número
    const propertyId = parseInt(rawId, 10);
    if (isNaN(propertyId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Id inválido, debe ser un número" }),
      };
    }

    // 🔹 Traer la propiedad principal y su flyer
    const propertyResult = await pool.query(
      `
      SELECT p.id, p.title, p.image, p.price, p.location, p.status, 
             p.bedrooms, p.bathrooms, p.area, p.description,
             f.texto_flyer
      FROM properties p
      LEFT JOIN flyer f ON f.id = p.id
      WHERE p.id = $1
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

    // 🔹 Traer subpropiedades
    const subPropsResult = await pool.query(
      `
      SELECT id, property_id, flyer_id, content, image, "order"
      FROM sub_properties
      WHERE property_id = $1
      ORDER BY "order" ASC
      `,
      [propertyId]
    );

    const subProperties = subPropsResult.rows;

    // Respuesta exitosa
    return {
      statusCode: 200,
      body: JSON.stringify({
        property,
        subProperties,
      }),
    };
  } catch (error) {
    // Mostrar error real para debug
    console.error("ERROR en getPropertyDetails:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer detalles de la propiedad",
        error: error.message, // ⚡ Esto te permite ver qué falla
      }),
    };
  }
};
