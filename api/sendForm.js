// ✅ Vercel soporta fetch nativo y body parsing automático en JSON
export default async function handler(req, res) {
  console.log("📩 Evento recibido en sendForm:", {
    method: req.method,
    body: req.body,
  });

  // ✅ Manejo de preflight (CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .send("OK");
  }

  // ✅ Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: false, message: "Método no permitido" });
  }

  try {
    // 🔹 Parsear body desde el frontend (Vercel ya lo entrega como objeto JSON)
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    console.log("📩 Data recibida en sendForm:", data);

    // 🔹 URL de tu Apps Script
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbw3bNJNLgKjk-ZXkyCKe9knM64OfOeG1ZwZVUgf98bGZtp6yHd9XFjFRuVeb_s11rmo/exec";

    console.log("📤 Enviando a Apps Script:", JSON.stringify(data));

    // 🔹 Reenviar solicitud a Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // 🔹 Leer respuesta cruda
    const text = await response.text();
    console.log("📬 Respuesta cruda Apps Script:", text);
    console.log("🔎 Tipo de contenido recibido:", response.headers.get("content-type"));
    console.log("🔎 Status HTTP Apps Script:", response.status);
    console.log("🔎 Texto exacto recibido:", JSON.stringify(text));

    // 🔹 Intentar parsear como JSON
    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error("❌ Respuesta no es JSON válido:", err.message);
      result = {
        success: false,
        message: "Respuesta no es JSON",
        raw: text,
      };
    }

    return res.status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json(result);

  } catch (error) {
    console.error("❌ Error en sendForm:", error);
    return res.status(500)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({
        success: false,
        message: error.message,
      });
  }
}
