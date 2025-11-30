import React from "react";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";
import ContactFormWrapper from "../components/ContactForm";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";
import FloatingShare from "../components/FloatingShare";

const Contacto = () => {
  return (
    <>
    <FloatingShare />
  <section className="bg-[#F5F5F5] py-8 px-4 md:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
    
    {/* Texto corporativo */}
    <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 hover:shadow-2xl transition-all duration-300">
      <img
        src="/logo.jpeg"
        alt="Logo Inmobiliaria"
        className="mx-auto mb-6 w-32 md:w-48 h-auto object-contain"
      />
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#DF011A] mb-6">
        Conócenos
      </h1>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
        En <span className="font-semibold">nuestra firma inmobiliaria</span> entendemos que cada decisión inmobiliaria es también una <span className="font-semibold">decisión de vida</span>.
      </p>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
        <span className="font-semibold">Gestionamos</span> propiedades residenciales y comerciales, siempre con enfoque en la satisfacción total del cliente.
      </p>

      <div className="space-y-4 mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Phone className="text-[#DF011A]" size={20} />
          <span className="text-gray-800 text-base md:text-lg">+51 940 221 494</span>
        </div>
        
      <div className="flex flex-wrap items-start gap-2">
  <Mail className="text-[#DF011A] mt-1" size={20} />

  <span className="text-gray-800 text-base md:text-lg w-full md:w-auto break-words">
    albertoalfaro@inmobiliariaalbertoalfaro.com.pe
  </span>
</div>

        
        <div className="flex flex-wrap items-center gap-2">
          <MapPin className="text-[#DF011A]" size={20} />
          <span className="text-gray-800 text-base md:text-lg">Nuevo Chimbote, Perú</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Briefcase className="text-[#DF011A]" size={20} />
          <span className="text-gray-800 text-base md:text-lg">CEO & Fundador:</span>
          <span className="font-bold text-[#DF011A] text-base md:text-lg"> Ing. Alberto I. Alfaro Vásquez</span>
        </div>
      </div>
    </div>

    {/* Formulario */}
    <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 hover:shadow-2xl transition-all duration-300">
      <ContactFormWrapper />
    </div>
  </div>

  {/* Redes */}
  <div className="mt-8 md:mt-12 bg-white shadow-xl rounded-3xl p-6 md:p-10 hover:shadow-2xl transition-all duration-300">
    <SocialMediaCallToAction />
  </div>
</section>
    </>
  );
};

export default Contacto;

