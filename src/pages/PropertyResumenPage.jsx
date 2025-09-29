import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBed, FaBath, FaMapMarkerAlt, FaRulerCombined, FaWhatsapp, FaFilePdf, FaTag } from "react-icons/fa";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/.netlify/functions/getPropertyDetails?id=${id}`);
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 relative">

        {/* Foto principal */}
        {data?.property?.image && (
          <div className="mb-6 rounded-xl overflow-hidden shadow-lg cursor-pointer group">
            <img
              src={data.property.image}
              alt={data.property.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              onClick={() => window.open(data.property.image, "_blank")}
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{data?.property?.title || "Resumen de Propiedad"}</h1>
        <hr className="border-gray-300 mb-6" />

        {/* Datos principales con íconos */}
        {data && data.property ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaMapMarkerAlt className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Ubicación</p>
                  <p className="font-semibold text-lg">{data.property.location}</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaRulerCombined className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Área</p>
                  <p className="font-semibold text-lg">{data.property.area} m²</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaBed className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Dormitorios</p>
                  <p className="font-semibold text-lg">{data.property.bedrooms}</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaBath className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Baños</p>
                  <p className="font-semibold text-lg">{data.property.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaTag className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Precio</p>
                  <p className="font-semibold text-lg text-red-600">{data.property.price}</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Descripción</h2>
              <p className="text-gray-700">{data.property.description}</p>
            </div>

            {/* Subpropiedades */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subpropiedades</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.subProperties.map((sub) => (
                  <li key={sub.id} className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <img
                      src={sub.image}
                      alt={sub.text_content}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onClick={() => window.open(sub.image, "_blank")}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm font-medium">
                      {sub.content}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-gray-600">No se encontraron datos en memoria.</p>
        )}

        {/* Botones flotantes */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          <a
            href={`https://wa.me/51940221494?text=Hola, me interesa la propiedad: ${data?.property?.title || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
            onClick={() => alert('Generar PDF (pendiente integración)')}
          >
            <FaFilePdf size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

