import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { active_stripe_connect_account, messageClear } from "../store/Reducers/sellerReducer";
import { FadeLoader } from "react-spinners";

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.seller
  );
  const queryParams = new URLSearchParams(window.location.search); //tim kiem trong url  window.location.href = url; trong create_stripe_connect_account
  const activeCode = queryParams.get("activeCode");

  const redirect = () => {
    dispatch(messageClear());
    navigate("/");
  };

  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode));
  }, [activeCode]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src="/images/error.png" alt="" />
          <button
            onClick={redirect}
            className="px-5 py-2 text-white bg-green-600 rounded-sm"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <img src="/images/success.png" alt="" />
            <button
              onClick={redirect}
              className="px-5 py-2 text-white bg-green-700 rounded-sm"
            >
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
