import React, { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) return "El nombre es obligatorio";
    if (!formData.telefono.match(/^\d+$/)) return "El teléfono debe contener solo números";
    if (!formData.correo.includes("@")) return "Correo inválido";
    if (!formData.mensaje || formData.mensaje.length < 10) return "El mensaje debe tener al menos 10 caracteres";
    if (!formData.privacidadAceptada) return "Debes aceptar la política de privacidad";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    if (!executeRecaptcha) {
      setStatus({ type: "error", message: "reCAPTCHA aún no está listo." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Enviando..." });

      const recaptchaToken = await executeRecaptcha("contact_form");

      const payload = { ...formData, recaptchaToken };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec",
        {
          method: "POST",
          mode:"cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Respuesta no es JSON válido: " + text);
      }

      if (result.ok) {
        setStatus({ type: "success", message: "✅ Datos guardados correctamente." });
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false
        });
      } else {
        setStatus({ type: "error", message: "❌ Error: " + (result.error || "desconocido") });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "⚠️ Error de conexión: " + err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-xl shadow-md space-y-3">
      <h2 className="text-xl font-bold">Formulario de Contacto</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="block w-full p-2 border rounded"
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
        className="block w-full p-2 border rounded"
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        required
        className="block w-full p-2 border rounded"
      />

      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        required
        className="block w-full p-2 border rounded"
      >
        <option value="">Seleccione categoría</option>
        <option value="Soporte">Soporte</option>
        <option value="Ventas">Ventas</option>
        <option value="Otro">Otro</option>
      </select>

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        className="block w-full p-2 border rounded"
        required
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="privacidadAceptada"
          checked={formData.privacidadAceptada}
          onChange={handleChange}
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
        <p className={`mt-2 text-sm ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {status.message}
        </p>
      )}
    </form>
  );
};

export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfQTrMrAAAAALEXtM-Gg4-6Qsw1Zyto0xxqEFVP">
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
