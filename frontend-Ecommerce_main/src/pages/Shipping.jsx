import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/Reducers/orderReducer";

const Shipping = () => {
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation(); 
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [response, setResponse] = useState(false);
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveForm = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setResponse(true);
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Shipping Page</h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <IoIosArrowForward />
                </span>
                <span>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="flex flex-wrap w-full">
            <div className="w-[67%] md-lg:w-full">
              <div className="flex flex-col gap-3">
                <div className="p-6 bg-white rounded-md shadow-sm">
                  <h2 className="pb-3 font-bold text-slate-800">
                    Shipping Information
                  </h2>
                  {!response && (
                    <>
                      <form onSubmit={saveForm}>
                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-800">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="name">Name</label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="name"
                              id="name"
                              placeholder="Enter Your Name"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="address">Address</label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="address"
                              id="address"
                              placeholder="Enter Your Address"
                            />
                          </div>
                        </div>

                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-800">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="phone">Phone</label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder="Enter Your Phone"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="post">Post</label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="post"
                              id="post"
                              placeholder="Enter Your Post"
                            />
                          </div>
                        </div>

                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-800">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="province">Province</label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="province"
                              id="province"
                              placeholder="Enter Your Province"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="city">City</label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="city"
                              id="city"
                              placeholder="Enter Your City"
                            />
                          </div>
                        </div>

                        <div className="flex w-full gap-5 md:flex-col md:gap-2 text-slate-800">
                          <div className="flex flex-col w-full gap-1 mb-2">
                            <label htmlFor="area">Area</label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              className="w-full px-3 py-2 border rounded-md outline-none border-slate-200 focus:border-green-500"
                              type="text"
                              name="area"
                              id="area"
                              placeholder="Enter Your Area"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1 mb-2 mt-7">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-green-300/20 hover:shadow-lg bg-green-500 text-white">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {response && (
                    <div className="flex flex-col gap-1">
                      <h2 className="pb-2 font-semibold text-slate-800">
                        Delivery To {state.name}
                      </h2>
                      <p>
                        <span className="px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-200 rounded">
                          Home
                        </span>
                        <span>
                          {state.address}, {state.province}, {state.city},{" "}
                          {state.area}
                        </span>
                        <span
                          onClick={() => setResponse(false)}
                          className="ml-2 text-indigo-500 cursor-pointer"
                        >
                          Change
                        </span>
                      </p>
                      <p className="text-sm text-slate-800">
                        Email To Elliot@gmail.com
                      </p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div className="flex flex-col gap-2 p-4 bg-white" key={i}>
                    <div className="flex items-center justify-start">
                      <h2 className="font-bold text-md text-slate-800">
                        {p.shopName}
                      </h2>
                    </div>
                    {p.products.map((pt, i) => (
                      <div className="flex flex-wrap w-full" key={i}>
                        <div className="flex w-7/12 gap-2 sm:w-full">
                          <div className="flex items-center justify-center gap-2">
                            <img
                              src={pt.productInfo.images[0]}
                              alt=""
                              className="h-[80px] w-[80px] "
                            />
                            <div className="pr-4 text-slate-800">
                              <h2 className="font-semibold text-md">
                                {pt.productInfo.name}
                              </h2>
                              <span>Brand: {pt.productInfo.brand}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                          <div className="pl-4 sm:pl-0">
                            <h2 className="text-lg text-orange-500">
                              {pt.productInfo.price -
                                Math.floor(
                                  (pt.productInfo.price *
                                    pt.productInfo.discount) /
                                    100
                                )}{" "}
                              VND
                            </h2>
                            <p className="line-through">
                              {pt.productInfo.price} VND
                            </p>
                            <p className="flex items-center justify-center">
                              -{pt.productInfo.discount}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="flex flex-col gap-3 p-3 bg-white text-slate-800">
                  <h2 className="font-bold text-md">Order Summary</h2>
                  <div className="flex items-center justify-between">
                    <span> Items Total ({items})</span>
                    <span className="font-semibold">{price} VND</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">{shipping_fee} VND</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Payment</span>
                    <span className="font-semibold">
                      {price + shipping_fee} VND
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span className="text-lg text-[#059473] font-semibold">
                      {price + shipping_fee} VND
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={response ? false : true}
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/30 hover:shadow-lg ${
                      response ? "bg-[#fc334d]" : "bg-red-300"
                    }  text-sm text-white uppercase font-semibold`}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
