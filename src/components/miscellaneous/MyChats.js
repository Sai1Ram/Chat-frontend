import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import {io} from 'socket.io-client'

const api = process.env.REACT_APP_API;      // backend api 
const Friends = ({ friend, friendChat }) => {
  const {user, setSelectedChat, setSelectedChatMessage} = ChatState();      // context
  const socket = io(api);
  const handleFilter = (users) => {
    if(users._id !== user._id){
      return users
    }
    else return
  }
  const recipient = friendChat ? friendChat.users.filter(handleFilter) : "";
  
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
  socket.emit("join chat", chatData)

// fetching all the message of the chat
  const messageResponse = await fetch(`${api}/auth/message/${chatData._id}`, {method: "GET", headers:{
    "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  }});
  const messageData = await messageResponse.json();
 
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
          openChat(recipient[0]._id)
        }
        }}>
        <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
        { friendChat && <img src={recipient[0].pic} alt="" />}
        { friend && <img src={friend.pic} alt="" />}
        </div>
        {friend && <div className="ml-2 text-sm font-semibold">{friend.name}</div>}
        {friendChat && <div className="ml-2 text-sm font-semibold">{
          friendChat.isGroup ? friendChat.chatName : recipient[0].name}</div>}
      </button>
    </>
  );
};

export default Friends;
