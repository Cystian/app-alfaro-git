// ✅ Carrusel de propiedades destacadas (6 más recientes)
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/.netlify/functions/getProperties?featured=true");
        const data = await res.json();
        setProperties(data.slice(0, 6)); // siempre 6 más recientes
      } catch (err) {
        console.error("Error al cargar propiedades destacadas:", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Propiedades destacadas</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      >
        {properties.map((prop, index) => (
          <SwiperSlide key={prop.id}>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                {index + 1}/{properties.length}
              </div>
              <img src={prop.image} alt={prop.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prop.title}</h3>
                <p className="text-gray-500">{prop.location}</p>
                <p className="text-red-600 font-bold mt-2">
                  S/ {Number(prop.price).toLocaleString("es-PE")}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProperties;
