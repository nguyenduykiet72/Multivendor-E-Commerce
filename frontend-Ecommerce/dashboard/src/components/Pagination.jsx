import React from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  nextPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / nextPage);
  let startPage = pageNumber;
  let dif = totalPage - pageNumber;
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }
  const createButton = () => {
    const buttons = [];
    for (let i = startPage; i < endPage; i++) {
      buttons.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-red-500 shadow-lg shadow-red-300/50"
              : "bg-[#ff9090] hover:bg-red-400 shadow-lg hover:shadow-red-500/50 hover:text-white"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return buttons;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#ff9090] cursor-pointer"
        >
          <MdArrowBack />
        </li>
      )}

      {createButton()}

      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-[#ff9090] cursor-pointer "
        >
          <MdArrowForward />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
