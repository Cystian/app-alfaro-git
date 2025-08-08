import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-28 h-12 transform transition-transform duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex space-x-8">
            {/* Vende o Alquila */}
            <Link
              href="#"
              className="relative group text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
            >
              Vende o Alquila
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Servicios */}
            <Link
              href="#"
              className="relative group text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
            >
              Servicios
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Conócenos */}
            <div className="relative group">
              <button
                onClick={() => toggleSubmenu("conocenos")}
                className="flex items-center space-x-1 text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 focus:outline-none"
              >
                <span>Conócenos</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    submenuOpen === "conocenos" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Submenú */}
              <div
                className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 transform -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
                  submenuOpen === "conocenos" ? "opacity-100 translate-y-0" : "pointer-events-none"
                }`}
              >
                <Link
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Nuestra Historia
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  Acerca de Nosotros
                </Link>
              </div>
            </div>
          </div>

          {/* Botón hamburguesa */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  menuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg transition-all duration-300">
          <Link
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Vende o Alquila
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Servicios
          </Link>
          <button
            onClick={() => toggleSubmenu("conocenos")}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center"
          >
            Conócenos
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${
                submenuOpen === "conocenos" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {submenuOpen === "conocenos" && (
            <div className="bg-gray-50">
              <Link
                href="#"
                className="block px-6 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="block px-6 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              >
                Nuestra Historia
              </Link>
              <Link
                href="#"
                className="block px-6 py-2 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
              >
                Acerca de Nosotros
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
