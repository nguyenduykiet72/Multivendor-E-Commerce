import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_orders } from "../../store/Reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { myOrders } = useSelector((state) => state.order);

  const [state, setState] = useState("all");

  useEffect(() => {
    dispatch(get_orders({ status: state, customerId: userInfo.id }));
  }, [state]);
  
  
  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items += order.products[i].quantity;
    }
    navigate("/payment", {
      state: { price: order.price, items, orderId: order._id },
    });
  };
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">My Orders</h2>
        <select
          className="px-3 py-1 border rounded-md outline-none text-slate-800"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--Order Status--</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
          <option value="warehouse">Warehouse</option>
        </select>
      </div>

      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-900 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3" scope="col">
                  Order Id
                </th>
                <th className="px-6 py-3" scope="col">
                  Price
                </th>
                <th className="px-6 py-3" scope="col">
                  Payment Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Order Status
                </th>
                <th className="px-6 py-3" scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) => (
                <tr className="bg-white border-b" key={i}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    #{o._id}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.price} VND
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.payment_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {o.delivery_status}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                     <Link to={`/dashboard/order/details/${o._id}`}>
                        <span className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded">
                          View
                        </span>
                      </Link>

                      {o.payment_status !== "paid" && (
                        <span
                          onClick={() => redirect(o)}
                          className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded cursor-pointer"
                        >
                          Pay Now
                        </span>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
