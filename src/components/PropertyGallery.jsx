import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaRulerCombined } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PropertyGallery({ data }) {
  const images = [
    data.property.image,
    ...data.subProperties.map((sub) => sub.image),
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Abre el Lightbox en la imagen seleccionada
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    updateLightboxContent(index);
    setLightboxOpen(true);
  };

  // ✅ Cierra el Lightbox
  const closeLightbox = () => setLightboxOpen(false);

  // ✅ Actualiza el contenido dinámico del Lightbox
  const updateLightboxContent = (index) => {
    if (index === 0) {
      setLightboxContent({
        img: images[0],
        title: data.property.title,
        description: "",
      });
    } else {
      const sub = data.subProperties[index - 1];
      setLightboxContent({
        img: images[index],
        title: sub?.content || "Subpropiedad",
        description: sub?.text_content || "",
      });
    }
  };

  // ✅ Navegar siguiente/anterior
  const showNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
    updateLightboxContent(nextIndex);
  };

  const showPrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
    updateLightboxContent(prevIndex);
  };

  // ✅ Control de teclado (→, ←, ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, currentImageIndex]);

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Encabezado */}
      <div className="flex items-center mb-2">
        <FaRulerCombined className="text-rojo-inmobiliario mr-3 text-2xl" />
        <h2 className="text-lg font-bold text-gray-800">Dimensiones</h2>
      </div>

      {/* Carrusel principal */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={15}
        slidesPerView={1}
        className="rounded-xl overflow-hidden shadow"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={idx === 0 ? data.property.title : data.subProperties[idx - 1]?.content}
              onClick={() => openLightbox(idx)}
              className="w-full h-80 object-cover rounded-xl cursor-pointer hover:opacity-90 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Información adicional */}
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Frente:</span>{" "}
          {data.property.front || "No especificado"} m
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Largo:</span>{" "}
          {data.property.length || "No especificado"} m
        </p>
      </div>

      {/* Lightbox con navegación interna */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            <img
              src={lightboxContent.img}
              alt={lightboxContent.title}
              className="w-full h-auto max-h-[70vh] rounded-lg object-contain transition-all duration-500"
            />

            {/* Título y descripción */}
            <div className="mt-4 text-center px-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {lightboxContent.title}
              </h2>
              {lightboxContent.description && (
                <p className="text-gray-700 mt-2">{lightboxContent.description}</p>
              )}
            </div>

            {/* Botón de cierre */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-5 text-gray-800 hover:text-red-600 font-bold text-3xl"
            >
              &times;
            </button>

            {/* Flechas de navegación */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 text-2xl"
            >
              &#10094;
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-gray-800 bg-opacity-50 hover:bg-opacity-80 rounded-full p-3 text-2xl"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
