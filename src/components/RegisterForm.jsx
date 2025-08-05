// src/components/RegisterForm.jsx
import { validateForm, isEmail, isPasswordStrong, isNotEmpty } from '../utils/validation';
import { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', nombre: '' });
  const [formErrors, setFormErrors] = useState({});

  const rules = {
    email: [{ fn: isEmail, message: 'Correo inválido' }],
    password: [
      { fn: isNotEmpty, message: 'La contraseña es obligatoria' },
      { fn: isPasswordStrong, message: 'Debe tener 8 caracteres, una mayúscula y un número' }
    ],
    nombre: [{ fn: isNotEmpty, message: 'Nombre obligatorio' }],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData, rules);
    if (Object.keys(errors).length === 0) {
      // Aquí va tu lógica para registrar al usuario
      console.log('Registrado:', formData);
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input name="nombre" onChange={handleChange} />
        {formErrors.nombre && <span>{formErrors.nombre}</span>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" onChange={handleChange} />
        {formErrors.email && <span>{formErrors.email}</span>}
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="password" onChange={handleChange} />
        {formErrors.password && <span>{formErrors.password}</span>}
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
