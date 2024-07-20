import { lazy } from "react";
const Home = lazy(() => import("../../components/Home"));
export const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
];
