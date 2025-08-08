// src/components/SearchBanner.jsx
import React, { useState } from "react";
import CustomSelect from "./CustomSelect";

const SearchBanner = () => {
  const distritosOptions = ["Chimbote", "Nuevo Chimbote", "Coishco", "Santa", "Chao", "Viru", "Huarmey"];
  const modalidadesOptions = ["Venta", "Alquiler", "Venta+Alquiler"];
  const tiposOptions = ["Departamento", "Casa", "Terreno", "Oficina", "Local", "Terreno Comercial"];

  const [distritos, setDistritos] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/baner_aa.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-navbar w-full max-w-5xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-5 gap-6">

          <CustomSelect
            label="Distrito"
            options={distritosOptions}
            selected={distritos}
            setSelected={setDistritos}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            animationClass="animate-slide-down"
          />

          <CustomSelect
            label="Modalidad"
            options={modalidadesOptions}
            selected={modalidades}
            setSelected={setModalidades}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            animationClass="animate-slide-down"
          />

          <CustomSelect
            label="Tipo"
            options={tiposOptions}
            selected={tipos}
            setSelected={setTipos}
            includeSelectAll={true}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            animationClass="animate-slide-down"
          />

          {/* Checkbox: Solo disponibles */}
          <div className="flex items-center space-x-3 mt-5 md:mt-0">
            <input
              id="disponible"
              type="checkbox"
              checked={soloDisponibles}
              onChange={() => setSoloDisponibles(!soloDisponibles)}
              className="accent-azul-primario w-5 h-5 rounded transition-colors duration-suave"
            />
            <label htmlFor="disponible" className="text-gray-700 font-medium select-none">
              Solo disponibles
            </label>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex justify-center items-center mt-5 md:mt-0">
            <button
              type="submit"
              className="w-full bg-azul-primario hover:bg-azul-primario-dark transition-all text-white font-semibold py-3 px-6 rounded-lg shadow-btn-primary"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBanner;
