// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false); // Cierra el menú al hacer clic

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#C80000]">Inmobiliaria</h1>
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-[#C80000] text-2xl"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <nav className={`sm:flex gap-8 transition-all duration-300 ease-in-out ${open ? 'block' : 'hidden'} sm:block`}>
          <Link to="/" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">Inicio</Link>
          <Link to="/propiedades" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">Propiedades</Link>
          <Link to="/nosotros" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">Nosotros</Link>
          <Link to="/registro" onClick={handleLinkClick} className="text-[#000000] hover:text-[#C80000] font-medium">Registro</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
