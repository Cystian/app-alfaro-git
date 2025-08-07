// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import Historia from "./pages/Historia";
import Conocenos from "./pages/Conocenos";

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
      { path: "historia", element: <Historia /> },
      { path: "conocenos", element: <Conocenos /> },
    ],
  },
]);

export default router;

