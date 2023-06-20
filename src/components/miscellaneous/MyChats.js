import React from "react";


const Friends = ({ name, id }) => {
  console.log(id);
  const openChat = async()=>{
    const userData = localStorage.getItem("userInfo");
    const token = JSON.parse(userData).token;
    const response = await fetch("http://localhost:5000/auth/chat", {method: 'POST', headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },body: {userId: id}
  });
  const data = await response.json();
  console.log(data);
  }
  return (
    <>
      <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={openChat}>
        <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
          J
        </div>
        <div className="ml-2 text-sm font-semibold">{name}</div>
      </button>
    </>
  );
};

export default Friends;
