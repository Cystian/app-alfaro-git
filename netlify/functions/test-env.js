export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      NEON_DB_URL: process.env.NEON_DB_URL || "NO DEFINIDA",
    }),
  };
}
