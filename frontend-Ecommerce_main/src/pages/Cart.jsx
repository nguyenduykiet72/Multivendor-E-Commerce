import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  delete_cart_product,
  get_cart_products,
  messageClear,
  quantity_decrease,
  quantity_increase,
} from "../store/Reducers/cartReducer";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    cart_products,
    successMessage,
    price,
    buy_product_item,
    shipping_fee,
    outOfStock_products,
  } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(get_cart_products(userInfo.id));
  }, []);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: cart_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  useEffect(() => {
    if (successMessage) {
      // toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_cart_products(userInfo.id));
    }
  }, [successMessage]);

  const increase = (quantity, product_quantity, cartId) => {
    const temp = quantity + 1;
    if (temp <= product_quantity) {
      dispatch(quantity_increase(cartId));
    }
  };

  const decrease = (quantity, cartId) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_decrease(cartId));
    }
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Cart Page</h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <IoIosArrowForward />
                </span>
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {cart_products.length > 0 || outOfStock_products > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="p-4 bg-white">
                      <h2 className="font-semibold text-green-500 text-md">
                        Product Quantity {cart_products.length}
                      </h2>
                    </div>
                    {cart_products.map((p, i) => (
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

                              <div className="flex flex-col gap-2">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    onClick={() =>
                                      decrease(pt.quantity, pt._id)
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{pt.quantity}</div>
                                  <div
                                    onClick={() =>
                                      increase(
                                        pt.quantity,
                                        pt.productInfo.quantity,
                                        pt._id
                                      )
                                    }
                                    className="px-3 cursor-pointer"
                                  >
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(delete_cart_product(pt._id))
                                  }
                                  className="px-5 py-[3px] bg-[#fc334d] text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outOfStock_products.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className="p-4 bg-white">
                          <h2 className="font-semibold text-red-500 text-md">
                            Out of Stock ({outOfStock_products.length})
                          </h2>
                        </div>
                        <div className="p-4 bg-white">
                          {outOfStock_products.map((p, i) => (
                            <div className="flex flex-wrap w-full" key={i}>
                              <div className="flex w-7/12 gap-2 sm:w-full">
                                <div className="flex items-center justify-center gap-2">
                                  <img
                                    src={p.products[0].images[0]}
                                    alt=""
                                    className="h-[80px] w-[80px] "
                                  />
                                  <div className="pr-4 text-slate-800">
                                    <h2 className="font-semibold text-md">
                                      {p.products[0].name}
                                    </h2>
                                    <span>Brand: {p.products[0].brand}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    {p.products[0].price -
                                      Math.floor(
                                        (p.products[0].price *
                                          p.products[0].discount) /
                                          100
                                      )}{" "}
                                    VND
                                  </h2>
                                  <p className="line-through">
                                    {p.products[0].price} VND
                                  </p>
                                  <p className="flex items-center justify-center">
                                    -{p.products[0].discount}%
                                  </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div
                                      onClick={() =>
                                        decrease(p.quantity, p._id)
                                      }
                                      className="px-3 cursor-pointer"
                                    >
                                      -
                                    </div>
                                    <div className="px-3">{p.quantity}</div>
                                    <div  onClick={() =>
                                      increase(
                                        p.quantity,
                                        p.productInfo.quantity,
                                        p._id
                                      )
                                    } className="px-3 cursor-pointer">+</div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      dispatch(delete_cart_product(p._id))
                                    }
                                    className="px-5 py-[3px] bg-[#fc334d] text-white"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {cart_products.length > 0 && (
                    <div className="flex flex-col gap-3 p-3 bg-white text-slate-800">
                      <h2 className="font-bold text-md">Order Summary</h2>
                      <div className="flex items-center justify-between">
                        <span>{buy_product_item} Items</span>
                        <span className="font-semibold">{price} VND</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shipping Fee</span>
                        <span className="font-semibold">
                          {shipping_fee} VND
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border rounded-sm border-slate-200 outline-0 focus:border-green-500"
                          type="text"
                          placeholder="Enter Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="text-lg text-[#059473] font-semibold">
                          {price + shipping_fee} VND
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/30 hover:shadow-lg bg-[#fc334d] text-sm text-white uppercase font-semibold"
                      >
                        Process to Checkout ({buy_product_item})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 text-white bg-indigo-500" to="/shops">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
