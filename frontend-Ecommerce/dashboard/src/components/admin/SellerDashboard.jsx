import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TiEye } from "react-icons/ti";

const SellerDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between">
          <select
            onChange={(e) => setNextPage(parseInt(e.target.value))}
            className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
            name=""
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
            type="text"
            placeholder="search"
          />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-sm uppercase border-b border-black">
              <tr>
                <th scope="col" className="px-4 py-3">
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Image
                </th>
                <th scope="col" className="px-4 py-3">
                  Shop Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  City
                </th>
                <th scope="col" className="px-4 py-3">
                  Address
                </th>
                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((k, index) => (
                <tr key={index}>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    {k}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    Elliot
                  </td>
                  <td
                    scope="row"
                    className="flex items-center justify-center px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={`../../../public/images/category/${k}.jpg`}
                      alt=""
                    />
                  </td>

                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    Mr.Robot
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    mrrobot@unknown.gmail
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    Da Nang
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    122/12 Something
                  </td>

                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap "
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Link className="p-[6px] bg-[#37fbb0] rounded hover:shadow-lg hover:shadow-green-500/50 text-black">
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

export default SellerDashboard;
