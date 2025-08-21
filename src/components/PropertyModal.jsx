// src/components/PropertyModal.jsx
import React from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  // Aseguramos que existan imágenes
  const images = [property.image, ...(property.subImages || [])];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative w-11/12 max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Botón de cerrar */}
        <button
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-50"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Carrusel de imágenes */}
        <div className="w-full h-[60vh]">
          <Swiper
            navigation
            modules={[Navigation]}
            className="h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Datos de la propiedad */}
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-bold">{property.title}</h2>
          <p className="text-gray-700">{property.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
            <p><span className="font-semibold">Precio:</span> ${property.price}</p>
            <p><span className="font-semibold">Ubicación:</span> {property.location}</p>
            <p><span className="font-semibold">Área:</span> {property.area} m²</p>
            <p><span className="font-semibold">Habitaciones:</span> {property.bedrooms}</p>
            <p><span className="font-semibold">Baños:</span> {property.bathrooms}</p>
            <p><span className="font-semibold">Estado:</span> {property.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;

