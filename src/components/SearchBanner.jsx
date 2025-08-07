// src/components/SearchBanner.jsx
import React from "react";

const SearchBanner = () => {
  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/img/banner-inmobiliaria.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Distrito */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Distrito</label>
            <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="">Todos</option>
              <option value="chimbote">Chimbote</option>
              <option value="nuevo-chimbote">Nuevo Chimbote</option>
              <option value="coishco">Coishco</option>
            </select>
          </div>

          {/* Modalidad */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Modalidad</label>
            <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="">Todas</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
              <option value="anticresis">Anticresis</option>
            </select>
          </div>

          {/* Tipo de Inmueble */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Tipo</label>
            <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="">Todos</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
            </select>
          </div>

          {/* Checkbox disponible */}
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

          {/* Botón buscar */}
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



