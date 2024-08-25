import React, { useState } from "react";
import Search from "../shared/Search";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { TiEye } from "react-icons/ti";

const OrderDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  return (
    <div className="px-2 pt-2 lg:px-7">
      <h1 className="mb-3 text-lg font-semibold">Orders</h1>
      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setNextPage={setNextPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-sm uppercase border-b border-black">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((k, item) => (
                <tr key={item} className="border-b border-slate-300">
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    #15100
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    200.000 VND
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap "
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        to={`/seller/dashboard/order/detail/34`}
                        className="p-[6px] bg-[#37fbb0] rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
                      >
                        <TiEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end w-full mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            nextPage={nextPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDashboard;
