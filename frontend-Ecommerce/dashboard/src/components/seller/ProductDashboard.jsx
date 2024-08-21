import React, { useState } from "react";
import Search from "../shared/Search";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  return (
    <div className="px-2 pt-2 lg:px-7">
      <h1 className="mb-3 text-lg font-semibold">All Products</h1>
      <div className="w-full p-4 bg-white rounded-md">
        <Search setNextPage={setNextPage} />
      </div>
    </div>
  );
};

export default Product;
