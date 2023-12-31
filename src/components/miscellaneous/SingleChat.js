import React, { useEffect, useState } from "react";
import MessCompo from "./MessCompo";
import { ChatState } from "../../Context/ChatProvider";
import { io } from "socket.io-client";
import { useSocket } from "../../Context/SocketProvider";

const api = process.env.REACT_APP_API;
const SingleChat = () => {
  const { selectedChat, selectedChatMessage, setSelectedChatMessage, user } =
    ChatState();
  const [content, setContent] = useState("");
  const socket = useSocket();
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("connected");
    });

  }, [user, socket]);
  const handleSend = async () => {
    const token = user.token;
    const response = await fetch(`${api}/auth/message/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: content, chatId: selectedChat._id }),
    });
    const data = await response.json();
    setSelectedChatMessage((prevMessages) => [...prevMessages, data]);
    setContent("");
  };
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-80 p-4 w-full">
      {selectedChat ? (
        <>
          <div className="header bg-gray-400 p-2 rounded-lg flex gap-2 w-full">
            <img
              src={selectedChat.users[1].pic}
              alt=""
              width={30}
              height={30}
              className="rounded-full"
            />
            <h1>{selectedChat ? selectedChat.chatName : "name"}</h1>
          </div>

          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                {selectedChatMessage.map((value, index) => {
                  return (
                    <MessCompo
                      key={index}
                      message={value.content}
                      left={value.sender._id === user._id ? false : true}
                      right={value.sender._id === user._id ? true : false}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
              <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                onClick={handleSend}
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className=" p-2 rounded-lg flex gap-2 w-full justify-center items-center h-full text-2xl font-bold">
          NO CHAT SELECTED
        </div>
      )}
    </div>
  );
};

export default SingleChat;
