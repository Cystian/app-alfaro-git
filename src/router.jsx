// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Admin from "./pages/Admin";

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
    ],
  },
]);

export default router;

