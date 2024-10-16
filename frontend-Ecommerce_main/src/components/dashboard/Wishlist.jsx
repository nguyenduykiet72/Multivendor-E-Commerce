import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import Rating from "../shared/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_product,
  messageClear,
  remove_wishlist_product,
} from "../../store/Reducers/cartReducer";
import { MdRemoveCircle } from "react-icons/md";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlist, successMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_wishlist_product(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div className="grid w-full grid-cols-4 gap-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {wishlist.map((p, i) => (
        <div
          key={i}
          className="transition-all duration-500 bg-white border group hover:shadow-md hover:-mt-3"
        >
          <div className="relative overflow-hidden">
            {p.discount !== 0 && (
              <div className="absolute flex items-center justify-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {p.discount}%
              </div>
            )}

            <img className="sm:w-full h-[240px] w-full" src={p.image} alt="" />
            <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-700 -bottom-10 group-hover:bottom-3">
              <li
                onClick={() => dispatch(remove_wishlist_product(p._id))}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <MdRemoveCircle />
              </li>
              <Link
                to={`/product/details/${p.slug}`}
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
            <h2 className="font-bold">{p.name}</h2>
            <div className="flex items-center justify-start gap-3">
              <span className="font-semibold text-md">{p.price} VND</span>
              <div className="flex">
                <Rating ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
