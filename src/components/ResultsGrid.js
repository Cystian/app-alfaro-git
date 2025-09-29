import React from "react";

export default function ResultsGrid({ properties }) {
  if (!properties || properties.length === 0) return null;

  const titleText = `Mis resultados (${properties.length})`;

  return (
    <section className="mb-12">
      {/* Título del grid con número de resultados */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{titleText}</h2>

      {/* Grid responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop, index) => (
          <div
            key={prop.id}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-4"
          >
            {/* Contador de posición */}
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
              {index + 1}/{properties.length}
            </div>

            {/* Imagen de la propiedad */}
            <img
              src={prop.image}
              alt={prop.title || "Propiedad"}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            {/* Información */}
            <h3 className="text-lg font-semibold">{prop.title}</h3>
            <p className="text-sm text-gray-500">{prop.location}</p>
            <p className="text-red-600 font-bold mt-2">
              S/ {Number(prop.price).toLocaleString("es-PE")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

