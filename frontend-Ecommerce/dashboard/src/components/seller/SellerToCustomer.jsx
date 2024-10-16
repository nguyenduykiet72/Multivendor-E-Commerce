/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_customer_message,
  get_customers,
  messageClear,
  send_messages,
  updateMessage,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import { socket } from "../../utils/util";
import toast from "react-hot-toast";

const SellerToCustomer = () => {
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const sellerId = 65;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { customers, messages, currentCustomer, successMessage } = useSelector(
    (state) => state.chat
  );
  const { customerId } = useParams();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_messages({
        senderId: userInfo._id,
        receiverId: customerId,
        text,
        name: userInfo?.shopInfo?.shopName,
      })
    );
    setText("");
  };

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_seller_message", messages[messages.length - 1]); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on("customer_message", (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        customerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send A Message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-2 py-5 lg:px-7">
      <div className="w-full px-4 py-4 bg-white rounded-md h-[calc(100vh-140px)]">
        <div className="relative flex w-full h-full">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#e5e3e5] md:bg-transparent overflow-y-auto">
              <div className="flex items-center justify-between p-4 text-xl md:p-0 md:px-3 md:pb-3 ">
                <h2>Customers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoCloseCircle />
                </span>
              </div>
              {customers.map((c, i) => (
                <Link
                  to={`/seller/dashboard/chat-customer/${c.fdId}`}
                  key={i}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer bg-[#8aabec] `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-[#e04660] border-2 max-w-[38px] p-[2px] rounded-full"
                      src="/images/seller.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>

                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-base font-semibold">{c.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex items-center justify-between">
              {sellerId && (
                <div className="flex items-center justify-start gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                      src="/images/seller.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base font-semibold">
                    {currentCustomer.name}
                  </h2>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-[#4b9cd9] shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#f1f5f9] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto border">
                {customerId ? (
                  messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div
                          className="flex items-center justify-start w-full"
                          key={i}
                          ref={scrollRef}
                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src="/images/seller.png"
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#51a8ff] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="flex items-center justify-end w-full"
                          key={i}
                          ref={scrollRef}
                        >
                          <div className="flex items-start justify-start max-w-full gap-2 py-2 md:px-3 lg:max-w-[85%]">
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#ea6c4c] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
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
                      );
                    }
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2 text-black">
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
            <input
               readOnly={customerId ? false : true}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="flex items-center justify-between w-full px-2 py-[5px] border focus:border-blue-500 rounded-md border-slate-700 outline-none bg-transparent"
                placeholder="Enter Message"
              />
              <button disabled={customerId ? false : true}  className="shadow-lg bg-[#51a8ff] hover:shadow-cyan-500/50 font-bold w-[75px] h-[35px] rounded-md flex justify-center items-center text-white">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
