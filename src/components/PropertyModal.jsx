// src/components/PropertyModal.jsx
import React from "react";

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Imagen grande */}
        <div className="mb-4">
          <img
            src={property.flyer || property.image}
            alt={property.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Info de la propiedad */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-gray-600 text-lg">{property.location}</p>
          <p className="text-blue-600 text-xl font-semibold">{property.price}</p>
          <p className="text-sm text-gray-500">Estado: {property.status}</p>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3">
          <a
            href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-center transition"
          >
            Contactar
          </a>

          {property.flyer && (
            <a
              href={property.flyer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center transition"
            >
              Descargar flyer
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
