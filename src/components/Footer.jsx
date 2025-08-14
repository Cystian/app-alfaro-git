import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "./FloatingWhatsApp.css"; // Archivo CSS para el rebote y neon

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white pt-8 pb-6 mt-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1 */}
          <div>
            <h3 className="text-xl font-bold text-red-600">Inmobiliaria Alberto Alfaro</h3>
            <p className="mt-2 text-sm">
              Soluciones inmobiliarias con confianza, seguridad y asesoría personalizada. 
              Te ayudamos a encontrar el hogar o inversión ideal.
            </p>
          </div>

          {/* Columna 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-red-500">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-400 transition">Inicio</Link></li>
              <li><Link to="/vende-o-alquila" className="hover:text-red-400 transition">Vende o Alquila</Link></li>
              <li><Link to="/servicios" className="hover:text-red-400 transition">Servicios</Link></li>
              <li><Link to="/contacto" className="hover:text-red-400 transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-2 text-red-500">Contáctanos</h4>
            <div className="flex space-x-4 mt-2">
              <a href="https://www.facebook.com/inmobiliariaalfaro" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaFacebookF size={20} /></a>
              <a href="https://www.instagram.com/inmobiliariaalfaro" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaInstagram size={20} /></a>
              <a href="https://www.tiktok.com/@inmobiliariaalfaro" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaTiktok size={20} /></a>
              <a href="https://wa.me/51940221494" target="_blank" rel="noopener noreferrer" className="hover:text-red-500"><FaWhatsapp size={20} /></a>
              <a href="tel:+51940221494" className="hover:text-red-500"><FaPhoneAlt size={20} /></a>
            </div>
            <p className="mt-3 text-sm">Tel: +51 940 221 494</p>
            <p className="text-sm">Email: contacto@alfaroinmobiliaria.pe</p>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Inmobiliaria Alberto Alfaro E.I.R.L. 
          Todos los derechos reservados.
        </p>
      </footer>

      {/* WhatsApp flotante con texto + icono juntos */}
      <a
        href="https://wa.me/51940221494"
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Inmobiliaria Alberto Alfaro"
      >
        <span className="whatsapp-text">ESCRÍBENOS</span>
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </>
  );
};

export default Footer;

