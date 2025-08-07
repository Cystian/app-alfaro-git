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
    <div className="relative">
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
            <label key={option} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="accent-blue-600 mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
