import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";

const SearchBanner = ({ onSearch }) => {
  const [distritosOptions, setDistritosOptions] = useState([]);
  const [modalidadesOptions, setModalidadesOptions] = useState([]);
  const [tiposOptions, setTiposOptions] = useState([]);

  const [distritos, setDistritos] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  // 🔹 Carga opciones dinámicas desde Netlify Function
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch("/.netlify/functions/get-options");
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

    const filters = {
      location: distritos.join(","),
      modality: modalidades.join(","),
      type: tipos.join(","),
      status: soloDisponibles ? "Disponible" : "",
    };

    onSearch(filters); // envía filtros al padre
  };

  return (
    <section className="relative w-full h-[350px] flex flex-col items-center justify-center mt-6 px-4">
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/baner_aa.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10 w-full max-w-5xl p-6 bg-white bg-opacity-90 rounded-2xl shadow-xl">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 sm:mb-6 transition-all duration-1000 ease-out
            ${showText ? "opacity-100 translate-y-0 float-text" : "opacity-0 translate-y-5"}`}
          style={{ textShadow: `2px 2px 4px rgba(0,0,0), 0 0 6px rgba(255,0,0)` }}
        >
          Tenemos el lugar perfecto para ti
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
          onSubmit={handleSubmit}
        >
          <CustomSelect
            label="Distrito"
            options={distritosOptions}
            selected={distritos}
            setSelected={setDistritos}
            includeSelectAll
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <CustomSelect
            label="Modalidad"
            options={modalidadesOptions}
            selected={modalidades}
            setSelected={setModalidades}
            includeSelectAll
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <CustomSelect
            label="Tipo"
            options={tiposOptions}
            selected={tipos}
            setSelected={setTipos}
            includeSelectAll
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <div className="flex items-center space-x-2 mt-7 md:mt-0">
            <label
              htmlFor="disponible"
              className="relative cursor-pointer select-none text-sm text-gray-700"
            >
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

          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={!isSearchEnabled}
              className={`w-full py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-300
                ${isSearchEnabled ? "bg-azul-primario hover:bg-azul-primario-dark text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        .float-text { animation: float 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default SearchBanner;


