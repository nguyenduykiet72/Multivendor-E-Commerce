import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { socket } from "../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomer, updateSellers } from "../store/Reducers/chatReducer";

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on('active_customer',(customers) => {
      dispatch(updateCustomer(customers));
    })
    socket.on('active_seller',(sellers) => {
      dispatch(updateSellers(sellers));
    })
  }, []);

  return (
    <div className="bg-[#e0e0e0] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
