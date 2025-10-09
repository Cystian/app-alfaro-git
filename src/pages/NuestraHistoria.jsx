import React from 'react';
import { FaCheckCircle, FaRegSmile } from 'react-icons/fa';

const NuestraHistoria = () => {
  return (
    <section className="bg-[#F9F9F9] py-20 px-6 md:px-24">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-12 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">

        {/* Logo */}
        <img
          src="/logo.jpeg"
          alt="Logo Inmobiliaria Alberto Alfaro"
          className="mx-auto mb-10 w-44 md:w-48 h-auto object-contain"
        />

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#C80000] mb-10 tracking-wide">
          Nuestra Historia
        </h1>

        {/* Introducción */}
        <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6 mb-12">
          <p>
            Desde nuestros inicios en Chimbote, <span className="font-semibold text-gray-900">nos hemos dedicado a conectar personas con sus hogares ideales</span>. Con más de <span className="font-semibold text-gray-900">15 años de experiencia</span>, nuestra reputación se basa en confianza, excelencia y profesionalismo.
          </p>
        </div>

        {/* Línea de tiempo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hitos clave</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-[#C80000] mt-1" />
              <span><strong>2008:</strong> Inicio en Chimbote con nuestra primera oficina y atención personalizada.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-[#C80000] mt-1" />
              <span><strong>2012:</strong> Primer proyecto residencial entregado con éxito, ampliando nuestra cartera de clientes.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-[#C80000] mt-1" />
              <span><strong>2018:</strong> Expansión a nuevos distritos y lanzamiento de servicios de asesoría integral.</span>
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-[#C80000] mt-1" />
              <span><strong>2024:</strong> Más de 500 propiedades gestionadas y reconocimiento en el sector inmobiliario.</span>
            </li>
          </ul>
        </div>

        {/* Valores */}
        <div className="mb-12 bg-[#fdf2f2] rounded-2xl p-8 shadow-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
            <p><FaRegSmile className="inline text-[#C80000] mr-2" /> Confianza y Transparencia</p>
            <p><FaRegSmile className="inline text-[#C80000] mr-2" /> Compromiso con la Excelencia</p>
            <p><FaRegSmile className="inline text-[#C80000] mr-2" /> Innovación en el Sector</p>
            <p><FaRegSmile className="inline text-[#C80000] mr-2" /> Orientación al Cliente</p>
          </div>
        </div>

        {/* Equipo destacado */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Nuestro Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
              <img src="/equipo1.jpg" alt="Asesor 1" className="mx-auto rounded-full w-28 h-28 object-cover mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Juan Pérez</h3>
              <p className="text-sm text-gray-600">Asesor Senior</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
              <img src="/equipo2.jpg" alt="Asesor 2" className="mx-auto rounded-full w-28 h-28 object-cover mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">María López</h3>
              <p className="text-sm text-gray-600">Especialista en Ventas</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 text-center">
              <img src="/equipo3.jpg" alt="Asesor 3" className="mx-auto rounded-full w-28 h-28 object-cover mb-4" />
              <h3 className="font-semibold text-lg text-gray-900">Carlos Ramírez</h3>
              <p className="text-sm text-gray-600">Asesor Comercial</p>
            </div>
          </div>
        </div>

        {/* Cierre inspirador */}
        <p className="text-center text-[#C80000] font-semibold text-lg md:text-xl mt-6">
          “Transformando espacios, creando hogares, construyendo confianza.”
        </p>

      </div>
    </section>
  );
};

export default NuestraHistoria;



