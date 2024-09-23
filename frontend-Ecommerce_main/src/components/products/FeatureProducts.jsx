import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import Rating from "../shared/Rating";
import { Link } from "react-router-dom";

const FeatureProducts = ({ products }) => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="relative flex flex-col items-center justify-center text-4xl font-bold text-center text-slate-800 pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[108px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>

      <div className="grid w-full grid-cols-4 gap-6 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {products.map((p, i) => (
          <div
            key={i}
            className="transition-all duration-500 border group hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {p.discount ? (
                <div className="absolute flex items-center justify-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {p.discount}%
                </div>
              ) : (
                ""
              )}
              <img
                className="sm:w-full h-[240px] w-full"
                src={p.images[0]}
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
    </div>
  );
};

export default FeatureProducts;
