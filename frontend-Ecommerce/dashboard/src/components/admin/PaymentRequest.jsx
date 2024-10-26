import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  confirm_payment_request,
  get_payment_request,
  messageClear,
} from "../../store/Reducers/paymentReducer";
import moment from "moment";
import toast from "react-hot-toast";

const handleOnWheel = ({ deltaY }) => {
  console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, pendingWithdraws, loader } =
    useSelector((state) => state.payment);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    dispatch(get_payment_request());
  }, []);

  const confirm_request = (id) => {
    setPaymentId(id)
    dispatch(confirm_payment_request(id))
}

  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())
    }
},[successMessage,errorMessage])

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-center">
        <div className="w-[15%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {pendingWithdraws[index]?.amount} VND
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#51a8ff] rounded-md text-sm">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdraws[index]?.createdAt).format("LL")}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button
            disabled={loader}
            onClick={() => confirm_request(pendingWithdraws[index]?._id)}
            className=" bg-[#37fbb0] shadow-lg hover:shadow-green-500/50 px-3 py-[2px cursor-pointer text-sm] rounded-md"
          >
            {loader && paymentId === pendingWithdraws[index]?._id
              ? "Loading..."
              : "Confirm"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <h2 className="pb-5 text-xl font-medium">Withdrawal Request</h2>
        <div className="w-full ">
          <div className="w-full overflow-x-auto ">
            <div className="flex bg-[#d0ced0] uppercase text-xs min-w-[340px] font-bold rounded-md text-center ">
              <div className="w-[15%] p-2">No</div>
              <div className="w-[25%] p-2">Amount</div>
              <div className="w-[25%] p-2">Status</div>
              <div className="w-[25%] p-2">Date</div>
              <div className="w-[25%] p-2">Action</div>
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
    </div>
  );
};

export default PaymentRequest;
