import React from "react";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";
import ContactFormWrapper from "../components/ContactForm";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";

const Contacto = () => {
  return (
    <section className="bg-[#F5F5F5] py-4 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        
{/* Texto + Info corporativa */}
<div className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">

  <img
    src="/logo.jpeg"
    alt="Logo Inmobiliaria"
  className="mx-auto mb-4 w-48 sm:w-48 md:w-48 lg:w-48 h-auto object-contain"
  />
  
  <h1 className="text-4xl font-bold text-[#C80000] mb-6">
    Conócenos
  </h1>
  <p className="text-gray-700 text-lg leading-relaxed mb-8">
    En <span className="font-semibold">nuestra firma inmobiliaria</span> 
     entendemos que cada decisión inmobiliaria es también una 
   <span className="font-semibold"> decisión de vida</span>. 
    Nuestro equipo de expertos está comprometido en ofrecerte 
    un acompañamiento integral, combinando confianza, 
    profesionalismo y cercanía.  </p>
    <p className="text-gray-700 text-lg leading-relaxed mb-8">
    Contamos con más de <span className="font-semibold">15 años de experiencia</span> 
    en el mercado inmobiliario, gestionando propiedades de lujo, residenciales y comerciales, 
    siempre con un enfoque en la satisfacción total del cliente y la excelencia en el servicio.
  </p>

  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <Phone className="text-[#C80000]" size={24} />
      <span className="text-gray-800 text-lg">+51 940 221 494</span>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="text-[#C80000]" size={24} />
      <span className="text-gray-800 text-lg">contacto@alfaroinmobiliaria.pe</span>
    </div>
    <div className="flex items-center gap-3">
      <MapPin className="text-[#C80000]" size={24} />
      <span className="text-gray-800 text-lg">Nuevo Chimbote-Peru</span>
    </div>
     <div className="flex items-center gap-3">
     <Briefcase className="text-[#C80000]" size={24} />
      <span className="text-gray-800 text-lg"> CEO & Fundador : </span> <span className="font-bold text-[#C80000] text-lg">Ing. Alberto Alfaro</span>
      </div>

    
  </div>
</div>

        {/* Formulario de contacto */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">
        
      <ContactFormWrapper />
        </div>
      </div>

      {/* Redes Sociales */}
   <div className="mt-10 bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">
  <SocialMediaCallToAction />
</div>
    </section>
  );
};

export default Contacto;

