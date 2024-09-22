import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import Rating from "./../components/shared/Rating";
import { FaHeart } from "react-icons/fa6";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import Review from "../components/products/Review";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Detail = () => {
  const images = [1, 2, 3, 4, 5, 6];
  const [image, setImage] = useState("");
  const discount = 5;
  const stock = 3;
  const [state, setState] = useState("reviews");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdTablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smMobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsMobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Header />
      <section className='bg-[url("/images/banner/shop.png")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute top-0 left-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col items-center justify-center w-full h-full gap-1 text-white">
              <h2 className="text-3xl font-bold">Product Details</h2>
              <div className="flex items-center justify-center w-full gap-2 text-2xl">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <IoIosArrowForward />
                </span>
                <span>Product Details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="py-5 mb-5 bg-slate-100">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex items-center justify-start w-full text-md text-slate-800">
              <Link to="/home">Home</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link to="/">Category</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <span className="pt-1">Product Name</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="grid grid-cols-2 gap-8 md-lg:grid-cols-1">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[400px] w-full"
                  src={
                    image
                      ? `/images/products/${image}.webp`
                      : `/images/products/${images[2]}.webp`
                  }
                  alt=""
                />
              </div>
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {images.map((img, i) => {
                      return (
                        <div key={i} onClick={() => setImage(img)}>
                          <img
                            className="h-[120px] cursor-pointer"
                            src={`/images/products/${img}.webp`}
                            alt=""
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="text-3xl font-bold text-slate-800">
                <h3>Product Name</h3>
              </div>
              <div className="flex items-center justify-start gap-4">
                <div className="flex text-xl">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-green-600">(24 reviews)</span>
              </div>
              <div className="flex gap-3 text-2xl font-bold text-red-500">
                {discount !== 0 ? (
                  <>
                    Price: <h2 className="line-through">120000 VND</h2>
                    <h2>
                      {120000 - Math.floor((120000 * discount) / 100)} VND (-
                      {discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price: 100000 VND</h2>
                )}
              </div>

              <div className="text-slate-800">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  vero, maxime illum, quidem, quo dicta assumenda atque sed modi
                  sapiente est necessitatibus possimus suscipit incidunt
                  dolores? Repellat quas dicta labore!
                </p>
              </div>

              <div className="flex gap-3 pb-10 border-b">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div className="px-6 cursor-pointer">-</div>
                      <div className="px-6">2</div>
                      <div className="px-6 cursor-pointer">+</div>
                    </div>
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-md hover:shadow-green-500/40 bg-[#059473] text-white">
                        Add To Card
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div className="">
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                    <FaHeart />
                  </div>
                </div>
              </div>

              <div className="flex gap-5 py-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share To</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `In Stock  (${stock})` : "Out of Stock"}
                  </span>

                  <ul className="flex items-center justify-start gap-3">
                    <li>
                      <a
                        href="#"
                        className="w-[38px] h-[38px] hover:bg-[#4b60d7] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                      >
                        <RiFacebookFill />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="w-[38px] h-[38px] hover:bg-[#d448a7] hover:text-white flex justify-center items-center bg-pink-500 rounded-full text-white"
                      >
                        <FaInstagram />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-md hover:shadow-orange-500-500/40 bg-[#eb684a] text-white rounded-full">
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link
                  to="#"
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-md hover:shadow-red-500/40 bg-red-500 text-white rounded-full"
                >
                  Chat With Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full">
              <div className="pr-4 md-lg:pr-0">
                <div className="grid grid-cols-2">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "reviews"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-800"
                    } rounded-sm`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "description"
                        ? "bg-[#059473] text-white"
                        : "bg-slate-200 text-slate-800"
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div>

                <div>
                  {state === "reviews" ? (
                    <Review />
                  ) : (
                    <p className="py-5 text-slate-800">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Distinctio officiis, autem aut, velit dolorum vitae nulla
                      minima dignissimos quam odit quae quo tempore labore quis,
                      illo doloribus nemo minus enim.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[28%] md-lg:w-full">
              <div className="pl-4 md-lg:pl-0">
                <div className="px-3 py-2 text-slate-800 bg-slate-200">
                  <h2 className="font-bold">From Mr.Robot</h2>
                </div>
                <div className="flex flex-col gap-5 p-3 mt-3 border">
                  {[1, 2, 3].map((p, i) => {
                    return (
                      <Link className="block" key={i}>
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full"
                            src={`/images/products/${p}.webp`}
                            alt=""
                          />
                          {discount !== 0 && (
                            <div className="absolute flex items-center justify-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {discount}%
                            </div>
                          )}
                        </div>

                        <h2 className="py-1 font-bold text-slate-800">
                          Product Name
                        </h2>
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-800">
                            200000 VND
                          </h2>
                          <div className="flex items-center gap-2">
                            <Rating ratings={4.5} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <h2 className="py-8 text-2xl font-semibold text-slate-800">Related Products</h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: { slidesPerView: 4 },
                565: { slidesPerView: 2 },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {[1, 2, 3, 4, 5, 6].map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className="block">
                      <div className="relative h-[270px]">
                        <div className="w-[300px] h-full">
                          <img
                            className="w-full h-full"
                            src={`/images/products/${p}.webp`}
                            alt=""
                          />
                          <div className="absolute top-0 left-0 w-[300px] h-full transition-all duration-500 bg-black opacity-25 hover:opacity-50"></div>
                        </div>
                        {discount !== 0 && (
                          <div className="absolute flex items-center justify-center text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {discount}%
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 p-4">
                        <h2 className="text-lg font-bold text-slate-800">
                          Product Name
                        </h2>
                        <div className="flex items-center justify-start gap-3">
                          <h2 className="font-bold text-md text-slate-800">
                            200000 VND
                          </h2>
                          <div className="flex">
                            <Rating ratings={4.5} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex items-center justify-center w-full py-8">
            <div className="justify-center !w-auto gap-3 custom_bullet"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Detail;
