import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MessageCircle } from "lucide-react";

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

    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      toast.error("⚠️ Ingresa tu nombre y teléfono antes de continuar");
      return;
    }

    const numero = "51940221494";
    const texto = `Hola 👋, soy ${formData.nombre}.
Teléfono: ${formData.telefono}
Interés: ${formData.categoria || "Sin especificar"}
Mensaje: ${formData.mensaje || "—"}`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    setLoading(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
      toast.success("📨 Redirigiendo a WhatsApp...");
      setFormData({ nombre: "", telefono: "", categoria: "", mensaje: "" });
    }, 600);
  };

  return (
    <div className="w-full flex justify-end">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md ml-auto bg-white border border-gray-100 p-6 rounded-2xl shadow-lg"
      >

        {/* Imagen de cabecera dentro del card y alineada a la derecha */}
        <div className="w-full flex justify-end mb-4">
          <img
            src="/subtitulos/tienes_dudas.png"
            alt="Tienes Dudas"
            className="w-[26rem] object-contain mx-auto"
          />
        </div>

        {/* Encabezado tipo WhatsApp */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 p-2 rounded-full text-white">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Contáctanos por WhatsApp
          </h2>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Déjanos tus datos y te responderemos lo antes posible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-green-500 outline-none transition"
          />

          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Tu número (ej. 999 999 999)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-green-500 outline-none transition"
          />

          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-green-500 outline-none transition bg-white"
          >
            <option value="">Selecciona un interés</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Venta">Venta</option>
            <option value="Información">Información general</option>
          </select>

          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
            rows="3"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 
                       focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold 
                       py-3 rounded-lg shadow-md transition 
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Abriendo WhatsApp..." : "Enviar por WhatsApp"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
