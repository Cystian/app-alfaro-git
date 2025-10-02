import React, { useEffect, useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Asesores = () => {
  const [asesores, setAsesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.netlify/functions/getAsesores")
      .then((res) => res.json())
      .then((data) => {
        setAsesores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar asesores:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-6 py-14 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-4 tracking-wide text-gray-900">
        Nuestro Equipo de Asesores
      </h1>
      <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
        Expertos en bienes raíces listos para guiarte en la compra o venta de tu
        propiedad con la más alta calidad de servicio.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Cargando asesores...</p>
      ) : asesores.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron asesores registrados.
        </p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {asesores.map((asesor) => (
            <div
              key={asesor.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden relative hover:shadow-2xl transition-all duration-500"
            >
              {/* Imagen con efecto luxury */}
              <div className="relative">
                <img
                  src={asesor.img_asesores}
                  alt={asesor.name_asesores}
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
                />
                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>

              {/* Información */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h2 className="text-2xl font-bold drop-shadow-md">
                  {asesor.name_asesores}
                </h2>
                <p className="text-sm opacity-90">Asesor Inmobiliario</p>
              </div>

              {/* Botones redes */}
              <div className="absolute bottom-6 right-6 flex gap-3 z-10">
                {asesor.face_asesores && (
                  <a
                    href={asesor.face_asesores}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition"
                  >
                    <FaFacebookF size={18} />
                  </a>
                )}
                {asesor.wasap_asesores && (
                  <a
                    href={`https://wa.me/${asesor.wasap_asesores}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Asesores;
