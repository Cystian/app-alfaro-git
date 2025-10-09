import React from "react";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";
import ContactFormWrapper from "../components/ContactForm";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";

const Contacto = () => {
  return (
    <section className="bg-[#F5F5F5] py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        
        {/* Texto + Info corporativa */}
        <div className="bg-white shadow-xl rounded-3xl p-10 hover:shadow-2xl transition-all duration-300">
          <img
            src="/logo.jpeg"
            alt="Logo Inmobiliaria"
            className="mx-auto mb-6 w-40 md:w-48 h-auto object-contain"
          />

          <h1 className="text-4xl md:text-4xl font-extrabold text-center text-[#C80000] mb-6">
            Conócenos
          </h1>

          <p className="text-gray-700 text-lg md:text-x2 leading-relaxed mb-6">
            En <span className="font-semibold">nuestra firma inmobiliaria</span> entendemos que cada decisión inmobiliaria es también una <span className="font-semibold">decisión de vida</span>. Nuestro equipo de expertos está comprometido en ofrecer un acompañamiento integral, combinando confianza, profesionalismo y cercanía.
          </p>

          <p className="text-gray-700 text-lg md:text-x2 leading-relaxed mb-8">
            Contamos con más de <span className="font-semibold">Gestionamos</span> propiedades de lujo, residenciales y comerciales, siempre con un enfoque en la satisfacción total del cliente y la excelencia en el servicio.
          </p>

          <div className="space-y-5 mt-6">
            <div className="flex items-center gap-3">
              <Phone className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg md:text-xl">+51 940 221 494</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg md:text-xl">contacto@alfaroinmobiliaria.pe</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg md:text-xl">Nuevo Chimbote, Perú</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg">CEO & Fundador:</span> 
              <span className="font-bold text-[#C80000] text-lg md:text-xl"> Ing. Alberto Alfaro</span>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white shadow-xl rounded-3xl p-10 hover:shadow-2xl transition-all duration-300">
          <ContactFormWrapper />
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mt-12 bg-white shadow-xl rounded-3xl p-10 hover:shadow-2xl transition-all duration-300">
        <SocialMediaCallToAction />
      </div>
    </section>
  );
};

export default Contacto;

