import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección: Propiedades */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Gestión de Propiedades</h3>
          <ul className="space-y-2 text-sm">
            <li>📥 Subir nueva propiedad</li>
            <li>📋 Ver lista de propiedades</li>
            <li>✏️ Editar / Eliminar propiedades</li>
          </ul>
        </div>

        {/* Sección: Usuarios */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Usuarios Registrados</h3>
          <ul className="space-y-2 text-sm">
            <li>👤 Ver clientes registrados</li>
            <li>👥 Gestionar agentes inmobiliarios</li>
          </ul>
        </div>

        {/* Sección: Leads / Contactos */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Leads y Consultas</h3>
          <ul className="space-y-2 text-sm">
            <li>📨 Ver mensajes del formulario de contacto</li>
            <li>📊 Analítica básica (a implementar)</li>
          </ul>
        </div>

        {/* Sección: Configuración */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-2">Configuración</h3>
          <ul className="space-y-2 text-sm">
            <li>⚙️ Ajustes del sitio</li>
            <li>🔒 Seguridad y accesos</li>
            <li>🧑‍💼 Roles de usuario</li>
          </ul>
        </div>
      </div>

      {/* Footer o Estado */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        Versión Alpha – Panel sin conexión a base de datos.
      </div>
    </div>
  );
};

export default AdminDashboard;
