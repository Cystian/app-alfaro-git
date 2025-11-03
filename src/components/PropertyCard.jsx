// src/components/PropertyCard.jsx
import React from "react";
import { Button } from "./ui/button";

const PropertyCard = ({ id, title, image, price, location, status }) => {
  // Mensaje para WhatsApp incluyendo título, ubicación, precio y URL de la imagen
  const whatsappMessage = `Hola, estoy interesado en la propiedad "${title}" ubicada en ${location} con precio ${price}. Aquí está la foto: ${image}`;
  // Número de contacto
  const whatsappNumber = "51931283609"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        className="w-full h-48 object-cover"
        src={image || "https://via.placeholder.com/400x300"}
        alt={title || "Propiedad"}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-1">{title || "Propiedad en Venta"}</div>
        <p className="text-gray-600 text-sm mb-2">
          {location || "Ubicación no disponible"}
        </p>
        <p className="text-green-600 font-semibold text-lg">
          {price || "$/ Consultar"}
        </p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
            status?.toLowerCase().includes("venta")
              ? "bg-green-100 text-green-700"
              : status?.toLowerCase().includes("alquiler")
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {status || "Sin estado"}
        </span>
      </div>
      <div className="px-6 pb-4 flex justify-end">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-4 rounded-xl text-sm transition">
            Contactar por WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PropertyCard;

