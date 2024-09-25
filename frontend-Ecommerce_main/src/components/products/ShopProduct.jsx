import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import Rating from "../shared/Rating";

const ShopProduct = ({ style,products }) => {
  return (
    <div
      className={`w-full grid ${
        style === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3 `}
    >
      {products.map((p, i) => (
        <div
          key={i}
          className={`flex transition-all duration-500 hover:shadow-md hover:-translate-y-3 ${
            style === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          <div
            className={
              style === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <img
              src={p.images[0]}
              alt=""
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
            />
            <ul className="absolute flex items-center justify-center w-full gap-2 transition-all duration-500 -bottom-10 group-hover:bottom-3">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaHeart />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <IoEye />
              </li>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaShoppingCart />
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start justify-start gap-1">
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

export default ShopProduct;
