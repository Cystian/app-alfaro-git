// Importa el cliente MySQL
import mysql from "mysql2/promise"; // asegúrate de tenerlo: npm install mysql2

export async function handler() {
  console.log("Conectando a MySQL...");

  // Configura los datos de tu conexión MySQL en cPanel
  const connectionConfig = {
    host: "cp206.hpservidor.com",
    user: "inmobi16_puma",
    password: "cantaloop204",
    database: "inmobi16_prueba01",
  };

  let connection;

  try {
    // 🔹 Conexión
    connection = await mysql.createConnection(connectionConfig);
    console.log("✅ Conectado a MySQL");

    // 🔹 Consultas paralelas
    const [distritosResult, modalidadesResult, tiposResult] = await Promise.all([
      connection.execute("SELECT id, nombre, departamento FROM distritos ORDER BY departamento, nombre ASC"),
      connection.execute("SELECT nombre FROM modalidades ORDER BY nombre ASC"),
      connection.execute("SELECT nombre FROM tipos ORDER BY nombre ASC"),
    ]);

    // Los resultados vienen como [rows, fields]
    const distritosRows = distritosResult[0];
    const modalidadesRows = modalidadesResult[0];
    const tiposRows = tiposResult[0];

    // 🔹 Agrupar distritos por departamento
    const groupedDistritos = distritosRows.reduce((acc, row) => {
      if (!acc[row.departamento]) acc[row.departamento] = [];
      acc[row.departamento].push({ id: row.id, nombre: row.nombre });
      return acc;
    }, {});

    const distritosOptions = Object.keys(groupedDistritos).map((dep) => ({
      departamento: dep,
      distritos: groupedDistritos[dep],
    }));

    // 🔹 Respuesta final
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        distritos: distritosOptions,
        modalidades: modalidadesRows.map((r) => r.nombre),
        tipos: tiposRows.map((r) => r.nombre),
      }),
    };
  } catch (error) {
    console.error("❌ Error al conectar o consultar:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al conectar o consultar en MySQL",
        detalle: error.message,
      }),
    };
  } finally {
    if (connection) await connection.end();
  }
}
