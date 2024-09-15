import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { overrideStyle } from "../../utils/util";

const AdminLogin = () => {
  const navigate = useNavigate();
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
    dispatch(admin_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-h-screen min-w-screen bg-[#ffffff] flex justify-center items-center">
      <div className="w-[400px] text-[#ffffff] p-2">
        <div className="p-6 bg-white border rounded-md border-slate-300">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/images/logo.jpg"
                alt="image"
              />
            </div>
          </div>
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
                autoComplete="email"
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

            {/* <div className="flex items-center w-full gap-3 mb-3">
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
            </div> */}

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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
