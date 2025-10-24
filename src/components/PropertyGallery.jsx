import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import { FiX, FiCamera } from "react-icons/fi";
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
      <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50 font-sans">
        No hay imágenes disponibles para esta propiedad.
      </div>
    );
  }

  return (
   <div className="flex flex-col bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 w-[97.5%] mx-auto font-sans relative"> 
     {/* Carrusel principal */}
      <div className="relative rounded-2xl overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-2xl overflow-hidden w-full"
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full aspect-[2.1:1] bg-black flex items-center justify-center"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className="object-cover object-center w-full h-full transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                  loading="lazy"
                />
                {/* Degradado inferior más sutil */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botón "Ver fotos" — visible, en esquina inferior derecha */}
        <button
          onClick={() => openLightbox(0)}
          className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/95 text-gray-800 font-medium py-2 px-5 rounded-full shadow-lg hover:shadow-xl hover:bg-white z-20 transition-all duration-300 text-sm tracking-wide"
        >
          <FiCamera className="text-rojo-inmobiliario" />
          Ver fotos
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icono cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 left-6 text-white text-3xl hover:text-red-400 transition-all"
            >
              <FiX strokeWidth={1.5} />
            </button>

            {/* Imagen */}
            <img
              src={lightboxContent.img}
              alt={lightboxContent.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Texto debajo */}
            <div className="mt-4 text-center px-4">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                {lightboxContent.title}
              </h2>
              {lightboxContent.description && (
                <p className="text-gray-300 mt-2 max-w-2xl mx-auto leading-relaxed text-sm">
                  {lightboxContent.description}
                </p>
              )}
            </div>

            {/* Navegación */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-gray-900/40 hover:bg-gray-900/70 rounded-full p-3 text-2xl"
            >
              &#10094;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-gray-900/40 hover:bg-gray-900/70 rounded-full p-3 text-2xl"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
