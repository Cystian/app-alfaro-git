import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import PropertyCard from "./PropertyCard";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://inmobiliariaalfaro.netlify.app/.netlify/functions/getProperties"
        );
        const data = await response.json();
        console.log("Propiedades obtenidas:", data);
        if (Array.isArray(data)) setProperties(data);
      } catch (error) {
        console.error("Error al traer propiedades:", error);
      }
    };
    fetchProperties();
  }, []);

  if (!properties || properties.length === 0) {
    return <p className="text-center py-8">Cargando propiedades...</p>;
  }

  return (
    <div className="w-full">
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

