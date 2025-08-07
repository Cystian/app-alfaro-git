import React, { useState } from "react";

const CustomSelect = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
      >
        {selected.length > 0 ? selected.join(", ") : `Selecciona ${label.toLowerCase()}`}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => toggleOption(option)}
              className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer select-none"
            >
              <div className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center mr-2 bg-white">
                {selected.includes(option) && (
                  <img
                    src="/chek.png"
                    alt="check"
                    className="w-4 h-4"
                  />
                )}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
