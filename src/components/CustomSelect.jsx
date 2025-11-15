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
  const isGrouped = options.length > 0 && options[0].departamento !== undefined;
  const isOpen = openDropdown === label;

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (isOpen) setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  const handleSelect = (option) => {
    if (option === "Todos") {
      if (selected.length === getAllOptions().length) {
        setSelected([]);
      } else {
        setSelected(getAllOptions());
      }
    } else {
      if (selected.includes(option)) {
        setSelected(selected.filter((item) => item !== option));
      } else {
        setSelected([...selected, option]);
      }
    }
  };

  const getAllOptions = () => {
    if (isGrouped) {
      return options.flatMap((g) => g.distritos.map((d) => d.nombre));
    }
    return options;
  };

  const displayValue = selected.length === getAllOptions().length
    ? `Todos los ${label}`
    : selected.length > 0
    ? selected.join(", ")
    : label === "Tipo"
    ? "Seleccione Tipo de Inmueble"
    : `Seleccione ${label}`;

  const toggleDropdown = () => setOpenDropdown(isOpen ? null : label);

  return (
    <div className="relative w-full sm:w-56" ref={wrapperRef}>
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
          className="dropdown-menu absolute top-full left-0 min-w-full animate-slide-down max-h-60 overflow-y-auto z-50 bg-white rounded-md shadow-lg"
          role="listbox"
          aria-label={label}
        >
          {includeSelectAll && (
            <li
              className="dropdown-item flex items-center cursor-pointer"
              onClick={() => handleSelect("Todos")}
              role="option"
              aria-selected={selected.length === getAllOptions().length}
            >
              <input
                type="checkbox"
                readOnly
                checked={selected.length === getAllOptions().length}
                className="w-3 h-3 mr-2 accent-[#DC2626]"
              />
              <span>Todos</span>
            </li>
          )}

          {isGrouped
            ? options.map((group) => (
                <li key={group.departamento} className="px-2 py-1">
                  <strong className="block text-gray-500 mb-1">{group.departamento}</strong>
                  {group.distritos.map((distrito) => (
                    <div
                      key={distrito.id}
                      className="dropdown-item flex items-center cursor-pointer pl-4"
                      onClick={() => handleSelect(distrito.nombre)}
                      role="option"
                      aria-selected={selected.includes(distrito.nombre)}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={selected.includes(distrito.nombre)}
                        className="w-3 h-3 mr-2 accent-[#DC2626]"
                      />
                      <span>{distrito.nombre}</span>
                    </div>
                  ))}
                </li>
              ))
            : getAllOptions().map((option) => (
                <li
                  key={option}
                  className="dropdown-item flex items-center cursor-pointer"
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={selected.includes(option)}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={selected.includes(option)}
                    className="w-3 h-3 mr-2 accent-[#DC2626]"
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






