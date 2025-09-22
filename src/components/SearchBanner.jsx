// src/components/SearchBanner.jsx
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

  // 🔹 Carga opciones dinámicas desde Netlify Function
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/.netlify/functions/get-options");
        const data = await res.json();

        // Espera distritos agrupados [{departamento, distritos:[{id, nombre}]}]
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

    // Convierte distritos agrupados a un array plano de nombres
    const flatDistritos = distritos.join ? distritos : distritos;

    const filters = {
      location: flatDistritos.join(","),
      status: modalidades.join(","),
      title: tipos.join(","),
    };

    console.log("➡️ Filtros enviados:", filters);
    onSearch(filters); // pasa los filtros a FeaturedProperties
  };

  return (
    <section className="relative w-full h-[380px] flex flex-col items-center justify-center mt-6 px-4">
      {/* Fondo banner */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/baner_aa.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      ></div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-6xl p-6 bg-white bg-opacity-90 rounded-2xl shadow-xl">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 transition-all duration-1000 ease-out ${
            showText ? "opacity-100 translate-y-0 float-text" : "opacity-0 translate-y-5"
          }`}
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.6), 0 0 6px rgba(255,0,0,0.4)",
          }}
        >
          Tenemos el lugar perfecto para ti
        </h2>

        {/* Formulario de búsqueda */}
        <form className="flex flex-wrap gap-4 justify-center items-end" onSubmit={handleSubmit}>
          <div className="w-full sm:w-48">
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

          <div className="w-full sm:w-48">
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

          <div className="w-full sm:w-52">
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

          {/* Botón buscar */}
          <div className="w-full sm:w-auto flex justify-center items-center">
            <button
              type="submit"
              disabled={!isSearchEnabled}
              className={`w-full sm:w-auto py-2 px-6 rounded-lg font-semibold shadow-md transition-all duration-300 ${
                isSearchEnabled
                  ? "bg-azul-primario hover:bg-azul-primario-dark text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Animación */}
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

