import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cierre al hacer clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
        closeAllSubmenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    closeAllSubmenus();
  };

  // Función modular para cerrar futuros submenús
  const closeAllSubmenus = () => {
    const submenus = document.querySelectorAll('[data-submenu-open]');
    submenus.forEach((el) => el.removeAttribute('data-submenu-open'));
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div
        ref={menuRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto transition-all duration-300 hover:scale-105"
          />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-[#C80000] text-3xl focus:outline-none transition-transform duration-300"
          aria-label="Abrir menú"
        >
          {open ? '❌' : '☰'}
        </button>

        <nav
          className={`sm:flex gap-8 transition-all duration-300 ease-in-out ${
            open ? 'block' : 'hidden'
          } sm:block`}
        >
          <Link to="/" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
            Inicio
          </Link>
          <Link to="/propiedades" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
            Propiedades
          </Link>
          <Link to="/nosotros" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
            Nosotros
          </Link>
          <Link to="/registro" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">
            Registro
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


