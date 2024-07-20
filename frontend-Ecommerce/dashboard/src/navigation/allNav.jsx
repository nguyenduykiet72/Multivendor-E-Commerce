import { MdDashboardCustomize, MdCategory, MdPayments } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { PiUsersFourFill, PiUsersThreeFill } from "react-icons/pi";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoMdChatbubbles } from "react-icons/io";

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
    title: "Category",
    icon: <MdCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
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
];
