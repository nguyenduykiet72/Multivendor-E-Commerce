import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import Rating from "../shared/Rating";

const Wishlist = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {[1, 2, 3, 4].map((p, i) => (
        <div
          key={i}
          className="transition-all duration-500 bg-white border group hover:shadow-md hover:-mt-3"
        >
          <div className="relative overflow-hidden">
            <div className="absolute flex items-center justify-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
              10%
            </div>

            <img
              className="sm:w-full h-[240px] w-full"
              src={`/images/products/1.webp`}
              alt=""
            />
            <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaHeart />
              </li>
              <Link
                to="/product/details/new"
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <IoEye />
              </Link>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaShoppingCart />
              </li>
            </ul>
          </div>

          <div className="px-2 py-3 text-slate-800">
            <h2 className="font-bold">Something</h2>
            <div className="flex items-center justify-start gap-3">
              <span className="font-semibold text-md">50000 VND</span>
              <div className="flex">
                <Rating ratings={5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
