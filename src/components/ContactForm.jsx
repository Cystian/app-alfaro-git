import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    categoria: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación mínima
    if (!formData.nombre || !formData.telefono) {
      toast.error("⚠️ Completa tu nombre y teléfono");
      return;
    }

    const numero = "51999999999"; // 👉 tu número WhatsApp con código de país (sin +)
    const texto = `Hola 👋, soy ${formData.nombre}. 
Teléfono: ${formData.telefono}
Categoría: ${formData.categoria || "Sin especificar"}
Mensaje: ${formData.mensaje || "—"}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    setLoading(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
      toast.success("📨 Abriendo WhatsApp...");
      setFormData({ nombre: "", telefono: "", categoria: "", mensaje: "" });
    }, 600);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <p className="text-center text-gray-500 mb-6 text-sm">
        Completa tus datos y te contactaremos por WhatsApp.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-green-500 focus:border-green-500 outline-none transition"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ej. +51 999 999 999"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-green-500 focus:border-green-500 outline-none transition"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interés</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-green-500 focus:border-green-500 outline-none transition bg-white"
          >
            <option value="">Selecciona una opción</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Venta">Venta</option>
            <option value="Información">Solicitar información</option>
          </select>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-green-500 focus:border-green-500 outline-none transition resize-none"
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold 
                     py-3 rounded-lg shadow-md transition-all duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Abriendo WhatsApp..." : "Enviar por WhatsApp"}
        </button>
      </form>
    </div>
  );
}