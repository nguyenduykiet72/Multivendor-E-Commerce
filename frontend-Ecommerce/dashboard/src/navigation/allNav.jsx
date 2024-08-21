import { MdDashboardCustomize, MdCategory, MdPayments,MdDiscount  } from "react-icons/md";
import { FaShoppingCart,FaSitemap   } from "react-icons/fa";
import { PiUsersFourFill, PiUsersThreeFill } from "react-icons/pi";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboardCustomize />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <FaShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Products",
    icon: <MdCategory />,
    role: "admin",
    path: "/admin/dashboard/products",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <PiUsersFourFill />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <MdPayments />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Deactivate Sellers",
    icon: <PiUsersThreeFill />,
    role: "admin",
    path: "/admin/dashboard/deactivate-sellers",
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <FaCodePullRequest />,
    role: "admin",
    path: "/admin/dashboard/seller-request",
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoMdChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
  {
    id: 9,
    title: "Dashboard",
    icon: <MdDashboardCustomize />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "Add Product",
    icon: <MdCategory />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 11,
    title: "All Product",
    icon: <FaSitemap  />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: 12,
    title: "Discount Product",
    icon: <MdDiscount />,
    role: "seller",
    path: "/seller/dashboard/discount-product",
  },
  {
    id: 13,
    title: "Orders",
    icon: <FaShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 14,
    title: "Payments",
    icon: <MdPayments />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 15,
    title: "Chat-Customer",
    icon: <IoMdChatbubbles />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 16,
    title: "Chat-Support",
    icon: <IoChatbubblesSharp />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
];

 
