import { lazy } from "react";
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
const SellerToCustomer = lazy(() =>
  import("../../components/seller/SellerToCustomer")
);
const SellerToAdmin = lazy(() =>
  import("../../components/seller/SellerToAdmin")
);
const Profile = lazy(() => import("../../components/seller/Profile"));
const EditProduct = lazy(() => import("../../components/seller/EditProduct"));
const OrderDetail = lazy(() => import("../../components/seller/OrderDetail"));
const Inactive = lazy(() => import("../../components/Inactive"));
const Pending = lazy(() => import("../../components/Pending"));
export const sellerRoutes = [
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/account-pending",
    element: <Pending />,
    ability: "seller",
  },
  {
    path: "/seller/account-inactive",
    element: <Inactive />,
    ability: "seller",
  },
  {
    path: "/seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/products",
    element: <ProductDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discount-product",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <OrderDashboard />,
    role: "seller",
    visibility: ["active", "inactive"],
  },
  {
    path: "/seller/dashboard/order/detail/:orderId",
    element: <OrderDetail />,
    role: "seller",
    visibility: ["active", "inactive"],
  },
  {
    path: "/seller/dashboard/payments",
    element: <PaymentDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-support",
    element: <SellerToAdmin />,
    role: "seller",
    visibility: ["active", "inactive", "pending"],
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chat-customer",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    status: "active",
  },
];
