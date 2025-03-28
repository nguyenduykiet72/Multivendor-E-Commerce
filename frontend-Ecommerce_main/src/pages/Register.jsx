import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { RiFacebookFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage,userInfo } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if(userInfo){
      navigate('/')
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      {loader && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Header />
      <div className="mt-4 bg-slate-200">
        <div className="items-center justify-center w-full p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="w-full text-xl font-bold text-center text-slate-800">
                Register
              </h2>

              <div>
                <form onSubmit={register} className="text-slate-800">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      required
                    />
                  </div>

                  <button className="w-full px-8 py-2 bg-[#059473] text-white shadow-sm hover:shadow-green-500 rounded-md">
                    Register
                  </button>
                </form>
                <div className="flex items-center justify-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">Or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                </div>
                <button className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-indigo-500 rounded-md shadow hover:shadow-indigo-500/50">
                  <span>
                    <RiFacebookFill />
                  </span>
                  <span>Login With Facebook</span>
                </button>
                <button className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-red-500 rounded-md shadow hover:shadow-red-500/50">
                  <span>
                    <FaGoogle />
                  </span>
                  <span>Login With Google</span>
                </button>
              </div>
              <div className="pt-1 text-center text-slate-800">
                <p>
                  Already Have An Account?{" "}
                  <Link className="text-blue-500" to="/login">
                    Login
                  </Link>
                </p>
              </div>
              <a target="_blank" href="http://localhost:3001/login">
                <div className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-[#02e3e0] rounded-md shadow hover:shadow-red-500/50">
                  Login As Seller
                </div>
              </a>
              <a target="_blank" href="http://localhost:3001/register">
                <div className="flex items-center justify-center w-full gap-2 px-8 py-2 mb-3 text-white bg-[#ad2cc4] rounded-md shadow hover:shadow-red-500/50">
                  Register As Seller
                </div>
              </a>
            </div>
            <div className="w-full h-full py-4 pr-4">
              <img className="h-[430px] mt-5" src="/images/login.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
