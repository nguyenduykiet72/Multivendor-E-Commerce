/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_admin_message,
  get_sellers,
  messageClear,
  send_message_seller_admin,
  updateSellerMessage,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import { MdFace6 } from "react-icons/md";
import { socket } from "../../utils/util";
import toast from "react-hot-toast";

const ChatSeller = () => {
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const { sellerId } = useParams();
  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");

  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message_seller_admin({
        senderId: "",
        receiverId: sellerId,
        message: text,
        senderName: "Admin Support",
      })
    );
    setText("");
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [sellerId]);

  //lay tin nhan cuoi cung va gui qua socket de khoi can load lai trang
  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      ); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  //lang nghe tin nhan tu seller
  useEffect(() => {
    socket.on("received_seller_message", (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        receiverMessage.senderId === sellerId &&
        receiverMessage.receiverId === ""
      ) {
        dispatch(updateSellerMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send A Message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

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
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoCloseCircle />
                </span>
              </div>

              {sellers.map((s, i) => (
                <Link
                  key={i}
                  to={`/admin/dashboard/chat-seller/${s._id}`}
                  className={`h-[60px] flex justify-start gap-2 items-center px-2 py-2 rounded-md cursor-pointer ${
                    sellerId === s._id ? "bg-[#e2e4e7]" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-gray-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={s.image}
                      alt=""
                    />

                    {activeSeller.some((a) => a.sellerId === s._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center w-full">
                    <div className="flex items-center justify-between w-full">
                      <h2 className="text-base font-semibold">{s.name}</h2>
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
                      src={currentSeller?.image}
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span className="font-semibold">{currentSeller?.name}</span>
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
              <div className="bg-[#f1f5f9] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {sellerId ? (
                  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
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
                            <div className="flex flex-col items-start justify-center w-full text-white bg-[#e84839] shadow-lg py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className=" w-[38px] h-[38px] border-2 border-green-500 rounded-full max-w-[38px] p-[3px]"
                                src="/images/admin.png"
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
                    <span>
                      <MdFace6 />
                    </span>
                    <span>Select Seller</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={send} className="flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={sellerId ? false : true}
                type="text"
                className="flex items-center justify-between w-full px-2 py-[5px] border focus:border-blue-500 rounded-md border-slate-700 outline-none bg-transparent"
                placeholder="Enter Message"
              />
              <button
                disabled={sellerId ? false : true}
                className="shadow-lg bg-[#51a8ff] hover:shadow-cyan-500/50 font-bold w-[75px] h-[35px] rounded-md flex justify-center items-center text-white"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
