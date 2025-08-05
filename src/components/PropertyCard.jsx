// src/components/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ property }) => {
  const { image, title, price, status, location, contactLink } = property;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image || 'https://via.placeholder.com/400x300'}
        alt={title || 'Propiedad'}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1">{title || 'Propiedad en Venta'}</div>
        <p className="text-gray-600 text-sm mb-2">
          {location || 'Ubicación no disponible'}
        </p>
        <p className="text-green-600 font-semibold text-lg">{price || 'S/ Consultar'}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
            status === 'Disponible'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status || 'Sin estado'}
        </span>
      </div>
      <div className="px-6 pb-4 flex justify-end">
        <a
          href={contactLink || '#'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-xl text-sm transition"
        >
          Contactar
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;
