// src/components/SearchBanner.jsx
import React, { useState } from "react";
import CustomSelect from "./CustomSelect"; // Asegúrate de que esté correctamente importado

const SearchBanner = () => {
  const distritosOptions = ["Chimbote", "Nuevo Chimbote", "Coishco", "Santa", "Chao", "Viru", "Huarmey"];
  const modalidadesOptions = ["Venta", "Alquiler", "Venta+Alquiler"];
  const tiposOptions = ["Departamento", "Casa", "Terreno", "Oficina", "Local", "Terreno Comercial"];

  const [distritos, setDistritos] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [tipos, setTipos] = useState([]);

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
              className="accent-blue-600 w-5 h-5 rounded"
            />
            <label htmlFor="disponible" className="text-sm">
              Solo disponibles
            </label>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-4 rounded-lg shadow-md"
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


