import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Asegúrate de tener lucide-react instalado
import NoticiasGrid from "./NoticiasGrid";
import FloatingShare from "../../components/FloatingShare";

const NoticiasPage = () => {
  return (
    <>
   

    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Botón Volver al Blog */}
      <div className="mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center text-[#DF011A] hover:text-red-700 transition font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al Blog
        </Link>
      </div>

      {/* Grid de Noticias */}
      <NoticiasGrid />
    </div>
    </>
  );
};

export default NoticiasPage;
