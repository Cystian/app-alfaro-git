// ✅ Vercel soporta fetch nativo y body parsing automático en JSON
export default async function handler(req, res) {
  console.log("\n🧭 ===== NUEVA EJECUCIÓN /api/sendForm =====");

  console.log("📩 Evento recibido:", {
    method: req.method,
    bodyType: typeof req.body,
  });

  // ✅ Manejo de preflight (CORS)
  if (req.method === "OPTIONS") {
    console.log("⚙️ Respuesta OPTIONS (preflight)");
    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .send("OK");
  }

  // ✅ Solo permitir POST
  if (req.method !== "POST") {
    console.warn("⚠️ Método no permitido:", req.method);
    return res
      .status(405)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({ success: false, message: "Método no permitido" });
  }

  try {
    // 🔹 Parsear body desde el frontend
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    console.log("📦 Datos recibidos:", data);

    // 🧠 Validar token reCAPTCHA antes de continuar
    const recaptchaToken = data.recaptchaToken;
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    console.log("🔑 Clave secreta detectada:", secret ? "✅ Presente" : "❌ No configurada");
    console.log("🎟️ Token recibido:", recaptchaToken ? "✅ Presente" : "❌ Ausente");

    if (!recaptchaToken) {
      throw new Error("No se recibió el token reCAPTCHA desde el frontend.");
    }

    console.log("🧠 Verificando token reCAPTCHA con Google...");
    const verifyURL = "https://www.google.com/recaptcha/api/siteverify";

    const verifyResponse = await fetch(verifyURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${recaptchaToken}`,
    });

    console.log("🌐 HTTP Status reCAPTCHA:", verifyResponse.status);
    const verification = await verifyResponse.json();
    console.log("🧩 Resultado verificación reCAPTCHA:", verification);

    // ⚠️ Si falla la verificación, detener el flujo
    if (!verification.success) {
      console.warn("🚫 reCAPTCHA no fue exitoso:", verification["error-codes"]);
      return res
        .status(400)
        .setHeader("Access-Control-Allow-Origin", "*")
        .json({
          success: false,
          message: "❌ Falló la validación reCAPTCHA (no exitosa)",
          verification,
        });
    }

    if (verification.score < 0.5) {
      console.warn("⚠️ reCAPTCHA con score bajo:", verification.score);
      return res
        .status(400)
        .setHeader("Access-Control-Allow-Origin", "*")
        .json({
          success: false,
          message: `❌ Score reCAPTCHA demasiado bajo (${verification.score})`,
          verification,
        });
    }

    console.log("✅ reCAPTCHA verificado con éxito. Score:", verification.score);

    // 🔹 URL de tu Apps Script
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbw3bNJNLgKjk-ZXkyCKe9knM64OfOeG1ZwZVUgf98bGZtp6yHd9XFjFRuVeb_s11rmo/exec";

    console.log("📤 Enviando datos a Apps Script...");
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("🌐 HTTP Status Apps Script:", response.status);
    const text = await response.text();
    console.log("📬 Respuesta cruda de Apps Script:", text);

    let result;
    try {
      result = JSON.parse(text);
      console.log("✅ Apps Script devolvió JSON válido");
    } catch (err) {
      console.error("❌ Respuesta de Apps Script no es JSON válido:", err.message);
      result = {
        success: false,
        message: "Respuesta no es JSON válida",
        raw: text,
      };
    }

    console.log("🏁 Flujo completado correctamente ✅\n");

    return res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json(result);

  } catch (error) {
    console.error("💥 Error general en sendForm:", error.message);
    console.error(error.stack);
    console.log("🧭 ===== FIN EJECUCIÓN /api/sendForm (ERROR) =====\n");

    return res
      .status(500)
      .setHeader("Access-Control-Allow-Origin", "*")
      .json({
        success: false,
        message: error.message,
      });
  }
}
