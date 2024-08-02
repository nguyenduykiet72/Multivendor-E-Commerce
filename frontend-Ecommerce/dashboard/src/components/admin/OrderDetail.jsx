import React from "react";

const OrderDetail = () => {
  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl ">Order Detail</h2>
          <select
            name=""
            id=""
            className="px-4 py-2 outline-none focus:border-blue-500 bg-[#51a8ff] border border-white rounded-md text-sm"
          >
            <option value="">Pending</option>
            <option value="">Processing</option>
            <option value="">Warehouse</option>
            <option value="">Placed</option>
            <option value="">Cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg">
            <h2>#15100</h2>
            <span>02 August 2024</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver to: Elliot Nguyen
                  </h2>
                  <p>
                    <span className="text-sm">
                      122/11D Unknown Street Somewhere
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-start gap-3">
                  <h2>Payment Status:</h2>
                  <span className="text-base">Paid</span>
                </div>
                <span>Price: 350.000 VND</span>

                <div className="flex flex-col gap-4 mt-4 bg-[#efe995] rounded-md">
                  <div className="flex gap-3 m-2 text-md">
                    <img
                      className="w-[70px] h-[80px] border-black border"
                      src="/images/category/1.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="">
                        Name: The boy, the mole, the fox and the house
                      </h2>
                      <p>
                        <span>Brand:</span>
                        <span>Hoa Hong</span>
                      </p>
                      <span className="text-lg">Quantity: 2</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4 bg-[#efe995] rounded-md">
                  <div className="flex gap-3 m-2 text-md">
                    <img
                      className="w-[70px] h-[80px] border-black border"
                      src="/images/category/3.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="">Name: The T-shirt Cat</h2>
                      <p>
                        <span>Brand:</span>
                        <span>The Cat Lovers</span>
                      </p>
                      <span className="text-lg">Quantity: 100</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4 bg-[#efe995] rounded-md">
                  <div className="flex gap-3 m-2 text-md">
                    <img
                      className="w-[70px] h-[80px] border-black border"
                      src="/images/category/5.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="">Name: The ancient watch made in 20th</h2>
                      <p>
                        <span>Brand:</span>
                        <span>18th Century</span>
                      </p>
                      <span className="text-lg">Quantity: 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[70%]">
              <div className="pl-3">
                <div className="flex flex-col mt-4 bg-[#efe995] rounded-md p-4">
                  <div className="mt-2">
                    <div className="flex items-center justify-start gap-3">
                      <h2>Seller 1 order:</h2>
                      <span>Pending</span>
                    </div>
                    <div className="flex gap-3 m-2 text-md">
                      <img
                        className="w-[70px] h-[80px] border-black border"
                        src="/images/category/3.jpg"
                        alt=""
                      />
                      <div>
                        <h2 className="">
                          Name: The ancient watch made in 20th
                        </h2>
                        <p>
                          <span>Brand:</span>
                          <span>18th Century</span>
                        </p>
                        <span className="text-lg">Quantity: 1</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-start gap-3">
                      <h2>Seller 1 order:</h2>
                      <span>Pending</span>
                    </div>
                    <div className="flex gap-3 m-2 text-md">
                      <img
                        className="w-[70px] h-[80px] border-black border"
                        src="/images/category/5.jpg"
                        alt=""
                      />
                      <div>
                        <h2 className="">
                          Name: The ancient watch made in 20th
                        </h2>
                        <p>
                          <span>Brand:</span>
                          <span>18th Century</span>
                        </p>
                        <span className="text-lg">Quantity: 1</span>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
