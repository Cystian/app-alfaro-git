import { validateForm, isEmail, isPasswordStrong, isNotEmpty } from '../utils/validation';

// ...
const rules = {
  email: [{ fn: isEmail, message: 'Correo inválido' }],
  password: [
    { fn: isNotEmpty, message: 'La contraseña es obligatoria' },
    { fn: isPasswordStrong, message: 'Debe tener 8 caracteres, una mayúscula y un número' }
  ],
  nombre: [{ fn: isNotEmpty, message: 'Nombre obligatorio' }],
};

const errors = validateForm(formData, rules);
