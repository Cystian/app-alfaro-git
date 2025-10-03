import React from "react";
import { Eye, Handshake, Lightbulb, Heart } from "lucide-react"; 
import PageWrapper from "../components/PageWrapper";

const About = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">
        {/* Banner */}
        <section className="w-full h-72 bg-gradient-to-r from-[#8B0000] to-[#C80000] flex items-center justify-center shadow-lg">
          <h1 className="text-white text-5xl font-extrabold tracking-wide">
            Sobre Nosotros
          </h1>
        </section>

        {/* Quiénes Somos */}
        <section className="py-16 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6 text-[#C80000]">
              ¿Quiénes somos?
            </h2>
            <p className="text-[#444444] text-lg leading-relaxed max-w-3xl mx-auto">
              Somos una firma inmobiliaria especializada en proyectos de{" "}
              <span className="font-medium text-[#000000]">
                alta gama y desarrollo urbano
              </span>. Nuestro compromiso es crear experiencias únicas en la
              compra, venta y alquiler de propiedades exclusivas. Conjugamos{" "}
              <span className="italic">innovación</span>,{" "}
              <span className="italic">transparencia</span> y{" "}
              <span className="italic">profesionalismo</span>, garantizando un
              acompañamiento integral para cada cliente.
            </p>
          </div>
        </section>

        {/* Imagen / Bloque aspiracional */}
        <section className="w-full h-80 bg-[url('/luxury-skyline.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wider">
              Elevamos el estándar de vivir con lujo y confianza
            </h2>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-16 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#C80000]">
                Misión
              </h3>
              <p className="text-[#444444] text-lg leading-relaxed">
                Brindar soluciones inmobiliarias personalizadas y seguras,
                combinando{" "}
                <span className="font-semibold">asesoría profesional</span>,
                respaldo jurídico y un trato humano para superar las
                expectativas de cada cliente.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#C80000]">
                Visión
              </h3>
              <p className="text-[#444444] text-lg leading-relaxed">
                Ser la inmobiliaria de referencia a nivel nacional, reconocida
                por la{" "}
                <span className="font-semibold">innovación, calidad</span> y el
                impulso a un{" "}
                <span className="italic">crecimiento urbano sostenible</span>,
                alineado a las tendencias globales de lujo y bienestar.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 text-[#C80000]">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { title: "Transparencia", icon: <Eye size={48} /> },
                { title: "Compromiso", icon: <Handshake size={48} /> },
                { title: "Innovación", icon: <Lightbulb size={48} /> },
                { title: "Empatía", icon: <Heart size={48} /> },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className="text-[#C80000] mb-4 flex justify-center">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-medium text-[#222222]">
                    {val.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default About;

