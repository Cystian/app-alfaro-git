import React from 'react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Crea tu cuenta</h2>
        <RegisterForm />
        <p className="text-sm text-center text-slate-600 mt-4">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
