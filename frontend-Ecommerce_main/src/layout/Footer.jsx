import { Link, useNavigate } from "react-router-dom";
import { RiFacebookFill } from "react-icons/ri";
import { FaGoogle, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cart_product_count, wishlist_count } = useSelector(
    (state) => state.cart
  );

  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[200px] h-[50px]"
              src="/images/logo.png"
              alt="logo"
            />
            <ul className="flex flex-col gap-2 text-slate-800">
              <li>Address: Anonymous Street In Da Nang City Maybe?</li>
              <li>Phone: 0123456789</li>
              <li>Email: alwaysSupport@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center w-full sm:justify-start sm:mt-6">
            <div>
              <h2 className="mb-2 text-lg font-bold">Useful Link</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About Our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
                  <li>
                    <Link>Our Service</Link>
                  </li>
                  <li>
                    <Link>Our Profile</Link>
                  </li>
                  <li>
                    <Link>Products</Link>
                  </li>
                  <li>
                    <Link>Collaboration</Link>
                  </li>
                  <li>
                    <Link>Help</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="flex flex-col justify-start w-full gap-5">
            <h2 className="mb-2 text-lg font-bold">Join Our Shop</h2>
            <span>
              Get Email updates about our latest products and special offers
            </span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                type="text"
                className="w-full h-full px-3 bg-transparent outline-0"
                placeholder="Enter your email"
              />
              <button className="h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex items-center justify-start gap-3">
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <RiFacebookFill />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                >
                  <FaGoogle className="w-[12px]" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-800 mx-auto py-5 text-center">
        <span>Copyright @ 2024</span>
      </div>
      <div className="fixed hidden md-lg:block w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2">
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
          <div
            onClick={() =>
              navigate(userInfo ? "/cart" : "/login")
            }
            className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e6e1e1]"
          >
            <span className="text-xl text-purple-500">
              <FaShoppingCart />
            </span>
            {cart_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute  bg-green-400 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {cart_product_count}
              </div>
            )}
          </div>

          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex items-center justify-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#7c7575]"
          >
            <span className="text-xl text-purple-500">
              <FaHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute  bg-green-400 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
