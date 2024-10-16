import { useEffect, useState } from "react";
import Pagination from "../shared/Pagination";
import RatingTemp from "../RatingTemp";
import Rating from "../shared/Rating";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  customer_review,
  get_reviews,
  messageClear,
  product_detail,
} from "../../store/Reducers/homeReducer";
import toast from "react-hot-toast";

const Review = ({ product }) => {
  const dispatch = useDispatch();
  const [nextPage, setNextPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const { userInfo , } = useSelector((state) => state.auth);
  const { successMessage,reviews ,totalReview,review_rating  } = useSelector((state) => state.home);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const submit_review = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: review,
      rating: rating,
      productId: product._id,
    };
    dispatch(customer_review(obj));
  };

  useEffect(() => {
    if (successMessage) {
      // toast.success(successMessage);
      dispatch(get_reviews({ productId: product._id, pageNumber }));
      dispatch(product_detail(product.slug));
      setRating("");
      setReview("");
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(get_reviews({ productId: product._id, pageNumber }));
    }
  }, [pageNumber,product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col items-start justify-start gap-2 py-4">
          <div>
            <span className="text-6xl font-semibold">{product.rating}</span>
            <span className="text-3xl font-semibold text-slate-800">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-800">({totalReview}) Reviews</p>
        </div>

        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width:`${Math.floor((100 * (review_rating[0]?.sum || 0)) / totalReview)}%`}} className="h-full bg-[#Edbb0E] w-[60%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">{review_rating[0]?.sum}</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width:`${Math.floor((100 * (review_rating[1]?.sum || 0)) / totalReview)}%`}} className="h-full bg-[#Edbb0E] w-[70%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">{review_rating[1]?.sum}</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width:`${Math.floor((100 * (review_rating[2]?.sum || 0)) / totalReview)}%`}} className="h-full bg-[#Edbb0E] w-[40%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">{review_rating[2]?.sum}</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width:`${Math.floor((100 * (review_rating[3]?.sum || 0)) / totalReview)}%`}} className="h-full bg-[#Edbb0E] w-[30%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">{review_rating[3]?.sum}</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div style={{width:`${Math.floor((100 * (review_rating[4]?.sum || 0)) / totalReview)}%`}} className="h-full bg-[#Edbb0E] w-[3%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">{review_rating[4]?.sum}</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[0%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">0</p>
          </div>
        </div>
      </div>

      <h2 className="py-5 text-xl font-bold text-slate-800">
        Product Reviews ({totalReview})
      </h2>
      <div className="flex flex-col gap-8 pt-4 pb-10">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={r.rating} />
              </div>
              <span className="text-slate-800">{r.date}</span>
            </div>
            <span className="text-slate-800 text-md">{r.name}</span>
            <p className="text-sm text-slate-800">
             {r.review}
            </p>
          </div>
        ))}
        <div className="flex justify-end">
          {
            totalReview > 5 &&
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReview}
              nextPage={nextPage}
              showItem={Math.floor(totalReview / 3)}
            />
          }
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRating(e)}
                initialRating={rating}
                emptySymbol={
                  <span className="text-4xl text-slate-800">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-4xl text-[#Edbb0E]">
                    <FaStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={submit_review}>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-3 border outline-1 border-slate-300"
                name=""
                id=""
                cols="30"
                rows="5"
                required
              ></textarea>
              <div className="mt-2">
                <button className="px-5 py-1 bg-[#fc334d] text-white rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="px-5 py-1 text-white bg-red-500 rounded-sm"
            >
              Please Login First
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
