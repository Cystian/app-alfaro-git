// src/components/VendeAlquilaForm.jsx
import React, { useState, useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";

const VendeAlquilaForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    tipoPropiedad: "",
    ubicacion: "",
    modalidad: "",
    precio: "",
    area: "",
    descripcion: "",
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
    const phoneRegex = /^\+?[0-9]{6,15}$/;

    if (!emailRegex.test(formData.correo)) {
      toast.error("Correo inválido ❌");
      return false;
    }
    if (!phoneRegex.test(formData.telefono)) {
      toast.error("Teléfono inválido (solo números, 6-15 dígitos)");
      return false;
    }
    if (!formData.tipoPropiedad || !formData.ubicacion || !formData.modalidad) {
      toast.error("Completa todos los datos de la propiedad");
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

      const recaptchaToken = await executeRecaptcha("vende_alquila_form");
      const payload = { ...formData, recaptchaToken };

      const result = await toast.promise(
        (async () => {
          const response = await fetch("/.netlify/functions/sendProperty", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          if (data.success !== true) {
            throw new Error(data.message || data.error || "Error al enviar");
          }
          return data;
        })(),
        {
          loading: "Enviando…",
          success: "¡Gracias! Revisaremos tu propiedad ✅",
          error: "Hubo un error al enviar ❌",
        }
      );

      console.log("📩 Respuesta del servidor:", result);

      // resetear el formulario
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        tipoPropiedad: "",
        ubicacion: "",
        modalidad: "",
        precio: "",
        area: "",
        descripcion: "",
        privacidadAceptada: false,
      });
    } catch (error) {
      console.error("❌ Error al enviar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Vende o Alquila tu Propiedad
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Completa los datos y un asesor se pondrá en contacto contigo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre completo"
          onChange={handleChange}
          value={formData.nombre}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />

        {/* Teléfono */}
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

        {/* Correo */}
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

        {/* Tipo de propiedad */}
        <select
          name="tipoPropiedad"
          onChange={handleChange}
          value={formData.tipoPropiedad}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
        >
          <option value="">Tipo de propiedad</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
          <option value="Terreno">Terreno</option>
          <option value="Oficina">Oficina</option>
          <option value="Local">Local comercial</option>
        </select>

        {/* Ubicación */}
        <input
          type="text"
          name="ubicacion"
          placeholder="Distrito / Ciudad"
          onChange={handleChange}
          value={formData.ubicacion}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />

        {/* Modalidad */}
        <select
          name="modalidad"
          onChange={handleChange}
          value={formData.modalidad}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
        >
          <option value="">Seleccione modalidad</option>
          <option value="Venta">Venta</option>
          <option value="Alquiler">Alquiler</option>
          <option value="Venta+Alquiler">Venta + Alquiler</option>
        </select>

        {/* Precio */}
        <input
          type="number"
          name="precio"
          placeholder="Precio de referencia (S/ o $)"
          onChange={handleChange}
          value={formData.precio}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />

        {/* Área */}
        <input
          type="number"
          name="area"
          placeholder="Área en m²"
          onChange={handleChange}
          value={formData.area}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />

        {/* Descripción */}
        <textarea
          name="descripcion"
          placeholder="Agrega detalles adicionales de tu propiedad..."
          onChange={handleChange}
          value={formData.descripcion}
          rows="4"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
        />

        {/* Política */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">
            Acepto la{" "}
            <a href="/privacidad" className="text-blue-600 underline">
              política de privacidad
            </a>
          </span>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                     py-3 rounded-lg shadow-md transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Enviando..." : "Enviar propiedad"}
        </button>
      </form>
    </div>
  );
};

export default function VendeAlquilaFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}>
      <VendeAlquilaForm />
    </GoogleReCaptchaProvider>
  );
}
