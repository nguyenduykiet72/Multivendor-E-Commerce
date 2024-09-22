import { useState } from "react";
import Pagination from "../shared/Pagination";
import RatingTemp from "../RatingTemp";
import Rating from "../shared/Rating";
import { Link } from "react-router-dom";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
const Review = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const userInfo = {};
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col items-start justify-start gap-2 py-4">
          <div>
            <span className="text-6xl font-semibold">4.5</span>
            <span className="text-3xl font-semibold text-slate-800">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={4.5} />
          </div>
          <p className="text-sm text-slate-800">15 Reviews</p>
        </div>

        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[60%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">10</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[70%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">20</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[40%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">20</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[30%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">8</p>
          </div>
          <div className="flex items-center justify-start gap-5">
            <div className="flex gap-1 text-md w-[93px]">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[3%]"></div>
            </div>
            <p className="text-sm text-slate-800 w-[0]">4</p>
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
        Product Reviews (10)
      </h2>
      <div className="flex flex-col gap-8 pt-4 pb-10">
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-xl">
                <RatingTemp rating={4} />
              </div>
              <span className="text-slate-800">25 Aug 2024</span>
            </div>
            <span className="text-slate-800 text-md">Elliot Nguyen</span>
            <p className="text-sm text-slate-800">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat
              animi, soluta ex nam recusandae asperiores vero voluptates
              obcaecati sit, assumenda perspiciatis et debitis, voluptate odit
              facilis sint! Dolorum, suscipit aliquid?
            </p>
          </div>
        ))}
        <div className="flex justify-end">
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              nextPage={nextPage}
              showItem={Math.floor(10 / 3)}
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
            <form>
              <textarea
                className="w-full p-3 border outline-1 border-slate-300"
                name=""
                id=""
                cols="30"
                rows="5"
                required
              ></textarea>
              <div className="mt-2">
                <button className="px-5 py-1 bg-[#fc334d] text-white rounded-md">Submit</button>
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
