// src/components/PropertyDetails.jsx
import React from "react";

const PropertyDetails = ({ propData }) => {
  const lat = propData.latitude;
  const lng = propData.longitude;

  return (
    <div className="mt-4 p-4 text-center text-gray-700">
      {propData.description && (
        <p className="mb-3 text-left">
          <strong>Descripción:</strong>
          <div dangerouslySetInnerHTML={{ __html: propData.description }} />
        </p>
      )}
      {propData.status && (
        <p className="mb-1">
          <strong>Estado:</strong> {propData.status}
        </p>
      )}

      {/* Precio */}
      {propData.price && (
        <div className="flex justify-center items-center gap-2 mb-2">
          <img src="/precio.png" alt="Precio" className="w-5 h-5" />
          <p className="font-semibold text-blue-600">
            S/ {Number(propData.price).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
          </p>
        </div>
      )}

      {/* Área – Dormitorios – Baños */}
      <div className="flex justify-center items-center gap-6 mb-3 text-sm">
        <div className="flex items-center gap-1">
          <img src="/area.png" alt="Área" className="w-5 h-5" />
          <span>{propData.area} m²</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/dormi.png" alt="Dormitorios" className="w-5 h-5" />
          <span>{propData.bedrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src="/bano.png" alt="Baños" className="w-5 h-5" />
          <span>{propData.bathrooms}</span>
        </div>
      </div>

      {/* Ubicación */}
      {propData.location && (
        <div className="flex justify-center items-center gap-2 mt-2">
          <p className="text-sm">{propData.location}</p>
          {lat && lng && (
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver en Google Maps"
            >
              <img src="/maps.png" alt="Ver en Google Maps" className="w-5 h-5" />
            </a>
          )}
        </div>
      )}

      {/* Mapa */}
      {lat && lng && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 mt-4 rounded-xl overflow-hidden">
          <iframe
            title="Mapa de la propiedad"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
