import { lazy } from "react";
const Home = lazy(() => import("../../components/Home"));
const SellerDashboard = lazy(() =>
  import("../../components/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../components/seller/AddProduct"));
const ProductDashboard = lazy(() => import("../../components/seller/ProductDashboard"));
export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
    ability: ["seller"],
  },
  {
    path: "seller/dashboard/add-product",
    element: <AddProduct />,
    ability: ["seller"],
  },
  {
    path: "seller/dashboard/products",
    element: <ProductDashboard />,
    ability: ["seller"],
  },
];
