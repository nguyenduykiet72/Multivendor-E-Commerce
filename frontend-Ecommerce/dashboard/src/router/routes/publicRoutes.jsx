import { lazy } from "react";
const Login = lazy(() => import("../../components/auth/Login"));
const Register = lazy(() => import("../../components/auth/Register"));
const AdminLogin = lazy(() => import("../../components/auth/AdminLogin"));
const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
];

export default publicRoutes;
