// src/components/CustomSelect.jsx
import React, { useRef, useEffect } from "react";

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

  // Opciones incluyendo “Todos”
  const fullOptions = includeSelectAll ? ["Todos", ...options] : options;

  // Abre el dropdown si el dropdown abierto es este label
  const isOpen = openDropdown === label;

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isOpen) {
          setOpenDropdown(null);
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

  // Toggle abre o cierra este dropdown
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className="w-full border rounded-lg py-2 px-3 bg-white hover:border-blue-500 focus:outline-none text-left shadow-sm"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm text-gray-700">{displayValue}</span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border rounded-lg shadow-md text-sm"
          role="listbox"
          aria-label={label}
        >
          {fullOptions.map((option) => (
            <li
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
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


