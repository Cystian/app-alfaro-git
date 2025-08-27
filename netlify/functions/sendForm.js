// netlify/functions/sendForm.js
export async function handler(event) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // 1) Validar reCAPTCHA en el servidor
    const secret = process.env.RECAPTCHA_SECRET; // <- configura en Netlify
    if (!secret) {
      return {
        statusCode: 500,
        headers: cors,
        body: JSON.stringify({ ok: false, error: "RECAPTCHA_SECRET no configurado" }),
      };
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: body.recaptchaToken || "",
      }),
    });

    const verifyJson = await verifyRes.json();
    if (!verifyJson.success || (typeof verifyJson.score === "number" && verifyJson.score < 0.5)) {
      return {
        statusCode: 400,
        headers: cors,
        body: JSON.stringify({ ok: false, error: "reCAPTCHA inválido", detalle: verifyJson }),
      };
    }

    // 2) Reenviar a tu Apps Script (server-to-server ⇒ sin CORS)
    const appsScriptUrl = process.env.APPS_SCRIPT_URL; // <- configura en Netlify (tu URL /exec)
    if (!appsScriptUrl) {
      return {
        statusCode: 500,
        headers: cors,
        body: JSON.stringify({ ok: false, error: "APPS_SCRIPT_URL no configurado" }),
      };
    }

    // Opcional: no mandes el token al Sheet (mejor higiene)
    const { recaptchaToken, ...forwardPayload } = body;

    const gasRes = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forwardPayload),
    });

    // Si tu GAS devuelve JSON como { ok: true, ... }
    const gasJson = await gasRes.json().catch(() => ({ ok: false, error: "Respuesta no JSON" }));

    return { statusCode: 200, headers: cors, body: JSON.stringify(gasJson) };
  } catch (err) {
    return { statusCode: 500, headers: cors, body: JSON.stringify({ ok: false, error: err.message }) };
  }
}
