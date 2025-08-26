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
  const [status, setStatus] = useState(null);

  const WEBAPP_URL = "TU_URL_DEL_WEBAPP"; // 👈 reemplazar por tu URL publicada

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Enviando...");

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      console.log("Respuesta cruda del servidor:", text);

      const result = JSON.parse(text);

      if (result.ok) {
        setStatus("✅ Mensaje enviado con éxito");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false,
        });
      } else {
        setStatus("❌ Error: " + (result.error || "Intente de nuevo"));
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      setStatus("❌ Hubo un error al conectar con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded-xl bg-white">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={formData.categoria}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        required
        className="border p-2 mb-2 w-full"
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
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Enviar
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
};

export default ContactForm;
