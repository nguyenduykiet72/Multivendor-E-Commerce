import { lazy } from "react";
const OrderDashboard = lazy(() => import("../../components/admin/OrderDashboard"));
const AdminDashboard = lazy(() => import("../../components/admin/AdminDashboard"));
export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <OrderDashboard />,
    role: "admin",
  },
];
