import React from "react";

const Search = ({setNextPage}) => {
  return (
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
  );
};

export default Search;
