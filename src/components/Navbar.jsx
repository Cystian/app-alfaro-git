import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
            >
              <img
                src="/ruta/a/tu-logo.png"
                alt="Logo del sitio"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Menú principal */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-gray-700 hover:text-[#C80000] px-3 py-2 rounded-md text-sm font-medium"
            >
              Inicio
            </Link>

            {/* Opción con Submenú */}
            <div
              className="relative"
              onMouseEnter={() => setIsSubmenuOpen(true)}
              onMouseLeave={() => setIsSubmenuOpen(false)}
            >
              <button
                className="text-gray-700 hover:text-[#C80000] px-3 py-2 rounded-md text-sm font-medium"
              >
                Servicios
              </button>

              {/* Submenú con fade + slide down */}
              <div
                className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden transform transition-all duration-300 ease-out 
                ${isSubmenuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}
              >
                <Link
                  to="/servicio1"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Servicio 1
                </Link>
                <Link
                  to="/servicio2"
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Servicio 2
                </Link>
              </div>
            </div>
          </div>

          {/* Botón móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#C80000] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Inicio
          </Link>
          <button
            onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Servicios
          </button>
          {isSubmenuOpen && (
            <div className="pl-4">
              <Link
                to="/servicio1"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Servicio 1
              </Link>
              <Link
                to="/servicio2"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Servicio 2
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}