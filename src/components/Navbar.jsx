import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false); // Menú principal móvil
  const [submenuOpen, setSubmenuOpen] = useState(false); // Submenú "Conócenos"

  const handleLinkClick = () => {
    setOpen(false);
    setSubmenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo o título */}
          <div className="flex-shrink-0 text-xl font-bold text-[#C80000]">Mi Sitio</div>

          {/* Menú hamburguesa para móvil */}
          <div className="sm:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-800 hover:text-[#C80000] focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* Menú en escritorio */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link to="/" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
              Inicio
            </Link>

            {/* Conócenos con submenú */}
            <div className="relative">
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className="flex items-center justify-between w-full sm:w-auto py-2 sm:py-0 text-[#000000] hover:text-[#C80000] font-medium focus:outline-none"
              >
                <span>Conócenos</span>
                <span
                  className={`ml-2 transition-transform duration-300 transform ${
                    submenuOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Submenú versión escritorio */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-md overflow-hidden transform transition-all duration-300 ease-in-out origin-top z-50 ${
                  submenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`}
                style={{ transformOrigin: 'top' }}
              >
                <Link
                  to="/blog"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-[#C80000] hover:bg-gray-50 border-l-4 border-transparent hover:border-[#C80000] transition-all duration-150"
                >
                  📝 Blog
                </Link>
                <Link
                  to="/nuestra-historia"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-[#C80000] hover:bg-gray-50 border-l-4 border-transparent hover:border-[#C80000] transition-all duration-150"
                >
                  📖 Nuestra Historia
                </Link>
                <Link
                  to="/conocenos"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-[#C80000] hover:bg-gray-50 border-l-4 border-transparent hover:border-[#C80000] transition-all duration-150"
                >
                  🙋 Conócenos
                </Link>
              </div>
            </div>

            <Link to="/contacto" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
              Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="sm:hidden mt-2 space-y-2 px-4 pb-4 border-t border-gray-200">
          <Link to="/" onClick={handleLinkClick} className="block text-gray-800 hover:text-[#C80000]">
            Inicio
          </Link>

          <button
            onClick={() => setSubmenuOpen(!submenuOpen)}
            className="flex items-center text-gray-800 hover:text-[#C80000] font-medium focus:outline-none"
          >
            <span>Conócenos</span>
            <span
              className={`ml-2 transition-transform duration-300 transform ${
                submenuOpen ? 'rotate-180' : 'rotate-0'
              }`}
            >
              ▼
            </span>
          </button>

          {/* Submenú versión móvil */}
          {submenuOpen && (
            <div className="pl-4 border-l border-[#C80000]/30 animate-slide-down space-y-1">
              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="block text-sm text-gray-800 hover:text-[#C80000]"
              >
                📝 Blog
              </Link>
              <Link
                to="/nuestra-historia"
                onClick={handleLinkClick}
                className="block text-sm text-gray-800 hover:text-[#C80000]"
              >
                📖 Nuestra Historia
              </Link>
              <Link
                to="/conocenos"
                onClick={handleLinkClick}
                className="block text-sm text-gray-800 hover:text-[#C80000]"
              >
                🙋 Conócenos
              </Link>
            </div>
          )}

          <Link to="/contacto" onClick={handleLinkClick} className="block text-gray-800 hover:text-[#C80000]">
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
