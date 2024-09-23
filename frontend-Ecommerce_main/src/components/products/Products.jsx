import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Products = ({ title,products }) => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-slate-800">{title}</div>
        <div className="flex items-center justify-center gap-3 text-slate-800">
          <button
            onClick={() => previous()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <MdArrowBack />
          </button>
          <button
            onClick={() => next()}
            className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
          >
            <MdArrowForward />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col-reverse gap-8">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div className="flex flex-col justify-start gap-2" key={i}>
              {p.map((pl, j) => (
                <Link to="#" key={j} className="flex items-start justify-start">
                  <img
                    className="w-[110px] h-[110px]"
                    src={pl.images[0]}
                    alt=""
                  />
                  <div className="flex flex-col items-start justify-start gap-1 px-3 text-slate-800">
                    <h2>{pl.name}</h2>
                    <span className="text-lg font-bold">{pl.price} VND</span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
