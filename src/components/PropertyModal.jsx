// src/components/PropertyModal.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyModal = ({ images = [], onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-4 max-w-3xl w-full relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-600"
        >
          ✕
        </button>

        {/* Carrusel */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true }}
          className="rounded-xl"
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
    </div>
  );
};

export default PropertyModal;


