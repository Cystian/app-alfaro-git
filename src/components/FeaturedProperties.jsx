import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import PropertyModal from "./PropertyModal";

const FeaturedProperties = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let url = filters
          ? `/.netlify/functions/getPropertyDinamic?${new URLSearchParams(filters).toString()}`
          : "/.netlify/functions/getProperties";

        const res = await fetch(url);
        const data = await res.json();

        const cleanData = data.map((p) => ({
          ...p,
          image: p.image?.trim(),
          title: p.title?.trim(),
          price: p.price?.trim(),
          location: p.location?.trim(),
          status: p.status?.trim(),
        }));

        setProperties(Array.isArray(cleanData) ? cleanData : []);
      } catch (err) {
        console.error("Error al traer propiedades:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const openPopup = (property) => setSelectedProperty(property);
  const closePopup = () => setSelectedProperty(null);

  if (loading) return <p className="text-center py-8">Cargando propiedades...</p>;
  if (!properties.length) return <p className="text-center py-8">No hay propiedades disponibles.</p>;

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={3000}
        breakpoints={{ 640:{slidesPerView:1}, 768:{slidesPerView:2}, 1024:{slidesPerView:3} }}
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id}>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
              <img src={property.image} alt={property.title || "Propiedad"} className="h-48 w-full object-cover"/>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-1">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                <p className="text-blue-600 font-semibold mb-2">{property.price}</p>
                <p className="text-xs text-gray-500 mb-4">{property.status}</p>
                <div className="mt-auto flex gap-2">
                  <a href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${property.title}`}
                     target="_blank" rel="noopener noreferrer"
                     className="flex-1 bg-green-500 text-white text-center py-2 px-3 rounded-lg hover:bg-green-600 transition">
                    Contactar
                  </a>
                  <button onClick={() => openPopup(property)}
                          className="flex-1 bg-blue-500 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-600 transition">
                    Ver flyer
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={closePopup} />}
    </div>
  );
};

export default FeaturedProperties;
