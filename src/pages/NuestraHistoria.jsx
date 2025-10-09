import React from 'react';

const NuestraHistoria = () => {
  return (
    <section className="bg-[#F9F9F9] py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl p-12 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">

        {/* Logo */}
        <img
          src="/logo.jpeg"
          alt="Logo Inmobiliaria Alberto Alfaro"
          className="mx-auto mb-8 w-44 md:w-48 h-auto object-contain"
        />

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#C80000] mb-8 tracking-wide">
          Nuestra Historia
        </h1>

        {/* Texto principal */}
        <div className="text-gray-700 text-lg md:text-xl leading-relaxed space-y-6">
          <p>
            Desde nuestros inicios en Chimbote, <span className="font-semibold text-gray-900">nos hemos dedicado a conectar personas con sus hogares ideales</span>. 
            Con más de <span className="font-semibold text-gray-900">15 años de experiencia</span> en el sector inmobiliario, hemos crecido gracias a la confianza de nuestros clientes y al compromiso con la excelencia.
          </p>

          <p>
            Nuestra misión es ofrecer soluciones integrales que incluyen venta, alquiler, asesoramiento legal y financiero, así como el desarrollo de proyectos inmobiliarios de calidad. 
            En <span className="font-semibold text-gray-900">Inversiones Alfaro</span>, nos enfocamos en convertir sueños en hogares, brindando tranquilidad y confianza en cada proyecto.
          </p>

          <p>
            Además, ofrecemos asesoría jurídica integral a través de <span className="font-semibold text-gray-900">Alfaro Inmobiliaria</span>, asegurando que cada transacción se realice con la máxima seguridad y profesionalismo.
          </p>

          <p>
            Nuestro equipo está compuesto por profesionales comprometidos con la innovación, la transparencia y la satisfacción de nuestros clientes. Hoy seguimos creciendo, impulsados por la confianza depositada en nosotros y la pasión por transformar vidas y comunidades a través de espacios únicos.
          </p>
        </div>

      </div>
    </section>
  );
};

export default NuestraHistoria;



