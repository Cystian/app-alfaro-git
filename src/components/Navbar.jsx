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

              {/* SUBMENÚ */}
              <div
                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}
              >
                <a
                  href="/blog"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Blog
                </a>
                <a
                  href="/nuestra-historia"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Nuestra Historia
                </a>
                <a
                  href="/acerca-de-nosotros"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Acerca de Nosotros
                </a>
              </div>
            </div>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl focus:outline-none">
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
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              CONÓCENOS
            </button>
            {activeMenu === "conocenos" && (
              <div className="pl-4">
                <a
                  href="/blog"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Blog
                </a>
                <a
                  href="/nuestra-historia"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Nuestra Historia
                </a>
                <a
                  href="/acerca-de-nosotros"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Acerca de Nosotros
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

