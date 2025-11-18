// api/get-properties.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    const { title = "", location = "", status = "", featured } = req.query || {};

    // =============================
    // 1️⃣ Detectar "Todos" en filtros
    // =============================
    const hasTodosTitle = title.split(",").some(t => t.trim().toLowerCase() === "todos");
    const hasTodosLocation = location.split(",").some(l => l.trim().toLowerCase() === "todos");
    const hasTodosStatus = status.split(",").some(s => s.trim().toLowerCase() === "todos");

    // =============================
    // 2️⃣ Limpiar arrays sin "Todos"
    // =============================
    const titleArr = !hasTodosTitle
      ? title.split(",").map(t => t.trim()).filter(Boolean)
      : [];
    const locationArr = !hasTodosLocation
      ? location.split(",").map(l => l.trim().toLowerCase()).filter(Boolean)
      : [];
    const statusArr = !hasTodosStatus
      ? status.split(",").map(s => s.trim().toLowerCase()).filter(Boolean)
      : [];

    // =============================
    // 3️⃣ Mapping de equivalencias para Title
    // =============================
    const titleMapping = {
      "terreno comercial": ["terreno comercial", "terreno industrial"],
      "local comercial": ["local comercial", "local"],
    };

    // =============================
    // 4️⃣ Expansión de títulos + lógica “terreno puro”
    // =============================
    let expandedTitleArr = [];
    let applyPureTerrenoRule = false;

    if (!hasTodosTitle) {
      titleArr.forEach(t => {
        const key = t.toLowerCase();
        if (key === "terreno") applyPureTerrenoRule = true;
        if (titleMapping[key]) expandedTitleArr.push(...titleMapping[key]);
        else expandedTitleArr.push(t);
      });
    }

    // NUEVO: Si el usuario eligió "Todos", activamos terreno puro también
    if (hasTodosTitle) applyPureTerrenoRule = true;

    // =============================
    // 5️⃣ Construcción base de la query
    // =============================
    let query = `
      SELECT id, title, image, price, moneda, location, address, status,
             bedrooms, bathrooms, area, created_at
      FROM properties
      WHERE 1=1
    `;
    const queryParams = [];

    // =============================
    // 6️⃣ Location
    // =============================
    if (!hasTodosLocation && locationArr.length) {
      query += ` AND (${locationArr.map(() => `LOWER(location) LIKE ?`).join(" OR ")})`;
      locationArr.forEach(l => queryParams.push(`%${l}%`));
    }

    // =============================
    // 7️⃣ Status
    // =============================
    if (!hasTodosStatus && statusArr.length) {
      query += ` AND (${statusArr.map(() => `LOWER(status) LIKE ?`).join(" OR ")})`;
      statusArr.forEach(s => queryParams.push(`%${s}%`));
    }

    // =============================
    // 8️⃣ Title (terreno puro + equivalencias)
    // =============================
    if (applyPureTerrenoRule || expandedTitleArr.length) {
      query += ` AND (`;

      if (applyPureTerrenoRule) {
        // 🔹 Terreno puro (sin comercial ni industrial)
        query += `
          (LOWER(title) LIKE ?) 
          AND LOWER(title) NOT LIKE '%comercial%' 
          AND LOWER(title) NOT LIKE '%industrial%'
        `;
        queryParams.push("%terreno%");
        // 🔹 Si hay otros títulos seleccionados, los agregamos con OR
        if (expandedTitleArr.length) {
          query += " OR " + expandedTitleArr.map(() => `LOWER(title) LIKE ?`).join(" OR ");
          expandedTitleArr.forEach(t => queryParams.push(`%${t.toLowerCase()}%`));
        }
      } else {
        // 🔹 Solo títulos normales
        query += expandedTitleArr.map(() => `LOWER(title) LIKE ?`).join(" OR ");
        expandedTitleArr.forEach(t => queryParams.push(`%${t.toLowerCase()}%`));
      }

      query += `)`;
    }

    // =============================
    // 9️⃣ Ordenamiento
    // =============================
    if (featured === "true") {
      query += " ORDER BY created_at DESC";
    } else if (!titleArr.length && !locationArr.length && !statusArr.length && hasTodosTitle && hasTodosLocation && hasTodosStatus) {
      query += " ORDER BY RAND() LIMIT 10";
    } else {
      query += " ORDER BY created_at DESC";
    }

    // =============================
    // 🔟 Ejecución
    // =============================
    const [rows] = await pool.query(query, queryParams);
    return res.status(200).json(rows);

  } catch (err) {
    console.error("❌ Error al traer propiedades:", err);
    return res.status(500).json({
      message: "Error al traer propiedades",
      error: err.message,
    });
  }
}