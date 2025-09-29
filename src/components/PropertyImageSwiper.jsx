// src/components/PropertyImageSwiper.jsx
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const PropertyImageSwiper = ({ images, labels, propTitle }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="p-4">
      {/* Swiper principal */}
      <Swiper
        modules={[Navigation, Thumbs, EffectFade, Autoplay]}
        navigation
        effect="fade"
        loop
        autoplay={{
          delay: 3500, // ⏱ cada 3.5 segundos
          disableOnInteraction: false, // sigue aunque el usuario toque flechas/miniaturas
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="rounded-xl relative"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`${propTitle} - ${labels[idx] || "Imagen"} ${idx + 1}`}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={Math.min(images.length, 5)}
        watchSlidesProgress
        slideToClickedSlide
        className="mt-4 h-20 overflow-x-auto"
        breakpoints={{
          320: { slidesPerView: Math.min(images.length, 3), spaceBetween: 8 },
          640: { slidesPerView: Math.min(images.length, 4), spaceBetween: 10 },
          1024: { slidesPerView: Math.min(images.length, 5), spaceBetween: 10 },
        }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="cursor-pointer relative">
            <img
              src={img}
              alt={`Miniatura ${idx + 1}`}
              className={`w-full h-16 sm:h-20 object-cover rounded-lg border-2 ${
                activeIndex === idx ? "border-blue-500" : "border-gray-300"
              } hover:border-blue-500 transition`}
              loading="lazy"
            />
            {labels[idx] && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-1 rounded">
                {labels[idx]}
              </span>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertyImageSwiper;

