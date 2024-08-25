import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const EditProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Sports",
    },
    {
      id: 2,
      name: "T-shirt",
    },
    {
      id: 3,
      name: "Phone",
    },
    {
      id: 4,
      name: "Computer",
    },
    {
      id: 5,
      name: "Watch",
    },
    {
      id: 6,
      name: "Pants",
    },
  ];
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
  const [allCategory, setAllCategory] = useState(categories);
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

  const changeImage = (img, files) => {
    if (files.length > 0) {
      console.log(img);
      console.log(files[0]);
    }
  };

  useEffect(() => {
    setState({
      name: "Street Wear T-shirt",
      description: "Street Wear for everyone in the world",
      discount: 10,
      price: 200.0,
      brand: "Mr.Robot",
      quantity: 20,
    });
    setCategory("T-shirt");
    setImageShow([
      "/images/category/1.jpg",
      "/images/category/2.jpg",
      "/images/category/3.jpg",
    ]);
  }, []);

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-xl font-semibold">Edit Product</h1>
          <Link
            to="/seller/dashboard/products"
            className="py-2 my-2 text-white bg-blue-500 rounded-sm hover:shadow-blue-500/50 hover:shadow-sm px-7"
          >
            All Product
          </Link>
        </div>
        <div>
          <form>
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
                        key={c.id}
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
                <div>
                  <label htmlFor={i}>
                    <img src={img} alt="" />
                  </label>
                  <input
                    onChange={(e) => changeImage(img, e.target.files)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
            <div className="flex">
              <button className=" bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 my-2 text-white">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
