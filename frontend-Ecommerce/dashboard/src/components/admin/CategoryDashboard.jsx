import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import Search from "../shared/Search";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/util";
import {
  categoryAdd,
  messageClear,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CategoryDashboard = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categories } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [nextPage, setNextPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImageShow] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const addOrUpdateCategory = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateCategory({ id: editId, ...state }));
    } else {
      dispatch(categoryAdd(state));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        image: "",
      });
      setImageShow("");
      setIsEdit(false);
      setEditId(null);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    const obj = {
      nextPage: parseInt(nextPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getCategory(obj));
  }, [searchValue, currentPage, nextPage]);

  //edit button
  const handleEdit = (category) => {
    setState({
      name: category.name,
      image: category.image,
    });
    setImageShow(category.image);
    setEditId(category._id);
    setIsEdit(true);
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      console.log('id:::',id)
      dispatch(deleteCategory(id));
    } 
  };

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="flex items-center justify-between p-4 mb-5 bg-white rounded-md lg:hidden">
        <h1 className="text-lg font-semibold">Category</h1>
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
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((k, item) => (
                    <tr key={item} className="border-b border-slate-300">
                      <td
                        scope="row"
                        className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                      >
                        {item + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-4 py-[6.5px] font-medium whitespace-nowrap"
                      >
                        {k.name}
                      </td>
                      <td
                        scope="row"
                        className="flex items-center justify-center px-4 py-[6.5px] font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={k.image}
                          alt=""
                        />
                      </td>

                      <td
                        scope="row"
                        className="px-4 py-[6.5px] font-medium whitespace-nowrap "
                      >
                        <div className="flex items-center justify-center gap-4">
                          <Link
                            onClick={() => handleEdit(k)}
                            className="p-[6px] bg-[#51a8ff] rounded hover:shadow-lg hover:shadow-blue-500/50 text-white"
                          >
                            <FaEdit />
                          </Link>
                          <Link
                            onClick={() => handleDelete(k._id)}
                            className="p-[6px] bg-[#fc334d] rounded hover:shadow-lg hover:shadow-red-500/50 text-white"
                          >
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
                  {isEdit ? "Edit Category" : "Add Category"}
                </h1>

                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoCloseCircle />
                </div>
              </div>

              <form onSubmit={addOrUpdateCategory}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center h-[238px] cursor-pointer  border-blue-400 border focus:border-blue-600 w-full "
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} alt="" />
                    ) : (
                      <>
                        <span>
                          <FaImage />
                        </span>
                        <span className="pt-2 text-sm">Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div className="mt-4">
                    <button
                      disabled={loader ? true : false}
                      className="w-full py-2 mb-3 text-white bg-red-500 rounded-md hover:shadow-red-300/50 hover:shadow-lg px-7"
                    >
                      {loader ? (
                        <PropagateLoader
                          cssOverride={overrideStyle}
                          color="white"
                        />
                      ) : isEdit ? (
                        "Update Category"
                      ) : (
                        "Add Category"
                      )}
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

export default CategoryDashboard;
