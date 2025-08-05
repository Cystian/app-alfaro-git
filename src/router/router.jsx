// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/propiedades",
    element: <Properties />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

export default router;
