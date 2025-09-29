import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaTag,
  FaTimes,
} from "react-icons/fa";

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isClosing, setIsClosing] = useState(false); // Nuevo estado para salida animada

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/.netlify/functions/getPropertyDetails?id=${id}`
      );
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, [id]);

  // Formatear precio
  const formatPrice = (price) => {
    if (!price) return "";
    return `S/ ${Number(price).toLocaleString("es-PE")}`;
  };

  // Manejo de cierre con animación
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSub(null);
      setIsClosing(false);
    }, 300); // igual al tiempo de la animación
  };

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
              onClick={() => setSelectedSub({ ...data.property, isMain: true })}
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {data?.property?.title || "Resumen de Propiedad"}
        </h1>
        <hr className="border-gray-300 mb-6" />

        {/* Datos principales */}
        {data && data.property ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaMapMarkerAlt className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Ubicación</p>
                  <p className="font-semibold text-lg">
                    {data.property.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaRulerCombined className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Área</p>
                  <p className="font-semibold text-lg">
                    {data.property.area} m²
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaBed className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Dormitorios</p>
                  <p className="font-semibold text-lg">
                    {data.property.bedrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaBath className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Baños</p>
                  <p className="font-semibold text-lg">
                    {data.property.bathrooms}
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
                <FaTag className="text-red-600 mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Precio</p>
                  <p className="font-semibold text-lg text-red-600">
                    {formatPrice(data.property.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción principal con HTML */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Descripción
              </h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.property.description }}
              />
            </div>

            {/* Subpropiedades */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Subpropiedades
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.subProperties.map((sub) => (
                  <li
                    key={sub.id}
                    className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => setSelectedSub(sub)}
                  >
                    <img
                      src={sub.image}
                      alt={sub.text_content}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
          <p className="text-gray-600">Cargando Datos...</p>
        )}

        {/* Modal con entrada y salida suave */}
        {selectedSub && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${
              isClosing ? "animate-fadeOut" : "animate-fadeIn"
            }`}
            onClick={handleClose}
          >
            <div
              className={`bg-white rounded-xl shadow-xl max-w-3xl w-full relative p-4 transform transition-transform duration-300 ${
                isClosing ? "animate-zoomOut" : "animate-zoomIn"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                onClick={handleClose}
              >
                <FaTimes size={24} />
              </button>
              <img
                src={selectedSub.image}
                alt={selectedSub.content || selectedSub.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedSub.isMain
                    ? selectedSub.title
                    : selectedSub.content}
                </h2>
                {!selectedSub.isMain && selectedSub.text_content && (
                  <p className="text-gray-700">{selectedSub.text_content}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animaciones personalizadas */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeOut {
          from { opacity: 1 }
          to { opacity: 0 }
        }
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }
        @keyframes zoomOut {
          from { transform: scale(1); opacity: 1 }
          to { transform: scale(0.8); opacity: 0 }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-fadeOut { animation: fadeOut 0.3s ease-in forwards; }
        .animate-zoomIn { animation: zoomIn 0.3s ease-out forwards; }
        .animate-zoomOut { animation: zoomOut 0.3s ease-in forwards; }
      `}</style>
    </div>
  );
}

