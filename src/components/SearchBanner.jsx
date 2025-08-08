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

  // Habilitar botón solo si hay al menos una selección en cada combo
  const isBuscarEnabled = distritos.length > 0 && modalidades.length > 0 && tipos.length > 0;

  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/baner_aa.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-5 gap-4">

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

          {/* Checkbox personalizado */}
          <div className="flex items-center space-x-2 mt-7 md:mt-0">
            <input
              id="disponible"
              type="checkbox"
              className="custom-checkbox"
              checked={soloDisponibles}
              onChange={() => setSoloDisponibles(!soloDisponibles)}
            />
            <label htmlFor="disponible" className="text-sm select-none cursor-pointer">
              Solo disponibles
            </label>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={!isBuscarEnabled}
              className={`w-full font-semibold py-2 px-4 rounded-lg shadow-md text-white transition-all duration-300
                ${isBuscarEnabled
                  ? "bg-azul-primario hover:bg-azul-primario-dark cursor-pointer shadow-btn-primary"
                  : "bg-gray-300 cursor-not-allowed shadow-none"
                }`}
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

