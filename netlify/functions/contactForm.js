import fetch from "node-fetch"; // solo si Node no tiene fetch nativo

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Método no permitido" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyuPq4qKLV_CmeyICL5eAj8F_DyMjf28qv9QLZq8Cu0dZEXRoTdnGwV56yz0BXkhJJw/exec";

    // Llamada al Apps Script
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // evita CORS
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
}
