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
      body: JSON.stringify({ message: "Debe indicar el id de la propiedad" }),
    };
  }

  try {
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
      SELECT id, property_id, flyer_id, content, image, order
      FROM sub_properties
      WHERE property_id = $1
      ORDER BY "order" ASC
      `,
      [propertyId]
    );

    const subProperties = subPropsResult.rows;

    return {
      statusCode: 200,
      body: JSON.stringify({
        property,
        flyerData: { texto_flyer: property.texto_flyer },
        subProperties,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al traer detalles de la propiedad" }),
    };
  }
};
