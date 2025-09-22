import React, { useEffect, useState } from "react";

const PropertyResumenPage = () => {
  const [propData, setPropData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("propDataResumen");
    if (data) setPropData(JSON.parse(data));
  }, []);

  if (!propData) return <p>Cargando resumen...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{propData.title}</h1>
      <p><strong>Descripción:</strong> {propData.description}</p>
      <p><strong>Precio:</strong> S/ {propData.price}</p>
      <p><strong>Área:</strong> {propData.area} m²</p>
      <p><strong>Dormitorios:</strong> {propData.bedrooms}</p>
      <p><strong>Baños:</strong> {propData.bathrooms}</p>
      {/* Aquí puedes mostrar más campos de propData */}
    </div>
  );
};

export default PropertyResumenPage;
