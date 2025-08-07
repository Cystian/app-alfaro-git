// src/components/CustomSelect.jsx
import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ label, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <div
        className="border rounded-lg px-3 py-2 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? selected.join(", ") : `Todas`}
      </div>
      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleOption(option)}
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="accent-blue-600"
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

