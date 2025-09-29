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
import { generatePropertyPdf } from "../utils/pdfGenerator"; // asegúrate de importar tu función

export default function PropertyResumenPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

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

  const formatPrice = (price) => {
    if (!price) return "";
    return `S/ ${Number(price).toLocaleString("es-PE")}`;
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSub(null);
      setIsClosing(false);
    }, 300);
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

        {data && data.property ? (
          <div>
            {/* Datos principales */}
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
                  <p className="font-semibold text-lg text-red-600">
                    {formatPrice(data.property.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Descripción</h2>
              <div
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.property.description }}
              />
            </div>

            {/* Subpropiedades */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subpropiedades</h2>
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

              {/* Botones */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  onClick={() => generatePropertyPdf(data.property, data.subProperties)}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M5 20h14v-2H5v2zM12 2l-6 6h4v6h4V8h4l-6-6z" />
                  </svg>
                  Descargar Flyer
                </button>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition-transform transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  Buscar más propiedades
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Cargando Datos...</p>
        )}

        {/* Modal */}
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
                  {selectedSub.isMain ? selectedSub.title : selectedSub.content}
                </h2>
                {!selectedSub.isMain && selectedSub.text_content && (
                  <p className="text-gray-700">{selectedSub.text_content}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes zoomIn { from { transform: scale(0.8); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes zoomOut { from { transform: scale(1); opacity: 1 } to { transform: scale(0.8); opacity: 0 } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fadeOut { animation: fadeOut 0.5s ease-in forwards; }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out forwards; }
        .animate-zoomOut { animation: zoomOut 0.5s ease-in forwards; }
      `}</style>
    </div>
  );
}
