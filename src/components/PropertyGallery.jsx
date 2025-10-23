import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PropertyGallery({ data }) {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ✅ Construir imágenes solo cuando data esté lista
  useEffect(() => {
    if (!data?.property) return;
    const cleanImages = [
      data.property.image,
      ...(data.subProperties?.map((sub) => sub.image) || []),
    ].filter((img) => img && img.trim() !== "");
    setImages(cleanImages);
  }, [data]);

  // ✅ Controladores Lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    updateLightboxContent(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const updateLightboxContent = (index) => {
    if (index === 0) {
      setLightboxContent({
        img: images[0],
        title: data?.property?.title || "Propiedad",
        description: "",
      });
    } else {
      const sub = data?.subProperties?.[index - 1];
      setLightboxContent({
        img: images[index],
        title: sub?.content || "Vista adicional",
        description: sub?.text_content || "",
      });
    }
  };

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

  // ✅ Teclas → ← Esc
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

  // ⛔ Si no hay imágenes válidas, no renderizar
  if (!images.length) {
    return (
      <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50">
        No hay imágenes disponibles para esta propiedad.
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 max-w-full">
      {/* Carrusel principal */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        observer={true}
        observeParents={true}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-xl overflow-hidden shadow max-w-full"
        onSwiper={(swiper) => {
          // 🔄 Forzar recalculo al cargar imágenes
          setTimeout(() => swiper.update(), 300);
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
              <img
                src={img}
                alt={
                  idx === 0
                    ? data?.property?.title
                    : data?.subProperties?.[idx - 1]?.content
                }
                loading="lazy"
                onClick={() => openLightbox(idx)}
                className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-90 transition"
                onError={(e) => (e.target.style.opacity = 0.3)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxContent.img}
              alt={lightboxContent.title}
              className="w-full h-auto max-h-[70vh] rounded-lg object-contain"
            />
            <div className="mt-4 text-center px-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {lightboxContent.title}
              </h2>
              {lightboxContent.description && (
                <p className="text-gray-700 mt-2">{lightboxContent.description}</p>
              )}
            </div>

            {/* Botones */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-5 text-gray-800 hover:text-red-600 font-bold text-3xl"
            >
              &times;
            </button>

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
