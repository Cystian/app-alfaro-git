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

  // Helper para marcar activo basado en ruta (simple ejemplo)
  // En tu caso puede ser React Router o Next.js router.
  const isActive = (href) => window.location.pathname === href;

  return (
    <nav
      ref={wrapperRef}
      className="fixed w-full z-50 bg-white shadow-navbar transition-shadow duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105 hover:shadow-logo-hover rounded-lg"
            />
          </a>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            <a
              href="/vende-o-alquila"
              className={`nav-link ${isActive("/vende-o-alquila") ? "active" : ""}`}
            >
              VENDE O ALQUILA
            </a>

            <a
              href="/servicios"
              className={`nav-link ${isActive("/servicios") ? "active" : ""}`}
            >
              SERVICIOS
            </a>

            {/* CONÓCENOS con Submenú */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("conocenos")}
                className={`flex items-center space-x-1 nav-link ${openDropdown === "conocenos" ? "active" : ""} focus:outline-none`}
                aria-haspopup="true"
                aria-expanded={openDropdown === "conocenos"}
              >
                <span>CONÓCENOS</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
                    openDropdown === "conocenos" ? "rotate-180 text-azul-primario" : "rotate-0 text-gray-600"
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
                  className="dropdown-menu animate-slide-down"
                  role="menu"
                  aria-label="Submenú Conócenos"
                >
                  <li>
                    <a href="/blog" className="dropdown-item" role="menuitem">
                      📝 Blog
                    </a>
                  </li>
                  <li>
                    <a href="/nuestra-historia" className="dropdown-item" role="menuitem">
                      📖 Nuestra Historia
                    </a>
                  </li>
                  <li>
                    <a href="/acerca-de-nosotros" className="dropdown-item" role="menuitem">
                      🙋 Acerca de Nosotros
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <a
              href="/contacto"
              className={`nav-link ${isActive("/contacto") ? "active" : ""}`}
            >
              CONTACTO
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
        <div className="md:hidden bg-white shadow-navbar border-t border-gray-200 animate-slide-down">
          <a
            href="/vende-o-alquila"
            className="block px-4 py-3 text-gray-800 hover:bg-azul-primario-light transition-colors duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            VENDE O ALQUILA
          </a>
          <a
            href="/servicios"
            className="block px-4 py-3 text-gray-800 hover:bg-azul-primario-light transition-colors duration-300 ease-in-out"
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
              className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-azul-primario-light transition-colors duration-300 ease-in-out focus:outline-none"
            >
              CONÓCENOS
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-300 ease-in-out ${
                  openDropdown === "conocenos" ? "rotate-180 text-azul-primario" : "rotate-0 text-gray-600"
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
                className="pl-6 border-l border-azul-primario bg-azul-primario-light animate-slide-down"
              >
                <a
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-azul-primario transition-colors duration-300 ease-in-out"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📝 Blog
                </a>
                <a
                  href="/nuestra-historia"
                  className="block px-4 py-2 text-gray-700 hover:bg-azul-primario transition-colors duration-300 ease-in-out"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📖 Nuestra Historia
                </a>
                <a
                  href="/acerca-de-nosotros"
                  className="block px-4 py-2 text-gray-700 hover:bg-azul-primario transition-colors duration-300 ease-in-out"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🙋 Acerca de Nosotros
                </a>
              </div>
            )}
          </div>

          <a
            href="/contacto"
            className="block px-4 py-3 text-gray-800 hover:bg-azul-primario-light transition-colors duration-300 ease-in-out"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACTO
          </a>
        </div>
      )}
    </nav>
  );
}
