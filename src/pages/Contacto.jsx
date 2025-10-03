import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactFormWrapper from "../components/ContactForm";
import SocialMediaCallToAction from "../components/SocialMediaCallToAction";

const Contacto = () => {
  return (
    <section className="bg-[#F5F5F5] py-20 px-6">
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
    <span className="italic"> decisión de vida</span>. 
    Nuestro equipo de expertos está comprometido en ofrecerte 
    un acompañamiento integral, combinando confianza, 
    profesionalismo y cercanía.
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
  <div className="text-left md:text-left max-w-md">
     <Briefcase className="text-[#C80000]" size={20} />
      <h3 className="text-xl font-semibold text-[#C80000] mb-1">Alberto Alfaro</h3>
      <p className="text-gray-700 text-md leading-relaxed">
        CEO & Fundador. Con más de 20 años liderando proyectos inmobiliarios, Alberto combina visión estratégica con cercanía humana, garantizando que cada cliente encuentre la propiedad ideal.
      </p>
    </div>

    
  </div>
</div>

        {/* Formulario de contacto */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">
        
      <ContactFormWrapper />
        </div>
      </div>

      {/* Redes Sociales */}
   <div className="mt-20 bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">
  <SocialMediaCallToAction />
</div>
    </section>
  );
};

export default Contacto;

