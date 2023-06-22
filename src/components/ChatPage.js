import React from "react";

import SideBar from "./miscellaneous/SideBar";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./miscellaneous/SingleChat";
import { useNavigate } from "react-router-dom";

function ChatPage2() {
  
  const {user} = ChatState();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userInfo");
    navigate("/signIn")
  }
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          {user && <SideBar/>}
          <div className="flex flex-col flex-auto h-full px-6 py-3 overflow-hidden items-end">
          <button type="button" onClick={logout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2 mr-2 mb-2  w-36">Logout</button>
           {user && <SingleChat/>} 
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage2;
