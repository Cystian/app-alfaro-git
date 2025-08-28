import React, { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false,
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast.error("ReCAPTCHA no disponible, intenta nuevamente.");
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form");
      const dataToSend = { ...formData, recaptchaToken: token };

      const response = await fetch("/.netlify/functions/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (result?.ok) {
        toast.success(result.message || "✅ Formulario enviado con éxito");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false,
        });
      } else {
        toast.error("❌ Error: " + (result.message || "Desconocido"));
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error inesperado: " + error.message);
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="TU_CLAVE_RECAPTCHA_PUBLICA">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2 w-full"
        />
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo"
          required
          className="border p-2 w-full"
        />
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Seleccione categoría</option>
          <option value="consulta">Consulta</option>
          <option value="soporte">Soporte</option>
          <option value="otro">Otro</option>
        </select>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Mensaje"
          className="border p-2 w-full"
        ></textarea>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="privacidadAceptada"
            checked={formData.privacidadAceptada}
            onChange={handleChange}
            required
            className="mr-2"
          />
          Acepto la política de privacidad
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Enviar
        </button>
      </form>
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
