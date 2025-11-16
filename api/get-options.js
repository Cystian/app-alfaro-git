// /api/getData.js
import { pool } from "./db.js";

export default async function handler(req, res) {
  try {
    // 🔹 Consultas concurrentes para optimizar tiempos de respuesta
    const [distritosRows, modalidadesRows, tiposRows] = await Promise.all([
      pool.execute(
        "SELECT id, nombre, departamento FROM distritos ORDER BY departamento, nombre ASC"
      ).then(([rows]) => rows),

      pool.execute(
        "SELECT nombre FROM modalidades ORDER BY nombre ASC"
      ).then(([rows]) => rows),

      pool.execute(
        "SELECT nombre FROM tipos ORDER BY orden ASC, nombre ASC"
      ).then(([rows]) => rows),
    ]);

    // 🔹 Agrupar distritos por departamento
    const groupedDistritos = distritosRows.reduce((acc, row) => {
      if (!acc[row.departamento]) acc[row.departamento] = [];
      acc[row.departamento].push({ id: row.id, nombre: row.nombre });
      return acc;
    }, {});

    // 🔹 Enviar respuesta
    res.status(200).json({
      distritos: Object.entries(groupedDistritos).map(([departamento, distritos]) => ({
        departamento,
        distritos,
      })),
      modalidades: modalidadesRows.map((r) => r.nombre),
      tipos: tiposRows.map((r) => r.nombre),
    });
  } catch (error) {
    console.error("❌ Error en la función getData:", error);
    res.status(500).json({
      error: "Error al obtener datos desde la base de datos",
      detalle: error.message,
    });
  }
}
