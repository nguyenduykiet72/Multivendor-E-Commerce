import React from "react";
import { FaImage } from "react-icons/fa6";
import { FadeLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const image = true;
  const loader = true;
  const status = "active";
  const userInfo = true;
  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="flex flex-wrap w-full">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-white rounded-md">
            <div className="flex items-center justify-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className=" h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden bg-[#E0E0E0]"
                >
                  <img src="/images/seller.png" alt="" />
                  {!loader && (
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center opacity-70 z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex flex-col items-center justify-center h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImage />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] flex items-center justify-center opacity-70 z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" className="hidden" id="img" />
            </div>

            <div className="px-0 py-2 md:px-5">
              <div className="flex flex-col justify-between gap-2 p-4 text-sm bg-[#E0E0E0] rounded-md relative">
                <span className="p-[6px] bg-[#51a8ff] rounded hover:shadow-lg hover:shadow-blue-500/50 text-white absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name:</span>
                  <span>Elliot Nguyen</span>
                </div>
                <div className="flex gap-2">
                  <span>Email:</span>
                  <span>mrrobot@anonymously.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Role:</span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Status:</span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account:</span>
                  <p>
                    {status === "active" ? (
                      <span className="px-2 ml-2 text-xs font-normal text-white bg-green-500 cursor-pointer py-0.5 rounded">
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 ml-2 text-xs font-normal text-white bg-[#51a8ff]  cursor-pointer py-0.5 rounded">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 py-2 md:px-5">
              {!userInfo ? (
                <form action="">
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Enter Shop Name"
                      className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Enter City"
                      className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      name="district"
                      id="district"
                      placeholder="Enter District"
                      className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Address"
                      className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                    />
                  </div>
                  <button className=" bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 my-2 text-white">
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex flex-col justify-between gap-2 p-4 text-sm bg-[#E0E0E0] rounded-md relative">
                  <span className="p-[6px] bg-[#51a8ff] rounded hover:shadow-lg hover:shadow-blue-500/50 text-white absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name:</span>
                    <span>Mr.Robot</span>
                  </div>
                  <div className="flex gap-2">
                    <span>City</span>
                    <span>Đà Nẵng</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District:</span>
                    <span>Thanh Khê</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Address:</span>
                    <span>Phan Thanh</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7">
            <div className="p-4 bg-white rounded-md">
              <h1 className="mb-3 text-lg font-semibold">Change Password</h1>
              <form action="">
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    type="password"
                    name="n_password"
                    id="n_password"
                    placeholder="Enter New Password"
                    className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-800"
                  />
                </div>
                <button className=" bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 my-2 text-white">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
