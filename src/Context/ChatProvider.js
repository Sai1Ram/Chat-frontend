import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const ChatContext = createContext();
function ChatProvider({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [selectedChatMessage, setSelectedChatMessage] = useState([]);
    useEffect(()=>{
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userData)
      if (!userData && !location.pathname === "/") {
        navigate("/signIn");
      }
  },[navigate, location])
    
  return(
  <ChatContext.Provider value={{user, setUser, selectedChat, setSelectedChat,selectedChatMessage, setSelectedChatMessage}}>
    {children}
  </ChatContext.Provider>)

}
export const ChatState = () => {
  return useContext(ChatContext);
}

export default ChatProvider