import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const ProductDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="flex items-center justify-between p-4 mb-5 bg-white rounded-md lg:hidden">
        <h1 className="text-lg font-semibold">Product</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-[#fc334d] shadow-lg  hover:shadow-red-500/50 px-4 py-2 cursor-pointer rounded-sm font-semibold"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12 ">
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
                        className="px-4 py-[6.5px] font-medium whitespace-nowrap "
                      >
                        <div className="flex items-center justify-center gap-4">
                          <Link className="p-[6px] bg-[#51a8ff] rounded hover:shadow-lg hover:shadow-blue-500/50 text-white">
                            <FaEdit />
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
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[100] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5 ">
            <div className="h-screen px-3 py-2 bg-white lg:h-auto lg:rounded-md">
              <div className="flex items-center justify-between mb-4 ">
                <h1 className="w-full mb-4 text-xl font-semibold text-center">
                  Add Product
                </h1>

                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoCloseCircle />
                </div>
              </div>

              <form action="">
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Product Name</label>
                  <input
                    className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                    type="text"
                    id="name"
                    name="product_name"
                    placeholder="Product Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-[238px] cursor-pointer  border-blue-400 border focus:border-blue-600 w-full "
                  >
                    <span>
                      <FaImage />
                    </span>
                    <span className="pt-2 text-sm">Select Image</span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div>
                    <button className="w-full bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 my-2 text-white">
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
