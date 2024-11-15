import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { FaList, FaHeart } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoMdChatboxes } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { TbPassword } from "react-icons/tb";
import { IoLogOutSharp } from "react-icons/io5";
import api from "../api/api";
import { useDispatch } from "react-redux";
import { user_logout } from "../store/Reducers/authReducer";
import { cart_count_logout } from "../store/Reducers/cartReducer";

const UserDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(user_logout());
      dispatch(cart_count_logout());
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <Header />
      <div className="mt-5 bg-slate-200">
        <div className="w-[90%] mx-auto md-lg:block hidden">
          <div>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="px-3 py-3 text-center text-white bg-[#059473]"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className="h-full mx-auto">
          <div className="flex py-5 md-lg:w-[90%] mx-auto relative">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                showFilter ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              <ul className="px-4 py-2 text-slate-800">
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <GoHomeFill />
                  </span>
                  <Link className="block" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <BsFillCartCheckFill />
                  </span>
                  <Link className="block" to="/dashboard/my-orders">
                    My Order
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <Link className="block" to="/dashboard/my-wishlist">
                    Wishlist
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <IoMdChatboxes />
                  </span>
                  <Link className="block" to="/dashboard/chat">
                    Chat
                  </Link>
                </li>
                <li className="flex items-center justify-start gap-2 py-2">
                  <span className="text-xl">
                    <TbPassword />
                  </span>
                  <Link className="block" to="/dashboard/change-password">
                    Change Password
                  </Link>
                </li>
                <li
                  onClick={logout}
                  className="flex items-center justify-start gap-2 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <IoLogOutSharp />
                  </span>
                  <div className="block">Logout</div>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              <div className="mx-4 md-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
