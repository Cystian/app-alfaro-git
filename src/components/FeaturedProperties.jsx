// src/components/FeaturedProperties.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import PropertyModal from "./PropertyModal";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  const openPopup = (prop) => setSelectedProperty(prop);
  const closePopup = () => setSelectedProperty(null);

  return (
    <section className="mb-12">
 

            <div className="mb-4">
    <img 
      src="/subtitulos/propiedades_destacadas.png" 
      alt="Propiedades Destacadas" 
      className="w-[30rem] mx-auto" 
    />
  </div>
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {properties.map((prop, index) => (
          <SwiperSlide key={prop.id}>
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                {index + 1}/{properties.length}
              </div>
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{prop.title}</h3>
                <p className="text-gray-500">{prop.location}</p>
                <p className="text-red-600 font-bold mt-2">
                  S/ {Number(prop.price).toLocaleString("es-PE")}
                </p>

                {/* Tipo de propiedad */}
                {prop.status && (
                  <p className="text-sm text-gray-600 mt-2 mb-2">{prop.status}</p>
                )}

                {/* Botones */}
                <div className="mt-auto flex gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${prop.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 transition no-underline hover:no-underline focus:no-underline active:no-underline"
                  >
                    Contactar
                  </a>

            {/*
  Ver Flxyer (rojo)
  <button
    onClick={() => openPopup(prop)}
    className="flex-1 bg-red-500 text-white text-center py-2 px-3 rounded-lg hover:bg-red-600 transition"
  >
    Ver flxyer
  </button>
*/}

                  {/* Ver Resumen (azul) */}
                  <a
                    href={`/propiedades/resumen/${prop.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600 transition no-underline hover:no-underline focus:no-underline active:no-underline"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* PropertyModal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={closePopup} />
      )}
    </section>
  );
};

export default FeaturedProperties;

