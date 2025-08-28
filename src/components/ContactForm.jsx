import React, { useState, useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false,
  });

  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!emailRegex.test(formData.correo)) {
      toast.error("Correo inválido ❌");
      return false;
    }
    if (!phoneRegex.test(formData.telefono)) {
      toast.error("Teléfono inválido (solo números, 6-15 dígitos)");
      return false;
    }
    if (!formData.privacidadAceptada) {
      toast.error("Debes aceptar la política de privacidad");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!executeRecaptcha) {
      toast.error("Error: reCAPTCHA aún no está listo.");
      return;
    }

    try {
      setLoading(true);

      const recaptchaToken = await executeRecaptcha("contact_form");

      const payload = { ...formData, recaptchaToken };

      const response = await fetch("/.netlify/functions/sendForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

   const result = await response.json();
console.log("Respuesta del servidor:", result);

// Verifica distintas formas de 'ok'
if (result?.ok === true || result?.ok === "true") {
  toast.success(result.message || "Formulario enviado con éxito ✅");
  setFormData({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false,
  });
} else {
  toast.error(result.error || "Hubo un error al enviar ❌");
  console.log("Detalle:", result.detalle || result.error);
}
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("⚠️ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos del formulario */}
        {/* Nombre */}
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            onChange={handleChange}
            value={formData.nombre}
            required
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        {/* Teléfono */}
        <label className="block">
          <span className="text-sm font-medium">Teléfono</span>
          <input
            type="text"
            name="telefono"
            placeholder="Tu teléfono"
            onChange={handleChange}
            value={formData.telefono}
            required
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        {/* Correo */}
        <label className="block">
          <span className="text-sm font-medium">Correo</span>
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            onChange={handleChange}
            value={formData.correo}
            required
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        {/* Categoría */}
        <label className="block">
          <span className="text-sm font-medium">Categoría</span>
          <select
            name="categoria"
            onChange={handleChange}
            value={formData.categoria}
            required
            className="border p-2 rounded w-full mt-1"
          >
            <option value="">Seleccione categoría</option>
            <option value="Informes">Informes</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Ventas">Ventas</option>
            <option value="Alquiler+Ventas">Alquiler + Ventas</option>
          </select>
        </label>
        {/* Mensaje */}
        <label className="block">
          <span className="text-sm font-medium">Mensaje</span>
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje..."
            onChange={handleChange}
            value={formData.mensaje}
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        {/* Política */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
            required
          />
          <span>Acepto la política de privacidad</span>
        </label>
        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? "⏳ Enviando..." : "Enviar"}
        </button>
      </form>
    </>
  );
};

export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
