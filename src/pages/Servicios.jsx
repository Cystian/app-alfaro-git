import React from "react";
import { Home, Search, Key, UserCheck } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const Servicios = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">
        {/* Banner */}
        <section className="w-full h-72 bg-gradient-to-r from-[#8B0000] to-[#C80000] flex items-center justify-center shadow-lg">
          <h1 className="text-white text-5xl font-extrabold tracking-wide">
            Nuestros Servicios
          </h1>
        </section>

        {/* Servicios destacados */}
        <section className="py-16 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6 text-[#C80000]">
              Qué ofrecemos
            </h2>
            <p className="text-[#444444] text-lg leading-relaxed max-w-3xl mx-auto">
              Brindamos soluciones integrales en el sector inmobiliario, 
              adaptadas a cada necesidad. Desde la <span className="font-medium text-[#000000]">compra y venta</span> de propiedades de lujo, hasta 
              <span className="italic"> asesoría personalizada</span> y gestión de alquileres. Cada servicio está diseñado para garantizar 
              <span className="italic"> seguridad, eficiencia</span> y una experiencia sin igual.
            </p>
          </div>
        </section>

        {/* Imagen / Bloque aspiracional */}
        <section className="w-full h-80 bg-[url('/luxury-properties.jpg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-wider text-center">
              Transformamos cada propiedad en una oportunidad de vida
            </h2>
          </div>
        </section>

        {/* Lista de Servicios */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 text-[#C80000]">
              Servicios Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                { title: "Compra de Propiedades", icon: <Home size={48} /> },
                { title: "Alquiler Seguro", icon: <Key size={48} /> },
                { title: "Asesoría Personalizada", icon: <UserCheck size={48} /> },
                { title: "Búsqueda de Oportunidades", icon: <Search size={48} /> },
              ].map((serv, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className="text-[#C80000] mb-4 flex justify-center">
                    {serv.icon}
                  </div>
                  <h4 className="text-xl font-medium text-[#222222]">
                    {serv.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ventajas / Diferenciadores */}
        <section className="py-16 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#C80000]">
                Experiencia y Profesionalismo
              </h3>
              <p className="text-[#444444] text-lg leading-relaxed">
                Contamos con un equipo de expertos que guía cada operación 
                inmobiliaria, asegurando <span className="font-semibold">transacciones seguras</span> y eficientes, 
                respetando siempre los intereses de nuestros clientes.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#C80000]">
                Tecnología y Confianza
              </h3>
              <p className="text-[#444444] text-lg leading-relaxed">
                Implementamos herramientas digitales y sistemas innovadores 
                que facilitan la búsqueda, gestión y seguimiento de propiedades, 
                garantizando <span className="italic">transparencia y rapidez</span> en cada proceso.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Servicios;
