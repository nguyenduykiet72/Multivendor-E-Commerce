import { lazy } from "react";
const Home = lazy(() => import("../../components/Home"));
const SellerDashboard = lazy(() =>
  import("../../components/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../components/seller/AddProduct"));
const ProductDashboard = lazy(() => import("../../components/seller/ProductDashboard"));
const DiscountProducts = lazy(() => import("../../components/seller/DiscountProducts"));
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
  {
    path: "seller/dashboard/discount-product",
    element: <DiscountProducts />,
    ability: ["seller"],
  },
];
