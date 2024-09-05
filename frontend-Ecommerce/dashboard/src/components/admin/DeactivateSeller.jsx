import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TiEye } from "react-icons/ti";
import Search from "./../shared/Search";

const DeactivateSeller = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3">Inactivated Sellers</h1>

      <div className="w-full p-4 bg-white rounded-md">
        <Search setNextPage={setNextPage} />

        <div className="relative mt-2 overflow-x-auto">
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
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>

                <th scope="col" className="px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((k, index) => (
                <tr key={index} className="border-b border-slate-300">
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
                      src={`/images/category/${k}.jpg`}
                      alt=""
                    />
                  </td>

                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    mrrobot@anonymously.com
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
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap "
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Link className="p-[6px] bg-[#37fbb0] rounded hover:shadow-lg hover:shadow-green-500/50 text-white">
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

export default DeactivateSeller;
