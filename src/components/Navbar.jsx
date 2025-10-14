import React, { useState, useRef, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { UserRound, Mail, BookOpen } from "lucide-react";

/**
 * Componente reutilizable para los dropdowns
 */
const NavItemDropdown = ({ label, dropdownKey, openDropdown, toggleDropdown, isMobile, closeMobileMenu }) => {
  const isOpen = openDropdown === dropdownKey;

  return (
    <div className={`relative ${isMobile ? "" : "md:relative"}`}>
      {/* Botón del dropdown */}
      <button
        onClick={() => toggleDropdown(dropdownKey)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center justify-between w-full ${
          isMobile
            ? "px-4 py-3 text-left font-medium text-gray-800 hover:border-b-2 hover:border-blue-600 transition-all duration-300 focus:outline-none"
            : "nav-link flex items-center space-x-1 focus:outline-none"
        }`}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180 text-azul-primario" : "rotate-0 text-gray-600"
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

      {/* Contenido del dropdown */}
      {isOpen && (
        <div
          className={`${
            isMobile
              ? "pl-6 border-l border-azul-primario bg-transparent animate-slide-down"
              : "dropdown-menu animate-slide-down"
          }`}
        >
          {[
            { href: "/acerca-de-nosotros", label: "Acerca de Nosotros", icon: <UserRound className="w-[18px] h-[18px] shrink-0" style={{ color: "#d10d0d" }} /> },
            { href: "/contacto", label: "Contacto", icon: <Mail className="w-[18px] h-[18px] shrink-0" style={{ color: "#d10d0d" }} /> },
            { href: "/nuestra-historia", label: "Nuestra Historia", icon: <BookOpen className="w-[18px] h-[18px] shrink-0" style={{ color: "#d10d0d" }} /> },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 w-full px-4 py-2 text-gray-700 transition-all duration-300 ${
                isMobile
                  ? "hover:border-b-2 hover:border-blue-600 bg-transparent" // solo subrayado azul, sin sombreado
                  : "dropdown-item hover:bg-[#bfdbfe]" // Desktop mantiene hover fondo
              }`}
              onClick={() => isMobile && closeMobileMenu()}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const wrapperRef = useRef(null);

  // Detecta clic fuera del navbar para cerrar menus
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

  const toggleDropdown = (key) => setOpenDropdown(openDropdown === key ? null : key);
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); setOpenDropdown(null); };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav ref={wrapperRef} className="navbar fixed w-full z-50 bg-white shadow-navbar transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex-1 flex justify-center md:justify-start">
            <a href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-16 w-auto transition-transform duration-300 hover:scale-105 hover:shadow-logo-hover rounded-lg"
              />
            </a>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="/vende-o-alquila" className="nav-link">VENDE O ALQUILA</a>
            <a href="/servicios" className="nav-link">SERVICIOS</a>

            {/* Dropdown CONÓCENOS Desktop */}
            <NavItemDropdown
              label="CONÓCENOS"
              dropdownKey="conocenos"
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              isMobile={false}
            />

            <a href="/blog" className="nav-link">BLOG</a>
            <a href="/asesores" className="nav-link">ASESORES</a>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center absolute right-4">
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
          <a href="/vende-o-alquila" className="block px-4 py-3 text-gray-800 hover:border-b-2 hover:border-blue-600 transition-all duration-300" onClick={closeMobileMenu}>
            VENDE O ALQUILA
          </a>
          <a href="/servicios" className="block px-4 py-3 text-gray-800 hover:border-b-2 hover:border-blue-600 transition-all duration-300" onClick={closeMobileMenu}>
            SERVICIOS
          </a>

          {/* Dropdown CONÓCENOS Móvil */}
          <NavItemDropdown
            label="CONÓCENOS"
            dropdownKey="conocenos"
            openDropdown={openDropdown}
            toggleDropdown={toggleDropdown}
            isMobile={true}
            closeMobileMenu={closeMobileMenu}
          />

          <a href="/blog" className="block px-4 py-3 text-gray-800 hover:border-b-2 hover:border-blue-600 transition-all duration-300" onClick={closeMobileMenu}>
            BLOG
          </a>
          <a href="/asesores" className="block px-4 py-3 text-gray-800 hover:border-b-2 hover:border-blue-600 transition-all duration-300" onClick={closeMobileMenu}>
            ASESORES
          </a>
        </div>
      )}
    </nav>
  );
}
