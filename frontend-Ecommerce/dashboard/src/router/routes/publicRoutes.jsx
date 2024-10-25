import { lazy } from "react";
const Login = lazy(() => import("../../components/auth/Login"));
const Register = lazy(() => import("../../components/auth/Register"));
const AdminLogin = lazy(() => import("../../components/auth/AdminLogin"));
const Home = lazy(() => import("../../components/Home"));
const Unauthorized = lazy(() => import("../../components/Unauthorized"));
const Success = lazy(()=> import( "../../components/Success"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
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
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/success?",
    element: <Success />,
  },
];

export default publicRoutes;
