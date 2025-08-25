import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "General",
    mensaje: "",
    privacidadAceptada: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const scriptURL = "https://script.google.com/macros/s/AKfycbyuPq4qKLV_CmeyICL5eAj8F_DyMjf28qv9QLZq8Cu0dZEXRoTdnGwV56yz0BXkhJJw/exec";

  // 🔹 Validación en tiempo real
  const validate = (name, value) => {
    switch (name) {
      case "correo":
        if (!/\S+@\S+\.\S+/.test(value)) return "Correo inválido";
        break;
      case "telefono":
        if (!/^\d+$/.test(value)) return "Solo números";
        break;
      case "mensaje":
        if (value.length < 10) return "Mínimo 10 caracteres";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });

    // Validar en tiempo real
    setErrors({ ...errors, [name]: validate(name, newValue) });

    if (name === "mensaje") setCharCount(newValue.length);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!recaptchaToken) {
    toast.error("Completa el reCAPTCHA");
    return;
  }

  if (!formData.privacidadAceptada) {
    toast.error("Debes aceptar la política de privacidad");
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        recaptchaToken, // 🔹 Enviar token al backend
      }),
    });

    const result = await response.json();

    if (result.success) { // 🔹 ahora coincide con Apps Script
      toast.success("Tu mensaje fue enviado ✅");
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        categoria: "General",
        mensaje: "",
        privacidadAceptada: false,
      });
      setCharCount(0);
    } else {
      toast.error(result.message || "Error al enviar");
    }
  } catch (error) {
    toast.error("Error de conexión");
  }
  setLoading(false);
};

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
          required
        />

        {/* Teléfono */}
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded"
          required
        />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}

        {/* Correo */}
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo"
          className="w-full p-2 border rounded"
          required
        />
        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}

        {/* Categoría */}
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="General">General</option>
          <option value="Soporte">Soporte</option>
          <option value="Ventas">Ventas</option>
        </select>

        {/* Mensaje */}
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          maxLength="500"
          className="w-full p-2 border rounded"
          required
        />
        <p className="text-sm text-gray-500">{charCount}/500</p>
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}

        {/* Checkbox privacidad */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
          />
          <span>
            Acepto la{" "}
            <a href="/privacidad" className="text-blue-600 underline">
              política de privacidad
            </a>
          </span>
        </label>

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LcX6rErAAAAAMEu9KoBGzNmmJjI8lUSo5i4-Lwe"
          onChange={setRecaptchaToken}
          size="invisible"
        />

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block"></span>
          ) : (
            "Enviar"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

