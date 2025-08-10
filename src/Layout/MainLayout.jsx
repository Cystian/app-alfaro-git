// src/layouts/MainLayout.jsx
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  useEffect(() => {
    // Facebook SDK
    if (!document.getElementById('facebook-jssdk')) {
      const fbScript = document.createElement('script');
      fbScript.id = 'facebook-jssdk';
      fbScript.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v16.0';
      fbScript.async = true;
      fbScript.defer = true;
      fbScript.crossOrigin = 'anonymous';
      document.body.appendChild(fbScript);
    }

    // Instagram embed
    if (!document.querySelector('script[src="//www.instagram.com/embed.js"]')) {
      const igScript = document.createElement('script');
      igScript.src = '//www.instagram.com/embed.js';
      igScript.async = true;
      document.body.appendChild(igScript);
    }

    // TikTok embed
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const ttScript = document.createElement('script');
      ttScript.src = 'https://www.tiktok.com/embed.js';
      ttScript.async = true;
      document.body.appendChild(ttScript);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fijo arriba */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;