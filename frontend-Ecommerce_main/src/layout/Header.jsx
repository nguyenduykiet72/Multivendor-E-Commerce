import { IoIosMail, IoIosArrowDown } from "react-icons/io";
import { FaPhone, FaHeart } from "react-icons/fa6";
import { RiFacebookFill, RiLoginBoxFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaList, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.home);
  const { pathname } = useLocation();
  const [showSideBar, setShowSideBar] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const user = false;
  const wishlist_count = 4;

  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&value=${searchValue}`);
  }

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex items-center justify-between w-full h-[50px] text-slate-500">
            <ul className="flex items-center justify-start gap-8 font-semibold text-black">
              <li className="relative flex items-center justify-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <IoIosMail />
                </span>
                <span>alwaysSupport@gmail.com</span>
              </li>
              <li className="relative flex items-center justify-center gap-2 text-sm ">
                <span>
                  <FaPhone />
                </span>
                <span>0123456789</span>
              </li>
            </ul>

            <div>
              <div className="flex items-center justify-center gap-10">
                <div className="flex items-center justify-center gap-4 text-black">
                  <a href="#">
                    <RiFacebookFill />
                  </a>
                  <a href="#">
                    <FaGoogle className="w-[12px]" />
                  </a>
                </div>

                <div className="relative flex items-center justify-center gap-1 text-sm cursor-auto group text-slate-800 after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src="/images/vietnam.png" alt="" />
                  <span>
                    <IoIosArrowDown />
                  </span>
                  <ul className="absolute invisible p-2 text-white transition-all duration-200 rounded-sm w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 top-12">
                    <li>Vietnamese</li>
                    <li>English</li>
                  </ul>
                </div>

                {user ? (
                  <Link
                    className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>Elliot Nguyen</span>
                  </Link>
                ) : (
                  <Link 
                    className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                    to="/login"
                  >
                    <span>
                      <RiLoginBoxFill />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="w-3/12 md-lg:pt-4 md-lg:w-full">
              <div className="flex items-center justify-between">
                <Link to="/">
                  <img src="/images/logo.png" alt="" />
                </Link>
                <div
                  onClick={() => setShowSideBar(false)}
                  className="items-center justify-center w-[30px] h-[30px] bg-white text-slate-800 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-9/12 md:lg:w-full ">
              <div className="flex flex-wrap items-center justify-between pl-8 md-lg:justify-between">
                <ul className="flex items-start justify-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#059473]" : "text-slate-800"
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shops"
                          ? "text-[#059473]"
                          : "text-slate-800"
                      }`}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#059473]"
                          : "text-slate-800"
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#059473]"
                          : "text-slate-800"
                      }`}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#059473]"
                          : "text-slate-800"
                      }`}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>

                <div className="flex items-center justify-center gap-5 md-lg:hidden">
                  <div className="flex justify-center gap-5">
                    <div className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2] ">
                      <span className="text-xl text-green-500">
                        <FaHeart />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlist_count}
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2] ">
                      <span className="text-xl text-green-500">
                        <FaShoppingCart />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlist_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block">
        <div
          onClick={() => setShowSideBar(true)}
          className={`fixed duration-200 transition-all ${
            showSideBar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgb(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSideBar ? "-left-[300px]" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex flex-col justify-start gap-6">
            <Link to="/">
              <img className="pr-4" src="/images/logo.png" alt="" />
            </Link>
            <div className="flex items-center justify-start gap-10">
              {user ? (
                <Link
                  className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>Elliot Nguyen</span>
                </Link>
              ) : (
                <Link
                  className="flex items-center justify-center gap-2 text-sm text-black cursor-pointer"
                  to="/login"
                >
                  <span>
                    <RiLoginBoxFill />
                  </span>
                  <span>Login</span>
                </Link>
              )}

              <div className="relative flex items-center justify-center gap-1 text-sm cursor-auto group text-slate-800 after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute">
                <img src="/images/vietnam.png" alt="" />
                <span>
                  <IoIosArrowDown />
                </span>
                <ul className="absolute invisible p-2 text-white transition-all duration-200 rounded-sm w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10 top-12">
                  <li>Vietnamese</li>
                  <li>English</li>
                </ul>
              </div>
            </div>

            <ul className="flex flex-col items-start justify-start text-sm font-bold uppercase">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#059473]" : "text-slate-800"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shops"
                  className={`py-2 block ${
                    pathname === "/shops" ? "text-[#059473]" : "text-slate-800"
                  }`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#059473]" : "text-slate-800"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#059473]" : "text-slate-800"
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#059473]"
                      : "text-slate-800"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-start gap-4 text-black">
              <a href="#">
                <RiFacebookFill />
              </a>
              <a href="#">
                <FaGoogle className="w-[12px]" />
              </a>
            </div>

            <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <FaPhone />
                </span>
              </div>
              <div className="flex flex-col justify-end gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  0123456789
                </h2>
                <span className="text-sx">Support 24/7</span>
              </div>
            </div>

            <ul className="flex flex-col items-start justify-start gap-3 text-[#1c1c1c]">
              <li className="flex items-center justify-start gap-2 text-sm">
                <span>
                  <IoIosMail />
                </span>
                <span>alwaysSupport@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex flex-wrap w-full md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="relative bg-white">
              <div
                onClick={() => setShowCategory(!showCategory)}
                className="h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className="pt-1">
                  <IoIosArrowDown />
                </span>
              </div>
              <div
                className={`${
                  showCategory ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all absolute md-lg:relative duration-500 z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className="py-2 font-medium text-slate-800">
                  {categories.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex items-center justify-start gap-2 px-[24px] py-[6px]"
                      >
                        <img src={c.image} alt="" className="w-[30px] h-[30px] rounded-full overflow-hidden"/>
                        <Link to={`/products?category=${c.name}`} className="block text-sm">{c.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap items-center justify-between w-full md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full">
                <div className="flex border h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-[150px] text-slate-800 font-semibold bg-transparent px-2 h-full border-none outline-0"
                      name=""
                      id=""
                    >
                      <option value="">Select Category</option>
                      {categories.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="relative w-full h-full px-3 bg-transparent text-slate-500 outline-0"
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="Search Something"
                  />
                  <button onClick={search} className="bg-[#059473] right-0 absolute px-8 h-full font-semibold uppercase text-white">
                    Search
                  </button>
                </div>
              </div>

              <div className="block w-4/12 pl-2 md-lg:hidden md-lg:w-full md-lg:pl-0">
                <div className="flex items-center justify-end w-full gap-3 md-lg:justify-start">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                    <span>
                      <FaPhone />
                    </span>
                  </div>
                  <div className="flex flex-col justify-end gap-1">
                    <h2 className="font-medium text-md text-slate-700">
                      0123456789
                    </h2>
                    <span className="text-sm">Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
