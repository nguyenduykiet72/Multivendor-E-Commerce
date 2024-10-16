import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { get_detail_order } from "../../store/Reducers/orderReducer";

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { detailOrder } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_detail_order(orderId));
  }, [orderId]);

  return (
    <div className="p-5 bg-white">
      <h2 className="font-semibold text-slate-800">
        #{detailOrder._id}, <span className="pl-1">{detailOrder.date}</span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-sans font-semibold text-slate-800">
            Deliver To: {detailOrder.shippingInfo?.name}
          </h2>
          <p>
            <span className="px-2 py-2 mr-2 text-xs font-medium text-blue-800 bg-blue-100 rounded">
              Home
            </span>
            <span className="text-sm text-slate-800">
              {detailOrder.shippingInfo?.address}{" "}
              {detailOrder.shippingInfo?.province}{" "}
              {detailOrder.shippingInfo?.city} {detailOrder.shippingInfo?.phone}
            </span>
          </p>
          <p className="font-semibold text-slate-800 text-md">
            Email To: {userInfo.email}
          </p>
        </div>
        <div className="text-slate-600">
          <h2 className="font-mono">
            Price: {detailOrder.price} VND (Included Shipping)
          </h2>
          <p className="font-mono">
            Payment Status:
            <span
              className={`py-[1px] text-xs px-3 ${
                detailOrder.payment_status === "paid"
                  ? "bg-[#4fe1ae] text-white"
                  : "bg-[#f74343] text-white"
              } rounded-md`}
            >
              {detailOrder.payment_status}
            </span>
          </p>
          <p className="font-mono">
            Order Status:
            <span
              className={`py-[1px] text-xs px-3 ${
                detailOrder.delivery_status === "paid"
                  ? "bg-[#4fe1ae] text-white"
                  : "bg-[#f74343] text-white"
              } rounded-md`}
            >
              {detailOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="pb-2 font-sans text-lg font-bold text-font-bold">
          Order Products
        </h2>
        <div className="flex flex-col gap-5">
          {detailOrder.products?.map((p, i) => (
            <div key={i}>
              <div className="flex items-center justify-start gap-5 text-slate-800">
                <div className="flex gap-2">
                  <img className="w-[55px] h-[55px]" src={p.images[0]} alt="" />
                  <div className="flex flex-col items-center justify-start text-sm">
                    <Link>{p.name}</Link>
                    <p><span>Brand: {p.brand}</span></p>
                    <p><span>Quantity: {p.quantity}</span></p>
                  </div>
                </div>
                
                <div className="flex flex-col pl-4">
                    <h2 className="text-green-800 text-md">{p.price - Math.floor((p.price * p.discount) / 100)} VND</h2>
                    <p className="line-through">{p.price}</p>
                    <p>-{p.discount}%</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
