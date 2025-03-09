import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../shared/Search";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/orderReducer";

const OrderDashboard = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  const { myOrders, totalOrder } = useSelector((state) => state.order);

  useEffect(() => {
    const obj = {
      nextPage: parseInt(nextPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [searchValue, currentPage, nextPage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setNextPage={setNextPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative mt-2 overflow-x-auto">
          <div className="w-full text-sm text-center">
            <div className="text-sm uppercase border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="py-3 w-[15%] font-bold">Order ID</div>
                <div className="py-3 w-[13%] font-bold">Price</div>
                <div className="py-3 w-[18%] font-bold">Payment Status</div>
                <div className="py-3 w-[18%] font-bold">Order Status</div>
                <div className="py-3 w-[18%] font-bold">Action</div>
                <div className="py-3 w-[8%] font-bold">
                  <FaArrowAltCircleDown />
                </div>
              </div>
            </div>

            {myOrders.map((o, i) => (
              <div key={i}>
                <div className="flex items-start justify-between border-b border-slate-800">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap">
                    #{o._id}
                  </div>
                  <div className="py-3 w-[13%] font-medium">{o.price} VND</div>
                  <div className="py-3 w-[18%] font-medium">
                    {o.payment_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    {o.delivery_status}
                  </div>
                  <div className="py-3 w-[18%] font-medium">
                    <Link to={`/admin/dashboard/order/detail/${o._id}`}>
                      View
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(o._id)}
                    className="py-3 w-[8%] font-medium hover:text-blue-500 "
                  >
                    <FaArrowAltCircleDown />
                  </div>
                </div>

                <div
                  className={
                    show === o._id
                      ? "block border-b border-slate-700 bg-blue-300"
                      : "hidden"
                  }
                >
                  {o.subOrders.map((so, i) => (
                    <div
                      className="flex items-start justify-start border-b border-slate-700"
                      key={i}
                    >
                      <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                        #{so._id}
                      </div>
                      <div className="py-3 w-[17%] font-medium ">
                        {so.price} VND
                      </div>
                      <div className="py-3 w-[18%] font-medium">
                        {so.payment_status}
                      </div>
                      <div className="py-3 w-[22%] font-medium">
                        {so.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalOrder <= nextPage ? (
          ""
        ) : (
          <div className="flex justify-end w-full mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              nextPage={nextPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDashboard;
