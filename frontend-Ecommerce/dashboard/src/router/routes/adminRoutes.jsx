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
const SellerDashboard = lazy(() =>
  import("../../components/admin/SellerDashboard")
);
const PaymentRequest = lazy(() =>
  import("../../components/admin/PaymentRequest")
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
  {
    path: "admin/dashboard/sellers",
    element: <SellerDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
];
