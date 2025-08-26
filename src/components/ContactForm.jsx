import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validaciones básicas antes de enviar
  const validateForm = () => {
    if (!formData.nombre.trim()) return "⚠️ El nombre es obligatorio";
    if (!/^[0-9]{9}$/.test(formData.telefono))
      return "⚠️ El celular debe tener 9 dígitos";
    if (!/\S+@\S+\.\S+/.test(formData.correo))
      return "⚠️ El correo no es válido";
    if (!formData.categoria.trim()) return "⚠️ La categoría es obligatoria";
    if (!formData.mensaje.trim()) return "⚠️ El mensaje es obligatorio";
    return null;
  };

  // Enviar datos al Google Apps Script
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Enviando...");

    const error = validateForm();
    if (error) {
      setStatus(error);
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec", // tu WebApp URL
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus("✅ Registro exitoso");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
        });
      } else {
        setStatus("❌ Error en el servidor");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setStatus("❌ No se pudo conectar con el servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Formulario de Contacto</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="tel"
        name="telefono"
        placeholder="Celular (9 dígitos)"
        value={formData.telefono}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={formData.categoria}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Enviar
      </button>

      {status && <p className="mt-3 text-center">{status}</p>}
    </form>
  );
};

export default ContactForm;
