import React from 'react';

const NuestraHistoria = () => {
  return (
    <section className="bg-[#F5F5F5] py-1 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 hover:shadow-2xl transition duration-300">

        {/* Logo */}
        <img
          src="/logo.jpeg"
          alt="Logo Inmobiliaria Alberto Alfaro"
          className="mx-auto mb-6 w-40 h-auto object-contain"
        />

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#C80000] mb-6">
          Nuestra Historia
        </h1>

        {/* Texto principal */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Desde nuestros inicios en Chimbote, <span className="font-semibold">nos hemos dedicado a conectar personas con sus hogares ideales</span>. 
          Con más de <span className="font-semibold">15 años de experiencia</span> en el sector inmobiliario, hemos crecido gracias a la confianza de nuestros clientes y al compromiso con la excelencia.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Nuestra misión es ofrecer soluciones integrales que incluyen venta, alquiler, asesoramiento legal y financiero, así como el desarrollo de proyectos inmobiliarios de calidad. 
          En <span className="font-semibold">Inversiones Alfaro</span>, nos enfocamos en convertir sueños en hogares, brindando tranquilidad y confianza en cada proyecto.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Además, ofrecemos asesoría jurídica integral a través de <span className="font-semibold">Alfaro Inmobiliaria</span>, asegurando que cada transacción se realice con la máxima seguridad y profesionalismo.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          Nuestro equipo está compuesto por profesionales comprometidos con la innovación, la transparencia y la satisfacción de nuestros clientes. Hoy seguimos creciendo, impulsados por la confianza depositada en nosotros y la pasión por transformar vidas y comunidades a través de espacios únicos.
        </p>

      </div>
    </section>
  );
};

export default NuestraHistoria;


