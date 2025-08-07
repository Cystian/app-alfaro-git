// src/components/ComboBoxMultiple.jsx
import React, { useState, useEffect, useRef } from "react";

const ComboBoxMultiple = ({ options, selected, setSelected, placeholder, includeSelectAll = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (option) => {
    if (option === "Todos") {
      if (selected.length === options.length) {
        setSelected([]); // Deselecciona todos
      } else {
        setSelected(options); // Selecciona todos
      }
    } else {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  const isAllSelected = selected.length === options.length;
  const finalOptions = includeSelectAll ? ["Todos", ...options] : options;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer bg-white"
      >
        {selected.length > 0 ? selected.join(", ") : placeholder}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg text-sm">
          {finalOptions.map((option) => {
            const isSelected = option === "Todos" ? isAllSelected : selected.includes(option);
            return (
              <li
                key={option}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                  isSelected ? "bg-blue-200 font-semibold" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ComboBoxMultiple;
