// Si tu entorno ya tiene fetch nativo, puedes quitar esta línea
//import fetch from "node-fetch";

export async function handler(event, context) {
  console.log("📩 Evento recibido:", event);

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

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Método no permitido" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log("📩 Data recibida en sendForm:", data);

    const scriptURL = "https://script.google.com/macros/s/AKfycb.../exec";

    console.log("📤 Enviando a Apps Script:", JSON.stringify(data));

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

const text = await response.text();
console.log("📬 Respuesta cruda Apps Script:", text);

let result;
try {
  result = JSON.parse(text);
} catch (err) {
  console.error("❌ No es JSON válido:", err.message);
  result = { success: false, message: "Respuesta no es JSON", raw: text };
}
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("❌ Error en sendForm:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
}
