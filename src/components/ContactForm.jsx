import React, { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const { executeRecaptcha } = useGoogleReCaptcha();

  // Validación de campos
  const validateField = (name, value) => {
    if (!value && name !== "privacidadAceptada") return "vacío"; // campo obligatorio vacío

    switch (name) {
      case "correo":
        if (value && !/\S+@\S+\.\S+/.test(value)) return "Correo inválido";
        break;
      case "telefono":
        if (value && !/^\d+$/.test(value)) return "Solo números";
        break;
      case "mensaje":
        if (value && value.length < 10) return "Mínimo 10 caracteres";
        break;
      case "privacidadAceptada":
        if (!value) return "Debes aceptar la política";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    const error = validateField(name, val);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "mensaje") setCharCount(value.length);
  };

  const inputClass = (field) => {
    if (errors[field] === "vacío") return "block w-full p-2 mb-2 border border-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-orange-400";
    if (errors[field] && errors[field] !== "vacío") return "block w-full p-2 mb-2 border border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-400";
    if (formData[field] && !errors[field]) return "block w-full p-2 mb-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-400";
    return "block w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = executeRecaptcha ? await executeRecaptcha("contact_form") : "";

      const payload = { ...formData, recaptchaToken };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.ok) {
        alert("✅ Datos guardados correctamente.");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false,
        });
        setErrors({});
        setCharCount(0);
      } else {
        alert("❌ Error: " + (result.error || "desconocido"));
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error de conexión: " + err.message);
    } finally {
      setLoading(false);
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
        className={inputClass("nombre")}
        required
      />
      {errors.nombre && <p className="text-red-500 text-sm mb-2">{errors.nombre !== "vacío" ? errors.nombre : "Campo obligatorio"}</p>}

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        className={inputClass("telefono")}
        required
      />
      {errors.telefono && <p className="text-red-500 text-sm mb-2">{errors.telefono !== "vacío" ? errors.telefono : "Campo obligatorio"}</p>}

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        className={inputClass("correo")}
        required
      />
      {errors.correo && <p className="text-red-500 text-sm mb-2">{errors.correo !== "vacío" ? errors.correo : "Campo obligatorio"}</p>}

      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        className={inputClass("categoria")}
        required
      >
        <option value="">Seleccione categoría</option>
        <option value="Soporte">Soporte</option>
        <option value="Ventas">Ventas</option>
      </select>

      <textarea
        name="mensaje"
        placeholder="Mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        className={inputClass("mensaje")}
        maxLength={500}
        required
      />
      <p className="text-sm text-gray-500 mb-2">{charCount}/500</p>

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
      {errors.privacidadAceptada && (
        <p className="text-red-500 text-sm mb-2">{errors.privacidadAceptada}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

// Envolvemos con Provider
export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfQTrMrAAAAALEXtM-Gg4-6Qsw1Zyto0xxqEFVP">
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
