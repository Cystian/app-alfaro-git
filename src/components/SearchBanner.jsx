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
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes integrar la lógica para filtrar o enviar datos
    console.log({ distritos, modalidades, tipos, soloDisponibles });
  };

  const isButtonDisabled = distritos.length === 0 && modalidades.length === 0 && tipos.length === 0;

  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/baner_aa.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <CustomSelect
            label="Distrito"
            options={distritosOptions}
            selected={distritos}
            setSelected={setDistritos}
            includeSelectAll={true}
          />

          <CustomSelect
            label="Modalidad"
            options={modalidadesOptions}
            selected={modalidades}
            setSelected={setModalidades}
            includeSelectAll={true}
          />

          <CustomSelect
            label="Tipo"
            options={tiposOptions}
            selected={tipos}
            setSelected={setTipos}
            includeSelectAll={true}
          />

          {/* Checkbox: Solo disponibles */}
          <div className="flex items-center space-x-2 mt-7 md:mt-0">
            <input
              id="disponible"
              type="checkbox"
              checked={soloDisponibles}
              onChange={() => setSoloDisponibles(!soloDisponibles)}
              className="accent-blue-600 w-5 h-5 rounded transition-shadow duration-200 hover:shadow-md cursor-pointer"
              aria-label="Solo propiedades disponibles"
            />
            <label htmlFor="disponible" className="text-sm select-none cursor-pointer">
              Solo disponibles
            </label>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              aria-disabled={isButtonDisabled}
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

