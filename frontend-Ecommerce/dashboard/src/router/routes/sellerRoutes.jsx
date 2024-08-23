import { lazy } from "react";
const Home = lazy(() => import("../../components/Home"));
const SellerDashboard = lazy(() =>
  import("../../components/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../components/seller/AddProduct"));
const ProductDashboard = lazy(() =>
  import("../../components/seller/ProductDashboard")
);
const DiscountProducts = lazy(() =>
  import("../../components/seller/DiscountProducts")
);
const OrderDashboard = lazy(() =>
  import("../../components/seller/OrderDashboard")
);
const PaymentDashboard = lazy(() =>
  import("../../components/seller/PaymentDashboard")
);
export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/products",
    element: <ProductDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/discount-product",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "seller/dashboard/orders",
    element: <OrderDashboard />,
    role: "seller",
    ability: ["active","deactivate"],
  },
  {
    path: "seller/dashboard/payments",
    element: <PaymentDashboard />,
    role: "seller",
    status: "active",
  },
];
