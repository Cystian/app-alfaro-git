// src/components/CustomSelect.jsx
import React, { useRef, useEffect } from "react";

const CustomSelect = ({
  label,
  options,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  menuKey,
  onHoverChange,
}) => {
  const wrapperRef = useRef(null);
  const fullOptions = ["Todos", ...options];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onHoverChange) onHoverChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen, onHoverChange]);

  const handleSelect = (option, event) => {
    event.stopPropagation(); // <-- importante para evitar cierre
    if (option === "Todos") {
      if (selected.length === options.length) setSelected([]);
      else setSelected([...options]);
    } else {
      if (selected.includes(option))
        setSelected(selected.filter((item) => item !== option));
      else setSelected([...selected, option]);
    }
    // NO cerramos el menú aquí para que siga abierto tras seleccionar
  };

  const displayValue =
    selected.length === options.length
      ? `Todos los ${label}`
      : selected.length > 0
      ? selected.join(", ")
      : `Seleccione ${label}`;

  return (
    <div
      className="relative w-full"
      ref={wrapperRef}
      onMouseEnter={() => onHoverChange && onHoverChange(true, menuKey)}
      onMouseLeave={() => onHoverChange && onHoverChange(false, menuKey)}
    >
      <button
        type="button"
        className="w-full border rounded-lg py-2 px-3 bg-white hover:border-blue-500 focus:outline-none text-left shadow-sm"
        onClick={(e) => {
          e.stopPropagation(); // evitar burbuja que cierre todo
          setIsOpen(!isOpen);
        }}
      >
        <span className="text-sm text-gray-700">{displayValue}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white border rounded-lg shadow-md text-sm">
          {fullOptions.map((option) => (
            <li
              key={option}
              className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-100"
              onClick={(e) => handleSelect(option, e)} // paso el event
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

