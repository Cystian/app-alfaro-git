// src/components/CustomSelect.jsx
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

  const fullOptions = includeSelectAll ? ["Todos", ...options] : options;
  const isOpen = openDropdown === label;

  // Cierra el dropdown al hacer clic fuera
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

  const toggleDropdown = () => {
    setOpenDropdown(isOpen ? null : label);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        className="w-full border rounded-lg py-2 px-3 bg-white hover:border-azul-primario focus:outline-none text-left shadow-sm nav-link"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm text-gray-700">{displayValue}</span>
      </button>

      {isOpen && (
        <ul
          className="dropdown-menu animate-slide-down"
          role="listbox"
          aria-label={label}
        >
          {fullOptions.map((option) => (
            <li
              key={option}
              className="dropdown-item flex items-center cursor-pointer"
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={
                option === "Todos"
                  ? selected.length === options.length
                  : selected.includes(option)
              }
            >
              <input
                type="checkbox"
                readOnly
                checked={
                  (option === "Todos" && selected.length === options.length) ||
                  (option !== "Todos" && selected.includes(option))
                }
                className="custom-checkbox mr-2"
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

