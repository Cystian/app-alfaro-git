// netlify/functions/vendeAlquilaForm.js

export async function handler(event, context) {
  console.log("📩 Evento recibido en vendeAlquilaForm:", {
    method: event.httpMethod,
    body: event.body,
  });

  // Manejo de preflight (CORS)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "OK",
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Método no permitido" }),
    };
  }

  try {
    // Parsear body del frontend
    const data = JSON.parse(event.body || "{}");
    console.log("📩 Data recibida en vendeAlquilaForm:", data);

    // URL de tu Apps Script exclusivo para Vende/Alquila
    const scriptURL =
      "https://script.google.com/macros/s/TU_SCRIPT_VENDE_ALQUILA/exec";

    console.log("📤 Enviando a Apps Script (Vende/Alquila):", JSON.stringify(data));

    // Forward request a Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Leer respuesta cruda
    const text = await response.text();
    console.log("📬 Respuesta cruda Apps Script (Vende/Alquila):", text);

    // Intentar parsear como JSON
    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error("❌ Respuesta no es JSON válido:", err.message);
      result = { success: false, message: "Respuesta no es JSON", raw: text };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("❌ Error en vendeAlquilaForm:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
}
