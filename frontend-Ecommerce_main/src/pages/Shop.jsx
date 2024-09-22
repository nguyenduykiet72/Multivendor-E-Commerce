import { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineStar } from "react-icons/hi2";
import Products from "../components/products/Products";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import ShopProduct from "../components/products/ShopProduct";
import Pagination from "../components/shared/Pagination";

const Shop = () => {
  const [filter, setFilter] = useState(true);
  const categories = [
    "Mobiles",
    "Laptops",
    "Speakers",
    "Top wear",
    "Footwear",
    "Watches",
    "Home Decor",
    "Smart Watches",
  ];

  const [state, setState] = useState({ values: [20000, 5000000] });
  const [rating, setRating] = useState("");
  const [style, setStyle] = useState("grid");

  const [nextPage, setNextPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <Header />
      <section className='bg-[url("/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Shop Page</h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <IoIosArrowForward />
                </span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="w-full px-3 py-2 text-center text-white bg-indigo-500"
            >
              Filter Product
            </button>
          </div>

          <div className="flex flex-wrap w-full">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              }`}
            >
              <h2 className="mb-3 text-3xl font-bold text-slate-800">
                Category
              </h2>
              <div className="py-2">
                {categories.map((c, i) => (
                  <div
                    className="flex items-center justify-start gap-2 py-1"
                    key={i}
                  >
                    <input type="checkbox" id={c} />
                    <label
                      htmlFor={c}
                      className="block cursor-pointer text-slate-800"
                    >
                      {c}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5 py-2">
                <h2 className="mb-3 text-3xl font-bold text-slate-800 ">
                  Price
                </h2>
                <Range
                  step={5}
                  min={20000}
                  max={5000000}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => {
                    const { key, ...restProps } = props;
                    return (
                      <div
                        key={key}
                        {...restProps}
                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                      >
                        {children}
                      </div>
                    );
                  }}
                  renderThumb={({ props }) => {
                    const { key, ...restProps } = props;
                    return (
                      <div
                        key={key}
                        className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                        {...restProps}
                      />
                    );
                  }}
                />
                <div>
                  <span className="text-lg font-bold text-slate-800">
                    {Math.floor(state.values[0])} VND -
                    {Math.floor(state.values[1])} VND
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 py-3">
                <h2 className="mb-3 text-3xl font-bold text-slate-800">
                  Rating
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                  </div>
                  <div
                    onClick={() => setRating(5)}
                    className="flex items-start justify-start gap-2 text-xl text-yellow-400 cursor-pointer"
                  >
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                    <span>
                      <HiOutlineStar />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 py-5 md:hidden">
                <Products title="Latest Product" />
              </div>
            </div>

            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="flex items-start justify-between px-3 py-4 mb-10 bg-white border rounded-md">
                  <h2 className="text-lg font-medium text-slate-800">
                    18 Products
                  </h2>
                  <div className="flex items-center justify-center gap-3">
                    <select
                      name=""
                      id=""
                      className="p-1 font-semibold border outline-0 text-slate-800"
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low To High Price</option>
                      <option value="high-to-low">High To Low Price</option>
                    </select>
                    <div className="flex items-start justify-center gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyle("grid")}
                        className={`p-2 ${
                          style === "grid" && "bg-slate-300"
                        } text-slate-800 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyle("list")}
                        className={`p-2 ${
                          style === "list" && "bg-slate-300"
                        } text-slate-800 hover:bg-slate-300 cursor-pointer rounded-sm`}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-8">
                  <ShopProduct style={style} />
                </div>
                <div>
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={10}
                    nextPage={nextPage}
                    showItem={Math.floor(10 / 3)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
