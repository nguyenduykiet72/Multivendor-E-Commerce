import React from "react";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 25, 32],
      },
      {
        name: "Revenue",
        data: [80, 45, 25, 51, 62, 24, 55, 60, 42, 92, 45, 27],
      },
      {
        name: "Sellers",
        data: [42, 52, 12, 44, 82, 44, 25, 30, 78, 55, 60, 35],
      },
    ],

    options: {
      colors: ["#FF5733", "#2CDFC2", "#3357FF"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enable: false,
      },
      stock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xAxis: {
        category: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yAxis: {
            category: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 py-5 md:px-7">
      <div className="grid w-full gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-3xl font-bold">$1000</h2>
            <span className="font-medium text-md">Total Sale</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#f54d71] flex justify-center items-center text-xl">
            <HiMiniCurrencyDollar className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-3xl font-bold">20</h2>
            <span className="font-medium text-md">Products</span>
          </div>
          {/* 904df5 */}
          {/* 4db2f5 */}
          <div className="w-[40px] h-[47px] rounded-full bg-[#4db2f5] flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-3xl font-bold">50</h2>
            <span className="font-medium text-md">Sellers</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#904df5] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-3xl font-bold">$1000</h2>
            <span className="font-medium text-md">Orders</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#f5884d] flex justify-center items-center text-xl">
            <FaShoppingCart className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-full mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full p-4 bg-white rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full mt-6 lg:w-5/12 lg:pl-4 lg:mt-0">
          <div className="w-full p-4 text-black bg-white rounded-md">
            <div className="flex items-start justify-between">
              <h2 className="pb-3 font-semibold text-black text-md">
                Recent Seller Message
              </h2>
              <Link className="text-sm font-semibold text-black">View all</Link>
            </div>

            <div className="flex flex-col gap-2 pt-6 text-black">
              <ol className="relative ml-4 border-1 border-slate-600 ">
                <li className="mb-3 ml-6">
                  <div className="absolute flex items-center justify-center w-10 h-10 shadow-lg -left-5 p-[6px] bg-gray-400/40 rounded-full z-20">
                    <img
                      className="w-full h-full rounded-lg"
                      src="../../../public/images/admin.png"
                      alt=""
                    />
                  </div>
                  <div className="p-3 text-black border border-gray-200 rounded-lg shadow-sm bg-gray-400/40">
                    <div className="flex items-center justify-between mb-2">
                      <Link className="font-normal text-md">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>

                    <div className="p-2 text-xs font-normal bg-blue-200 border border-blue-200 rounded-lg">
                      Hello World!
                    </div>
                  </div>
                </li>

                <li className="mb-3 ml-6">
                  <div className="absolute flex items-center justify-center w-10 h-10 shadow-lg -left-5 p-[6px] bg-gray-400/40 rounded-full z-20">
                    <img
                      className="w-full h-full rounded-lg"
                      src="../../../public/images/admin.png"
                      alt=""
                    />
                  </div>
                  <div className="p-3 text-black border border-gray-200 rounded-lg shadow-sm bg-gray-400/40">
                    <div className="flex items-center justify-between mb-2">
                      <Link className="font-normal text-md">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>

                    <div className="p-2 text-xs font-normal bg-blue-200 border border-blue-200 rounded-lg">
                      Hello Osborn!
                    </div>
                  </div>
                </li>

                <li className="mb-3 ml-6">
                  <div className="absolute flex items-center justify-center w-10 h-10 shadow-lg -left-5 p-[6px] bg-gray-400/40 rounded-full z-20">
                    <img
                      className="w-full h-full rounded-lg"
                      src="../../../public/images/admin.png"
                      alt=""
                    />
                  </div>
                  <div className="p-3 text-black border border-gray-200 rounded-lg shadow-sm bg-gray-400/40">
                    <div className="flex items-center justify-between mb-2">
                      <Link className="font-normal text-md">Admin</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        2 days ago
                      </time>
                    </div>

                    <div className="p-2 text-xs font-normal bg-blue-200 border border-blue-200 rounded-lg">
                      I am Mr Robot!
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 mt-6 bg-white rounded-md">
        <div className="flex items-center justify-between">
          <h2 className="pb-3 font-semibold text-md">Recent orders</h2>
          <Link className="text-sm font-semibold">View all</Link>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead className="text-sm uppercase border-b border-black">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Order Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Active
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((k, index) => (
                <tr key={index} className="border-b border-slate-300">
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    #11552
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    200.000 VND
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    <Link>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
