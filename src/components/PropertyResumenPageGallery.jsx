// src/components/PropertyResumenPageGallery.jsx
import { useState, useEffect } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/PropertyResumenPageGallery.css"; // CSS Lightbox
import { motion } from "framer-motion";


export default function PropertyResumePageGallery({ images, currentIndex = 0, onClose }) {
  const [current, setCurrent] = useState(currentIndex);

  // Cambiar índice si se actualiza desde PropertyGallery
  useEffect(() => {
    setCurrent(currentIndex);
  }, [currentIndex]);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const currentImage = images[current];

  return (
    <div className="lightbox-overlay fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

        {/* Imagen principal */}
        <div className="flex-1 relative">
          <img
            src={currentImage.src}
            alt={currentImage.title || `Foto ${current + 1}`}
            className="object-contain w-full h-[400px] md:h-[500px]  rounded-t-xl md:rounded-l-xl"
          />

          {/* Título tipo sticker — arriba izquierda */}
          {currentImage.title && (
           <motion.div
  initial={{ y: -5, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="absolute top-4 left-4 flex items-center bg-white shadow-lg px-3 py-1 border-l-2 border-red-500 font-semibold text-red-500"
>
  {currentImage.title}
</motion.div>
          )}

          {/* Contador de fotos — abajo derecha */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg font-medium text-sm">
            {current + 1} / {images.length}
          </div>

          {/* Descripción al pie — solo subpropiedades */}
          {current !== 0 && currentImage.description && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg max-w-[90%] md:max-w-[70%] text-sm">
              {currentImage.description}
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
        <div className="flex md:flex-col md:w-28 overflow-x-auto md:overflow-y-auto mt-2 md:mt-0 md:ml-2 gap-2" style={{maxHeight:"600px",flexShrink:0,}}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.title || `Mini ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                i === current ? "border-rojo-inmobiliario scale-105" : "border-transparent"
              } w-20 h-20 object-cover md:w-20 md:h-20`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
