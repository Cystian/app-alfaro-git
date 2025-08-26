import React, { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    categoria: "",
    mensaje: "",
    privacidadAceptada: false
  });

  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("Error: reCAPTCHA aún no está listo.");
      return;
    }

    try {
      setLoading(true);

      // Genera el token de reCAPTCHA
      const recaptchaToken = await executeRecaptcha("contact_form");

      const payload = {
        ...formData,
        recaptchaToken
      };

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzEGzclu1isyIGnWE8NCD3kEAWJrcE1r0whsDq4JahdC68Agkx1dvCiN6pUKPhzWP-C/exec", // 👈 tu URL de Apps Script
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
      );

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (result.ok) {
        alert("Formulario enviado con éxito ✅");
        setFormData({
          nombre: "",
          telefono: "",
          correo: "",
          categoria: "",
          mensaje: "",
          privacidadAceptada: false
        });
      } else {
        alert("Hubo un error ❌");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error de conexión ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        onChange={handleChange}
        value={formData.nombre}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        onChange={handleChange}
        value={formData.telefono}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        onChange={handleChange}
        value={formData.correo}
        required
        className="border p-2 rounded w-full"
      />
      <select
        name="categoria"
        onChange={handleChange}
        value={formData.categoria}
        required
        className="border p-2 rounded w-full"
      >
        <option value="">Seleccione categoría</option>
        <option value="Soporte">Soporte</option>
        <option value="Ventas">Ventas</option>
      </select>
      <textarea
        name="mensaje"
        placeholder="Mensaje"
        onChange={handleChange}
        value={formData.mensaje}
        className="border p-2 rounded w-full"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="privacidadAceptada"
          checked={formData.privacidadAceptada}
          onChange={handleChange}
          required
        />
        Acepto la política de privacidad
      </label>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

// 👇 Envolvemos el form dentro del Provider
export default function ContactFormWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfQTrMrAAAAALEXtM-Gg4-6Qsw1Zyto0xxqEFVP">
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}

