import React, { useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [state, setState] = useState("all");

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
                <tr className="bg-white border-b">
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#251</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">300000 VND</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">Pending</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">Pending</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        <Link>
                            <span className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded">View</span>
                        </Link>
                        <Link>
                            <span className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded">Pay Now</span>
                        </Link>
                    </td>
                </tr>
                <tr className="bg-white border-b">
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">#255</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">250000 VND</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">Pending</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">Pending</td>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        <Link>
                            <span className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded">View</span>
                        </Link>
                        <Link>
                            <span className="px-3 mr-2 font-semibold text-green-800 bg-green-200 text-md py-[2px] rounded">Pay Now</span>
                        </Link>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          
    </div>


    </div>
  );
};

export default Orders;
