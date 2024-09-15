/* eslint-disable react/no-unescaped-entities */
import React from "react";

const SellerToAdmin = () => {
  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div className="w-full md:pl-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-3">
                <div className="relative">
                  <img
                    className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                    src="/images/seller.png"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-base font-semibold">Support</h2>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#9ca3af66] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="flex items-center justify-start w-full">
                  <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                    <div>
                      <img
                        className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                        src="/images/seller.png"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center w-full bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm">
                      <span>I'm Mr Robot</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end w-full">
                  <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                    <div className="flex flex-col items-start justify-center w-full bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm">
                      <span>Cool!</span>
                    </div>
                    <div>
                      <img
                        className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                        src="/images/seller.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start w-full">
                  <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                    <div>
                      <img
                        className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                        src="/images/seller.png"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center w-full bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm">
                      <span>Let's hack something</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="flex gap-3">
              <input
                type="text"
                className="flex items-center justify-between w-full px-2 py-[5px] border focus:border-blue-500 rounded-md border-slate-700 outline-none bg-transparent"
                placeholder="Enter Message"
              />
              <button className="shadow-lg bg-[#51a8ff] hover:shadow-cyan-500/50 font-bold w-[75px] h-[35px] rounded-md flex justify-center items-center text-white">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToAdmin;
