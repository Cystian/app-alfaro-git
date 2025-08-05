// src/layout/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'; // <- IMPORTANTE

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Aquí se inyectan las páginas */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
