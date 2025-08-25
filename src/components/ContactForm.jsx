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

  const captchaRef = useRef(null);
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyuPq4qKLV_CmeyICL5eAj8F_DyMjf28qv9QLZq8Cu0dZEXRoTdnGwV56yz0BXkhJJw/exec";

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

  const executeCaptcha = () => {
    return new Promise((resolve, reject) => {
      let timedOut = false;
      const timer = setTimeout(() => {
        timedOut = true;
        reject(new Error("reCAPTCHA timeout, intenta nuevamente."));
      }, 10000);

      captchaRef.current.executeAsync().then((token) => {
        if (!timedOut) {
          clearTimeout(timer);
          resolve(token);
        }
      }).catch((err) => {
        if (!timedOut) {
          clearTimeout(timer);
          reject(err);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacidadAceptada) {
      toast.error("Debes aceptar la política de privacidad");
      return;
    }

    const fieldErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const err = validate(key, value);
      if (err) fieldErrors[key] = err;
    });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Corrige los errores antes de enviar");
      return;
    }

    setLoading(true);

    try {
      // Ejecutar reCAPTCHA
      const recaptchaToken = await executeCaptcha();

      // Llamada al backend
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Tu mensaje fue enviado ✅");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "General",
          mensaje: "",
          privacidadAceptada: false,
        });
        setCharCount(0);
        setErrors({});
      } else {
        toast.error(result.message || "Error al enviar");
      }
    } catch (error) {
      toast.error(error.message || "Error de conexión");
    }

    setLoading(false);
    captchaRef.current.reset();
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10 rounded-2xl">
          <span className="animate-spin border-4 border-blue-600 border-t-transparent rounded-full w-10 h-10"></span>
        </div>
      )}
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className={`w-full p-2 border rounded ${errors.nombre ? "border-red-500" : ""}`}
          required
          disabled={loading}
        />

        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className={`w-full p-2 border rounded ${errors.telefono ? "border-red-500" : ""}`}
          required
          disabled={loading}
        />
        {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}

        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo"
          className={`w-full p-2 border rounded ${errors.correo ? "border-red-500" : ""}`}
          required
          disabled={loading}
        />
        {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}

        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          <option value="General">General</option>
          <option value="Soporte">Soporte</option>
          <option value="Ventas">Ventas</option>
        </select>

        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          maxLength="500"
          className={`w-full p-2 border rounded ${errors.mensaje ? "border-red-500" : ""}`}
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500">{charCount}/500</p>
        {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
            disabled={loading}
          />
          <span>
            Acepto la{" "}
            <a href="/privacidad" className="text-blue-600 underline">
              política de privacidad
            </a>
          </span>
        </label>

        <ReCAPTCHA
          ref={captchaRef}
          sitekey="6LcX6rErAAAAAMEu9KoBGzNmmJjI8lUSo5i4-Lwe"
          size="invisible"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              Enviando...
            </>
          ) : (
            "Enviar"
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

