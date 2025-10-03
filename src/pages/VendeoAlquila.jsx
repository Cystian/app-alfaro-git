import React from "react";
import { ClipboardList, Megaphone, ShieldCheck } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import VendeAlquilaForm from "../components/VendeAlquilaForm";

const VendeoAlquila = () => {
  return (
    <PageWrapper>
      <div className="bg-white text-[#000000]">
        {/* Banner */}
        <section className="w-full h-72 bg-gradient-to-r from-[#8B0000] to-[#C80000] flex items-center justify-center shadow-lg">
          <h1 className="text-white text-5xl font-extrabold tracking-wide text-center">
            Vende o Alquila tu Propiedad
          </h1>
        </section>

        {/* Proceso en 3 pasos */}
        <section className="py-20 px-6 md:px-20 bg-[#F5F5F5]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-12 text-[#C80000]">
              Nuestro Proceso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "1. Evalúa tu Inmueble",
                  desc: "Realizamos una tasación justa y confiable para determinar el mejor valor de mercado.",
                  icon: <ClipboardList size={48} />,
                },
                {
                  title: "2. Promoción Efectiva",
                  desc: "Publicamos tu propiedad en nuestra red de clientes y principales plataformas digitales.",
                  icon: <Megaphone size={48} />,
                },
                {
                  title: "3. Cierra con Confianza",
                  desc: "Te acompañamos en cada paso, brindando asesoría legal y respaldo profesional.",
                  icon: <ShieldCheck size={48} />,
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2"
                >
                  <div className="text-[#C80000] mb-4 flex justify-center">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-[#222222] mb-2">
                    {step.title}
                  </h4>
                  <p className="text-[#444444] text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario de contacto */}
        <section className="py-20 px-6 md:px-20">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6 text-[#C80000]">
              Publica tu Propiedad con Nosotros
            </h2>
            <p className="text-[#444444] text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              Completa el siguiente formulario y nuestro equipo se pondrá en
              contacto contigo para ayudarte a <span className="font-medium">vender</span> o{" "}
              <span className="font-medium">alquilar</span> tu propiedad de la
              forma más rápida y segura.
            </p>
            {/* Reutilización de tu VendeAlquilaForm.jsx */}
                       <VendeAlquilaForm />
        
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default VendeoAlquila;
