const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL de NeonDB en variables de entorno
  ssl: { rejectUnauthorized: false },
});

exports.handler = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT id, title, image, price, location, status
      FROM properties
      ORDER BY RANDOM()
      LIMIT 10
    `);
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al traer propiedades' }),
    };
  }
};
