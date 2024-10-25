import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/Reducers/categoryReducer";
import {
  add_product,
  messageClear,
} from "./../../store/Reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/util";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getCategory({ searchValue: "", nextPage: "", page: "" }));
  }, []);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    quantity: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [categoryShow, setCategoryShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let searchValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchValue);
    } else {
      setAllCategory(categories);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        quantity: "",
      });
      setImageShow([]);
      setImages([]);
      setCategory("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImage = images;
      tempImage[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImage]);
    }
  };

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("quantity", state.quantity);
    formData.append("shopName", "Kisero");
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(add_product(formData));
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-xl font-semibold">Add Product</h1>
          <Link
            to="/seller/dashboard/products"
            className="py-2 my-2 text-white bg-blue-500 rounded-sm hover:shadow-blue-500/50 hover:shadow-sm px-7"
          >
            All Product
          </Link>
        </div>
        <div>
          <form onSubmit={add}>
            <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand Name"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
              <div className="relative flex flex-col w-full gap-1">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCategoryShow(!categoryShow)}
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--Select Category--"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
                <div
                  className={`absolute top-[101%] bg-[#faf8f8] w-full transition-all ${
                    categoryShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="fixed w-full px-4 py-2">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      type="text"
                      placeholder="Search"
                      className="px-3 py-1 overflow-hidden text-black bg-transparent border border-blue-400 rounded-md outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex flex-col items-start justify-start h-[250px]">
                    {allCategory.map((c, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white w-full ${
                          category === c.name && "bg-blue-500"
                        }`}
                        onClick={() => {
                          setCategoryShow(false);
                          setCategory(c.name);
                          setSearchValue("");
                          setAllCategory(categories);
                        }}
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="quantity">Product Quantity</label>
                <input
                  min={0}
                  onChange={inputHandle}
                  value={state.quantity}
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="quantity"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 mb-3 md:flex-row">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  min={0}
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  min={0}
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount by %"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={inputHandle}
                value={state.description}
                name="description"
                id="description"
                placeholder="Description"
                className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                cols="10"
                rows="4"
              ></textarea>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 mb-4 lg:gird-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4">
              {imageShow.map((img, i) => (
                <div className="h-[250px] relative" key={i}>
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    type="file"
                    id={i}
                    className="hidden"
                    onChange={(e) => changeImage(e.target.files[0], i)}
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="absolute z-10 p-2 text-white bg-[#2a2828] rounded-full cursor-pointer hover:shadow-md hover:shadow-slate-400 top-1 right-1"
                  >
                    <IoCloseCircle />
                  </span>
                </div>
              ))}

              <label
                className="flex flex-col items-center justify-center h-[180px] cursor-pointer border border-blue-400 border-dashed hover:border-blue-600 w-full"
                htmlFor="image"
              >
                <span>
                  <FaImage />
                </span>
                <span>Select Image</span>
              </label>
              <input
                type="file"
                multiple
                id="image"
                className="hidden"
                onChange={imageHandle}
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="w-[280px] py-2 mb-3 text-white bg-red-500 rounded-md hover:shadow-red-300/50 hover:shadow-lg px-7"
              >
                {loader ? (
                  <PropagateLoader cssOverride={overrideStyle} color="white" />
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
