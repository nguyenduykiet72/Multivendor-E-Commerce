import React from "react";

const SellerDetail = () => {
  return (
    <div className="px-2 pt-5 lg:px-7">
      <h1 className="text-[20px] font-bold mb-3">Seller Detail</h1>
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex flex-wrap w-full">
          <div className="flex items-center justify-center w-3/12 py-3">
            <div className="">
              <img
                className="w-full h-[230px] rounded-lg border  bg-[#d0ced0]"
                src="/images/seller.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 p-4 text-sm  bg-[#d0ced0] rounded-md">
                <div className="flex gap-2 font-bold">
                  <span>Name:</span>
                  <span>Osborn Nguyen</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Email:</span>
                  <span>OsbornNguyen@gmail.com</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Role:</span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Status:</span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Payment Status:</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 py-2 md:px-5">
              <div className="py-2 text-lg">
                <h2>Other Info</h2>
              </div>
              <div className="flex flex-col justify-between gap-2 p-4 text-sm  bg-[#d0ced0] rounded-md">
                <div className="flex gap-2 font-bold">
                  <span>Shop Name:</span>
                  <span>Osborn Corp</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>City:</span>
                  <span>Da Nang</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Address:</span>
                  <span>122/11D Unknown Street</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Phone Number:</span>
                  <span>0110925568</span>
                </div>
                <div className="flex gap-2 font-bold">
                  <span>Country:</span>
                  <span>Viet Nam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form action="">
            <div className="flex gap-4 py-3">
              <select
                className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600"
                name=""
                id=""
              >
                <option value="">- Select Status -</option>
                <option value="active"> Active </option>
                <option value="deactivate"> Deactivate </option>
              </select>
              <button className="w-[170px] bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;
