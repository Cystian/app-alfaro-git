// src/components/FeaturedProperties.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://inmobiliariaalfaro.netlify.app/.netlify/functions/getProperties"
        );
        const data = await response.json();

        // Limpiar datos de espacios y saltos de línea
        const cleanData = data.map((p) => ({
          ...p,
          image: p.image?.trim(),
          title: p.title?.trim(),
          price: p.price?.trim(),
          location: p.location?.trim(),
          status: p.status?.trim(),
        }));

        if (Array.isArray(cleanData)) setProperties(cleanData);
      } catch (error) {
        console.error("Error al traer propiedades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading)
    return <p className="text-center py-8">Cargando propiedades...</p>;

  if (!properties || properties.length === 0)
    return <p className="text-center py-8">No hay propiedades disponibles.</p>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Propiedades destacadas
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id}>
            <PropertyCard {...property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProperties;
