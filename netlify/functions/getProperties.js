import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // NeonDB URL
  ssl: { rejectUnauthorized: false },
});

const app = express();

app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, image, price, location, status
      FROM properties
      ORDER BY RANDOM()
      LIMIT 10
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al traer propiedades' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
