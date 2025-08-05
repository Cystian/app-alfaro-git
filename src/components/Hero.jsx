// src/components/Hero.jsx
const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#000000] mb-4">
          Tu nuevo hogar te espera
        </h2>
        <p className="text-[#444444] text-lg mb-6">
          Encuentra las mejores oportunidades inmobiliarias con nosotros.
        </p>
        <a
          href="#"
          className="bg-[#C80000] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#a30000] transition"
        >
          Ver Propiedades
        </a>
      </div>
    </section>
  );
};

export default Hero;
