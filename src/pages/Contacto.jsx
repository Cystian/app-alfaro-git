import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import SocialMediaSection from "../components/SocialMediaSection";

const Contacto = () => {
  return (
    <section className="bg-[#F5F5F5] py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        
        {/* Texto + Info corporativa */}
        <div>
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

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg">+51 999 888 777</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg">contacto@luxuryinmobiliaria.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#C80000]" size={24} />
              <span className="text-gray-800 text-lg">Av. Empresarial 123, San Isidro – Lima</span>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-[#C80000] mb-6">
            Agenda tu consulta personalizada
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C80000] outline-none"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C80000] outline-none"
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C80000] outline-none"
            />
            <textarea
              placeholder="Cuéntanos qué estás buscando..."
              rows="4"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#C80000] outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#C80000] text-white font-semibold py-3 rounded-xl hover:bg-[#a30000] transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>

      {/* Redes Sociales / Social Media Section */}
      <div className="mt-20">
        <SocialMediaSection />
      </div>
    </section>
  );
};

export default Contacto;

