import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const api = process.env.REACT_APP_API;      // backend api 
const Friends = ({ friend, friendChat }) => {
  const {user, setSelectedChat, setSelectedChatMessage} = ChatState();      // context
  const openGroupChat = async ()=>{
    console.log("group");
  }

// to open the chat of one friend
  const openChat = async (userId)=>{
    const token = user.token;
    const chatResponse = await fetch(`${api}/auth/chat`, {method: 'POST', headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },body: JSON.stringify({ userId })
  });
  const chatData = await chatResponse.json();
  console.log(chatData);

// fetching all the message of the chat
  const messageResponse = await fetch(`${api}/auth/message/${chatData._id}`, {method: "GET", headers:{
    "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  }});
  const messageData = await messageResponse.json();
  console.log(messageData);
  setSelectedChatMessage(messageData);
  setSelectedChat(chatData)
  }
  return (
    <>
      <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={()=>{
        if(friend){
          openChat(friend._id)
        }else if(friendChat.isGroup){
          openGroupChat()
        }else{
          openChat(friendChat.users[1]._id)
          console.log(friendChat.users[1]._id);
        }
        }}>
        <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
        { friendChat && <img src={friendChat.users[1].pic} alt="" />}
        { friend && <img src={friend.pic} alt="" />}
        </div>
        {friend && <div className="ml-2 text-sm font-semibold">{friend.name}</div>}
        {friendChat && <div className="ml-2 text-sm font-semibold">{friendChat.chatName}</div>}
      </button>
    </>
  );
};

export default Friends;
