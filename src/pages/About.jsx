import React from "react";
import PageWrapper from '../components/PageWrapper';
const About = () => {
  return (<PageWrapper>
    <div className="bg-white text-[#000000]">
      {/* Banner */}
      <section className="w-full h-64 bg-[#C80000] flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Sobre Nosotros</h1>
      </section>

      {/* Quiénes Somos */}
      <section className="py-12 px-4 md:px-16 bg-[#F5F5F5]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">¿Quiénes somos?</h2>
          <p className="text-[#444444] text-lg leading-relaxed">
            Somos una empresa dedicada al rubro inmobiliario, especializada en brindar soluciones integrales de compra, venta y alquiler de bienes raíces. Nuestra pasión por el desarrollo urbano y la satisfacción del cliente nos impulsa a trabajar con transparencia, ética y compromiso.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-12 px-4 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-[#FBE8E8] p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-3 text-[#C80000]">Misión</h3>
            <p className="text-[#444444] text-lg">
              Brindar soluciones inmobiliarias personalizadas, orientadas a la satisfacción total de nuestros clientes, garantizando seguridad jurídica, asesoría profesional y un trato humano.
            </p>
          </div>
          <div className="bg-[#FBE8E8] p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-3 text-[#C80000]">Visión</h3>
            <p className="text-[#444444] text-lg">
              Ser líderes en el sector inmobiliario nacional, reconocidos por nuestra innovación, calidad de servicio y compromiso con el crecimiento urbano sostenible.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-12 px-4 md:px-16 bg-[#F5F5F5]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-10">Nuestros Valores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Transparencia", icon: "🔍" },
              { title: "Compromiso", icon: "🤝" },
              { title: "Innovación", icon: "💡" },
              { title: "Empatía", icon: "❤️" },
            ].map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{val.icon}</div>
                <h4 className="text-xl font-medium text-[#C80000]">{val.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </PageWrapper>);
};

export default About;
