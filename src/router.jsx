// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import SimpleLayout from "./Layout/SimpleLayout"; // 👈 Nuevo layout
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Asesores from "./pages/Asesores";
import Blog from "./pages/miblog/Blog";
import NuestraHistoria from "./pages/NuestraHistoria";
import VendeoAlquila from "./pages/VendeoAlquila";
import Contacto from "./pages/Contacto";
import PropertyResumenPage from "./pages/PropertyResumenPage";
import NoticiaDetallePage from "./pages/miblog/NoticiaDetallePage";
import ArticuloDetallePage from "./pages/miblog/ArticuloDetallePage";
import NoticiasPage from "./pages/miblog/NoticiasPage";
import ArticulosPage from "./pages/miblog/ArticulosPage";

const router = createBrowserRouter([
  // 🔹 Layout principal con Navbar
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "propiedades", element: <Properties /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Register /> },
      { path: "acerca-de-nosotros", element: <About /> },
      { path: "servicios", element: <Servicios /> },
      { path: "admin", element: <Admin /> },
      { path: "asesores", element: <Asesores /> },
      { path: "nuestra-historia", element: <NuestraHistoria /> },
      { path: "vende-o-alquila", element: <VendeoAlquila /> },
      { path: "contacto", element: <Contacto /> },

      // 📘 BLOG (agrupado con subrutas)
      {
        path: "blog",
        element: <Blog />,
        children: [
          { index: true, element: <NoticiasPage /> },
          { path: "noticias", element: <NoticiasPage /> },
          { path: "noticias/:id", element: <NoticiaDetallePage /> },
          { path: "articulos", element: <ArticulosPage /> },
          { path: "articulos/:id", element: <ArticuloDetallePage /> },
        ],
      },
    ],
  },

  // 🔸 Layout alternativo sin Navbar (solo para resumen de propiedad)
  {
    path: "/propiedades/resumen/:id",
    element: (
      <SimpleLayout>
        <PropertyResumenPage />
      </SimpleLayout>
    ),
  },
]);

export default router;
