import { pool } from "./db.js";

export async function handler() {
  try {
    const [distritosRows] = await pool.execute("SELECT id, nombre, departamento FROM distritos ORDER BY departamento, nombre ASC");
    const [modalidadesRows] = await pool.execute("SELECT nombre FROM modalidades ORDER BY nombre ASC");
    const [tiposRows] = await pool.execute("SELECT nombre FROM tipos ORDER BY nombre ASC");

    // Agrupar distritos
    const groupedDistritos = distritosRows.reduce((acc, row) => {
      if (!acc[row.departamento]) acc[row.departamento] = [];
      acc[row.departamento].push({ id: row.id, nombre: row.nombre });
      return acc;
    }, {});

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        distritos: Object.keys(groupedDistritos).map(dep => ({ departamento: dep, distritos: groupedDistritos[dep] })),
        modalidades: modalidadesRows.map(r => r.nombre),
        tipos: tiposRows.map(r => r.nombre),
      }),
    };
  } catch (err) {
    console.error("❌ Error MySQL:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
