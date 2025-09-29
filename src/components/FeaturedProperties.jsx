// ✅ Carrusel de propiedades destacadas: siempre 6 más recientes
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/getProperties?mode=featured")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("❌ Error en destacados:", err));
  }, []);

  if (!properties || properties.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Propiedades destacadas
      </h2>

      <Slider {...settings}>
        {properties.map((prop, index) => (
          <div key={prop.id} className="p-3">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Contador */}
              <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded-lg">
                {index + 1}/{properties.length}
              </div>

              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prop.title}</h3>
                <p className="text-sm text-gray-500">{prop.location}</p>
                <p className="text-red-600 font-bold mt-2">
                  S/ {Number(prop.price).toLocaleString("es-PE")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
