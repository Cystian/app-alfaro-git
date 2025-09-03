// ✅ Netlify ya soporta fetch nativo, no necesitas importar node-fetch
export async function handler(event, context) {
  console.log("📩 Evento recibido en sendForm:", {
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
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ success: false, message: "Método no permitido" }),
    };
  }

  try {
    // Parsear body del frontend
    const data = JSON.parse(event.body || "{}");
    console.log("📩 Data recibida en sendForm:", data);

    // URL de tu Apps Script
    const scriptURL =
      "https://script.google.com/macros/s/AKfycby4cr1aLRj3R_MJGrVX39RrXoPO6fUWcloIZaIatfQ52Q5p-1L_Mu8oW7WDmlmytGQ2/exec";

    console.log("📤 Enviando a Apps Script:", JSON.stringify(data));

    // Forward request a Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Leer respuesta cruda
    const text = await response.text();
    console.log("📬 Respuesta cruda Apps Script:", text);

    console.log("🔎 Tipo de contenido recibido:", response.headers.get("content-type"));
console.log("🔎 Status HTTP Apps Script:", response.status);
console.log("🔎 Texto exacto recibido:", JSON.stringify(text));


    // Intentar parsear como JSON
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

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("❌ Error en sendForm:", error);
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
