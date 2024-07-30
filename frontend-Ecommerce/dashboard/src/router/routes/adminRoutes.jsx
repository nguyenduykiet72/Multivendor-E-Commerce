import { lazy } from "react";
const AdminDashboard = lazy(() =>
  import("../../components/admin/AdminDashboard")
);
const OrderDashboard = lazy(() =>
  import("../../components/admin/OrderDashboard")
);
const ProductDashboard = lazy(() =>
  import("../../components/admin/ProductDashboard")
);
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
  {
    path: "admin/dashboard/products",
    element: <ProductDashboard />,
    role: "admin",
  },
];
