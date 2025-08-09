// src/components/SearchBanner.jsx

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

// Validar si activar botón Buscar

const isSearchEnabled =

distritos.length > 0 && modalidades.length > 0 && tipos.length > 0;

return (

<section

  className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"

  style={{ backgroundImage: "url('/baner_aa.png')" }}

>

  <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">

    <form className="grid grid-cols-1 md:grid-cols-5 gap-4" onSubmit={e => e.preventDefault()}>

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

          {/* Imagen check personalizada */}

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

</section>

);

};

export default SearchBanner;

