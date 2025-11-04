import React from "react";
import {
  FaCar,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaRegBuilding,
  FaHourglass,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Caracteristicas = ({ data }) => {
  if (!data?.property) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Área total */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaRulerCombined className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Área Total</p>
          <p className="font-semibold text-lg text-gray-800">
            {data.property.area_total || "No especificado"} m²
          </p>
        </div>
      </motion.div>

      {/* Dormitorios */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaBed className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Dormitorios</p>
          <p className="font-semibold text-lg text-gray-800">
            {data.property.dormitorios || "No especificado"}
          </p>
        </div>
      </motion.div>

      {/* Baños */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaBath className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Baños</p>
          <p className="font-semibold text-lg text-gray-800">
            {data.property.banos || "No especificado"}
          </p>
        </div>
      </motion.div>

      {/* Cocheras y Antigüedad */}
      {!data.property.title.toLowerCase().includes("terreno") && (
        <>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <FaCar className="text-rojo-inmobiliario mr-3 text-2xl" />
            <div>
              <p className="text-gray-500 text-sm">Cocheras</p>
              <p className="font-semibold text-lg text-gray-800">
                {data.property.cocheras || "No especificado"}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <FaHourglass className="text-rojo-inmobiliario mr-3 text-2xl" />
            <div>
              <p className="text-gray-500 text-sm">Antigüedad</p>
              <p className="font-semibold text-lg text-gray-800">
                {data.property.antiguedad || "No especificado"}
              </p>
            </div>
          </motion.div>
        </>
      )}

      {/* Tipo de propiedad */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex items-center bg-gray-50 p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <FaRegBuilding className="text-rojo-inmobiliario mr-3 text-2xl" />
        <div>
          <p className="text-gray-500 text-sm">Tipo de Propiedad</p>
          <p className="font-semibold text-lg text-gray-800 capitalize">
            {data.property.title || "No especificado"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Caracteristicas;