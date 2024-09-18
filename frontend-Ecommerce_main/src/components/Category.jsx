import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

const Category = () => {
  const categories = [
    "Mobiles",
    "Laptops",
    "Speakers",
    "Top wear",
    "Footwear",
    "Watches",
    "Home Decor",
    "Smart Watches",
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
    <div className="w-[87%] mx-auto relative">
       <div className="w-full">
        <div className="relative flex flex-col items-center justify-center text-3xl font-bold text-center text-slate-600 pb-[35px]">
          <h2>Top Category</h2>
          <div className="w-[108px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.map((c, i) => (
          <Link className="h-[185px] border block" key={i} to="#">
            <div className="relative w-full h-full p-3">
              <img src={`/images/products/${i + 1}.webp`} alt="" />
              <div className="absolute left-0 flex items-center justify-center w-full mx-auto font-bold bottom-6">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white">
                  {c}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Category;
