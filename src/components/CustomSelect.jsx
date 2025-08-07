// src/components/CustomSelect.jsx
import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ label, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Incluir "Todos" como opción adicional
  const fullOptions = ["Todos", ...options];

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (option === "Todos") {
      if (selected.length === options.length) {
        // Si ya están todos seleccionados, deselecciona todo
        setSelected([]);
      } else {
        // Selecciona todos
        setSelected([...options]);
      }
    } else {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  // Mostrar “Todos” si todos están seleccionados
  const displayValue =
    selected.length === options.length
      ? `Todos los ${label}`
      : selected.length > 0
      ? selected.join(", ")
      : `Seleccione ${label}`;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className="w-full border rounded-lg py-2 px-3 bg-white hover:border-blue-500 focus:outline-none text-left shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-700">{displayValue}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border rounded-lg shadow-md text-sm">
          {fullOptions.map((option) => (
            <li
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelect(option)}
            >
              <img
                src={
                  (option === "Todos" && selected.length === options.length) ||
                  (option !== "Todos" && selected.includes(option))
                    ? "/check.png"
                    : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }
                alt=""
                className="w-4 h-4 mr-2"
              />
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

