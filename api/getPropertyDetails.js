// /api/getPropertyDetails.js
import { pool } from "./db.js";

export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get("id");

    if (!rawId) {
      return new Response(
        JSON.stringify({ message: "Debe indicar el id de la propiedad" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const propertyId = parseInt(rawId, 10);
    if (isNaN(propertyId)) {
      return new Response(
        JSON.stringify({ message: "Id inválido, debe ser un número" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 🔹 Consultar propiedad principal
    const [propertyRows] = await pool.query(
      `
      SELECT 
        id, title, image, price, location, status, 
        bedrooms, bathrooms, area, description,
        latitude, longitude,
        address, frontera, Largo, area_c, cocheras, distribution, antiguedad 
      FROM properties
      WHERE id = ?
      `,
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Propiedad no encontrada" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
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

    // 🔹 Respuesta final
    return new Response(
      JSON.stringify({
        property,
        subProperties,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("❌ ERROR en getPropertyDetails:", error);
    return new Response(
      JSON.stringify({
        message: "Error al traer detalles de la propiedad",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
