import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/util";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, seller_login } from "../../store/Reducers/authReducer";

const Login = () => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
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
  }, [successMessage, errorMessage]);

  return (
    <div className="min-h-screen min-w-screen bg-[#ffffff] flex justify-center items-center">
      <div className="w-[400px] text-[#ffffff] p-2">
        <div className="p-6 bg-white border rounded-md border-slate-300">
          <h2 className="mb-3 text-xl font-bold text-black">
            Xin Chào Mừng Bạn!
          </h2>
          <p className="mb-3 text-sm font-medium text-black">
            Vui lòng đăng nhập
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3 text-black">
              <label htmlFor="email">Nhập Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-400"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3 text-black">
              <label htmlFor="password">Nhập Mật Khẩu</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 bg-transparent border rounded-md outline-none border-slate-400"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 overflow-hidden text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label
                className="text-sm leading-none text-black"
                htmlFor="checkbox"
              >
                Tôi đồng ý với điều khoản và chính sách
              </label>
            </div>

            <button
              disabled={loader ? true : false}
              className="w-full py-2 mb-3 text-white bg-black rounded-md hover:shadow-black-300/50 hover:shadow-lg px-7"
            >
              {loader ? (
                <PropagateLoader cssOverride={overrideStyle} color="white" />
              ) : (
                "Đăng Nhập"
              )}
            </button>

            <div className="flex items-center justify-center gap-3 mb-3 text-black">
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link className="font-bold text-red-500" to="/register">
                  Đăng Ký
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center w-full mb-3">
              <div className="flex items-center w-full">
                <div className="flex-grow bg-slate-700 h-[1px]"></div>
                <span className="px-2 text-slate-700">Hoặc</span>
                <div className="flex-grow bg-slate-700 h-[1px]"></div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
