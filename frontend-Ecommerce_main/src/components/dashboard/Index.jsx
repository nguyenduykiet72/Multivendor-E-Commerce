import React, { useEffect } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { get_dashboard_index_data } from "../../store/Reducers/dashboardReducer";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { recentOrder, totalOrder, pendingOrder, canceledOrder } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);

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
    <div>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-1">
        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <BiSolidShoppingBag />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-800">
            <h2 className="text-3xl font-bold">{totalOrder}</h2>
            <span>Orders</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <BiSolidShoppingBag />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-800">
            <h2 className="text-3xl font-bold">{pendingOrder}</h2>
            <span>Pending Orders</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 p-5 bg-white rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-800">
              <BiSolidShoppingBag />
            </span>
          </div>
          <div className="flex flex-col items-start justify-start text-slate-800">
            <h2 className="text-3xl font-bold">{canceledOrder}</h2>
            <span>Canceled Orders</span>
          </div>
        </div>  
      </div>

      <div className="p-5 mt-5 bg-white rounded-md">
        <h2>Recent Orders</h2>
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
                {recentOrder.map((o, i) => (
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
    </div>
  );
};

export default Index;
