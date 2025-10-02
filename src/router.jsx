// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Admin from "./pages/Asesores";
import Blog from "./pages/Blog";
import NuestraHistoria from "./pages/NuestraHistoria";
import Conocenos from "./pages/Conocenos";
import PropertyResumenPage from "./pages/PropertyResumenPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "propiedades", element: <Properties /> },
      { path: "login", element: <Login /> },
      { path: "registro", element: <Register /> },
      { path: "nosotros", element: <About /> },
      { path: "admin", element: <Admin /> }, // O separa esto si tiene otro layout
          // 👇 Nuevas rutas del submenú "Conócenos"
      { path: "blog", element: <Blog /> },
       { path: "asesores", element: <Asesores /> },
      { path: "nuestrahistoria", element: <NuestraHistoria /> },
      { path: "conocenos", element: <Conocenos /> },
      {  path: "propiedades/resumen/:id", element: <PropertyResumenPage /> },
    ],
  },
]);

export default router;

