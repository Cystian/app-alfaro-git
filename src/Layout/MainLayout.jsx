// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GuiaButton from "../components/GuiaButton";
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
       <GuiaButton />
      <main className="flex-grow w-full max-w-9xl mx-auto px-2 sm:px-4 lg:px-6 pt-20 sm:pt-24 -mt-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
