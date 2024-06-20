import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Socket from "../pages/Socket";
import MainLayout from "../components/MainLayout";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
    children: [
      {
        path: "/",
        element: <Socket />,
      },
    ],
  },
]);

export default router;
