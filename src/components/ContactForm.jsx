import React, { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacidadAceptada) {
      setStatus({ type: "error", message: "Debes aceptar la política de privacidad" });
      return;
    }

    if (!executeRecaptcha) {
      setStatus({ type: "error", message: "Error: reCAPTCHA aún no está listo" });
      return;
    }

    setStatus({ type: "loading", message: "Enviando datos..." });

    try {
      // Genera el token de reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha("contact_form");

      const payload = {
        ...formData,
        recaptchaToken,
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec", // URL Web App
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        throw new Error("La respuesta no es un JSON válido: " + text);
      }

      console.log("📩 Respuesta del servidor:", result);

      if (result.ok) {
        setStatus({ type: "success", message: "✅ Datos guardados correctamente." });
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false,
        });
      } else {
        setStatus({ type: "error", message: "❌ Error: " + (result.error || "desconocido") });
      }
    } catch (error) {
      console.error("❌ Error en el envío:", error);
      setStatus({ type: "error", message: "Error al guardar: " + error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-3">Formulario de Contacto</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded"
        required
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded"
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded"
        required
      />

      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded"
        required
      >
        <option value="">Seleccione categoría</option>
        <option value="Consulta">Consulta</option>
        <option value="Soporte">Soporte</option>
        <option value="Otro">Otro</option>
      </select>

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        className="block w-full p-2 mb-2 border rounded"
      />

      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="privacidadAceptada"
          checked={formData.privacidadAceptada}
          onChange={handleChange}
          className="mr-2"
          required
        />
        Acepto la política de privacidad
      </label>

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {status.type === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {status.message && (
        <p
          className={`mt-3 text-sm ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  );
};

// Envolvemos el form dentro del Provider para reCAPTCHA v3
export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfQTrMrAAAAALEXtM-Gg4-6Qsw1Zyto0xxqEFVP">
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
