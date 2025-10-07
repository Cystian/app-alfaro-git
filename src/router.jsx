// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
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
import NoticiasPage from "./pages/miblog/NoticiasPage";

const router = createBrowserRouter([
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
      { path: "admin", element: <Admin /> }, // O separa esto si tiene otro layout
      { path: "blog", element: <Blog /> },
       { path: "asesores", element: <Asesores /> },
      { path: "nuestra-historia", element: <NuestraHistoria /> },
      { path: "contacto", element: <Contacto /> },
      {  path: "propiedades/resumen/:id", element: <PropertyResumenPage /> },
       {  path: "vende-o-alquila", element: <VendeoAlquila /> },
        { path: "blog/noticias", element: <NoticiasPage /> },
    ],
  },
]);

export default router;

