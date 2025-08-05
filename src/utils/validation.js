// src/utils/validation.js

// Validaciones básicas reutilizables
export const isEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isPhone = (phone) =>
  /^\+?\d{7,15}$/.test(phone.trim());

export const isNotEmpty = (value) =>
  value && value.trim().length > 0;

export const isPasswordStrong = (password) =>
  /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password); // mínimo 8 caracteres, 1 mayúscula, 1 número

export const isValidName = (name) =>
  /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,40}$/.test(name.trim());

export const isValidDNI = (dni) =>
  /^\d{8}$/.test(dni);

export const isValidRUC = (ruc) =>
  /^\d{11}$/.test(ruc);

export const isValidURL = (url) =>
  /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/.test(url);

// Función genérica para validar formularios con errores
export function validateForm(fields, rules) {
  const errors = {};

  for (const field in rules) {
    const value = fields[field];
    const validators = rules[field];

    for (const validator of validators) {
      const { fn, message } = validator;
      if (!fn(value)) {
        errors[field] = message;
        break; // Solo mostrar el primer error por campo
      }
    }
  }

  return errors;
}
