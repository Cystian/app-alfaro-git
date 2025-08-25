import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    await fetch("https://script.google.com/macros/s/AKfycbyuPq4qKLV_CmeyICL5eAj8F_DyMjf28qv9QLZq8Cu0dZEXRoTdnGwV56yz0BXkhJJw/exec", {
      method: "POST",
      mode: "no-cors", // 👈 evita problemas CORS
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({ nombre: "", telefono: "", correo: "", mensaje: "" });
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
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

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
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

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
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

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
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition"
      >
        Enviar mensaje
      </button>
    </form>
  );
};

export default ContactForm;
