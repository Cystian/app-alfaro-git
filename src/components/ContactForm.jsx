import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^[0-9]{7,15}$/.test(formData.telefono)) {
      newErrors.telefono = "Debe contener solo números (7 a 15 dígitos)";
    }

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "El correo no es válido";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // 🚫 No envía si hay errores

    setStatus("loading");

    try {
      await fetch("TU_URL_WEBHOOK", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData({ nombre: "", telefono: "", correo: "", mensaje: "" });
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("Error al enviar:", error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 max-w-lg w-full mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Contáctanos</h2>

      {/* Nombre */}
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
      </div>

      {/* Teléfono */}
      <div className="mb-4">
        <label htmlFor="telefono" className="block text-gray-700 font-medium mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
      </div>

      {/* Correo */}
      <div className="mb-4">
        <label htmlFor="correo" className="block text-gray-700 font-medium mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
      </div>

      {/* Mensaje */}
      <div className="mb-4">
        <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {/* Mensajes de estado */}
      {status === "success" && (
        <p className="mt-3 text-green-600 font-medium">✅ Tu mensaje fue enviado correctamente.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-600 font-medium">❌ Hubo un error al enviar. Intenta de nuevo.</p>
      )}
    </form>
  );
};

export default ContactForm;

