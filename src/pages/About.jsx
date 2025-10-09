import React from "react";
import { Eye, Handshake, Lightbulb, Heart } from "lucide-react"; 
import PageWrapper from "../components/PageWrapper";

const About = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">
        {/* Banner */}
        <section className="w-full h-72 bg-gradient-to-r from-[#8B0000] to-[#C80000] flex items-center justify-center shadow-xl">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-wider text-center">
            Sobre Nosotros
          </h1>
        </section>

        {/* Quiénes Somos */}
        <section className="py-20 px-6 md:px-20 bg-[#F9F9F9]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6 text-[#C80000] tracking-wide">
              ¿Quiénes somos?
            </h2>
            <p className="text-[#444444] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Somos una firma inmobiliaria especializada en proyectos de{" "}
              <span className="font-medium text-[#000000]">alta gama y desarrollo urbano</span>. 
              Nuestro compromiso es crear experiencias únicas en la compra, venta y alquiler de propiedades exclusivas. 
              Conjugamos <span className="italic font-semibold">innovación</span>,{" "}
              <span className="italic font-semibold">transparencia</span> y{" "}
              <span className="italic font-semibold">profesionalismo</span>, garantizando un acompañamiento integral para cada cliente.
            </p>
          </div>
        </section>

        {/* Imagen aspiracional */}
        <section className="w-full h-96 md:h-[28rem] bg-[url('/luxury-skyline.jpg')] bg-cover bg-center relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-wider text-center">
              Elevamos el estándar de vivir con lujo y confianza
            </h2>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Misión",
                content:
                  "Brindar soluciones inmobiliarias personalizadas y seguras, combinando asesoría profesional, respaldo jurídico y un trato humano para superar las expectativas de cada cliente.",
              },
              {
                title: "Visión",
                content:
                  "Ser la inmobiliaria de referencia a nivel nacional, reconocida por la innovación, calidad y el impulso a un crecimiento urbano sostenible, alineado a las tendencias globales de lujo y bienestar.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#C80000] tracking-wide">{item.title}</h3>
                <p className="text-[#444444] text-lg leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Valores */}
        <section className="py-24 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-16 text-[#C80000] tracking-wide">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { title: "Transparencia", icon: <Eye size={52} /> },
                { title: "Compromiso", icon: <Handshake size={52} /> },
                { title: "Innovación", icon: <Lightbulb size={52} /> },
                { title: "Empatía", icon: <Heart size={52} /> },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 flex flex-col items-center"
                >
                  <div className="text-[#C80000] mb-5 flex justify-center">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-[#222222] tracking-wide">{val.title}</h4>
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


