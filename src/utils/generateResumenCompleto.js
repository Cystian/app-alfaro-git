export const generateResumenCompleto = (propData) => {
  // Guardar objeto en sessionStorage
  sessionStorage.setItem("propDataResumen", JSON.stringify(propData));

  // Abrir nueva pestaña
  window.open("/pages/resumen", "_blank");
};
