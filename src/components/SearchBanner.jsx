import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";

const SearchBanner = () => {
  const distritosOptions = ["Chimbote", "Nuevo Chimbote", "Coishco", "Santa", "Chao", "Viru", "Huarmey"];
  const modalidadesOptions = ["Venta", "Alquiler", "Venta+Alquiler"];
  const tiposOptions = ["Departamento", "Casa", "Terreno", "Oficina", "Local", "Terreno Comercial"];

  const [distritos, setDistritos] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  const isSearchEnabled = distritos.length > 0 && modalidades.length > 0 && tipos.length > 0;

  return (
    <section className="relative w-full h-[350px] flex flex-col items-center justify-center mt-6 px-4">
      {/* Fondo con esquinas redondeadas */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{ backgroundImage: "url('/baner_aa.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      ></div>

      {/* Contenido en z-index superior */}
      <div className="relative z-10 w-full max-w-5xl p-6 bg-white bg-opacity-90 rounded-2xl shadow-xl">
        {/* Texto animado con efecto flotante */}
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 sm:mb-6 transition-all duration-1000 ease-out
            ${showText ? "opacity-100 translate-y-0 float-text" : "opacity-0 translate-y-5"}`}
          style={{
            textShadow: `
              -1px -1px 0 #000,  
              1px -1px 0 #000,
              -1px  1px 0 #000,
              1px  1px 0 #000,
              -2px -2px 0 #C80000, 
              2px -2px 0 #C80000,
              -2px  2px 0 #C80000,
              2px  2px 0 #C80000
            `
          }}
        >
          Tenemos el lugar perfecto para ti
        </h2>

        {/* Formulario con filtros */}
        <form
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <CustomSelect
            label="Distrito"
            options={distritosOptions}
            selected={distritos}
            setSelected={setDistritos}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <CustomSelect
            label="Modalidad"
            options={modalidadesOptions}
            selected={modalidades}
            setSelected={setModalidades}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <CustomSelect
            label="Tipo"
            options={tiposOptions}
            selected={tipos}
            setSelected={setTipos}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* Checkbox solo disponibles */}
          <div className="flex items-center space-x-2 mt-7 md:mt-0">
            <label htmlFor="disponible" className="relative cursor-pointer select-none text-sm text-gray-700">
              <input
                id="disponible"
                type="checkbox"
                checked={soloDisponibles}
                onChange={() => setSoloDisponibles(!soloDisponibles)}
                className="appearance-none w-5 h-5 border border-gray-400 rounded cursor-pointer checked:bg-transparent checked:border-transparent"
              />
              <span
                className="absolute top-[2px] left-[2px] w-4 h-4 bg-no-repeat bg-center bg-contain pointer-events-none"
                style={{ backgroundImage: soloDisponibles ? "url('/check2.png')" : "none" }}
              />
              Solo disponibles
            </label>
          </div>

          {/* Botón Buscar */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={!isSearchEnabled}
              className={`w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-300
                ${isSearchEnabled
                  ? "bg-azul-primario hover:bg-azul-primario-dark text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Animación flotante */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .float-text {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default SearchBanner;
