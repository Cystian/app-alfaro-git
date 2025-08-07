import React, { useState } from "react";

const CustomDropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full border rounded-lg px-4 py-2 text-left bg-white shadow-sm hover:ring-1 ring-blue-500"
      >
        {selected.length > 0 ? selected.join(", ") : `Selecciona ${label.toLowerCase()}`}
      </button>

      {open && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => toggleOption(opt)}
              className="flex items-center justify-start px-4 py-2 cursor-pointer hover:bg-gray-100"
              data-value={opt.toLowerCase()}
              data-text={opt}
              value={opt}
            >
              <div className="w-5 h-5 mr-3 border border-gray-400 rounded flex items-center justify-center">
                {selected.includes(opt) && (
                  <img src="/chek.svg" alt="check" className="w-4 h-4" />
                )}
              </div>
              <span>{opt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
