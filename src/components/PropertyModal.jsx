// src/components/PropertyModal.jsx
import React, { useEffect, useState } from "react";

const PropertyModal = ({ property, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(false);

  if (!property) return null;

  useEffect(() => {
    // Al montar el modal, activa la animación de entrada
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setVisible(false);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300); // misma duración de las transiciones
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo negro con fade */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ease-out
          ${visible && !closing ? "opacity-100" : "opacity-0"}`}
      ></div>

      {/* Contenedor modal con animaciones */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 transform transition-all duration-300 ease-out
          ${visible && !closing ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Imagen */}
        <div className="mb-4">
          <img
            src={property.flyer || property.image}
            alt={property.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-gray-600 text-lg">{property.location}</p>
          <p className="text-blue-600 text-xl font-semibold">{property.price}</p>
          <p className="text-sm text-gray-500">Estado: {property.status}</p>
        </div>

        {/* Botones */}
        <div className="mt-6 flex gap-3">
          {/* Botón Contactar */}
          <a
            href={`https://wa.me/51999999999?text=Hola, me interesa la propiedad: ${property.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 text-center transition"
          >
            Contactar
          </a>

          {/* Botón Descargar flyer (si no hay flyer, deshabilitado) */}
          <a
            href={property.flyer || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !property.flyer && e.preventDefault()}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition text-white ${
              property.flyer
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Descargar flyer
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
