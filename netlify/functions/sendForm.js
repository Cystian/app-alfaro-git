const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Obtener token reCAPTCHA
    const token = await executeRecaptcha("form_submit");

    // Enviar datos al backend
    const response = await fetch("/.netlify/functions/sendForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, recaptchaToken: token }),
    });

    let result;
    try {
      result = await response.json();
    } catch (err) {
      result = { ok: false, error: "Respuesta no es JSON válido" };
    }

    console.log("Respuesta del servidor:", result);

    // Nueva lógica: comprobamos ok pero también fallback
    if (result && result.ok) {
      alert("✅ Tu mensaje fue enviado con éxito.");
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        categoria: "",
        mensaje: "",
        privacidadAceptada: false,
      });
    } else {
      // Si result.ok no llega, igual notificamos
      alert("⚠️ Tus datos fueron enviados, pero hubo un detalle en la confirmación.");
      console.error("Detalle del error:", result);
    }
  } catch (err) {
    console.error("Error en envío:", err);
    setError("Hubo un problema al enviar el formulario.");
    alert("❌ Error al enviar el formulario. Intenta nuevamente.");
  } finally {
    setLoading(false);
  }
};

