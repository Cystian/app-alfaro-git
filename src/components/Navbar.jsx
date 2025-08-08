import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubMenu = (menu) =>
    setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <nav
      className={`fixed w-full z-50 transition-shadow duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex space-x-8">
            {/* VENDE O ALQUILA */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("vende")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="hover:text-blue-600 transition-colors duration-300 relative">
                VENDE O ALQUILA
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* SERVICIOS */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("servicios")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="hover:text-blue-600 transition-colors duration-300 relative">
                SERVICIOS
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* CONÓCENOS */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMenu("conocenos")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="hover:text-blue-600 transition-colors duration-300 relative">
                CONÓCENOS
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* SUBMENÚ MEJORADO */}
              <div
                role="menu"
                aria-hidden={activeMenu !== "conocenos"}
                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transition-opacity transition-transform duration-300 ${
                  activeMenu === "conocenos"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
              >
                <a
                  href="/blog"
                  role="menuitem"
                  className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-gray-100 transition-colors duration-200"
                >
                  Blog
                </a>
                <a
                  href="/nuestra-historia"
                  role="menuitem"
                  className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-gray-100 transition-colors duration-200"
                >
                  Nuestra Historia
                </a>
                <a
                  href="/acerca-de-nosotros"
                  role="menuitem"
                  className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-gray-100 transition-colors duration-200"
                >
                  Acerca de Nosotros
                </a>
              </div>
            </div>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            VENDE O ALQUILA
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 transition"
          >
            SERVICIOS
          </a>
          <div>
            <button
              onClick={() => toggleSubMenu("conocenos")}
              aria-expanded={activeMenu === "conocenos"}
              aria-controls="submenu-conocenos"
              className="flex justify-between items-center w-full text-left px-4 py-2 hover:bg-[var(--gris-claro)] transition-colors duration-300 font-medium"
            >
              CONÓCENOS
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                  activeMenu === "conocenos" ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              id="submenu-conocenos"
              className={`pl-4 overflow-hidden transition-max-height duration-300 ease-in-out ${
                activeMenu === "conocenos" ? "max-h-40" : "max-h-0"
              }`}
            >
              <a
                href="/blog"
                className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-[var(--gris-claro)] transition-colors duration-200"
              >
                Blog
              </a>
              <a
                href="/nuestra-historia"
                className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-[var(--gris-claro)] transition-colors duration-200"
              >
                Nuestra Historia
              </a>
              <a
                href="/acerca-de-nosotros"
                className="block px-4 py-2 border-l-4 border-transparent hover:border-blue-400 hover:bg-[var(--gris-claro)] transition-colors duration-200"
              >
                Acerca de Nosotros
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
