// ✅ Banner de búsqueda dinámico
import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";

const SearchBanner = ({ onSearch }) => {
  const [distritosOptions, setDistritosOptions] = useState([]);
  const [modalidadesOptions, setModalidadesOptions] = useState([]);
  const [tiposOptions, setTiposOptions] = useState([]);

  const [distritos, setDistritos] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => setTimeout(() => setShowText(true), 200), []);

  // 🖼️ Lista de imágenes para el banner (rotación automática)
  const images = [
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    "/banner4.png",
    "/banner5.png",
    "/banner6.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // ⏱️ Cambia la imagen cada 4 segundos con transición suave
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // 🔹 Carga opciones dinámicas desde Netlify Function
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/api/get-options");
        const data = await res.json();
        setDistritosOptions(data.distritos || []);
        setModalidadesOptions(data.modalidades || []);
        setTiposOptions(data.tipos || []);
      } catch (error) {
        console.error("Error cargando opciones:", error);
      }
    };
    fetchOptions();
  }, []);

  const isSearchEnabled =
    distritos.length > 0 && modalidades.length > 0 && tipos.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const flatDistritos = distritos.join ? distritos : distritos;
    const filters = {
      location: flatDistritos.join(","),
      status: modalidades.join(","),
      title: tipos.join(","),
    };
    onSearch(filters); // pasa filtros al grid
  };

  return (
    <section className="relative w-full h-[520px] flex flex-col items-center justify-center mt-2 px-4 overflow-visible rounded-3xl">
      {/* Fondo dinámico con transición tipo fade */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
      ))}

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl p-6 bg-white bg-opacity-50 rounded-2xl shadow-xl ">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 transition-all duration-1000 ease-out ${
            showText ? "opacity-100 translate-y-0 float-text" : "opacity-0 translate-y-5"
          }`}
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.6), 0 0 6px rgba(255,0,0,0.4)",
          }}
        >
          Explora propiedades aqui
        </h2>

        {/* Formulario de búsqueda */}
        <form className="flex flex-wrap gap-4 justify-center items-end" onSubmit={handleSubmit}>
          <div className="w-full sm:w-56">
            <CustomSelect
              label="Distrito"
              options={distritosOptions}
              selected={distritos}
              setSelected={setDistritos}
              includeSelectAll
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          </div>
          <div className="w-full sm:w-56">
            <CustomSelect
              label="Modalidad"
              options={modalidadesOptions}
              selected={modalidades}
              setSelected={setModalidades}
              includeSelectAll
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          </div>
          <div className="w-full sm:w-56">
            <CustomSelect
              label="Tipo"
              options={tiposOptions}
              selected={tipos}
              setSelected={setTipos}
              includeSelectAll
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          </div>

          {/* Botón Buscar */}
          <div className="w-full sm:w-auto flex justify-center items-center">
            <button
              type="submit"
              disabled={!isSearchEnabled}
              className={`w-full sm:w-auto py-2 px-6 rounded-lg font-semibold shadow-md transition-all duration-300 ${
                isSearchEnabled
                  ? "bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white"
                  : "bg-[#FCA5A5] text-white/80 cursor-not-allowed"
              }`}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Animación flotante */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .float-text {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SearchBanner;
