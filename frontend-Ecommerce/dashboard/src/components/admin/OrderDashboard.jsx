import React, { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../shared/Search";

const OrderDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <Search setNextPage={setNextPage} />

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

            <div>
              <div className="flex items-start justify-between border-b border-slate-700">
                <div className="py-3 w-[15%] font-medium whitespace-nowrap">
                  #15100
                </div>
                <div className="py-3 w-[13%] font-medium">400.000 VND</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-medium hover:text-blue-500 "
                >
                  <FaArrowAltCircleDown />
                </div>
              </div>

              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-blue-300"
                    : "hidden"
                }
              >
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #15101
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>

                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #15102
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between border-b border-slate-700">
                <div className="py-3 w-[15%] font-medium whitespace-nowrap">
                  #16100
                </div>
                <div className="py-3 w-[13%] font-medium">400.000 VND</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-medium hover:text-blue-500 "
                >
                  <FaArrowAltCircleDown />
                </div>
              </div>

              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-blue-300"
                    : "hidden"
                }
              >
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #16101
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>

                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #16102
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between border-b border-slate-700">
                <div className="py-3 w-[15%] font-medium whitespace-nowrap">
                  #17100
                </div>
                <div className="py-3 w-[13%] font-medium">400.000 VND</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link to="/admin/dashboard/order/detail/3">View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-medium hover:text-blue-500 "
                >
                  <FaArrowAltCircleDown />
                </div>
              </div>

              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-blue-300"
                    : "hidden"
                }
              >
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #17101
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>

                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #17102
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start justify-between border-b border-slate-700">
                <div className="py-3 w-[15%] font-medium whitespace-nowrap">
                  #18100
                </div>
                <div className="py-3 w-[13%] font-medium">400.000 VND</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">Pending</div>
                <div className="py-3 w-[18%] font-medium">
                  <Link>View</Link>
                </div>
                <div
                  onClick={(e) => setShow(!show)}
                  className="py-3 w-[8%] font-medium hover:text-blue-500 "
                >
                  <FaArrowAltCircleDown />
                </div>
              </div>

              <div
                className={
                  show
                    ? "block border-b border-slate-700 bg-blue-300"
                    : "hidden"
                }
              >
                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #18101
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>

                <div className="flex items-start justify-start border-b border-slate-700">
                  <div className="py-3 w-[15%] font-medium whitespace-nowrap pl-3">
                    #18102
                  </div>
                  <div className="py-3 w-[17%] font-medium ">125.000 VND</div>
                  <div className="py-3 w-[18%] font-medium">Pending</div>
                  <div className="py-3 w-[22%] font-medium">Pending</div>
                </div>
              </div>
            </div>
          </div>
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
