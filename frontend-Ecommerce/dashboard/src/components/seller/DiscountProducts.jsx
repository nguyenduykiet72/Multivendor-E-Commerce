import React, { useState } from "react";
import Search from "../shared/Search";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TiEye } from "react-icons/ti";

const DiscountProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  return (
    <div className="px-2 pt-2 lg:px-7">
      <h1 className="mb-3 text-lg font-semibold">Discount Products</h1>
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
                  No
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Image
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Brand
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Discount
                </th>
                <th scope="col" className="px-4 py-3">
                  Quantity
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
                    {k}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    Clothes
                  </td>
                  <td
                    scope="row"
                    className="flex items-center justify-center px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={`/images/category/${k}.jpg`}
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    Book
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    Mr.Robot
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
                    10%
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                  >
                    20
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.5px] font-medium whitespace-nowrap "
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Link className="p-[6px] bg-[#51a8ff] rounded hover:shadow-lg hover:shadow-blue-500/50 text-white">
                        <FaEdit />
                      </Link>
                      <Link className="p-[6px] bg-[#37fbb0] rounded hover:shadow-lg hover:shadow-green-500/50 text-white">
                        <TiEye />
                      </Link>
                      <Link className="p-[6px] bg-[#fc334d] rounded hover:shadow-lg hover:shadow-red-500/50 text-white">
                        <BiSolidTrashAlt />
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

export default DiscountProducts;
