// src/components/SearchBanner.jsx
import React from "react";

const SearchBanner = () => {
  return (
    <section
      className="relative w-full h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/baner_aa.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto">
        <form className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* Distrito */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Distrito</label>
            <select className="custom-select">
              <option value="">Todos</option>
              <option value="chimbote">Chimbote</option>
              <option value="nuevo-chimbote">Nuevo Chimbote</option>
              <option value="coishco">Coishco</option>
            </select>
          </div>

          {/* Modalidad */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Modalidad</label>
            <select className="custom-select">
              <option value="">Todas</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
              <option value="anticresis">Anticresis</option>
            </select>
          </div>

          {/* Tipo de Inmueble */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Tipo</label>
            <select className="custom-select">
              <option value="">Todos</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
            </select>
          </div>

          {/* Checkbox disponible con ícono */}
          <div className="flex items-center gap-2 mt-7 md:mt-0">
            <input
              id="disponible"
              type="checkbox"
              className="accent-blue-600 w-5 h-5 rounded"
            />
            <label htmlFor="disponible" className="text-sm flex items-center">
              <img src="./check.svg" alt="check" className="w-4 h-4 mr-1" />
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

      {/* Estilos personalizados sin Tailwind extra */}
      <style jsx>{`
        .custom-select {
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .custom-select:hover {
          border-color: #60a5fa;
        }

        .custom-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </section>
  );
};

export default SearchBanner;



