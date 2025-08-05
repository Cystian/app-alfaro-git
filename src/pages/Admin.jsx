import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import PageWrapper from '../components/PageWrapper';
export default function Admin() {
  return (<PageWrapper>
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Panel de Administración</h1>
        <p className="text-slate-600 mt-1">Gestión de propiedades, usuarios y solicitudes.</p>
      </header>
      <AdminDashboard />
    </div>
  </PageWrapper>);
}
