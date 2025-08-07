import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
        setSubmenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    setSubmenuOpen(false);
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
            className="h-16 w-auto transition-all duration-300 hover:scale-105"
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
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-[#000000] hover:text-[#C80000] font-medium block py-2 sm:py-0"
          >
            Inicio
          </Link>

          <Link
            to="/propiedades"
            onClick={handleLinkClick}
            className="text-[#000000] hover:text-[#C80000] font-medium block py-2 sm:py-0"
          >
            Vende o Alquila
          </Link>

          <Link
            to="/nosotros"
            onClick={handleLinkClick}
            className="text-[#000000] hover:text-[#C80000] font-medium block py-2 sm:py-0"
          >
            Servicios
          </Link>

          <div className="relative group">
            <button
              onClick={() => setSubmenuOpen(!submenuOpen)}
              className="flex items-center justify-between w-full sm:w-auto py-2 sm:py-0 text-[#000000] hover:text-[#C80000] font-medium focus:outline-none gap-2"
            >
              Conócenos
              <span
                className={`transform transition-transform duration-300 ${
                  submenuOpen ? 'rotate-180 text-[#C80000]' : 'rotate-0'
                }`}
              >
                ▼
              </span>
            </button>

            {/* Submenú */}
            <div
              className={`${
                submenuOpen ? 'block' : 'hidden'
              } absolute sm:absolute sm:top-full sm:left-0 mt-1 sm:mt-2 bg-white shadow-lg rounded-md sm:min-w-[180px] z-40 sm:border sm:border-gray-200`}
            >
              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-[#000000] hover:bg-[#f7f7f7] hover:text-[#C80000]"
              >
                Blog
              </Link>
              <Link
                to="/historia"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-[#000000] hover:bg-[#f7f7f7] hover:text-[#C80000]"
              >
                Nuestra Historia
              </Link>
              <Link
                to="/conocenos"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-[#000000] hover:bg-[#f7f7f7] hover:text-[#C80000]"
              >
                Conócenos
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


