import React, { useEffect, useState } from "react";
import { 
  FaFacebookF, 
  FaWhatsapp, 
  FaUserTie, 
  FaInstagram, 
  FaTiktok, 
  FaLinkedinIn 
} from "react-icons/fa";
import FloatingShare from "../components/FloatingShare";

const Asesores = () => {
  const [asesores, setAsesores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getAsesores")
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
    <>
    <FloatingShare />
    <section
      id="redes"
      className="bg-gray-50 p-6 rounded-2xl shadow bg-white"
      style={{ paddingTop: "1rem", marginTop: "2rem" }}
    >
      <div className="mb-4">
        <img
          src="/subtitulos/equipo_asesores.png"
          alt="Nuestro Equipo de Asesores"
          className="w-[30rem] mx-auto"
        />
      </div>

      <p className="text-gray-600 text-lg text-center mb-12 max-w-3xl mx-auto">
        Expertos en bienes raíces listos para guiarte en la compra o venta de tu
        propiedad con la más alta calidad de servicio.
      </p>

      {loading ? (
        <div className="flex justify-center items-center gap-6 h-48">
          {[...Array(5)].map((_, i) => (
            <FaUserTie
              key={i}
              size={36}
              className={`text-gray-400 animate-bounce`}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      ) : asesores.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron asesores registrados.
        </p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {asesores.map((asesor) => (
            <div
              key={asesor.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-b from-white/30 via-white/10 to-white/0"
            >
              {/* Imagen principal */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={asesor.img_asesores}
                  alt={asesor.name_asesores}
                  className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-100"></div>
              </div>

              {/* Contenido centrado */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full px-4">
                <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
                  {asesor.name_asesores}
                </h2>
                <p className="text-sm opacity-90 tracking-wide mb-3">
                  Asesor Inmobiliario
                </p>

                {/* Redes sociales centradas */}
                <div className="flex justify-center gap-4">
                  {asesor.face_asesores && (
                    <a
                      href={asesor.face_asesores}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transform hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                    >
                      <FaFacebookF size={18} />
                    </a>
                  )}
                  {asesor.wasap_asesores && (
                    <a
                      href={`https://wa.me/${asesor.wasap_asesores}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transform hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                    >
                      <FaWhatsapp size={18} />
                    </a>
                  )}
                  {asesor.insta_asesores && (
                    <a
                      href={asesor.insta_asesores}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-pink-600 p-3 rounded-full shadow-lg hover:bg-pink-600 hover:text-white transform hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                    >
                      <FaInstagram size={18} />
                    </a>
                  )}
                  {asesor.tiktok_asesores && (
                    <a
                      href={asesor.tiktok_asesores}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-black hover:text-white transform hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                    >
                      <FaTiktok size={18} />
                    </a>
                  )}
                  {asesor.linkedin_asesores && (
                    <a
                      href={asesor.linkedin_asesores}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-blue-700 p-3 rounded-full shadow-lg hover:bg-blue-700 hover:text-white transform hover:-translate-y-1 hover:scale-110 transition-all duration-300"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
    </>
  );
};

export default Asesores;


