import React from "react";
import { FaList } from "react-icons/fa";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className="relative top-0 left-0 z-40 w-full px-2 py-5 lg:px-7 ">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center font-sans bg-white px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#4b9cd9] shadow-lg hover:shadow-blue-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            type="text"
            className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none hover:border-blue-600"
            name="search"
            placeholder="search"
          />
        </div>

        <div className="relative flex items-center justify-center gap-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center justify-center text-end">
                <h2 className="font-bold text-md">Osborn Nguyen</h2>
                <span className="text-[14px] w-full ">Admin</span>
              </div>
              <img
                className="w-[45px] h-[45px]"
                src="/images/admin.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
