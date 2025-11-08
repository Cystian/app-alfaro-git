import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [forceCollapse, setForceCollapse] = useState(false);
  const navRef = useRef(null);

  // 🔹 Detecta si hay poco espacio entre el logo y el menú
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (navRef.current) {
        const navWidth = navRef.current.offsetWidth;
        const logoWidth = navRef.current.querySelector("img")?.offsetWidth || 0;
        const linksWidth =
          navRef.current.querySelector(".nav-links")?.offsetWidth || 0;

        // Si el espacio libre es muy pequeño, colapsa el menú
        if (navWidth - (logoWidth + linksWidth) < 80) {
          setForceCollapse(true);
        } else {
          setForceCollapse(false);
        }
      }
    });

    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-white fixed w-full top-0 z-50 shadow-md px-4 md:px-8"
    >
      <div className="flex justify-between items-center h-16">
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            src={logo}
            alt="Logo"
            className="h-10 w-auto object-contain"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* 🔹 Botón hamburguesa (solo visible si se colapsa) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* 🔹 Menú principal */}
        <div
          className={`nav-links hidden md:flex space-x-8 text-gray-700 font-medium transition-all duration-300 ${
            forceCollapse ? "hidden" : ""
          }`}
        >
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/propiedades"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Propiedades
          </Link>
          <Link
            to="/vendeoalquila"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Vende o Alquila con Nosotros
          </Link>
          <Link
            to="/contacto"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Contacto
          </Link>
        </div>
      </div>

      {/* 🔹 Menú desplegable en móvil o tablet colapsada */}
      <AnimatePresence>
        {(isOpen || forceCollapse) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-3 py-4 text-gray-700 font-medium">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Inicio
              </Link>
              <Link
                to="/propiedades"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Propiedades
              </Link>
              <Link
                to="/vendeoalquila"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Vende o Alquila con Nosotros
              </Link>
              <Link
                to="/contacto"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;