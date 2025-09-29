// ✅ src/components/ResultsGrid.jsx
import React from "react";
import PropTypes from "prop-types";

const ResultsGrid = ({ properties }) => {
  const titleText = `Mis resultados (${properties.length})`;

  return (
    <section className="mb-12">
      {/* Título del grid con número de resultados */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{titleText}</h2>

      {/* Grid responsivo: 1 columna en móviles, 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.description}</p>
            <p className="text-gray-800 font-bold mt-2">S/ {property.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

ResultsGrid.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default ResultsGrid;
