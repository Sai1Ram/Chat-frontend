import React, { useState } from 'react'
import MyChats from './MyChats'
const SideBar = () => {
  const [searchData, setSearchData] = useState([]);
  const [allFriend, setAllFriend] = useState([]);
    const handleSearchText = async (e) => {
        const userData = localStorage.getItem("userInfo");
        const token = JSON.parse(userData).token;
        const response = await fetch(
          `http://localhost:5000/auth/user/?search=${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSearchData(data);
      };
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0 overflow-auto">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>

            <div className="border-b-2 py-4 px-2">
              <input
                type="text"
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full focus:outline-none "
                onChange={handleSearchText}
              />
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  4
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full">
                {searchData.map((value, index) => {
                  return(
                  <MyChats name={value.name} key={index} />)
                  
                })}
                {allFriend.map((value, index) => {
                  return(
                  <MyChats name={value.chatName} key={index} />)
                  
                })}

              </div>
            </div>
          </div>
  )
}

export default SideBar

