import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function PropertyGallery({ data }) {
  const [images, setImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    if (!data?.property) return;
    const cleanImages = [
      data.property.image,
      ...(data.subProperties?.map((sub) => sub.image) || []),
    ].filter((img) => img && img.trim() !== "");
    setImages(cleanImages);
  }, [data]);

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
        modules={[Navigation, Pagination, Thumbs, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-2xl overflow-hidden w-full max-w-5xl mx-auto"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[60vh] sm:h-[75vh] bg-black flex items-center justify-center"
              onClick={() => openLightbox(index)}
            >
              <img
                src={img}
                alt={`Imagen ${index + 1}`}
                className="object-cover object-center w-full h-full transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen principal */}
            <img
              src={lightboxContent.img}
              alt={lightboxContent.title}
              className="w-auto max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Información elegante debajo */}
            <div className="w-full text-center mt-4 bg-black/70 text-white py-3 px-6 rounded-b-xl backdrop-blur-sm">
              <h2 className="text-lg sm:text-2xl font-semibold tracking-wide">
                {lightboxContent.title}
              </h2>
              {lightboxContent.description && (
                <p className="text-sm sm:text-base mt-1 opacity-90">
                  {lightboxContent.description}
                </p>
              )}
            </div>

            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-6 text-white hover:text-red-400 font-bold text-4xl transition"
            >
              &times;
            </button>

            {/* Navegación */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 text-2xl"
            >
              &#10094;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-3 text-2xl"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}