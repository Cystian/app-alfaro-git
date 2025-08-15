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
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://inmobiliariaalfaro.netlify.app/.netlify/functions/getProperties"
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Limpiar posibles caracteres extra en las URLs
          const cleanData = data.map(p => ({
            ...p,
            image: p.image?.trim() || "https://via.placeholder.com/400x300"
          }));
          setProperties(cleanData);
        } else {
          console.error("Datos de propiedades vacíos o formato incorrecto:", data);
          setError(true);
        }
      } catch (err) {
        console.error("Error al traer propiedades:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Cargando propiedades...</p>;
  }

  if (error || properties.length === 0) {
    return <p className="text-center py-8">No se pudieron cargar las propiedades.</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Propiedades destacadas</h2>
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
            <PropertyCard property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedProperties;
