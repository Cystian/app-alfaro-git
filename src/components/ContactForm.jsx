import React, { useState, useRef } from "react";
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
  const [successFields, setSuccessFields] = useState({}); // Para resaltado

  const captchaRef = useRef(null);
  const proxyURL = "/.netlify/functions/contactForm";

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
    setErrors({ ...errors, [name]: validate(name, newValue) });

    if (name === "mensaje") setCharCount(newValue.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacidadAceptada) {
      toast.error("Debes aceptar la política de privacidad");
      return;
    }

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Corrige los errores antes de enviar");
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await captchaRef.current.executeAsync();

      const payload = {
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.replace(/\D/g, ""),
        correo: formData.correo.trim(),
        categoria: formData.categoria.trim(),
        mensaje: formData.mensaje.trim(),
        privacidadAceptada: formData.privacidadAceptada,
        recaptchaToken,
      };

      const response = await fetch(proxyURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Tu mensaje fue enviado ✅", { duration: 4000 });

        // Resaltar campos en verde temporalmente
        const fieldKeys = Object.keys(formData);
        const successObj = {};
        fieldKeys.forEach((key) => (successObj[key] = true));
        setSuccessFields(successObj);

        // Limpiar formulario y errores
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "General",
          mensaje: "",
          privacidadAceptada: false,
        });
        setErrors({});
        setCharCount(0);

        // Quitar resaltado después de 1.5s
        setTimeout(() => setSuccessFields({}), 1500);

      } else {
        toast.error(result.message || "Error al enviar", { duration: 4000 });
      }
    } catch (error) {
      toast.error("Error de conexión: " + error.message, { duration: 4000 });
    }

    setLoading(false);
    captchaRef.current.reset();
  };

  const inputClass = (field) => `
    w-full p-2 border rounded
    ${errors[field] ? "border-red-500" : successFields[field] ? "border-green-500" : "border-gray-300"}
    focus:outline-none focus:ring-2 focus:ring-blue-400
  `;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className={inputClass("nombre")} required />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className={inputClass("telefono")} required />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}

        <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" className={inputClass("correo")} required />
        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}

        <select name="categoria" value={formData.categoria} onChange={handleChange} className={inputClass("categoria")}>
          <option value="General">General</option>
          <option value="Soporte">Soporte</option>
          <option value="Ventas">Ventas</option>
        </select>

        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje..." maxLength="500" className={inputClass("mensaje")} required />
        <p className="text-sm text-gray-500">{charCount}/500</p>
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="privacidadAceptada" checked={formData.privacidadAceptada} onChange={handleChange} />
          <span>Acepto la <a href="/privacidad" className="text-blue-600 underline">política de privacidad</a></span>
        </label>

        <ReCAPTCHA ref={captchaRef} sitekey="6LcX6rErAAAAAMEu9KoBGzNmmJjI8lUSo5i4-Lwe" size="invisible" />

        <button type="submit" className={`w-full py-2 rounded text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} flex items-center justify-center`} disabled={loading}>
          {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
