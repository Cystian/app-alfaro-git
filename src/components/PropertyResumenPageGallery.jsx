// src/components/PropertyResumenPageGallery.jsx
import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/PropertyResumenPageGallery.css"; // CSS Lightbox

export default function PropertyResumePageGallery({ images, title, description, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navegar a la imagen anterior
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Navegar a la imagen siguiente
  const nextImage = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="lightbox-overlay fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Imagen principal */}
        <div className="flex-1 relative">
          <img
            src={images[currentIndex]}
            alt={`Foto ${currentIndex + 1}`}
            className="object-contain w-full h-[400px] md:h-full rounded-t-xl md:rounded-l-xl"
          />

          {/* Título tipo sticker */}
          {title && (
            <div className="absolute top-4 left-4 bg-rojo-inmobiliario text-white px-3 py-1 rounded-lg font-semibold shadow">
              {title}
            </div>
          )}

          {/* Descripción al pie */}
          {description && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg max-w-[90%] md:max-w-[70%] text-sm">
              {description}
            </div>
          )}

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaTimes />
          </button>

          {/* Flechas de navegación */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Miniaturas */}
        <div className="flex md:flex-col md:w-28 overflow-x-auto md:overflow-y-auto mt-2 md:mt-0 md:ml-2 gap-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Mini ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                i === currentIndex ? "border-rojo-inmobiliario scale-105" : "border-transparent"
              } w-20 h-20 object-cover md:w-20 md:h-20`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}