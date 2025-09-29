import React, { useState } from "react";
import PropertyModal from "./PropertyModal.jsx";

export default function ResultsGrid({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPopup = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closePopup = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded mb-4" />
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-bold mb-1">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{property.location}</p>
              <p className="text-blue-600 font-semibold mb-2">
                S/ {Number(property.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mb-4">{property.status}</p>
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
          </div>
        ))}
      </section>

      {/* Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={closePopup}
      />
    </div>
  );
}
