import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  add_chat_seller,
  messageClear,
  send_messages,
  updateMessage,
} from "../../store/Reducers/chatReducer";
import toast from "react-hot-toast";
import { FaList } from "react-icons/fa";
const socket = io("http://localhost:8080");

const Chat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { my_friends, fr_messages, currentFr, successMessage } = useSelector(
    (state) => state.chat
  );

  const [text, setText] = useState("");
  const [receiverMessage, setReceiverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(
      add_chat_seller({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [sellerId]);

  const send = () => {
    if (text) {
      dispatch(
        send_messages({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReceiverMessage(msg);
    });
    socket.on("active_seller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fr_messages[fr_messages.length - 1]); // lay message cuoi cung
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    if (receiverMessage) {
      if (
        sellerId === receiverMessage.senderId &&
        userInfo.id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send A Message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [fr_messages]);

  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex w-full">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full -left-[350px] ${
            show ? "-left-0" : "-left-[350px]"
          }`}
        >
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                key={i}
                to={`/dashboard/chat/${f.fdId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px] rounded-md ${
                  sellerId === f.fdId ? "bg-[#e2e4e7]" : ""
                }`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img src={f.image} alt="" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)] md-lg:w-full">
          {currentFr ? (
            <div className="w-full h-full">
              <div className="flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full relative">
                    {activeSeller.some(
                      (c) => c.sellerId === currentFr.fdId
                    ) && (
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img src={currentFr.image} alt="" />
                  </div>
                  <span>{currentFr.name}</span>
                </div>
                <div>
                  <div
                    onClick={() => setShow(!show)}
                    className="w-[35px] h-[35px] hidden md-lg:flex cursor-pointer rounded-sm justify-center items-center bg-sky-500 text-white"
                  >
                    <FaList />
                  </div>
                </div>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div
                  className="flex flex-col w-full h-full gap-3 overflow-y-auto"
                  ref={scrollRef}
                >
                  {fr_messages.map((m, i) => {
                    if (currentFr?.fdId !== m.receiverId) {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px]"
                            src={currentFr.image}
                          />
                          <div className="p-2 text-white bg-purple-500 rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <div className="p-2 text-white rounded-md bg-cyan-500">
                            <span>{m.message}</span>
                          </div>
                          <img
                            className="w-[30px] h-[30px]"
                            src="/images/user.png"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex items-center justify-between w-full p-2 pt-8">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="input message"
                    className="w-full h-full p-3 rounded-full outline-none"
                  />
                  <div className="absolute text-2xl cursor-auto right-2 top-2">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className="flex items-center justify-center w-full h-[250px] text-lg ont-bold text-slate-600"
            >
              <span>Select seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
