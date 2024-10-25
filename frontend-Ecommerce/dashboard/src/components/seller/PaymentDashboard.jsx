import React, { forwardRef, useEffect, useState } from "react";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  get_seller_payment_details,
  messageClear,
  send_withdrawal_request,
} from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";
import moment from "moment";

const handleOnWheel = ({ deltaY }) => {
  console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentDashboard = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdraws,
    successWithdraws,
    totalAmount,
    availableAmount,
    withdrawAmount,
    pendingAmount,
  } = useSelector((state) => state.payment);

  const [amount, setAmount] = useState(0);

  const sendRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 5000) {
      dispatch(send_withdrawal_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error("You can't withdraw this amount");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-center">
        <div className="w-[15%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {pendingWithdraws[index]?.amount} VND
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#51a8ff] rounded-md text-sm text-white">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdraws[index]?.createdAt).format("LL")}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payment_details(userInfo._id));
  }, []);

  return (
    <div className="px-2 py-5 md:px-7">
      <div className="grid w-full mb-5 gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-2xl font-bold">{totalAmount} VND</h2>
            <span className="text-sm font-bold">Total Sales</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#f54d71] flex justify-center items-center text-xl">
            <HiMiniCurrencyDollar className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-2xl font-bold">{availableAmount} VND</h2>
            <span className="text-sm font-bold">Available Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#4db2f5] flex justify-center items-center text-xl">
            <HiMiniCurrencyDollar className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-2xl font-bold">{withdrawAmount} VND</h2>
            <span className="text-sm font-bold">WithDrawal Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#904df5] flex justify-center items-center text-xl">
            <HiMiniCurrencyDollar className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#ffffff] rounded-md gap-3">
          <div className="flex flex-col items-start justify-start text-[#000000] font-sans">
            <h2 className="text-2xl font-bold">{pendingAmount} VND</h2>
            <span className="text-sm font-bold">Pending Amount</span>
          </div>
          <div className="w-[40px] h-[47px] rounded-full bg-[#f5884d] flex justify-center items-center text-xl">
            <HiMiniCurrencyDollar className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-2 pb-4 md:grid-cols-2">
        <div className="p-5 bg-white rounded-md">
          <h2 className="text-lg">Send Request</h2>

          <div className="pt-5 mb-5">
            <form onSubmit={sendRequest}>
              <div className="flex flex-wrap gap-3">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  type="number"
                  name="amount"
                  className="px-4 py-2 bg-white border border-blue-400 rounded-md outline-none focus:border-blue-600 md:w-[75%]"
                  min="0"
                />
                <button
                  disabled={loader}
                  className=" bg-[#fc334d]  hover:shadow-red-500/50 hover:shadow-sm rounded-md px-7 py-3 text-white"
                >
                  {loader ? "Loading..." : "Send Request"}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="pb-4 text-lg">Pending Request</h2>
            <div className="w-full overflow-x-auto ">
              <div className="flex bg-[#d0ced0] uppercase text-xs min-w-[340px] font-bold rounded-md text-center ">
                <div className="w-[15%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List "
                  height={350}
                  itemCount={pendingWithdraws.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>

        <div className="p-5 bg-white rounded-md">
          <div>
            <h2 className="pb-4 text-lg">Success WithDrawal</h2>
            <div className="w-full overflow-x-auto ">
              <div className="flex bg-[#d0ced0] uppercase text-xs min-w-[340px] font-bold rounded-md text-center ">
                <div className="w-[15%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List "
                  height={350}
                  itemCount={10}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
