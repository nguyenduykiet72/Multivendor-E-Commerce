import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller_order_detail,
  messageClear,
  update_seller_order_status,
} from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  useEffect(() => {
    dispatch(get_seller_order_detail(orderId));
  }, [orderId]);

  const status_update = (e) => {
    dispatch(
      update_seller_order_status({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
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
  }, [errorMessage, successMessage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl ">Order Detail</h2>
          <select
            value={status}
            onChange={status_update}
            name=""
            id=""
            className="px-4 py-2 outline-none focus:border-blue-500 bg-[#51a8ff] border border-white rounded-md text-sm text-white"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="warehouse">Warehouse</option>
            <option value="placed">Placed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg">
            <h2>#{order._id}</h2>
            <span>{order.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver to: {order.shippingInfo}
                  </h2>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <h2>Payment Status:</h2>
                  <span className="text-base">{order.payment_status}</span>
                </div>
                <span>Price: {order.price} VND</span>

                {order?.products?.map((op, i) => (
                  <div
                    className="flex flex-col gap-4 mt-4 bg-[#efe995] rounded-md"
                    key={i}
                  >
                    <div className="flex gap-3 m-2 text-md">
                      <img
                        className="w-[70px] h-[80px] border-black border"
                        src={op.images[0]}
                        alt=""
                      />
                      <div>
                        <h2 className="">Name: {op.name}</h2>
                        <p>
                          <span>Brand:</span>
                          <span> {op.brand}</span>
                        </p>
                        <span className="text-lg">Quantity: {op.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
