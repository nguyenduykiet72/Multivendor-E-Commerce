import { lazy } from "react";
const AdminDashboard = lazy(() => import("../../components/admin/AdminDashboard"));
export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
];
