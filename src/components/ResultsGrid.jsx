// ✅ src/components/ResultsGrid.jsx
import React from "react";
import PropTypes from "prop-types";

const ResultsGrid = ({ properties, openPopup }) => {
  if (!properties || properties.length === 0) {
    return <p>No hay resultados disponibles.</p>;
  }

  return (
    <section className="mb-12">
      {/* Título del grid con número de resultados */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Mis resultados ({properties.length})
      </h2>

      {/* Grid responsivo */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 shadow flex flex-col hover:shadow-lg transition"
          >
            {/* Título */}
            <h3 className="font-semibold text-lg mb-2">{property.title}</h3>

            {/* Descripción */}
            {property.description && (
              <p className="text-gray-600 mb-4">{property.description}</p>
            )}

            {/* Botones al final de la tarjeta */}
            <div className="mt-auto flex gap-2">
              <a
                href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 transition"
              >
                Contactar
              </a>
              <button
                onClick={() => openPopup(property)}
                className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600 transition"
              >
                Ver flyer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResultsGrid;
