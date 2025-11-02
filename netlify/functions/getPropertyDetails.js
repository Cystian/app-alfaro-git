// netlify/functions/getPropertyDetails.js
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

    // 🔹 Consultar propiedad principal
    const [propertyRows] = await pool.query(
      `
      SELECT 
        id, title, image, price, location, status, 
        bedrooms, bathrooms, area, description,
        latitude, longitude,
        address, frontera, Largo, area_c, cocheras,distribution  
      FROM properties
      WHERE id = ?
      `,
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Propiedad no encontrada" }),
      };
    }

    const property = propertyRows[0];

    // 🔹 Consultar subpropiedades relacionadas (galería / info extra)
    const [subProperties] = await pool.query(
      `
      SELECT id, property_id, content, image, \`order\`, text_content
      FROM sub_properties
      WHERE property_id = ?
      ORDER BY \`order\` ASC
      `,
      [propertyId]
    );

    // 🔹 Armar respuesta final
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        property,
        subProperties,
      }),
    };
  } catch (error) {
    console.error("❌ ERROR en getPropertyDetails:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al traer detalles de la propiedad",
        error: error.message,
      }),
    };
  }
}

