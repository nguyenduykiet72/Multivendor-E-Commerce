import { IoIosMail, IoIosArrowDown } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { RiFacebookFill, RiLoginBoxFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = () => {
  const user = true;

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
                <span>hoTro@gmail.com</span>
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
                    <FcGoogle />
                  </a>
                </div>

                <div className="relative flex items-center justify-center gap-1 text-sm cursor-auto group text-slate-800 after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src="/public/images/vietnam.png" alt="" />
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
    </div>
  );
};

export default Header;
