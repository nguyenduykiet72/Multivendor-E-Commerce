import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { RiFacebookFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
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
    console.log(state);
  };

  return (
    <div>
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
