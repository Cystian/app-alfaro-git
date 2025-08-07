import React from 'react';

const SearchBanner = () => {
  return (
    <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/baner.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-4xl">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="p-3 border rounded w-full">
              <option value="">Distrito</option>
              <option value="miraflores">Miraflores</option>
              <option value="sanisidro">San Isidro</option>
              <option value="surco">Surco</option>
            </select>

            <select className="p-3 border rounded w-full">
              <option value="">Modalidad</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>

            <select className="p-3 border rounded w-full">
              <option value="">Tipo de Inmueble</option>
              <option value="departamento">Departamento</option>
              <option value="casa">Casa</option>
              <option value="terreno">Terreno</option>
            </select>

            <button type="submit" className="bg-blue-600 text-white rounded p-3 hover:bg-blue-700 transition duration-200 w-full">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
