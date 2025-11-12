// /api/getPropertyDetails.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  // 🔹 Manejo CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight OK
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Debe indicar el id de la propiedad" });
    }

    const propertyId = parseInt(id, 10);
    if (isNaN(propertyId)) {
      return res
        .status(400)
        .json({ message: "Id inválido, debe ser un número" });
    }

    // 🔹 Consultar propiedad principal
    const [propertyRows] = await pool.query(
      `
      SELECT 
        id, title, image, price,moneda, location, status, 
        bedrooms, bathrooms, area, description,
        latitude, longitude,
        address, frontera, Largo, area_c, cocheras, distribution, antiguedad,cerco_perimetrico,garantia,adelanto    
      FROM properties
      WHERE id = ?
      `,
      [propertyId]
    );

    if (propertyRows.length === 0) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
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

    // 🔹 Enviar respuesta
    return res.status(200).json({
      property,
      subProperties,
    });
  } catch (error) {
    console.error("❌ ERROR en getPropertyDetails:", error);
    return res.status(500).json({
      message: "Error al traer detalles de la propiedad",
      error: error.message,
    });
  }
}

