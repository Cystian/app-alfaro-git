// src/components/PropertyModal.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyModal = ({ property, onClose }) => {
  if (!property) return null;

  // Se arma un array con la foto principal + subfotos
  const images = [property.image, ...(property.subImages || [])];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[90%] max-w-4xl p-6 relative shadow-xl">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl z-50"
        >
          ✕
        </button>

        {/* Galería con Swiper */}
        <div className="mb-6">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-xl"
            style={{ paddingBottom: "40px" }} // 🔥 asegura espacio para bullets
          >
            {images.map((src, i) => (
              <SwiperSlide key={i}>
                <img
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="w-full h-[400px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Información extra */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-800">{property.title}</h2>
          <p className="text-gray-600">{property.description}</p>
          <p className="text-lg font-semibold text-blue-600">
            Precio: {property.price}
          </p>
          <p className="text-gray-700">Ubicación: {property.location}</p>
          {property.area && (
            <p className="text-gray-700">Área: {property.area} m²</p>
          )}
          {property.rooms && (
            <p className="text-gray-700">Habitaciones: {property.rooms}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;


