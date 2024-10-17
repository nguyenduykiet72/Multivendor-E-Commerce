import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TiEye } from "react-icons/ti";
import Search from "./../shared/Search";
import { useDispatch, useSelector } from "react-redux";
import { get_deactivate_sellers } from "../../store/Reducers/sellerReducer";

const DeactivateSeller = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);

  const { sellers, totalSeller } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      nextPage: parseInt(nextPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_deactivate_sellers(obj));
  }, [searchValue, currentPage, nextPage]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3">Inactivated Sellers</h1>

      <div className="w-full p-4 bg-white rounded-md">
        <Search
          setNextPage={setNextPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

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
              {sellers.map((s, i) => (
                <tr key={i} className="border-b border-slate-300">
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    {s.name}
                  </td>
                  <td
                    scope="row"
                    className="flex items-center justify-center px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={s.image}
                      alt=""
                    />
                  </td>

                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                   {s.email}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                     {s.payment}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap"
                  >
                     {s.status}
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-[6.7px] font-medium whitespace-nowrap "
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Link to={`/admin/dashboard/seller/detail/${s._id}`} className="p-[6px] bg-[#37fbb0] rounded hover:shadow-lg hover:shadow-green-500/50 text-white">
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
