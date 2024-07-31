import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

const handleOnWheel = ({ deltaY }) => {
  console.log("handleOnWheel", deltaY);
};

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium text-center">
        <div className="w-[15%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">200.000 VND</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#51a8ff] rounded-md text-sm">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">31 July 2024</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className=" bg-[#37fbb0] shadow-lg hover:shadow-green-500/50 px-3 py-[2px cursor-pointer text-sm] rounded-md">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 pt-5 lg:px-7">
      <div className="w-full p-4 bg-white rounded-md">
        <h2 className="pb-5 text-xl font-medium">Withdrawal Request</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#d0ced0] uppercase text-xs min-w-[340px] font-bold rounded-md text-center">
              <div className="w-[15%] p-2">No</div>
              <div className="w-[25%] p-2">Amount</div>
              <div className="w-[25%] p-2">Status</div>
              <div className="w-[25%] p-2">Date</div>
              <div className="w-[25%] p-2">Action</div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
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
  );
};

export default PaymentRequest;
