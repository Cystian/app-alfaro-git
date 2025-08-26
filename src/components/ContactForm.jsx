import React, { useState } from "react";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Enviando datos..." });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec", // tu URL del WebApp
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Asegura que la respuesta sea JSON válido
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
      >
        <option value="">Seleccione categoría</option>
        <option value="consulta">Consulta</option>
        <option value="soporte">Soporte</option>
        <option value="otro">Otro</option>
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

export default ContactForm;

