// src/components/PropertyCard.jsx
import React from "react";
import { Button } from "./ui/button";

const PropertyCard = ({ id, title, image, price, location, status }) => {
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
          {price || "S/ Consultar"}
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
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-xl text-sm transition"
        >
          Contactar
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;

