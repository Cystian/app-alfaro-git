import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  return (
    <nav
      ref={wrapperRef}
      className="fixed w-full z-50 bg-white shadow-elegante transition-shadow duration-suave"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto transition-transform duration-suave hover:scale-105 hover:shadow-logoHover rounded-lg"
            />
          </a>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">

            {/* VENDE O ALQUILA */}
            <a
              href="/vende-o-alquila"
              className="relative font-medium text-gray-900 hover:text-azulPrimario transition-colors duration-suave ease-suave"
            >
              VENDE O ALQUILA
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-azulPrimario-light rounded transition-all duration-suave ease-suave"></span>
            </a>

            {/* SERVICIOS */}
            <a
              href="/servicios"
              className="relative font-medium text-gray-900 hover:text-azulPrimario transition-colors duration-suave ease-suave"
            >
              SERVICIOS
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-azulPrimario-light rounded transition-all duration-suave ease-suave"></span>
            </a>

            {/* CONÓCENOS con Submenú */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("conocenos")}
                className="flex items-center space-x-1 font-medium text-gray-900 hover:text-azulPrimario focus:outline-none transition-colors duration-suave ease-suave"
                aria-haspopup="true"
                aria-expanded={openDropdown === "conocenos"}
              >
                <span>CONÓCENOS</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-suave ease-suave ${
                    openDropdown === "conocenos" ? "rotate-180 text-azulPrimario" : "rotate-0 text-gray-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openDropdown === "conocenos" && (
                <ul
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-elegante z-50 border border-gray-200"
                  role="menu"
                  aria-label="Submenú Conócenos"
                >
                  <li>
                    <a
                      href="/blog"
                      className="block px-4 py-2 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave text-gray-700"
                      role="menuitem"
                    >
                      📝 Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/nuestra-historia"
                      className="block px-4 py-2 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave text-gray-700"
                      role="menuitem"
                    >
                      📖 Nuestra Historia
                    </a>
                  </li>
                  <li>
                    <a
                      href="/acerca-de-nosotros"
                      className="block px-4 py-2 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave text-gray-700"
                      role="menuitem"
                    >
                      🙋 Acerca de Nosotros
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* CONTACTO */}
            <a
              href="/contacto"
              className="relative font-medium text-gray-900 hover:text-azulPrimario transition-colors duration-suave ease-suave"
            >
              CONTACTO
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-azulPrimario-light rounded transition-all duration-suave ease-suave"></span>
            </a>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="text-2xl focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-elegante border-t border-gray-200">
          <a
            href="/vende-o-alquila"
            className="block px-4 py-3 text-gray-800 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VENDE O ALQUILA
          </a>
          <a
            href="/servicios"
            className="block px-4 py-3 text-gray-800 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            SERVICIOS
          </a>

          {/* Submenú CONÓCENOS móvil */}
          <div>
            <button
              onClick={() => toggleDropdown("conocenos")}
              aria-expanded={openDropdown === "conocenos"}
              aria-controls="submenu-conocenos-mobile"
              className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave focus:outline-none"
            >
              CONÓCENOS
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-suave ease-suave ${
                  openDropdown === "conocenos" ? "rotate-180 text-azulPrimario" : "rotate-0 text-gray-600"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openDropdown === "conocenos" && (
              <div
                id="submenu-conocenos-mobile"
                className="pl-6 border-l border-azulPrimario bg-azulPrimario-light"
              >
                <a
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-azulPrimario transition-colors duration-suave ease-suave"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📝 Blog
                </a>
                <a
                  href="/nuestra-historia"
                  className="block px-4 py-2 text-gray-700 hover:bg-azulPrimario transition-colors duration-suave ease-suave"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📖 Nuestra Historia
                </a>
                <a
                  href="/acerca-de-nosotros"
                  className="block px-4 py-2 text-gray-700 hover:bg-azulPrimario transition-colors duration-suave ease-suave"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🙋 Acerca de Nosotros
                </a>
              </div>
            )}
          </div>

          <a
            href="/contacto"
            className="block px-4 py-3 text-gray-800 hover:bg-azulPrimario-light transition-colors duration-suave ease-suave"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACTO
          </a>
        </div>
      )}
    </nav>
  );
}
