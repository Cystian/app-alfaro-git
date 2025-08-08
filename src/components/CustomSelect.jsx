// src/components/CustomSelect.jsx
import React, { useRef, useEffect, useState } from "react";

const CustomSelect = ({
  label,
  options,
  selected,
  setSelected,
  includeSelectAll = false,
  openDropdown,
  setOpenDropdown,
}) => {
  const wrapperRef = useRef(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const fullOptions = includeSelectAll ? ["Todos", ...options] : options;

  const isOpen = openDropdown === label;

  // Controlar animación salida para animar antes de cerrar dropdown
  useEffect(() => {
    if (!isOpen && !isAnimatingOut) return;

    if (!isOpen && isAnimatingOut) {
      // Esperar duración animación para cerrar dropdown
      const timeout = setTimeout(() => setIsAnimatingOut(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isAnimatingOut]);

  // Cerrar dropdown fuera de clic con animación
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isOpen) {
          // Iniciar animación salida
          setIsAnimatingOut(true);
          // Quitar openDropdown tras animación
          setTimeout(() => setOpenDropdown(null), 300);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  const handleSelect = (option) => {
    if (option === "Todos") {
      if (selected.length === options.length) {
        setSelected([]);
      } else {
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

  const displayValue =
    selected.length === options.length
      ? `Todos los ${label}`
      : selected.length > 0
      ? selected.join(", ")
      : `Seleccione ${label}`;

  const toggleDropdown = () => {
    if (isOpen) {
      // Animación salida
      setIsAnimatingOut(true);
      setTimeout(() => setOpenDropdown(null), 300);
    } else {
      setOpenDropdown(label);
    }
  };

  // Clases para animar entrada/salida
  const dropdownClasses = `
    absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border rounded-lg shadow-md text-sm
    transition-opacity duration-300 ease-in-out transform origin-top
    ${isOpen && !isAnimatingOut ? "opacity-100 scale-100 animate-slide-down" : ""}
    ${isAnimatingOut ? "opacity-0 scale-95" : ""}
  `;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className="w-full border rounded-lg py-2 px-3 bg-white hover:border-blue-500 focus:outline-none text-left shadow-sm transition-colors duration-300"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm text-gray-700">{displayValue}</span>
      </button>

      {(isOpen || isAnimatingOut) && (
        <ul
          className={dropdownClasses}
          role="listbox"
          aria-label={label}
        >
          {fullOptions.map((option) => (
            <li
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100 transition-colors duration-300"
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selected.includes(option)}
            >
              <input
                type="checkbox"
                readOnly
                checked={
                  (option === "Todos" && selected.length === options.length) ||
                  (option !== "Todos" && selected.includes(option))
                }
                className="mr-2"
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


