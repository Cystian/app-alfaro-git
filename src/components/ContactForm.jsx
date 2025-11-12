import React, { useState, useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";

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
      toast.error("📧 Correo inválido ❌");
      return false;
    }
    if (!phoneRegex.test(formData.telefono)) {
      toast.error("📞 Teléfono inválido (solo números, 6-15 dígitos)");
      return false;
    }
    if (!formData.privacidadAceptada) {
      toast.error("⚠️ Debes aceptar la política de privacidad");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("🔍 Validando formulario...");
    if (!validateForm()) return;

    if (!executeRecaptcha) {
      toast.error("⚠️ reCAPTCHA aún no está listo.");
      return;
    }

    try {
      setLoading(true);
      toast.dismiss();
      toast("🎯 Ejecutando reCAPTCHA...", { icon: "🤖" });

      // 🔹 Obtener token reCAPTCHA
      const recaptchaToken = await executeRecaptcha("contact_form");
      toast.success("✅ Token reCAPTCHA obtenido correctamente");

      const payload = { ...formData, recaptchaToken };

      toast("📨 Enviando datos al servidor...", { icon: "📡" });

      const response = await fetch("/api/sendForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success !== true) {
        toast.error(`❌ Error del servidor: ${data.message || "Error desconocido"}`);
        throw new Error(data.message || data.error || "Error al enviar");
      }

      toast.success("🎉 Formulario enviado con éxito ✅");

      // 🔹 Mostrar log visual de confirmación
      toast(`📩 Respuesta del servidor: ${data.message || "OK"}`, { icon: "💬" });

      // Reset form
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        categoria: "",
        mensaje: "",
        privacidadAceptada: false,
      });
    } catch (error) {
      toast.error(`💥 Error al enviar: ${error.message}`);
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <p className="text-center text-gray-500 mb-6 text-sm">
        Completa el formulario y nos pondremos en contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej. Juan Pérez"
            onChange={handleChange}
            value={formData.nombre}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Ej. +51 999 999 999"
            onChange={handleChange}
            value={formData.telefono}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            name="correo"
            placeholder="ejemplo@correo.com"
            onChange={handleChange}
            value={formData.correo}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            name="categoria"
            onChange={handleChange}
            value={formData.categoria}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
          >
            <option value="">Seleccione categoría</option>
            <option value="Informes">Informes</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Ventas">Ventas</option>
            <option value="Alquiler+Ventas">Alquiler + Ventas</option>
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje..."
            onChange={handleChange}
            value={formData.mensaje}
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          />
        </div>

        {/* Política de privacidad */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">Acepto la política de privacidad</span>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                     py-3 rounded-lg shadow-md transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
};

// Provider reCAPTCHA
export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}

