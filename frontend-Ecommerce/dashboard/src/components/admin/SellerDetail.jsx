import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller,
  messageClear,
  seller_update_status,
} from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";

const SellerDetail = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_update_status({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-semibold mb-3">Seller Detail</h1>
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex flex-wrap w-full">
          <div className="flex items-center justify-center w-3/12 py-3">
            <div className="">
              {seller?.image ? (
                <img
                  className="w-full h-[230px] rounded-lg border  bg-[#d0ced0]"
                  src={seller.image}
                  alt=""
                />
              ) : (
                <span>Image Not Uploaded</span>
              )}
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 p-4 text-sm  bg-[#f3f1f3] rounded-md">
                <div className="flex gap-2 font-semibold">
                  <span>Name:</span>
                  <span>{seller?.name}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>Email:</span>
                  <span>{seller?.email}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>Role:</span>
                  <span>{seller?.role}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>Status:</span>
                  <span>{seller?.status}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>Payment Status:</span>
                  <span>{seller?.payment}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Other Info</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 p-4 text-sm  bg-[#f3f1f3] rounded-md">
                <div className="flex gap-2 font-semibold">
                  <span>Shop Name:</span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>City:</span>
                  <span>{seller?.shopInfo?.city}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>District:</span>
                  <span>{seller?.shopInfo?.district}</span>
                </div>
                <div className="flex gap-2 font-semibold">
                  <span>Address:</span>
                  <span>{seller?.shopInfo?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={submit}>
            <div className="flex gap-4 py-3">
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                name=""
                id=""
                required
              >
                <option value="">- Select Status -</option>
                <option value="active"> Active </option>
                <option value="deactivate"> Deactivate </option>
              </select>
              <button className="w-[170px] bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;
