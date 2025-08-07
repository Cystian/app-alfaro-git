// src/components/SearchBanner.jsx
import { useState } from 'react';

const SearchBanner = () => {
  const [formData, setFormData] = useState({
    distrito: '',
    modalidad: '',
    tipo: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buscando con:', formData);
    // Aquí puedes agregar lógica para redirigir o filtrar propiedades
  };

  return (
    <div className="relative w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: `url('/ruta/imagen-inmobiliaria.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-5xl"
        >
          <select name="distrito" onChange={handleChange} className="p-2 rounded border">
            <option value="">Distrito</option>
            <option value="miraflores">Chimbote</option>
            <option value="sanisidro">Nuevo Chimbote</option>
            <option value="surco">Santa</option>
              <option value="miraflores">Coishco</option>
            <option value="sanisidro">Chao</option>
            <option value="surco">Viru</option>
            <option value="sanisidro">Trujillo</option>
            <option value="surco">Huarmey</option>
          </select>

          <select name="modalidad" onChange={handleChange} className="p-2 rounded border">
            <option value="">Modalidad</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
            <option value="venta">Venta+Alquiler</option>
          </select>

          <select name="tipo" onChange={handleChange} className="p-2 rounded border">
            <option value="">Tipo de Inmueble</option>
            <option value="departamento">Casa</option>
            <option value="casa">Departamento</option>
            <option value="terreno">Terreno</option>
                <option value="departamento">Oficina</option>
            <option value="casa">Local</option>
            <option value="terreno">Terreno Comercial</option>
          </select>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBanner;



